# ファクトチェック結果: Alpha

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
検証日: 2026-03-11
担当: Alpha

## 検証結果

### 1. BOOT_ORDER の各桁の意味

- **判定**: 正確
- **記事中の記述**: 「`1` = SD カード、`2` = ネットワーク（PXE）、`4` = USB マスストレージ、`6` = NVMe、`f` = 再起動してリトライ」（317〜325 行目）
- **検証結果**: Raspberry Pi 公式ドキュメントの BOOT_ORDER セクションと一致する。BOOT_ORDER は 32bit unsigned integer で、各ニブル（4bit = 16 進 1 桁）がブートモードを表し、最下位ニブルから順に試行される。値 `1` = SD card、`2` = Network (PXE)、`4` = USB mass storage device (USB-MSD)、`6` = NVMe、`f` = restart (loop back to first entry) であり、記事の記述は正確である。`0xf21` の説明（右から 1→2→f の順に試行）も正しい。
- **ソース**: [Raspberry Pi Documentation - BOOT_ORDER](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#BOOT_ORDER)

### 2. Pi 4B の bootcode.bin は EEPROM 内に組み込まれている

- **判定**: 正確
- **記事中の記述**: 「Pi 4B では bootcode.bin は EEPROM 内に組み込まれているため、TFTP からのダウンロードは発生しません」（180 行目、脚注 `[^boot-sequence]`）
- **検証結果**: Raspberry Pi 公式ドキュメントによると、Pi 4 以降ではセカンドステージブートローダーが SPI flash EEPROM からロードされ、従来の `bootcode.bin` ファイルは不要となった。正確には SoC 内 ROM が EEPROM 上のブートローダーコード（bootcode.bin 相当）をロードし、その後 `start4.elf` を TFTP 等から取得する。「EEPROM 内に組み込まれている」という表現は技術的に正確であり、TFTP からの `bootcode.bin` ダウンロードが発生しないという記述も正しい。
- **ソース**: [Raspberry Pi Documentation - Raspberry Pi hardware](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html)

### 5. Bullseye 2022 年 4 月アップデート以降のデフォルト pi ユーザー削除

- **判定**: 正確（ただし表現に若干の補足余地あり）
- **記事中の記述**: 「Bullseye（2022 年 4 月アップデート）以降はデフォルトの pi ユーザーが存在しない」（410 行目）
- **検証結果**: Raspberry Pi 公式ブログ（2022 年 4 月）にて、Bullseye の 2022-04-04 リリース以降、デフォルトの `pi` ユーザーが事前作成されなくなったことが確認された。初回起動時にユーザー作成ウィザードが表示され、ユーザー名とパスワードの設定が必須となった。`pi` というユーザー名を選ぶことは可能だが、自動では作成されない。記事の「デフォルトの pi ユーザーが存在しない」という記述は正確である。記事ではこの後 `useradd -m -G sudo -s /bin/bash pi` で手動作成しており、文脈としても適切。
- **ソース**: [An update to Raspberry Pi OS Bullseye - Raspberry Pi](https://www.raspberrypi.com/news/raspberry-pi-bullseye-update-april-2022/)

### 6. auto_initramfs の動作と命名規則

- **判定**: 正確
- **記事中の記述**: 「`auto_initramfs=1` を指定…ファームウェアはカーネルファイル名から対応する initramfs ファイル名を自動推定します（例: `kernel8.img` → `initramfs8`）」（476 行目）
- **検証結果**: Raspberry Pi 公式 config.txt ドキュメントにより確認。`auto_initramfs=1` を指定すると、ファームウェアはカーネルファイル名のプレフィックス `kernel` を `initramfs` に置換し、拡張子 `.img` を除去してファイル名を推定する。例: `kernel8.img` → `initramfs8`。記事の記述は公式ドキュメントと完全に一致する。
- **ソース**: [Raspberry Pi Documentation - config.txt](https://www.raspberrypi.com/documentation/computers/config_txt.html)

### 10. ip= カーネルパラメータのフォーマット

- **判定**: 正確
- **記事中の記述**: `ip=::::pi-1:eth0:dhcp`（495 行目）
- **検証結果**: Linux カーネルドキュメント nfsroot.rst によると、`ip=` パラメータのフォーマットは `ip=<client-ip>:<server-ip>:<gw-ip>:<netmask>:<hostname>:<device>:<autoconf>` である。記事の `ip=::::pi-1:eth0:dhcp` は次のように解釈される:
  - `client-ip`: 空（DHCP に委任）
  - `server-ip`: 空
  - `gw-ip`: 空
  - `netmask`: 空
  - `hostname`: `pi-1`
  - `device`: `eth0`
  - `autoconf`: `dhcp`

  フィールドの順序・数ともに Linux カーネルドキュメントの仕様と一致する。空フィールド 4 つの後にホスト名・デバイス・自動設定が続く構造は正しい。
- **ソース**: [Mounting the root filesystem via NFS (nfsroot) - The Linux Kernel documentation](https://docs.kernel.org/admin-guide/nfs/nfsroot.html)

## サマリー

- 正確: 5 件
- 不正確: 0 件
- 要確認: 0 件

Alpha 担当の 5 項目はすべて正確と判定された。記事の技術的記述は公式ドキュメントおよび Linux カーネルドキュメントと整合している。
