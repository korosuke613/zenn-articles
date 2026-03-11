# ファクトチェック結果: Alpha（第2回）

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
検証日: 2026-03-11
担当: Alpha

## 検証結果

### 1. pxe-service type=0 と Raspberry Pi の挙動

- **判定**: 正確（ただし表現に若干の補足余地あり）
- **記事中の記述**: 「type=0 は dnsmasq の仕様上「ローカルブート」だが、Raspberry Pi の PXE 実装は type を無視するため 0 でも動作する」
- **検証結果**:
  - dnsmasq の man page で type=0 は「the menu entry will abort the net boot procedure and continue booting from local media」と明記されており、記事の「ローカルブート」という説明は正確。
  - Raspberry Pi の PXE 実装が type フィールドを「無視する」という表現については、firmware issue [#1101](https://github.com/raspberrypi/firmware/issues/1101) で Raspberry Pi の bootcode.bin が pxe-service を正しく実装していないことが報告されている。また [rpi-eeprom issue #60](https://github.com/raspberrypi/rpi-eeprom/issues/60) では Pi 4 が pxe-service の type を x86 PXE クライアントとは異なる方法で処理していることが確認されている。
  - 実用上は `pxe-service=0,"Raspberry Pi Boot"` が多数の稼働実績で動作しており（[linuxconfig.org](https://linuxconfig.org/how-to-configure-a-raspberry-pi-as-a-pxe-boot-server)、[ian.bebbs.co.uk](https://ian.bebbs.co.uk/posts/NetworkBootingManyRaspberryPis) 等）、type=0 でも PXE ブートが正常に行われることは事実。
  - 厳密には「type を無視する」というよりは「PXE 仕様に準拠した type の解釈を行わない（bootcode.bin / EEPROM の PXE 実装が PXE boot service type フィールドを正しく処理しない）」というのがより正確。ただし記事のコメント内での簡潔な説明としては許容範囲内。
- **ソース**:
  - [dnsmasq man page](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)
  - [bootcode.bin doesn't implement pxe-service correctly - firmware #1101](https://github.com/raspberrypi/firmware/issues/1101)
  - [PXE-Service order - rpi-eeprom #60](https://github.com/raspberrypi/rpi-eeprom/issues/60)
- **修正案**: 必須ではないが、より厳密にするなら「Raspberry Pi の PXE 実装は PXE 仕様の boot service type を正しく解釈しないため、type=0（ローカルブート）を指定しても問題なくネットワークブートが行われる」のような表現も可。

### 2. Proxy DHCP の説明の正確性

- **判定**: 正確
- **記事中の記述**: 「`port=0` で DNS 機能を無効化し、`dhcp-range` に `proxy` を指定することで Proxy DHCP モードになります」
- **検証結果**:
  - dnsmasq man page に `port=0` について「Setting this to zero completely disables DNS function, leaving only DHCP and/or TFTP.」と明記されている。記事の説明は正確。
  - `dhcp-range` の `proxy` キーワードについて、man page に「For IPv4, the mode may be proxy in which case dnsmasq will provide proxy-DHCP on the specified subnet」と記載。「dnsmasq simply provides the information given in --pxe-prompt and --pxe-service to allow netbooting」とあり、IP アドレスの割り当ては行わずブート情報のみを配信する Proxy DHCP モードであることが確認できた。
  - 記事の「IP アドレスの割り当ては既存の DHCP サーバーに任せ、PXE ブートに必要な情報だけを追加で配信します」という説明も正確。
  - FOG Project の wiki（[ProxyDHCP with dnsmasq](https://wiki.fogproject.org/wiki/index.php?title=ProxyDHCP_with_dnsmasq)）でも同様の設定パターンが推奨されている。
- **ソース**:
  - [dnsmasq man page](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)
  - [ProxyDHCP with dnsmasq - FOG Project](https://wiki.fogproject.org/wiki/index.php?title=ProxyDHCP_with_dnsmasq)
  - [Proxy DHCP with dnsmasq - Fog Project Documentation](https://docs.fogproject.org/en/latest/installation/network-setup/proxy-dhcp/)

### 3. qemu-user-static と binfmt_misc で ARM64 chroot が可能か

- **判定**: 正確
- **記事中の記述**: 「x86_64 マシンで作業する場合は `qemu-user-static` と `binfmt_misc` を設定して ARM64 バイナリを実行できるようにしておく必要があります」
- **検証結果**:
  - Debian Wiki の [QemuUserEmulation](https://wiki.debian.org/QemuUserEmulation) ページに「transparently run packages for incompatible architectures by using QEMU」と記載されており、qemu-user-static（または後継の qemu-user + qemu-user-binfmt）が binfmt_misc を通じて外部アーキテクチャのバイナリを透過的に実行する仕組みが確認された。
  - Debian Wiki の [RaspberryPi/qemu-user-static](https://wiki.debian.org/RaspberryPi/qemu-user-static) ページでは、Raspberry Pi の ARM ファイルシステムを x86_64 ホストから chroot で操作する手順が説明されている。
  - Gentoo Wiki の [Compiling with qemu user chroot](https://wiki.gentoo.org/wiki/Embedded_Handbook/General/Compiling_with_qemu_user_chroot) でも同様の手法が解説されている。
  - [multiarch/qemu-user-static](https://github.com/multiarch/qemu-user-static) の README にも、binfmt_misc を通じた透過的な異アーキテクチャバイナリ実行の仕組みが説明されている。
  - 注意: Debian Trixie 以降では `qemu-user-static` が `qemu-user` + `qemu-user-binfmt` に置き換わっているが、記事の記述は一般的な説明として問題ない。
- **ソース**:
  - [QemuUserEmulation - Debian Wiki](https://wiki.debian.org/QemuUserEmulation)
  - [RaspberryPi/qemu-user-static - Debian Wiki](https://wiki.debian.org/RaspberryPi/qemu-user-static)
  - [multiarch/qemu-user-static - GitHub](https://github.com/multiarch/qemu-user-static)
  - [Compiling with qemu user chroot - Gentoo Wiki](https://wiki.gentoo.org/wiki/Embedded_Handbook/General/Compiling_with_qemu_user_chroot)

## サマリー

- 正確: 3 件
- 不正確: 0 件
- 要確認: 0 件

全3項目とも記事の記述は正確であると判定した。項目1について、「type を無視する」という表現はやや簡略化されているが、コメント内での説明としては許容範囲であり、実用上も問題ない。より厳密な表現にしたい場合は修正案を参照のこと。
