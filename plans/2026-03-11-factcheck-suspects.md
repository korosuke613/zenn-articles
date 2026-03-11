# ファクトチェック対象リスト

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
作成日: 2026-03-11
抽出件数: 13 件

## チェック対象

### 1. BOOT_ORDER の各桁の意味
- **記事中の記述**: 「`1` = SD カード、`2` = ネットワーク（PXE）、`4` = USB マスストレージ、`6` = NVMe、`f` = 再起動してリトライ」
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi 公式ドキュメント BOOT_ORDER セクション
- **優先度**: 高

### 2. Pi 4B の bootcode.bin は EEPROM 内に組み込まれている
- **記事中の記述**: 「Pi 4B では bootcode.bin は EEPROM 内に組み込まれているため、TFTP からのダウンロードは発生しません」
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi 公式ドキュメント boot flow セクション
- **優先度**: 高

### 3. strm/dnsmasq Docker イメージの存在
- **記事中の記述**: `image: strm/dnsmasq:latest`
- **カテゴリ**: 固有名詞 / URL
- **検証方針**: Docker Hub で strm/dnsmasq の存在を確認
- **優先度**: 中

### 4. erichough/nfs-server:2.2.1 Docker イメージの存在
- **記事中の記述**: `image: erichough/nfs-server:2.2.1`
- **カテゴリ**: 固有名詞 / バージョン
- **検証方針**: Docker Hub で erichough/nfs-server の存在と 2.2.1 タグを確認
- **優先度**: 中

### 5. Bullseye 2022 年 4 月アップデート以降のデフォルト pi ユーザー削除
- **記事中の記述**: 「Bullseye（2022 年 4 月アップデート）以降はデフォルトの pi ユーザーが存在しない」
- **カテゴリ**: バージョン / 仕様
- **検証方針**: Raspberry Pi OS リリースノート、公式ブログ
- **優先度**: 高

### 6. auto_initramfs の動作と命名規則
- **記事中の記述**: 「`auto_initramfs=1` を指定…ファームウェアはカーネルファイル名から対応する initramfs ファイル名を自動推定します（例: `kernel8.img` → `initramfs8`）」
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi config.txt 公式ドキュメント
- **優先度**: 高

### 7. Pi 3 ファームウェアバグ GitHub Issue #934
- **記事中の記述**: 「Pi 3 の既知バグ https://github.com/raspberrypi/firmware/issues/934」
- **カテゴリ**: URL / 論理
- **検証方針**: GitHub Issue の存在と内容を確認
- **優先度**: 中

### 8. open-iscsi initramfs パラメータの大文字・小文字
- **記事中の記述**: 「open-iscsi の initramfs スクリプトは本来小文字のパラメータ名（`iscsi_initiator` 等）をパースします」
- **カテゴリ**: 仕様
- **検証方針**: open-iscsi GitHub リポジトリの initramfs スクリプトソースコード
- **優先度**: 中

### 9. iSCSI 標準ポート 3260
- **記事中の記述**: 「iSCSI ポート（標準: 3260）」
- **カテゴリ**: 仕様
- **検証方針**: RFC 7143 または IANA ポート番号一覧
- **優先度**: 低

### 10. ip= カーネルパラメータのフォーマット
- **記事中の記述**: `ip=::::pi-1:eth0:dhcp`
- **カテゴリ**: コマンド / 仕様
- **検証方針**: Linux カーネルドキュメント nfsroot.txt / ip パラメータ仕様
- **優先度**: 高

### 11. URL の有効性
- **記事中の記述**: 各脚注の URL
  - https://www.raspberrypi.com/documentation/computers/raspberry-pi.html
  - https://www.raspberrypi.com/documentation/computers/config_txt.html
  - https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/security_guide/sect-security_guide-securing_nfs-do_not_use_the_no_root_squash_option
  - https://bitbanged.com/posts/streamlining-rpi-osdev/network-booting-a-raspberry-pi-4/
  - https://sources.debian.org/src/open-iscsi/2.0.874-7.1/debian/README.Debian/
  - https://github.com/open-iscsi/open-iscsi
  - https://x.com/miyacoop/status/2027208975914353047
- **カテゴリ**: URL
- **検証方針**: WebFetch で各 URL の有効性を確認
- **優先度**: 中

### 12. Raspberry Pi 4B は標準で PoE 非対応
- **記事中の記述**: 「Raspberry Pi 4B は標準では PoE に対応していないため、別途 PoE HAT（拡張ボード）を各 Pi に装着する必要があります」
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi 4B 公式スペック
- **優先度**: 低

### 13. micro USB Type-B での外付け HDD 接続
- **記事中の記述**: 「外付け HDD に OS を入れて USB 接続（micro USB Type-B）して運用していました」「micro USB Type-B の接続不良が発生しやすく」
- **カテゴリ**: 仕様 / 論理
- **検証方針**: Raspberry Pi 4B の USB ポート仕様確認。micro USB Type-B は HDD 側のコネクタか Pi 側か
- **優先度**: 中
