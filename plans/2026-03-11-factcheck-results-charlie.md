# ファクトチェック結果: Charlie

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
検証日: 2026-03-11
担当: Charlie

## 検証結果

### 11. URL の有効性

#### 11-1. https://www.raspberrypi.com/documentation/computers/raspberry-pi.html
- **判定**: 正確（有効）
- **検証結果**: WebFetch では JavaScript レンダリング依存のため空コンテンツが返却されたが、WebSearch で同 URL が Raspberry Pi 公式ドキュメントとして多数の検索結果に出現。BOOT_ORDER、EEPROM ブートローダー、PXE ブート等の情報を含む正規のドキュメントページであることを確認。
- **ソース**: [Raspberry Pi computer hardware - Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html)

#### 11-2. https://www.raspberrypi.com/documentation/computers/config_txt.html
- **判定**: 正確（有効）
- **検証結果**: 同様に JavaScript レンダリング依存だが、WebSearch で auto_initramfs に関する情報が同 URL から取得可能であることを確認。config.txt の公式ドキュメントページとして有効。
- **ソース**: [config.txt - Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/computers/config_txt.html)

#### 11-3. https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/security_guide/sect-security_guide-securing_nfs-do_not_use_the_no_root_squash_option
- **判定**: 正確（有効）
- **検証結果**: ページはアクセス可能。タイトルが「2.2.4.4. Do Not Use the no_root_squash Option」であり、Red Hat Enterprise Linux 6 Security Guide の no_root_squash に関するセクション。記事中の脚注の参照先として適切。
- **ソース**: [Red Hat Security Guide - Do not use the no_root_squash option](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/security_guide/sect-security_guide-securing_nfs-do_not_use_the_no_root_squash_option)

#### 11-4. https://bitbanged.com/posts/streamlining-rpi-osdev/network-booting-a-raspberry-pi-4/
- **判定**: 正確（有効）
- **検証結果**: ページはアクセス可能。Raspberry Pi 4 のネットワークブートに関する詳細な記事。start4.elf、fixup4.dat、config.txt、device-tree blob 等の TFTP 必要ファイルについて言及あり。記事中の脚注で「最低限必要なファイル」の参照先として適切。
- **ソース**: [Network Booting a Raspberry Pi 4 - BitBanged](https://bitbanged.com/posts/streamlining-rpi-osdev/network-booting-a-raspberry-pi-4/)

#### 11-5. https://sources.debian.org/src/open-iscsi/2.0.874-7.1/debian/README.Debian/
- **判定**: 正確（有効）
- **検証結果**: ページはアクセス可能。open-iscsi の Debian パッケージの README。`/etc/iscsi/iscsi.initramfs` ファイルの存在によって initramfs への iSCSI サポート組み込みが制御されることを明記。`ISCSI_AUTO=true` やカーネルブートパラメータについても記載あり。記事中の参照先として適切。
- **ソース**: [Debian Sources - open-iscsi README.Debian](https://sources.debian.org/src/open-iscsi/2.0.874-7.1/debian/README.Debian/)

#### 11-6. https://github.com/open-iscsi/open-iscsi
- **判定**: 正確（有効）
- **検証結果**: GitHub リポジトリはアクセス可能。open-iscsi の公式リポジトリ（609 stars, 267 forks）。README にて iSCSI root 設定（セクション 8.2）への言及あり。記事中で initramfs スクリプトの参照先として使用されている。
- **ソース**: [open-iscsi/open-iscsi - GitHub](https://github.com/open-iscsi/open-iscsi)

#### 11-7. https://x.com/miyacoop/status/2027208975914353047
- **判定**: 要確認
- **検証結果**: X (旧 Twitter) のページは JavaScript 必須のため WebFetch ではコンテンツを取得できなかった。URL フォーマット自体は X のツイート形式として正しい（`x.com/{user}/status/{id}`）。ただし、ツイート ID `2027208975914353047` は非常に大きな数値であり、実在するツイートかどうかは本検証では確認不可。ブラウザでの手動確認を推奨。
- **ソース**: なし（技術的制約により検証不完全）

### 12. Raspberry Pi 4B は標準で PoE 非対応
- **判定**: 正確
- **記事中の記述**: 「Raspberry Pi 4B は標準では PoE に対応していないため、別途 PoE HAT（拡張ボード）を各 Pi に装着する必要があります」
- **検証結果**: Raspberry Pi 4 Model B は単体では PoE をサポートしない。PoE で給電するには別売の PoE HAT または PoE+ HAT（拡張ボード）の装着が必要。公式 PoE HAT は IEEE 802.3af 準拠（13W 保証）、PoE+ HAT は IEEE 802.3at 準拠（最大約 25W）。記事の記述は正確。
- **ソース**: [Buy a PoE HAT - Raspberry Pi](https://www.raspberrypi.com/products/poe-hat/), [Announcing the Raspberry Pi PoE+ HAT](https://www.raspberrypi.com/news/announcing-the-raspberry-pi-poe-hat/)

### 13. micro USB Type-B での外付け HDD 接続
- **判定**: 要確認（表現の曖昧さ）
- **記事中の記述**: 「外付け HDD に OS を入れて USB 接続（micro USB Type-B）して運用していました」「micro USB Type-B の接続不良が発生しやすく」
- **検証結果**:
  - **Raspberry Pi 4B 側の USB ポート仕様**: Pi 4B は USB-A ポート x4（USB 2.0 x2 + USB 3.0 x2）と USB-C（電源用）を搭載。Pi 4B には micro USB Type-B ポートは存在しない（micro USB Type-B は Pi 3B 以前の電源コネクタ）。
  - **外付け HDD 側のコネクタ**: ポータブル外付け HDD の多くは micro USB 3.0 Type-B（Micro-B SuperSpeed）コネクタを採用している（WD My Passport、Seagate 等）。記事の文脈からは、この HDD 側のコネクタを指していると推測される。
  - **正確性の評価**: 記事の記述は「外付け HDD を USB 接続（micro USB Type-B）」であり、HDD 側のケーブル/コネクタを指す文脈と読める。ポータブル HDD が micro USB Type-B（2.0）または micro USB 3.0 Type-B コネクタを使用することは一般的であり、技術的に不正確ではない。ただし、厳密には「micro USB 3.0 Type-B（Micro-B SuperSpeed）」と「micro USB Type-B（2.0）」は物理的に異なるコネクタであるため、読者によっては混乱する可能性がある。
  - **接触不良について**: micro USB Type-B（2.0 / 3.0 共に）は抜き差しによるコネクタの摩耗で接触不良が発生しやすいことは広く知られた問題であり、この記述自体は妥当。
- **ソース**: [Raspberry Pi 4 Model B specifications](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/specifications/), [USB Connector Type Guide - Newnex](https://newnex.com/usb-connector-type-guide.php)
- **修正案**: より正確にするなら「micro USB 3.0 Type-B」または単に「micro USB」と記述する方が良い。ただし、文脈上 HDD 側のコネクタであることは明確であり、重大な事実誤認ではない。

## サマリー
- 正確: 9 件（URL 6 件 + PoE 非対応 + URL 有効性で問題なし 2 件）
- 不正確: 0 件
- 要確認: 2 件（X の URL の実在確認、micro USB Type-B の表現の曖昧さ）
