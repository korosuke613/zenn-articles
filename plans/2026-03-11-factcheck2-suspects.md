# ファクトチェック対象リスト（第2回）

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
作成日: 2026-03-11
抽出件数: 7 件
前回検証済み: 13 件（全て正確。修正済み項目は除外）

## チェック対象（前回未検証の新規・変更箇所）

### 1. pxe-service type=0 と Raspberry Pi の挙動
- **記事中の記述**: 「type=0 は dnsmasq の仕様上「ローカルブート」だが、Raspberry Pi の PXE 実装は type を無視するため 0 でも動作する」（261行目）
- **カテゴリ**: 仕様
- **検証方針**: dnsmasq の pxe-service ドキュメント、Raspberry Pi PXE 実装の仕様を確認
- **優先度**: 高

### 2. Proxy DHCP の説明の正確性
- **記事中の記述**: 「`port=0` で DNS 機能を無効化し、`dhcp-range` に `proxy` を指定することで Proxy DHCP モードになります」（282行目）
- **カテゴリ**: 仕様
- **検証方針**: dnsmasq の Proxy DHCP 設定に関する公式ドキュメント
- **優先度**: 中

### 3. qemu-user-static と binfmt_misc で ARM64 chroot が可能か
- **記事中の記述**: 「x86_64 マシンで作業する場合は `qemu-user-static` と `binfmt_misc` を設定して ARM64 バイナリを実行できるようにしておく必要があります」（380行目）
- **カテゴリ**: 仕様
- **検証方針**: Debian/Ubuntu の qemu-user-static パッケージドキュメント、binfmt_misc の仕組み
- **優先度**: 中

### 4. Zenn のアンカーリンク形式
- **記事中の記述**: `[セットアップ（NAS）](#セットアップ（nas）)`（437行目）
- **カテゴリ**: 論理
- **検証方針**: Zenn のマークダウン処理でのアンカー自動生成ルールを確認。日本語見出しと括弧を含む場合のアンカー形式
- **優先度**: 高

### 5. fstab の NFS マウントオプション vers=3
- **記事中の記述**: `192.168.0.100:/nfsshare/tftproot/<シリアル番号> /boot/firmware nfs defaults,vers=3,proto=tcp,_netdev 0 2`（536行目）
- **カテゴリ**: コマンド / 仕様
- **検証方針**: NFS v3 が適切かどうか（erichough/nfs-server のデフォルト NFS バージョン）。vers=3 のオプション名が正しいか
- **優先度**: 中

### 6. journald の SystemMaxUse パラメータ名
- **記事中の記述**: 「`journald` の `SystemMaxUse` でログサイズを制限しておくことを推奨します」（546行目）
- **カテゴリ**: コマンド / 仕様
- **検証方針**: journald.conf(5) の man page で SystemMaxUse パラメータの存在を確認
- **優先度**: 低

### 7. 「サーバ郡」の誤字
- **記事中の記述**: 「サーバ郡の上では k3s クラスタが稼働しており」（626行目）
- **カテゴリ**: 固有名詞 / 誤字
- **検証方針**: 「郡」（county）→「群」（group）の誤字。検証不要、即修正
- **優先度**: 高（即修正）
