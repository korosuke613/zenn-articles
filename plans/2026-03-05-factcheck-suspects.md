# ファクトチェック対象リスト

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
作成日: 2026-03-05
抽出件数: 18 件

## チェック対象

### 1. Pi 4B の EEPROM ブートローダーと Pi 3B 以前の OTP の違い
- **記事中の記述**: 「Pi 4B は EEPROM、Pi 3B 以前は OTP」
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi 公式ドキュメントで確認
- **優先度**: 高

### 2. BOOT_ORDER の各桁の値
- **記事中の記述**: 1=SD, 2=ネットワーク, 4=USB マスストレージ, 6=NVMe, f=再起動してリトライ
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi 公式ドキュメント BOOT_ORDER セクション
- **優先度**: 高

### 3. bootcode.bin が EEPROM 内に組み込まれている（Pi 4B）
- **記事中の記述**: 「Pi 4B では bootcode.bin は EEPROM 内に組み込まれているため、TFTP からのダウンロードは発生しません」
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi 公式ドキュメント
- **優先度**: 高

### 4. Docker Compose の version: "3.8" 構文
- **記事中の記述**: `version: "3.8"` を docker-compose.yaml に記述
- **カテゴリ**: コマンド
- **検証方針**: Docker 公式ドキュメント。現在は version フィールドは非推奨の可能性
- **優先度**: 中

### 5. strm/dnsmasq:latest Docker イメージの存在
- **記事中の記述**: `image: strm/dnsmasq:latest`
- **カテゴリ**: 固有名詞
- **検証方針**: Docker Hub で確認
- **優先度**: 中

### 6. erichough/nfs-server:2.2.1 Docker イメージの存在
- **記事中の記述**: `image: erichough/nfs-server:2.2.1`
- **カテゴリ**: 固有名詞 / バージョン
- **検証方針**: Docker Hub で確認
- **優先度**: 中

### 7. iSCSI 標準ポート 3260
- **記事中の記述**: 「iSCSI ポート（標準: 3260）」
- **カテゴリ**: 仕様
- **検証方針**: RFC 7143 (iSCSI) または IANA ポート一覧
- **優先度**: 高

### 8. Raspberry Pi firmware issue #934（dhcp-reply-delay バグ）
- **記事中の記述**: dhcp-reply-delay=2 は PXE クライアントのファームウェアバグ回避のため
- **カテゴリ**: URL / 論理
- **検証方針**: GitHub issue を確認
- **優先度**: 中

### 9. auto_initramfs=1 の config.txt オプション
- **記事中の記述**: 「auto_initramfs=1 を指定することで、TFTP ディレクトリ内の initramfs を自動的にロード」「kernel8.img → initramfs8」
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi 公式 config.txt ドキュメント
- **優先度**: 高

### 10. Bookworm 以降はデフォルトの pi ユーザーが存在しない
- **記事中の記述**: 「Bookworm 以降はデフォルトの pi ユーザーが存在しないため、手動で作成する」
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi OS のリリースノート。実際は Bullseye 以降の可能性
- **優先度**: 高

### 11. /etc/iscsi/iscsi.initramfs フラグファイル
- **記事中の記述**: 「このファイルが存在すると、initramfs 起動時に cmdline の iSCSI パラメータを読み取って自動接続する。中身は空でよい（フラグファイル）」
- **カテゴリ**: 仕様
- **検証方針**: open-iscsi の debian/README.Debian
- **優先度**: 中

### 12. UMass FAST'04 論文リンク
- **記事中の記述**: `https://lass.cs.umass.edu/papers/pdf/FAST04.pdf`
- **カテゴリ**: URL
- **検証方針**: URL の有効性を確認
- **優先度**: 低

### 13. Red Hat Security Guide の no_root_squash リンク
- **記事中の記述**: `https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/security_guide/sect-security_guide-securing_nfs-do_not_use_the_no_root_squash_option`
- **カテゴリ**: URL
- **検証方針**: URL の有効性を確認
- **優先度**: 低

### 14. Raspberry Pi の MAC アドレスプレフィックス dc:a6:32
- **記事中の記述**: `dhcp-host=dc:a6:32:xx:xx:01`
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi の既知の OUI を確認
- **優先度**: 低

### 15. start4.elf が Pi 4 の正しいファームウェアファイル名
- **記事中の記述**: TFTP で start4.elf, config.txt, kernel8.img 等を取得
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi 公式ドキュメント
- **優先度**: 中

### 16. ip= カーネルパラメータの形式
- **記事中の記述**: `ip=::::raspberrypi-1:eth0:dhcp`
- **カテゴリ**: コマンド
- **検証方針**: Linux カーネルドキュメント nfsroot.txt
- **優先度**: 中

### 17. BitBanged ブログリンク
- **記事中の記述**: `https://bitbanged.com/posts/streamlining-rpi-osdev/network-booting-a-raspberry-pi-4/`
- **カテゴリ**: URL
- **検証方針**: URL の有効性を確認
- **優先度**: 低

### 18. PoE HAT の必要性（Pi 4B は標準では PoE 非対応）
- **記事中の記述**: 「Raspberry Pi 4B は標準では PoE に対応していないため、別途 PoE HAT（拡張ボード）を各 Pi に装着する必要があります」
- **カテゴリ**: 仕様
- **検証方針**: Raspberry Pi 公式ドキュメント
- **優先度**: 低
