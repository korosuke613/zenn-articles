# ファクトチェック結果（項目 13-17）

検証者: verifier-charlie
検証日: 2026-03-04

---

## 13. Raspberry Pi 4B の PoE 対応状況

- **記事の記述**: 「Raspberry Pi 4B は標準では PoE に対応していないため、別途 PoE HAT（拡張ボード）を各 Pi に装着する必要があります」（L577）
- **判定**: 正確
- **検証結果**: Raspberry Pi 4B は基板上に 4 ピン PoE ヘッダ（J14）を備えているが、PoE 受電に必要な電力変換回路は搭載されていない。PoE で給電するには公式 PoE HAT または PoE+ HAT を装着する必要がある。PoE HAT が Ethernet ジャックの未使用接点を経由して受電し、5V に変換して Pi に供給する仕組み。記事の記述は正確である。
- **ソースURL**:
  - https://www.raspberrypi.com/products/poe-hat/
  - https://www.raspberrypi.com/products/raspberry-pi-4-model-b/specifications/
  - https://community.element14.com/products/raspberry-pi/w/documents/4317/raspberry-pi-4-model-b-default-gpio-pinout-with-poe-header
- **修正案**: なし

---

## 14. iSCSI 標準ポート 3260

- **記事の記述**: 「iSCSI ポート（標準: 3260）」（L441）
- **判定**: 正確
- **検証結果**: IANA が iSCSI に割り当てたポート番号は TCP 3260 である。RFC 7143（iSCSI プロトコル仕様）でもデフォルトポートとして 3260 が規定されている。なお TCP 860 も iSCSI システムポートとして IANA に登録されているが、デフォルトとして使用してはならず、明示的に指定した場合のみ使用可能。記事が 3260 を「標準」と記述しているのは完全に正確。
- **ソースURL**:
  - https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?page=62
  - https://kb.netapp.com/on-prem/ontap/ontap-select/Select-KBs/What_s_the_default_port_for_iSCSI
  - https://whatportis.com/ports/3260_iscsi-target
- **修正案**: なし

---

## 15. Pi 4B が起動時にシリアル番号ディレクトリを TFTP リクエストするという主張

- **記事の記述**: 「Raspberry Pi 4B は起動時に自身のシリアル番号をディレクトリ名として TFTP サーバーにリクエストします」（L380）
- **判定**: 正確
- **検証結果**: Raspberry Pi 公式ドキュメントにおいて、ネットワークブート時にブートローダーが `<serial_number>/start4.elf` のようにシリアル番号をプレフィックスとして TFTP リクエストを行うことが明記されている。Pi 4 以降では `TFTP_PREFIX` EEPROM 設定でプレフィックスをシリアル番号（デフォルト）、MAC アドレス、固定値のいずれかにカスタマイズ可能。デフォルトがシリアル番号であるため、記事の記述は正確。シリアル番号ディレクトリが見つからない場合は TFTP ルートディレクトリにフォールバックする動作も確認済み。
- **ソースURL**:
  - https://www.raspberrypi.com/documentation/computers/raspberry-pi.html
  - https://github.com/raspberrypi/rpi-eeprom/issues/563
  - https://forums.raspberrypi.com/viewtopic.php?t=388463
- **修正案**: なし（補足として「デフォルト設定ではシリアル番号だが EEPROM 設定で変更可能」と追記すると親切だが、必須ではない）

---

## 16. `update-initramfs -v -k $(uname -r) -c` の正確性（chroot 内での uname -r 問題）

- **記事の記述**: chroot 環境内で `update-initramfs -v -k $(uname -r) -c`（L363）
- **判定**: 要修正（高優先度）
- **検証結果**: **これは実用上の重大な問題を含む。** `uname -r` はカーネルシステムコール `uname(2)` を使用しており、chroot 内であってもホスト側（作業マシン）のカーネルバージョンを返す。chroot はファイルシステムのルートを変更するだけであり、カーネルは共有されるため、`uname -r` の出力は変わらない。

  例えば、ホストが x86_64 Ubuntu で `6.8.0-xxx-generic` を返す場合、chroot 内の Raspberry Pi OS のカーネル `6.6.x-rpi-v8` とは一致しない。結果として `update-initramfs` は存在しないカーネルバージョンの initramfs を生成しようとしてエラーになるか、誤ったバージョンの initramfs を生成する。

  Debian 公式の update-initramfs man ページでも `-k` に渡すバージョンは明示的に指定することが推奨されている。
- **ソースURL**:
  - https://manpages.debian.org/bookworm/initramfs-tools/update-initramfs.8.en.html
  - https://forums.debian.net/viewtopic.php?t=143279
  - https://forums.raspberrypi.com/viewtopic.php?t=375969
- **修正案**: 次のように修正すべき:

  ```bash
  # chroot 内のカーネルバージョンを確認
  KERNEL_VERSION=$(ls /lib/modules/)
  # initramfs を再生成
  update-initramfs -v -k "$KERNEL_VERSION" -c
  ```

  または、`/lib/modules/` 内に複数バージョンがある場合を考慮して:

  ```bash
  # chroot 内で利用可能なカーネルバージョンを確認
  ls /lib/modules/
  # 対象バージョンを明示的に指定
  update-initramfs -v -k 6.6.xx+rpt-rpi-v8 -c
  ```

  記事内に「`$(uname -r)` は chroot 内ではホスト側のカーネルバージョンを返すため、`/lib/modules/` 配下のディレクトリ名で確認したバージョンを明示的に指定してください」という注意書きを追加することを強く推奨。

---

## 17. NFS エクスポートオプション `no_root_squash,insecure`

- **記事の記述**: docker-compose.yaml 内の NFS エクスポート設定（L184-186）
- **判定**: 補足推奨（事実関係は正確）
- **検証結果**: `no_root_squash` と `insecure` は正式な NFS エクスポートオプションであり、技術的には正確。ただし両オプションにはセキュリティ上の意味合いがある:

  - **`no_root_squash`**: リモートの root ユーザーがサーバー上のファイルに root 権限でアクセスできる。デフォルトの `root_squash` では root アクセスが `nobody`/`nfsnobody` にマッピングされ権限が制限される。Red Hat のセキュリティガイドでは「`no_root_squash` を使用するな」と明記。PXE ブートのルートファイルシステム提供には `no_root_squash` が事実上必要であるため、用途上は妥当。
  - **`insecure`**: 1024 未満の特権ポートからのリクエストに限定しない。一部クライアント（Docker コンテナ内の NFS サーバー等）では必要になる場合がある。

  記事のユースケース（ホームネットワーク内での PXE ブート用 TFTP/NFS 提供）では `no_root_squash` は技術的に必要であり、`insecure` も Docker コンテナ内での運用を考慮すると妥当。ただし、セキュリティ上のリスクを読者に明示する注意書きがあると親切。
- **ソースURL**:
  - https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/security_guide/sect-security_guide-securing_nfs-do_not_use_the_no_root_squash_option
  - https://man7.org/linux/man-pages/man5/exports.5.html
  - https://linux.die.net/man/5/exports
- **修正案**: 記事内の NFS 設定付近に次のような注意書きを追加することを推奨:

  > `no_root_squash` はリモートの root ユーザーにサーバー上のファイルへの root 権限アクセスを許可します。PXE ブートの root ファイルシステム提供には必要ですが、信頼できるネットワーク内でのみ使用してください。

---

## サマリー

| 項目 | 判定 | 優先度 |
|------|------|--------|
| 13. Pi 4B PoE 対応状況 | 正確 | - |
| 14. iSCSI 標準ポート 3260 | 正確 | - |
| 15. TFTP シリアル番号ディレクトリ | 正確 | - |
| 16. `update-initramfs` の `$(uname -r)` | **要修正** | **高** |
| 17. NFS `no_root_squash,insecure` | 補足推奨 | 低 |
