# Plan: Raspberry Pi PXE + iSCSI 記事レビュー修正

## Context

記事 `articles/raspberry-pi-pxe-iscsi-boot.md` のレビューで 5 つの修正点が指摘された。事実誤認の修正、セキュリティ配慮、説明不足の補完を行う。

## 修正一覧

### 1. SSD 耐久性の表現修正（L34）

**現状**: `NAS の SSD はエンタープライズ向けの耐久性を持ち、書き込み寿命の心配が大幅に減る`
**問題**: SSD はユーザーが自分で NAS に取り付けたもので、エンタープライズ向けとは限らない
**修正**: SSD は SD カードよりも書き込み耐性が高い、程度のトーンに修正

```
- **SSD の耐久性**: NAS に搭載した SSD は SD カードと比べて書き込み耐性が高く、寿命の心配が大幅に減る
```

### 2. シリアル番号のダミー値化（記事全体）

**問題**: 実際のシリアル番号（`6f671c54`, `0d07dd2c`, `d829fe8c`）が記事に露出している
**修正**: ダミー値に置換

| 実値 | ダミー値 | 対応 |
|---|---|---|
| `d829fe8c` | `aabbccdd` | Pi #3 |
| `0d07dd2c` | `11223344` | Pi #2 |
| `6f671c54` | `55667788` | Pi #1 |

該当箇所:
- L58-60: ハードウェア表
- L76-78: Mermaid アーキテクチャ図
- L145-151: Docker Compose（NFS_EXPORT, volumes）
- L191-193: dnsmasq.conf の MAC コメント
- L328-339: TFTP ディレクトリ構成図

MAC アドレス（`dc:a6:32:93:70:06` 等）もダミー化:
- L191-193: dnsmasq.conf

| 実値 | ダミー値 |
|---|---|
| `dc:a6:32:93:70:06` | `dc:a6:32:xx:xx:01` |
| `dc:a6:32:93:6f:db` | `dc:a6:32:xx:xx:02` |
| `dc:a6:32:93:52:30` | `dc:a6:32:xx:xx:03` |

IP アドレス（`192.168.0.67`, `192.168.0.202`, `192.168.0.2`）もダミー化:
- L145-147: NFS_EXPORT

| 実値 | ダミー値 |
|---|---|
| `192.168.0.67` | `192.168.0.101` |
| `192.168.0.202` | `192.168.0.102` |
| `192.168.0.2` | `192.168.0.103` |

### 3. OTP ビット不可逆性の注釈追加（L230 付近）

**現状**: `一度設定すると元に戻せないため、慎重に実行してください。` のみ
**修正**: 注釈（脚注）で OTP ビットの仕組みを解説

L230 の直後に追加:

```markdown
Raspberry Pi 4B でネットワークブートを有効にするには、OTP ビットを設定する必要があります。**一度設定すると元に戻せない**[^otp]ため、慎重に実行してください。

[^otp]: OTP（One-Time Programmable）は SoC 内部のヒューズ領域に書き込まれます。物理的にヒューズを焼き切る仕組みのため、ソフトウェアで元に戻すことはできません。ただし、OTP ビットを設定してもネットワークブート「のみ」になるわけではなく、SD カードが挿入されていれば従来通り SD カードから起動します。SD カードが見つからない場合にネットワークブートにフォールバックする動作になるため、実用上のデメリットはほぼありません。
```

### 4. iSCSI 接続コマンドに CHAP 認証を追加（L246-251）

**現状**: `iscsiadm` コマンドに CHAP 認証パラメータがない
**修正**: CHAP 認証設定コマンドを追加

```bash
# iSCSI 接続（CHAP 認証ありの場合）
sudo iscsiadm -m discovery -t st -p 192.168.0.71
sudo iscsiadm -m node \
    -T iqn.2025-03.com.ugreen:target-1.xxxxx \
    -p 192.168.0.71 \
    --op update -n node.session.auth.authmethod -v CHAP
sudo iscsiadm -m node \
    -T iqn.2025-03.com.ugreen:target-1.xxxxx \
    -p 192.168.0.71 \
    --op update -n node.session.auth.username -v <ユーザー名>
sudo iscsiadm -m node \
    -T iqn.2025-03.com.ugreen:target-1.xxxxx \
    -p 192.168.0.71 \
    --op update -n node.session.auth.password -v <パスワード>
sudo iscsiadm -m node \
    -T iqn.2025-03.com.ugreen:target-1.xxxxx \
    -p 192.168.0.71 --login
```

### 5. HDD → SSD 移行コラムの追加

**場所**: 「なぜネットワークブートか」セクションの末尾（iSCSI vs NFS 表の後、L49 付近）
**内容**: 当初 HDD で iSCSI を構成したが R/W 音が常時発生。NAS の R/W キャッシュ用 SSD 2 枚のうち 1 枚を R キャッシュ専用に、もう 1 枚をボリュームとして転用し iSCSI の保存先を SSD に変更した結果、音と性能が改善した話

```markdown
:::message
**HDD から SSD への移行**
当初は NAS の HDD 上に iSCSI LUN を配置していましたが、Pi が常時稼働しているため HDD の読み書き音が途切れることなく発生し、生活空間に置くには厳しい状態でした。そこで、NAS に搭載していた R/W キャッシュ用 SSD 2 枚のうち 1 枚を R キャッシュ専用に、もう 1 枚をストレージボリュームとして転用し、iSCSI LUN の配置先を SSD に変更しました。結果として、読み書き音の頻度が大幅に減り、パフォーマンスも向上しました。
:::
```

## 対象ファイル

- `articles/raspberry-pi-pxe-iscsi-boot.md`

## 検証

1. `pnpm exec textlint ./articles/raspberry-pi-pxe-iscsi-boot.md` で校正チェック
2. 記事内にシリアル番号の実値（`d829fe8c`, `0d07dd2c`, `6f671c54`）が残っていないことを grep で確認
3. 記事内に MAC アドレスの実値が残っていないことを grep で確認
