# ファクトチェック結果（項目 7-12）

検証者: verifier-bravo
検証日: 2026-03-04

---

## 7. `/etc/iscsi/iscsi.initramfs` の仕組み

- **記事の主張**: 「`initramfs-tools` の hook スクリプト（`/usr/share/initramfs-tools/hooks/iscsi`）がこのファイルの存在をチェックし、存在する場合のみ iSCSI 関連のバイナリとモジュールを initramfs に組み込みます」
- **判定**: 要修正
- **検証結果**:
  - `/etc/iscsi/iscsi.initramfs` が iSCSI ブートの制御に使われるのは正しい（Debian README.Debian に記載）
  - しかし、**現行の Debian open-iscsi パッケージでは、`iscsi.initramfs` の有無に関わらず iSCSI バイナリは initramfs に組み込まれる**。カーネルパラメータでも iSCSI 設定を指定できるため、バイナリは常に含まれる仕様となっている
  - バイナリを除外したい場合は `/etc/initramfs-tools/conf.d/open-iscsi` に `NO_ISCSI_IN_INITRAMFS=yes` を書く
  - `iscsi.initramfs` ファイルの役割は、設定変数（`ISCSI_INITIATOR`, `ISCSI_TARGET_NAME` 等）を格納するか、`ISCSI_AUTO=true` を書いて自動接続を有効にすること
  - hook スクリプトのパスについては、open-iscsi パッケージが `/usr/share/initramfs-tools/hooks/` 配下にスクリプトを配置する点は正しいが、「存在する場合のみ組み込む」という説明が不正確
- **ソースURL**:
  - https://github.com/vishvananda/open-iscsi/blob/master/debian/README.Debian
  - http://metadata.ftp-master.debian.org/changelogs/main/o/open-iscsi/oldstable_README.Debian
- **修正案**: 「`iscsi.initramfs` ファイルは iSCSI の設定変数を格納する場所であり、このファイルに `ISCSI_AUTO=true` と記述するか、接続先情報を記述することで、initramfs 起動時に自動的に iSCSI Target に接続します。なお、現行の open-iscsi パッケージでは iSCSI バイナリはこのファイルの有無に関わらず initramfs に組み込まれます」

---

## 8. `config.txt` の `auto_initramfs=1` の動作

- **記事の主張**: 「`auto_initramfs=1` を指定することで、TFTP ディレクトリ内の initramfs を自動的にロードします」
- **判定**: 補足推奨
- **検証結果**:
  - `auto_initramfs=1` は Raspberry Pi ファームウェアが認識する正式なパラメータであり、記述は正確
  - ただし「自動的にロードします」だけでは命名規則が伝わらない。実際には **カーネルファイル名の `kernel` プレフィックスを `initramfs` に置換し、拡張子を除去した名前のファイルを自動検出する**。例: `kernel8.img` → `initramfs8`（拡張子なし）
  - カスタムカーネル名を使う場合、`kernel` と `initramfs` のプレフィックスで始まり、それ以外が一致する必要がある。一致しない場合は明示的な `initramfs` 指定が必要
- **ソースURL**:
  - https://www.raspberrypi.com/documentation/computers/config_txt.html
  - https://github.com/raspberrypi/documentation/blob/master/documentation/asciidoc/computers/config_txt/boot.adoc
- **修正案**: 現行の記述に「ファームウェアはカーネルファイル名から対応する initramfs ファイル名を自動推定します（例: `kernel8.img` → `initramfs8`）」のような補足を追加

---

## 9. `cmdline.txt` の `ip=` パラメータ書式

- **記事の主張**: `ip=::::raspberrypi-1:eth0:dhcp`
- **判定**: 正確
- **検証結果**:
  - Linux カーネルの `ip=` パラメータ書式は `ip=<client-ip>:<server-ip>:<gw-ip>:<netmask>:<hostname>:<device>:<autoconf>`
  - 記事の `ip=::::raspberrypi-1:eth0:dhcp` は、client-ip・server-ip・gw-ip・netmask を空欄（DHCP で取得）、hostname=`raspberrypi-1`、device=`eth0`、autoconf=`dhcp` として正しい書式
  - コロン4つ（`::::`）で先頭4フィールドを空にしているのは正しい使い方
- **ソースURL**:
  - https://docs.kernel.org/admin-guide/nfs/nfsroot.html
  - https://www.kernel.org/doc/Documentation/filesystems/nfs/nfsroot.txt

---

## 10. `cmdline.txt` の `ISCSI_*` パラメータ

- **記事の主張**: cmdline.txt に `ISCSI_INITIATOR=...`, `ISCSI_TARGET_IP=...`, `ISCSI_TARGET_PORT=...`, `ISCSI_TARGET_NAME=...`, `ISCSI_USERNAME=...`, `ISCSI_PASSWORD=...` を大文字で記述
- **判定**: 要修正（大文字/小文字の問題）
- **検証結果**:
  - open-iscsi の initramfs スクリプト（`extra/initramfs.local-top`）の `parse_iscsi_ops()` 関数は、`/proc/cmdline` から **小文字**のパラメータ名（`iscsi_initiator=`, `iscsi_target_name=` 等）をパースする
  - パース後にシェル変数として大文字（`ISCSI_INITIATOR` 等）に格納される
  - `/etc/iscsi/iscsi.initramfs` ファイル内では大文字変数名を使うのが正しい
  - **カーネル cmdline では小文字が正式**。記事では大文字で書かれているが、これは `parse_iscsi_ops` のパース処理と一致しない可能性がある
  - ただし記事筆者が実際に動作確認した構成であれば、使用している Debian/Raspberry Pi OS バージョン固有の実装で大文字も認識される可能性はある
  - パラメータ名自体（INITIATOR, TARGET_IP, TARGET_PORT, TARGET_NAME, USERNAME, PASSWORD）は全て正しい
- **ソースURL**:
  - https://github.com/vishvananda/open-iscsi/blob/master/extra/initramfs.local-top
  - https://github.com/vishvananda/open-iscsi/blob/master/debian/README.Debian
- **修正案**: カーネル cmdline のパラメータを小文字に変更: `iscsi_initiator=...`, `iscsi_target_ip=...`, `iscsi_target_port=...`, `iscsi_target_name=...`, `iscsi_username=...`, `iscsi_password=...`。または、筆者の環境で大文字で動作することが確認済みならその旨を注記

---

## 11. fstab の `_netdev` オプションの説明

- **記事の主張**: 「このオプションを指定すると、ネットワークが利用可能になるまでマウントを待機します」
- **判定**: 補足推奨
- **検証結果**:
  - `_netdev` の動作説明として大筋は正しい。ネットワークが利用可能になった後にマウントが実行されるという点は正確
  - より正確には、systemd 環境では `_netdev` が指定されたマウントユニットは `remote-fs.target` に割り当てられ、ネットワークオンライン後にマウントされる（`_netdev` なしのローカルマウントは `local-fs.target` に割り当て）
  - **iSCSI のようなネットワークブロックデバイスでは `_netdev` が特に重要**。NFS/CIFS 等のネットワークファイルシステムは systemd が自動認識するが、iSCSI はブロックデバイスとして見えるため、`_netdev` がないとローカルデバイスとして扱われ起動時にハングする可能性がある
  - 「待機します」よりは「ネットワークが利用可能になった後にマウントを実行するよう systemd に指示します」が正確
- **ソースURL**:
  - http://codingberg.com/linux/systemd_when_to_use_netdev_mount_option
  - https://wiki.archlinux.org/title/Fstab

---

## 12. `growpart` / `resize2fs` の手順

- **記事の主張**: `sudo growpart /dev/sdc 2` → `sudo e2fsck -f /dev/sdc2` → `sudo resize2fs /dev/sdc2`
- **判定**: 正確
- **検証結果**:
  - `growpart` の書式は `growpart DISK PARTITION-NUMBER`（スペース区切り）であり、`growpart /dev/sdc 2` は正しい
  - `e2fsck -f` を `resize2fs` の前に実行するのは正しい手順。`resize2fs` はオフラインリサイズ時にファイルシステムの整合性を要求し、不整合があると「Please run 'e2fsck -f' first」エラーで中断する。`-f` フラグはクリーンなファイルシステムでも強制チェックを行う
  - `growpart` でパーティションテーブルを拡張 → `e2fsck` で整合性確認 → `resize2fs` でファイルシステム拡張、という3段階の手順は標準的かつ正しい
- **ソースURL**:
  - https://manpages.ubuntu.com/manpages/xenial/en/man1/growpart.1.html
  - https://access.redhat.com/articles/1196353
  - https://linux.die.net/man/8/resize2fs
