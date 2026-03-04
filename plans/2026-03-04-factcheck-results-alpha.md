# ファクトチェック結果（項目 1-6）

検証者: verifier-alpha
検証日: 2026-03-04

---

## 1. OTP ビットの値 `3020000a`

- **判定**: 正確（ただし Pi 4B への適用に重大な問題あり → 項目 3 参照）
- **検証結果**: OTP レジスタ 17 の値 `0x3020000a` は、USB ブートモードが有効にプログラムされたことを示す正しい値である。`vcgencmd otp_dump | grep 17:` で確認でき、`17:3020000a` が返れば OTP が正しく書き込まれている。この値自体は Raspberry Pi 公式ドキュメントおよびフォーラムで広く確認されている。
- **ソース URL**:
  - https://www.raspberrypi.org/documentation//hardware/raspberrypi/otpbits.md
  - https://www.raspberrypi.org/documentation//hardware/raspberrypi/bootmodes/msd.md
  - https://forums.raspberrypi.com/viewtopic.php?t=216945
- **補足**: Pi 3B+ は工場出荷時にこの OTP ビットが既に設定済み（`program_usb_boot_mode=1` の実行不要）。Pi 3B 以前では手動設定が必要。Pi 4B については項目 3 を参照。

---

## 2. OTP ビットの不可逆性と SD カードフォールバック動作

- **判定**: 正確
- **検証結果**:
  - **不可逆性**: OTP は One-Time Programmable であり、SoC 内部のヒューズを焼き切る仕組み。ソフトウェアで元に戻すことはできない。記事の説明は正確。
  - **SD カードフォールバック**: OTP ビット設定後もブート優先順位は「SD カード → USB → ネットワーク」の順。SD カードが挿入されていれば従来通り SD カードから起動し、見つからない場合にフォールバックする。記事の説明は正確。
- **ソース URL**:
  - https://forums.raspberrypi.com/viewtopic.php?t=306168
  - https://www.raspberrypi.org/documentation//hardware/raspberrypi/bootmodes/msd.md

---

## 3. `program_usb_boot_mode=1` でネットワークブートが有効になるという主張

- **判定**: 要修正（重要）
- **検証結果**:
  記事は Pi 4B のセットアップ手順として `program_usb_boot_mode=1` による OTP 設定を説明しているが、**Pi 4B ではこの手順は不要かつ不適切**である。

  **Pi 3B / Pi 3B 以前**: OTP ビットによるブートモード制御。`program_usb_boot_mode=1` で OTP レジスタ 17 に書き込み、USB/ネットワークブートを有効化する。不可逆。

  **Pi 3B+**: 工場出荷時に OTP ビット設定済み。`program_usb_boot_mode=1` の実行不要。

  **Pi 4B**: OTP ではなく **SPI EEPROM のブートローダー** でブート順序を制御する。`program_usb_boot_mode=1` は Pi 4B では使用しない。代わりに以下の手順:
  1. `sudo raspi-config` → Advanced Options → Boot Order でネットワークブートを有効化
  2. または `sudo -E rpi-eeprom-config --edit` で `BOOT_ORDER` を編集（例: `BOOT_ORDER=0xf21` で SD → ネットワークの順）

  Pi 4B は EEPROM ベースなので設定は可逆（再度変更可能）。OTP のような不可逆性はない。

- **ソース URL**:
  - https://www.raspberrypi.com/documentation/computers/raspberry-pi.html（公式ドキュメント）
  - https://github.com/raspberrypi/documentation/blob/master/documentation/asciidoc/computers/raspberry-pi/boot-eeprom.adoc
  - https://hackaday.com/2019/11/11/network-booting-the-pi-4/
  - https://metebalci.com/blog/cardless-rpi4/

- **修正案**:
  記事の「1. OTP ビットの有効化」セクション全体を Pi 4B 向けに書き換える必要がある:
  - `program_usb_boot_mode=1` の手順を削除
  - EEPROM の `BOOT_ORDER` 設定手順に置き換え
  - OTP の不可逆性に関する注釈を削除または「Pi 3B 以前の場合」として分離
  - `vcgencmd otp_dump | grep 17:` の確認手順も Pi 3B 以前専用と明記

---

## 4. iSCSI vs NFS 比較表の正確性

- **判定**: 要修正（CPU 使用率の記述）
- **検証結果**:
  - **「パフォーマンス: iSCSI=高速（特にランダム I/O）/ NFS=中程度」**: 概ね正確。複数のベンチマーク結果で iSCSI がランダム I/O で NFS を大幅に上回ることが確認されている（4K ランダムリードで約 80%、4K ランダムライトで約 91% の優位性）。
  - **「CPU 使用率: iSCSI=低い / NFS=やや高い」**: **不正確**。実際には逆の傾向がある。iSCSI はブロックレベルプロトコルであり、プロトコル処理のオーバーヘッド（各コマンドの処理、IOPS に比例する CPU 負荷）により、クライアント側の CPU 使用率は NFS と同等かそれ以上になる場合がある。NFS はファイルレベルプロトコルで、クライアント側キャッシュの恩恵を受けやすい。

  ただし、Raspberry Pi のような低スペック環境では NFS のメタデータ処理オーバーヘッドが相対的に大きくなる可能性もあり、一概には言えない。

- **ソース URL**:
  - https://lass.cs.umass.edu/papers/pdf/FAST04.pdf（UMass の NFS vs iSCSI 性能比較論文）
  - https://www.starwindsoftware.com/blog/hyper-v/whos-got-bigger-balls-testing-nfs-vs-iscsi-performance-part-3-test-results/
  - https://storware.eu/blog/nfs-vs-iscsi/

- **修正案**:
  比較表の CPU 使用率行を以下のように変更:
  - 「CPU 使用率 | 環境依存 | 環境依存」
  - または行自体を削除し、本文で「CPU 使用率は環境やワークロードにより異なる」と注記

---

## 5. dnsmasq Proxy DHCP 設定の正確性

- **判定**: 概ね正確（pxe-service の type 0 に要注意）
- **検証結果**:
  - **`dhcp-range=tag:raspberrypi-pxe,192.168.0.100,proxy`**: 正しい。dnsmasq で Proxy DHCP モードを有効にする正規の書式。タグマッチングで特定クライアントにのみ Proxy DHCP を提供する設定。
  - **`port=0`**: 正しい。DNS 機能を無効化する正規のオプション。
  - **`dhcp-reply-delay=2`**: 正しい。Raspberry Pi の PXE クライアント（特に Pi 3 系）にはファームウェアのバグがあり、DHCP 応答を即座に受け取るとブートループに陥る問題がある。2 秒の遅延はこの問題の公知のワークアラウンドである。記事の説明（「既存ルーターの DHCP 応答と競合しないよう」）はやや不正確で、正確にはファームウェアバグの回避策。
  - **`pxe-service=tag:raspberrypi-pxe,0,"Raspberry Pi Boot"`**: **要注意**。dnsmasq のマニュアルによると、pxe-service の type 0 は「ネットブートを中止しローカルメディアから起動」を意味する。記事のコメント「ラズパイの bootcode.bin に認識させるための設定」とあるが、type 0 はネットブートの中止シグナルである。ただし、Raspberry Pi の PXE 実装は標準的な PXE とは異なる挙動をする可能性があり、実際に動作しているならば Pi 固有の実装の問題かもしれない。
  - **`dhcp-boot=,,192.168.0.100`**: 正しい書式。ファイル名とサーバー名を空にし、TFTP サーバーの IP アドレスのみを指定する形式。

- **ソース URL**:
  - https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html
  - https://github.com/raspberrypi/firmware/issues/934
  - https://lists.thekelleys.org.uk/pipermail/dnsmasq-discuss/2017q1/011353.html
  - https://docs.fogproject.org/en/latest/installation/network-setup/proxy-dhcp/

- **修正案**:
  - `dhcp-reply-delay=2` の説明を「Raspberry Pi の PXE クライアントのファームウェアバグ回避策として 2 秒の遅延を設定」に修正
  - `pxe-service` の type 0 のコメントを修正するか、実際の動作に基づいた説明に更新。もし Pi が type 0 を無視して TFTP ブートを続行する実装ならばその旨を注記

---

## 6. PXE ブートシーケンスの正確性（bootcode.bin の扱い）

- **判定**: 不正確（重要）
- **検証結果**:
  記事のシーケンス図（L134）に「4. TFTP: bootcode.bin 取得」とあるが、**Pi 4B は TFTP から bootcode.bin を取得しない**。

  **Pi 4B のブートシーケンス**:
  1. SoC 内蔵の第 1 段ブートローダーが起動
  2. SPI EEPROM 上の第 2 段ブートローダー（bootcode.bin 相当）がロードされる
  3. EEPROM ブートローダーが DHCP で IP を取得
  4. EEPROM ブートローダーが TFTP で `start4.elf`（VideoCore ファームウェア）、`config.txt`、`kernel8.img`、initramfs 等を取得
  5. カーネル起動

  つまり `bootcode.bin` は EEPROM に内蔵されており、TFTP からのダウンロードは発生しない。また、`start4.elf`（および `fixup4.dat`）の取得ステップがシーケンス図から欠落している。

  **Pi 3B / Pi 3B+ の場合**: こちらは SD カード上（または GPU ROM 内）の bootcode.bin が使われるが、TFTP から bootcode.bin をダウンロードするのは Pi 2B + bootcode.bin on TFTP の特殊ケースのみ。

- **ソース URL**:
  - https://github.com/raspberrypi/documentation/blob/master/documentation/asciidoc/computers/raspberry-pi/boot-net.adoc
  - https://hackaday.com/2019/11/11/network-booting-the-pi-4/
  - https://metebalci.com/blog/cardless-rpi4/
  - https://brennan.io/2019/12/04/rpi4b-netboot/

- **修正案**:
  シーケンス図を Pi 4B の実際のブートシーケンスに修正:
  ```
  Pi->>Router: 1. DHCP Discover
  Router-->>Pi: 2. DHCP Offer (IP 割り当て)
  dnsmasq-->>Pi: 3. Proxy DHCP (TFTP サーバー情報)
  Note over Pi: 4. EEPROM ブートローダーが TFTP リクエスト開始
  Pi->>dnsmasq: 5. TFTP: start4.elf, config.txt 取得
  Pi->>dnsmasq: 6. TFTP: kernel8.img, initramfs 取得
  Note over Pi: 7. カーネル起動 (initramfs 内の iSCSI Initiator)
  Pi->>iSCSI: 8. iSCSI Login (CHAP 認証)
  iSCSI-->>Pi: 9. LUN 接続 (ブロックデバイス)
  Note over Pi: 10. root fs マウント → システム起動
  ```
  本文の「TFTP でカーネルと initramfs を取得した後」の前に「EEPROM ブートローダーが start4.elf 等のファームウェアを TFTP で取得し」を追加。

---

## 総括

| 項目 | 判定 | 重要度 |
|------|------|--------|
| 1. OTP 値 `3020000a` | 正確（値自体は正しい） | - |
| 2. OTP 不可逆性・フォールバック | 正確 | - |
| 3. `program_usb_boot_mode=1` for Pi 4B | **不正確**（Pi 4B は EEPROM 方式） | **高** |
| 4. iSCSI vs NFS 比較表 | 要修正（CPU 使用率が不正確） | 中 |
| 5. dnsmasq Proxy DHCP 設定 | 概ね正確（説明文の微修正推奨） | 低 |
| 6. ブートシーケンス（bootcode.bin） | **不正確**（Pi 4B は EEPROM 内蔵） | **高** |

最重要の修正点は **項目 3**（Pi 4B の OTP vs EEPROM の混同）と **項目 6**（bootcode.bin の TFTP 取得は Pi 4B では発生しない）である。これらは記事の技術的正確性に直接影響する。
