# ファクトチェック結果: alpha

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
検証日: 2026-03-05
担当: alpha

## 検証結果

### 1. Pi 4B の EEPROM ブートローダーと Pi 3B 以前の OTP の違い
- **判定**: 正確
- **記事中の記述**: 「Pi 4B は EEPROM、Pi 3B 以前は OTP」
- **検証結果**: Pi 4B は 512KB の SPI EEPROM にブートローダーを格納しており、何度でも設定変更が可能。Pi 2B v1.2/v1.3、3A+、3B、CM3/CM3+ では USB ホストブートや PXE ブートの有効化に OTP（One-Time Programmable）メモリへの書き込みが必要であり、一度設定すると工場出荷状態に戻せない。記事の記述は正確。
- **ソース**: [Raspberry Pi Documentation - Raspberry Pi hardware](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html), [rpi-eeprom GitHub](https://github.com/raspberrypi/rpi-eeprom)

### 2. BOOT_ORDER の各桁の値
- **判定**: 正確
- **記事中の記述**: 1=SD, 2=ネットワーク, 4=USB マスストレージ, 6=NVMe, f=再起動してリトライ
- **検証結果**: Raspberry Pi 公式ドキュメントに基づく BOOT_ORDER の各桁の意味は次の通り:
  - `0x1`: SD カード（SD card / eMMC on CM4）
  - `0x2`: ネットワーク（Network boot）
  - `0x3`: RPIBOOT
  - `0x4`: USB マスストレージ（USB-MSD）
  - `0x5`: BCM-USB-MSD
  - `0x6`: NVMe
  - `0xe`: STOP（エラーパターン表示）
  - `0xf`: RESTART（リトライ）
  記事に記載された 1, 2, 4, 6, f の値はすべて正確。
- **ソース**: [Raspberry Pi Documentation - Raspberry Pi hardware](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html)

### 3. bootcode.bin が EEPROM 内に組み込まれている（Pi 4B）
- **判定**: 正確
- **記事中の記述**: 「Pi 4B では bootcode.bin は EEPROM 内に組み込まれているため、TFTP からのダウンロードは発生しません」
- **検証結果**: Pi 4B 以降では、第 2 ステージブートローダーが SPI フラッシュ EEPROM から読み込まれるため、従来の bootcode.bin ファイルは不要。ネットワークブート時も TFTP で bootcode.bin をダウンロードする必要はない。Pi 3B 以前のモデルでは SD カードまたは TFTP から bootcode.bin を取得する必要があった。記事の記述は正確。
- **ソース**: [Cardless Raspberry Pi 4](https://metebalci.com/blog/cardless-rpi4/), [Raspberry Pi Forums - Network Boot for the 4B](https://forums.raspberrypi.com/viewtopic.php?t=275911)

### 4. Docker Compose の version: "3.8" 構文
- **判定**: 要確認
- **記事中の記述**: docker-compose.yaml に `version: "3.8"` を記述
- **検証結果**: Docker Compose v2 以降、`version` フィールドは **obsolete（廃止）** となっている。Compose v2 はこのフィールドを無視し、Compose Specification に基づいてファイルを解釈する。現在の Docker Compose では `version` を指定すると「the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion」という警告が出る。記述自体が「不正確」というわけではなく（`version: "3.8"` は有効な構文として無視される）、動作には影響しないが、現在のベストプラクティスとしては `version` フィールドの削除が推奨される。
- **ソース**: [Docker Docs - Legacy versions](https://docs.docker.com/reference/compose-file/legacy-versions/), [Docker Community Forums - version is obsolete](https://forums.docker.com/t/docker-compose-yml-version-is-obsolete/141313)
- **修正案**: `version: "3.8"` の行を削除するか、「`version` フィールドは Docker Compose v2 以降では不要（無視される）」旨の注釈を追加することを推奨。

### 5. strm/dnsmasq:latest Docker イメージの存在
- **判定**: 正確（ただし注意あり）
- **記事中の記述**: `image: strm/dnsmasq:latest`
- **検証結果**: Docker Hub に `strm/dnsmasq` イメージは存在する（500 万以上のプル）。ただし、最終更新が **約 6 年前** であり、ベースイメージは Alpine 3.11（サポート終了済み）。セキュリティ上のリスクがある。記事が実際に使用したイメージとしての記述は正確だが、長期運用には注意が必要。
- **ソース**: [Docker Hub - strm/dnsmasq](https://hub.docker.com/r/strm/dnsmasq), [GitHub - strm-containers/docker-dnsmasq](https://github.com/strm-containers/docker-dnsmasq)

### 6. erichough/nfs-server:2.2.1 Docker イメージの存在
- **判定**: 正確
- **記事中の記述**: `image: erichough/nfs-server:2.2.1`
- **検証結果**: Docker Hub に `erichough/nfs-server` イメージのバージョン `2.2.1` が存在することを確認。レイヤー詳細も Docker Hub 上で確認可能。GitHub リポジトリ（ehough/docker-nfs-server）でもメンテナンスされている。
- **ソース**: [Docker Hub - erichough/nfs-server:2.2.1](https://hub.docker.com/layers/erichough/nfs-server/2.2.1/images/sha256-1efd4ece380c5ba27479417585224ef857006daa46ab84560a28c1224bc71e9e), [GitHub - ehough/docker-nfs-server](https://github.com/ehough/docker-nfs-server)

## サマリー
- 正確: 5 件（項目 1, 2, 3, 5, 6）
- 不正確: 0 件
- 要確認: 1 件（項目 4: Docker Compose version フィールドの廃止）
