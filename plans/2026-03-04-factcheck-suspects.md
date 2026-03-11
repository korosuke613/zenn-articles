# ファクトチェック対象リスト

記事 `articles/raspberry-pi-pxe-iscsi-boot.md` から抽出した技術的主張・事実関係の一覧。

---

## 1. OTP ビットの値 `3020000a`
- **記事内の記述**: 「`vcgencmd otp_dump | grep 17:` → 期待値: `17:3020000a`」（L282-283）
- **検証ポイント**: OTP レジスタ 17 の値 `3020000a` がネットワークブート有効を示す正しい値か。Raspberry Pi 公式ドキュメントでの記載と一致するか
- **優先度**: 高

## 2. OTP ビットの不可逆性と SD カードフォールバック動作
- **記事内の記述**: 「一度設定すると元に戻せない」「OTP（One-Time Programmable）は SoC 内部のヒューズ領域に書き込まれます。物理的にヒューズを焼き切る仕組み」「SD カードが挿入されていれば従来通り SD カードから起動します。SD カードが見つからない場合にネットワークブートにフォールバックする動作」（L272-274）
- **検証ポイント**: OTP ビット設定後のブート順序は本当に「SD カード優先 → ネットワークフォールバック」か。Pi 4B と Pi 3B+ 等で挙動が異なる可能性。`program_usb_boot_mode=1` と USB ブートの関係
- **優先度**: 高

## 3. `program_usb_boot_mode=1` でネットワークブートが有効になるという主張
- **記事内の記述**: 「`echo 'program_usb_boot_mode=1' | sudo tee -a /boot/firmware/config.txt`」（L278）
- **検証ポイント**: `program_usb_boot_mode=1` は USB ブートを有効にする設定だが、ネットワークブート（PXE）も同時に有効になるのか。Pi 4B ではそもそも OTP 設定が不要で EEPROM 設定で制御するのではないか（Pi 3B+ 以前と Pi 4B で仕組みが異なる可能性）
- **優先度**: 高

## 4. iSCSI vs NFS 比較表の正確性
- **記事内の記述**: 比較表（L44-51）で「CPU 使用率: iSCSI=低い / NFS=やや高い」「パフォーマンス: iSCSI=高速（特にランダム I/O）/ NFS=中程度」
- **検証ポイント**: iSCSI が NFS より CPU 使用率が低いという主張は正確か。一般的に iSCSI のプロトコル処理オーバーヘッドは NFS と比較してどうか。ランダム I/O での優位性は正しいか
- **優先度**: 中

## 5. dnsmasq Proxy DHCP 設定の正確性
- **記事内の記述**: `dhcp-range=tag:raspberrypi-pxe,192.168.0.100,proxy` / `port=0` で DNS 無効化 / `pxe-service=tag:raspberrypi-pxe,0,"Raspberry Pi Boot"` / `dhcp-reply-delay=2`（L208-246）
- **検証ポイント**: `dhcp-range` に `proxy` を指定する Proxy DHCP の書式が正しいか。`pxe-service` のタイプ `0` の意味。`dhcp-reply-delay=2` が Raspberry Pi 固有のバグ対策として本当に必要か。`dhcp-boot=,,192.168.0.100` の書式
- **優先度**: 中

## 6. PXE ブートシーケンスの正確性
- **記事内の記述**: シーケンス図（L124-140）で「TFTP: bootcode.bin 取得」→「TFTP: kernel8.img, initramfs 取得」
- **検証ポイント**: Pi 4B は `bootcode.bin` を TFTP から取得するのか。Pi 4B は SPI EEPROM に bootcode 相当の処理が含まれており、`bootcode.bin` は不要ではないか（Pi 3B+ 以前との違い）。`start4.elf` の読み込みステップが省略されていないか
- **優先度**: 高

## 7. `/etc/iscsi/iscsi.initramfs` の仕組み
- **記事内の記述**: 「`initramfs-tools` の hook スクリプト（`/usr/share/initramfs-tools/hooks/iscsi`）がこのファイルの存在をチェックし、存在する場合のみ iSCSI 関連のバイナリとモジュールを initramfs に組み込みます」（L357-358）
- **検証ポイント**: hook スクリプトのパスは `/usr/share/initramfs-tools/hooks/iscsi` で正しいか。open-iscsi パッケージが提供する hook の実際のファイル名と動作
- **優先度**: 中

## 8. `config.txt` の `auto_initramfs=1` の動作
- **記事内の記述**: 「`auto_initramfs=1` を指定することで、TFTP ディレクトリ内の initramfs を自動的にロードします」（L413）
- **検証ポイント**: `auto_initramfs=1` は Raspberry Pi のファームウェアが認識する正式なパラメータか。具体的にどのファイル名の initramfs を自動検出するのか。代替として `initramfs initrd.img-<version> followkernel` を明示する方法との違い
- **優先度**: 中

## 9. `cmdline.txt` の `ip=` パラメータ書式
- **記事内の記述**: `ip=::::raspberrypi-1:eth0:dhcp`（L430）
- **検証ポイント**: Linux カーネルの `ip=` パラメータの書式は `ip=<client-ip>:<server-ip>:<gw-ip>:<netmask>:<hostname>:<device>:<autoconf>` だが、記事の書式（4 つのコロン区切り空欄 + hostname:device:dhcp）はこの書式と一致しているか
- **優先度**: 中

## 10. `cmdline.txt` の `ISCSI_*` パラメータ
- **記事内の記述**: `ISCSI_INITIATOR`, `ISCSI_TARGET_IP`, `ISCSI_TARGET_PORT`, `ISCSI_TARGET_NAME`, `ISCSI_USERNAME`, `ISCSI_PASSWORD`（L430-431）
- **検証ポイント**: これらのパラメータは initramfs-tools の iSCSI スクリプトが認識する正式なパラメータ名か。大文字表記で正しいか
- **優先度**: 中

## 11. fstab の `_netdev` オプションの説明
- **記事内の記述**: 「このオプションを指定すると、ネットワークが利用可能になるまでマウントを待機します」（L471）
- **検証ポイント**: `_netdev` の正確な動作。「ネットワーク利用可能まで待機」は正確な説明か。実際には systemd がネットワーク依存のマウントとして扱い、`network-online.target` 後にマウントするという動作ではないか
- **優先度**: 低

## 12. `growpart` / `resize2fs` の手順
- **記事内の記述**: `sudo growpart /dev/sdc 2` → `sudo e2fsck -f /dev/sdc2` → `sudo resize2fs /dev/sdc2`（L316-318）
- **検証ポイント**: growpart のデバイス指定とパーティション番号の書式が正しいか（スペース区切り `growpart /dev/sdc 2`）。e2fsck を resize2fs の前に実行する必要があるか
- **優先度**: 低

## 13. Raspberry Pi 4B の PoE 対応状況
- **記事内の記述**: 「Raspberry Pi 4B は標準では PoE に対応していないため、別途 PoE HAT（拡張ボード）を各 Pi に装着する必要があります」（L577）
- **検証ポイント**: Pi 4B が標準で PoE 非対応で、PoE HAT が必要という記述は正確か
- **優先度**: 低

## 14. iSCSI 標準ポート 3260
- **記事内の記述**: 「iSCSI ポート（標準: 3260）」（L441）
- **検証ポイント**: iSCSI の標準ポートが 3260（IANA 割り当て）で正しいか
- **優先度**: 低

## 15. Pi 4B が起動時にシリアル番号ディレクトリを TFTP リクエストするという主張
- **記事内の記述**: 「Raspberry Pi 4B は起動時に自身のシリアル番号をディレクトリ名として TFTP サーバーにリクエストします」（L380）
- **検証ポイント**: Pi 4B の TFTP リクエストでシリアル番号ベースのディレクトリを使う動作は公式に文書化されているか。8 桁の 16 進数シリアル番号が使われるか
- **優先度**: 中

## 16. `update-initramfs -v -k $(uname -r) -c` の正確性
- **記事内の記述**: chroot 環境内で `update-initramfs -v -k $(uname -r) -c`（L363）
- **検証ポイント**: chroot 環境で `$(uname -r)` を使うとホスト側のカーネルバージョンが返る。chroot 先の Pi 用カーネルバージョンと一致しない可能性がある。正しくは `ls /lib/modules/` で確認して明示的に指定すべきではないか
- **優先度**: 高

## 17. NFS エクスポートオプション `no_root_squash,insecure`
- **記事内の記述**: docker-compose.yaml 内の NFS エクスポート設定（L184-186）
- **検証ポイント**: セキュリティ上の注意点として言及すべきか。`no_root_squash` はリモートの root ユーザーがサーバー上のファイルに root 権限でアクセスできるため、ホームネットワーク前提でも注意喚起があった方がよいか
- **優先度**: 低（セキュリティ観点であり事実関係ではない）
