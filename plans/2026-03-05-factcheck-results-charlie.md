# ファクトチェック結果: charlie

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
検証日: 2026-03-05
担当: charlie

## 検証結果

### 13. Red Hat Security Guide の no_root_squash リンク
- **判定**: 正確
- **記事中の記述**: `https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/security_guide/sect-security_guide-securing_nfs-do_not_use_the_no_root_squash_option`
- **検証結果**: URL はアクセス可能。Red Hat Enterprise Linux 6 Security Guide のセクション「2.2.4.4. Do Not Use the no_root_squash Option」に正しくリンクしている。ページはレンダリング可能で、タイトルも内容と一致する。
- **ソース**: [Red Hat Security Guide - Do not use the no_root_squash option](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/security_guide/sect-security_guide-securing_nfs-do_not_use_the_no_root_squash_option)

### 14. Raspberry Pi の MAC アドレスプレフィックス dc:a6:32
- **判定**: 正確
- **記事中の記述**: `dhcp-host=dc:a6:32:xx:xx:01,set:raspberrypi-pxe`
- **検証結果**: DC:A6:32 は Raspberry Pi Trading Ltd に登録された OUI（MA-L）である。2019年3月19日に登録され、範囲は DC:A6:32:00:00:00 〜 DC:A6:32:FF:FF:FF。Pi 4B の Ethernet MAC アドレスとして使用される既知のプレフィックスである。なお、Raspberry Pi には他に E4:5F:01、28:CD:C1、D8:3A:DD 等の OUI も存在するが、dc:a6:32 は Pi 4 で最も一般的なプレフィックスの一つ。
- **ソース**: [MAC address DC:A6:32 | MAC Address Lookup](https://maclookup.app/macaddress/dca632), [Raspberry Pi Forums - MAC ranges](https://forums.raspberrypi.com/viewtopic.php?t=347926)

### 15. start4.elf が Pi 4 の正しいファームウェアファイル名
- **判定**: 正確
- **記事中の記述**: TFTP で start4.elf, config.txt, kernel8.img 等を取得
- **検証結果**: start4.elf は Pi 4 シリーズ（Model 4B, Pi 400, CM4）専用の GPU ファームウェアファイルである。公式 firmware リポジトリの boot/ ディレクトリに存在する。Pi 4 では start.elf ではなく start4.elf を使用する（fixup4.dat とペア）。kernel8.img は 64bit カーネル、config.txt はブート設定ファイルであり、記事の記載は正確。
- **ソース**: [raspberrypi/firmware - boot/start4.elf](https://github.com/raspberrypi/firmware/blob/master/boot/start4.elf), [Raspberry Pi Documentation - Configuration](https://www.raspberrypi.org/documentation/configuration/boot_folder.md)

### 16. ip= カーネルパラメータの形式
- **判定**: 正確
- **記事中の記述**: `ip=::::raspberrypi-1:eth0:dhcp`
- **検証結果**: Linux カーネルドキュメントによると ip= パラメータの形式は `ip=<client-ip>:<server-ip>:<gw-ip>:<netmask>:<hostname>:<device>:<autoconf>:<dns0-ip>:<dns1-ip>:<ntp0-ip>`。記事の `ip=::::raspberrypi-1:eth0:dhcp` は、client-ip〜netmask の4フィールドを空（デフォルト）にし、hostname=raspberrypi-1、device=eth0、autoconf=dhcp と指定しており、形式として正確。DHCP による自動設定でホスト名とデバイスを明示的に指定するパターンとして正しい。
- **ソース**: [Mounting the root filesystem via NFS (nfsroot) - Linux Kernel Documentation](https://docs.kernel.org/admin-guide/nfs/nfsroot.html)

### 17. BitBanged ブログリンク
- **判定**: 正確
- **記事中の記述**: `https://bitbanged.com/posts/streamlining-rpi-osdev/network-booting-a-raspberry-pi-4/`
- **検証結果**: URL はアクセス可能。「Network Booting a Raspberry Pi 4」というタイトルの記事が表示され、Pi 4 の TFTP ネットワークブートについて解説している。記事中で start4.elf、fixup4.dat、config.txt 等の TFTP ファイルについて言及しており、記事の脚注として適切な参照先である。
- **ソース**: [Network Booting a Raspberry Pi 4 - BitBanged](https://bitbanged.com/posts/streamlining-rpi-osdev/network-booting-a-raspberry-pi-4/)

### 18. PoE HAT の必要性（Pi 4B は標準では PoE 非対応）
- **判定**: 正確
- **記事中の記述**: 「Raspberry Pi 4B は標準では PoE に対応していないため、別途 PoE HAT（拡張ボード）を各 Pi に装着する必要があります」
- **検証結果**: Raspberry Pi 4B には 4 ピンの PoE コネクタ（J14）が基板上にあるが、PoE による給電を行うにはPoE HAT または PoE+ HAT を装着する必要がある。基板単体では PoE 給電を受けられない。なお、PoE HAT 以外に USB-C PoE スプリッタを使用する代替手段も存在するが、記事の「PoE HAT が必要」という記述は標準的かつ正確な説明である。
- **ソース**: [Buy a PoE HAT - Raspberry Pi](https://www.raspberrypi.com/products/poe-hat/), [Jeff Geerling - Review of Raspberry Pi's PoE+ HAT](https://www.jeffgeerling.com/blog/2021/review-raspberry-pis-poe-hat-june-2021/)

## サマリー
- 正確: 6 件
- 不正確: 0 件
- 要確認: 0 件
