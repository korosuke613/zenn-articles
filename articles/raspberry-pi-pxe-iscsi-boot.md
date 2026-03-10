---
title: "Raspberry Pi 4B を SD カード不要で運用する 〜 PXE + iSCSI ネットワークブートの構築備忘録"
emoji: "🥧"
type: "tech"
topics: ["RaspberryPi", "iSCSI", "PXE", "Docker", "ネットワーク"]
published: false
---

# はじめに

:::message alert
**TODO**: 実際のサーバー（Raspberry Pi + NAS）の写真をここに貼る
:::

家庭で Raspberry Pi 4B を 3 台運用していると、SD カードの突然死に怯える日々を送ることになります。停電やカーネルパニックのたびに「今度はどの SD が壊れたか」と胃を痛めるのは健全とは言えません。

本記事では、SD カードを完全に排除し、**PXE（Preboot Execution Environment）と iSCSI を組み合わせたネットワークブート**で Raspberry Pi 4B を運用する構成の備忘録をまとめます。NAS の SSD 上に root ファイルシステムを配置し、ネットワーク経由でブートさせることで、SD カードの脆弱性から解放されます。

現在、この基盤の上で k3s クラスタを動かし、Home Assistant や AdGuard Home などのセルフホストサービスを運用しています。本記事では PXE + iSCSI の構成に焦点を絞り、k3s クラスタの構築については対象外とします。

:::message
本記事は筆者が **Raspberry Pi 4B** で実際に構築した際の記録です。Raspberry Pi はモデルによってブートの仕組みが異なり（例: Pi 4B は EEPROM、Pi 3B 以前は OTP）、本記事の手順がそのまま他のモデルに適用できるとは限りません。他のモデルで構築する場合は、公式ドキュメントも合わせて確認してください。
:::

構成ファイル一式は GitHub リポジトリで管理しています（非公開）。

# なぜネットワークブートか

## SD カードの課題

Raspberry Pi の標準的なブートメディアである SD カードには、次の課題があります。

- **書き込み寿命**: フラッシュメモリの書き込み回数には上限がある。ログ出力や一時ファイルの書き込みが積み重なると、数ヶ月〜数年で寿命を迎えることがある
- **停電時の破損リスク**: 書き込み中の突然の電源断で、ファイルシステムが破損して起動不能になることがある
- **個別管理の手間**: 複数台を運用する場合、SD カードごとに OS 設定を管理する必要がある

## 他のブート方式の検討

SD カードの課題を受けて、まず外付け HDD を USB 接続（micro USB Type-B）で運用していました。しかし、micro USB Type-B の接触不良が発生しやすく、Pi を移動するたびにケーブルが抜けるリスクがありました。各 Pi に HDD とケーブルがぶら下がる状態も取り回しが悪く、長期運用には向いていませんでした。

NVMe ブートも検討しましたが、Raspberry Pi 4B で NVMe を利用するには各 Pi に NVMe HAT（または USB-NVMe アダプタ）と NVMe SSD を追加購入する必要があり、3 台分のコストを考えて見送りました。

そんな中、データバックアップ用に NAS（UGreen）を導入したところ、iSCSI Target 機能が搭載されていることに気づきました。「NAS をストレージサーバーにすれば、ネットワークブートできるのでは」と思いつき、構築に着手しました。

## ネットワークブートの利点

ネットワークブートとは、ローカルのストレージデバイスではなく、ネットワーク経由でサーバーから OS を読み込んで起動する方式です。ストレージをサーバーに集約できるため、次のような利点があります。

- **NAS での集中管理**: 全ノードのブートファイルと root ファイルシステムを NAS 上で一元管理できる
- **ストレージの耐久性**: NAS に搭載した HDD や SSD は SD カードと比べて書き込み耐性が高く、寿命の心配が大幅に減る
- **バックアップの容易さ**: NAS 側でスナップショットやバックアップを取得すれば、全ノードのバックアップが完了する
- **周辺機器・ケーブルの削減**: USB ブートと比べて、各 Pi に USB ケーブルや外付けストレージを接続する必要がない。物理的な接続点が減ることで、ケーブル抜けや接触不良による障害リスクも下がる
- **ノード追加・交換が容易**: 新しい Pi を追加するとき、新たな記憶媒体（外付け HDD/SSD など）を追加で用意する必要がない。場所も取らない。NAS 上に iSCSI ターゲットを作るだけで済む

# ネットワークブートの方式選定

ネットワークブートの root ファイルシステムには NFS と iSCSI の 2 つの選択肢があります。筆者は当初 NFS で運用していましたが、後に iSCSI へ移行しました。

| 項目 | iSCSI | NFS |
|---|---|---|
| アクセス方式 | ブロックデバイス | ファイル単位 |
| パフォーマンス | 高速（特にランダム I/O） | 中程度 |
| 複数ノードからの同時マウント | 不可（1 LUN = 1 ノード） | 可能 |
| 設定の複雑さ | やや複雑（initramfs 対応が必要） | シンプル |

iSCSI はブロックデバイスとして振る舞うため、OS から見ると物理ディスクと同じように扱えます。ext4 などのファイルシステムをそのまま載せられるため、NFS と比べてパフォーマンスが高く、互換性の問題も起きにくいのが利点です。なお、iSCSI ではストレージを提供するサーバー側を **Target**、接続するクライアント側を **Initiator** と呼びます。本記事では NAS が Target、Raspberry Pi が Initiator です。

実際に NFS root と iSCSI root の両方で UnixBench を実行したところ、iSCSI の方が総合スコアで約 23% 高い結果が出ました。特にシェルスクリプト実行のようなメタデータ操作が多いワークロードで大幅な改善が見られたため、iSCSI を採用することにしました。

以降の構築手順は iSCSI ベースの構成で進めます。

# システム構成

本記事では、NAS を PXE サーバー兼 iSCSI Target として使い、3 台の Raspberry Pi 4B をネットワークブートする構成を構築します。各 Pi は電源と Ethernet ケーブルだけで起動し、OS の root ファイルシステムは NAS 上の iSCSI LUN から読み込みます。

## 構成機器

| 役割 | 機器 | 備考 |
|---|---|---|
| NAS / iSCSI Target + PXE サーバー | UGreen NAS (192.168.0.100) | Docker で dnsmasq を稼働、iSCSI Target は NAS ネイティブ |
| ノード 1 (pi-1) | Raspberry Pi 4B | シリアル: `55667788` |
| ノード 2 (pi-2) | Raspberry Pi 4B | シリアル: `11223344` |
| ノード 3 (pi-3) | Raspberry Pi 4B | シリアル: `aabbccdd` |
| ルーター | 既存のホームルーター (192.168.0.1) | DHCP サーバー兼用 |

:::message
**本記事の IP アドレス・MAC アドレス・シリアル番号について**
本記事に記載している IP アドレス、MAC アドレス、シリアル番号はすべてダミー値です。実際の環境に合わせて読み替えてください。
:::

## ストレージ構成

NAS 内部のストレージ配置と、Pi のマウント先の対応関係を示します（代表として Pi #1 のみ記載）。

```mermaid
graph LR
    subgraph NAS["UGreen NAS"]
        subgraph SSD["SSD ボリューム"]
            LUN1["iSCSI LUN #1<br/>(pi-1 root fs)"]
            LUN2["iSCSI LUN #2<br/>(pi-2 root fs)"]
            LUN3["iSCSI LUN #3<br/>(pi-3 root fs)"]
        end
        subgraph HDD["HDD ボリューム"]
            TFTP["TFTP ディレクトリ<br/>(各 Pi のブートファイル)"]
        end
    end

    subgraph Pi1["Pi #1"]
        root1["/（root）← iSCSI"]
        boot1["/boot/firmware ← NFS"]
    end

    LUN1 -. "iSCSI" .-> root1
    TFTP -. "NFS" .-> boot1
```

## ネットワーク・サービス構成

NAS 上で動作するサービスと、各 Pi・ルーターとのネットワーク接続関係を示します。

```mermaid
graph LR
    Router["ルーター<br/>(192.168.0.1)<br/>DHCP サーバー"]

    subgraph NAS["UGreen NAS (192.168.0.100)"]
        dnsmasq["dnsmasq コンテナ<br/>(Proxy DHCP + TFTP)"]
        iscsi["iSCSI Target<br/>(NAS ネイティブ)"]
        nfs["NFS コンテナ<br/>(/boot/firmware 用)"]
    end

    Pi1["Pi #1<br/>55667788"]
    Pi2["Pi #2<br/>11223344"]
    Pi3["Pi #3<br/>aabbccdd"]

    Router --- Pi1 & Pi2 & Pi3
    dnsmasq -. "Proxy DHCP<br/>+ TFTP" .- Pi1 & Pi2 & Pi3
    iscsi -. "iSCSI<br/>(root fs)" .- Pi1 & Pi2 & Pi3
    nfs -. "NFS<br/>(/boot/firmware)" .- Pi1 & Pi2 & Pi3
```

:::message
**NFS サーバーの役割 ── なぜ `/boot/firmware` は iSCSI ではないのか**
root ファイルシステムは iSCSI 経由ですが、`/boot/firmware` は NFS でマウントしています。

iSCSI LUN は NAS から見ると生のブロックデバイスであり、中のファイルシステムにはアクセスできません。TFTP サーバー（dnsmasq）はブートファイルを NAS のファイルシステム上のディレクトリから配信するため、iSCSI LUN 内にブートファイルを置いても TFTP で配信できないのです。

そこで、TFTP ディレクトリを NFS エクスポートし、Pi の `/boot/firmware` としてマウントしています。Raspberry Pi OS で `apt upgrade` によりカーネルがアップデートされると、新しいカーネルイメージ（`kernel8.img`）や initramfs は `/boot/firmware` に書き込まれます。これが NFS 経由で TFTP ディレクトリに直接反映されるため、次回起動時から更新後のカーネルで自動的に起動します。
:::

## ブートシーケンス

電源 ON からシステム起動までの流れを示します。

```mermaid
sequenceDiagram
    participant Pi as Raspberry Pi 4B
    participant Router as ルーター<br/>(DHCP)
    participant dnsmasq as dnsmasq<br/>(Proxy DHCP + TFTP)
    participant iSCSI as iSCSI Target

    par DHCP Discover (ブロードキャスト)
        Pi->>Router: 1. DHCP Discover
        Pi->>dnsmasq: 1. DHCP Discover
    end
    Router-->>Pi: 2. DHCP Offer (IP 割り当て)
    dnsmasq-->>Pi: 3. Proxy DHCP (TFTP サーバー情報)
    Note over Pi: 4. EEPROM ブートローダーが<br/>TFTP リクエスト開始
    Pi->>dnsmasq: 5. TFTP: start4.elf, config.txt,<br/>kernel8.img, initramfs 等を取得
    Note over Pi: 6. カーネル起動<br/>(initramfs 内の iSCSI Initiator)
    Pi->>iSCSI: 7. iSCSI Login (CHAP 認証)
    iSCSI-->>Pi: 8. LUN 接続 (ブロックデバイス)
    Note over Pi: 9. root fs マウント → システム起動
```

電源 ON 後、EEPROM ブートローダーがまずルーターから IP アドレスを取得し、dnsmasq の Proxy DHCP から TFTP サーバーの情報を受け取ります[^boot-sequence]。EEPROM ブートローダーが TFTP で start4.elf 等のファームウェアを取得した後、カーネルと initramfs をロードします。initramfs 内の iSCSI Initiator が iSCSI Target に接続し、LUN を root ファイルシステムとしてマウントします。

[^boot-sequence]: Pi 4B では bootcode.bin は EEPROM 内に組み込まれているため、TFTP からのダウンロードは発生しません。Pi 3B 以前のモデルとはブートシーケンスが異なります。[Raspberry Pi Documentation - Raspberry Pi hardware](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html)

# NAS 側セットアップ

## Docker Compose

UGreen NAS にはネイティブの Docker 機能が搭載されているため、dnsmasq（Proxy DHCP + TFTP）と NFS サーバーを Docker Compose で管理しています。一方、iSCSI Target は NAS のネイティブ機能として動作しており、Docker とは独立しています。

NAS 上で動作させるサービスは次の 2 つです。

- **dnsmasq**（Proxy DHCP + TFTP サーバー）: PXE クライアントにブートサーバー情報を配信し、TFTP でブートファイルを提供する。
- **NFS サーバー**: 各 Pi のシリアル番号ディレクトリを NFS エクスポートする。

:::details docker-compose.yaml の全体。

```yaml:docker-compose.yaml
services:
    dnsmasq:
        image: strm/dnsmasq:latest
        container_name: dnsmasq-proxydhcp
        network_mode: host
        cap_add:
        - NET_ADMIN
        - NET_RAW
        environment:
        - TZ=Asia/Tokyo
        command:
        - "--conf-file=/config/dnsmasq.conf"
        - "--keep-in-foreground"
        - "--log-facility=-"
        volumes:
        - ./config:/config
        - ./tftproot:/tftproot
        restart: unless-stopped

    nfs-server:
        image: erichough/nfs-server:2.2.1
        container_name: nfs-server-raspberry
        restart: unless-stopped
        privileged: true
        environment:
        - NFS_EXPORT_0=/nfsshare/tftproot/aabbccdd 192.168.0.101(rw,async,no_subtree_check,no_root_squash,insecure)
        - NFS_EXPORT_1=/nfsshare/tftproot/11223344 192.168.0.102(rw,async,no_subtree_check,no_root_squash,insecure)
        - NFS_EXPORT_2=/nfsshare/tftproot/55667788 192.168.0.103(rw,async,no_subtree_check,no_root_squash,insecure)
        volumes:
        - ./tftproot/aabbccdd:/nfsshare/tftproot/aabbccdd
        - ./tftproot/11223344:/nfsshare/tftproot/11223344
        - ./tftproot/55667788:/nfsshare/tftproot/55667788
        network_mode: host
```
:::

:::message
**`no_root_squash` のセキュリティに関する注意**
NFS エクスポートに `no_root_squash` を指定すると、リモートの root ユーザーがサーバー上のファイルに root 権限でアクセスできます[^no-root-squash]。PXE ブートの root ファイルシステム提供には必要ですが、信頼できるネットワーク内でのみ使用してください。
:::

[^no-root-squash]: [Red Hat Security Guide - Do not use the no_root_squash option](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/security_guide/sect-security_guide-securing_nfs-do_not_use_the_no_root_squash_option)

## dnsmasq 設定

dnsmasq を **Proxy DHCP** モードで動作させます。

```bash:config/dnsmasq.conf
# DNS無効（ルーターのDNSを使用）
port=0
local-service

interface=eth0
bind-interfaces

# PXEサーバのホスト名/IPアドレス登録
host-record=raspberrypi-pxe,192.168.0.100

# 既存DHCPと併用するProxy DHCP
dhcp-range=tag:raspberrypi-pxe,192.168.0.100,proxy

# PXEクライアントのバグ対策（Pi 3 の既知バグ https://github.com/raspberrypi/firmware/issues/934 だが、
# Pi 4B でもこの設定がないとブートループに陥ったため入れている）
dhcp-reply-delay=2

# GWとDNS
dhcp-option=option:router,192.168.0.1
dhcp-option=option:dns-server,192.168.0.1

# ラズパイのbootcode.binに認識させるための設定
pxe-service=tag:raspberrypi-pxe,0,"Raspberry Pi Boot"

# Raspberry Pi 特定（MACアドレス設定）
dhcp-host=dc:a6:32:xx:xx:01,set:raspberrypi-pxe  # pi-3
dhcp-host=dc:a6:32:xx:xx:02,set:raspberrypi-pxe  # pi-2
dhcp-host=dc:a6:32:xx:xx:03,set:raspberrypi-pxe  # pi-1

# TFTP boot設定
dhcp-boot=,,192.168.0.100

# TFTP を dnsmasq で提供
enable-tftp
tftp-root=/tftproot
tftp-no-fail

log-dhcp
```

:::message
**Proxy DHCP とは**
Proxy DHCP は、既存の DHCP サーバー（ルーター）と共存するための仕組みです。IP アドレスの割り当ては既存の DHCP サーバーに任せ、PXE ブートに必要な情報（TFTP サーバーのアドレスやブートファイルパス）だけを追加で配信します。`port=0` で DNS 機能を無効化し、`dhcp-range` に `proxy` を指定することで Proxy DHCP モードになります。

`dhcp-reply-delay=2` は、Raspberry Pi の PXE クライアントのファームウェアバグを回避するための設定です。この遅延がないとブートループに陥る場合があります。元々は Pi 3 で報告されたバグですが、Pi 4B でも同様の挙動が発生したため設定しています。
:::

## iSCSI ターゲット

UGreen NAS にはネイティブの iSCSI Target 機能が搭載されているため、これを利用しています。

設定の要点は次の通りです。

- **Target IQN**: `iqn.2025-03.com.ugreen:target-1.xxxxx`（各 Pi 用に LUN を作成）
- **LUN サイズ**: 各 32GB[^lun_size]
- **CHAP 認証**: ユーザー名とパスワードを設定（任意だがセキュリティ上推奨）
- **ACL**: 接続許可する Initiator IQN を設定

[^lun_size]: 適当。永続化したいデータは NAS の共有フォルダに保存予定なので OS その他ミドルウェア等のみ入れる想定。

# Raspberry Pi 側セットアップ

ここからが本記事の核心部分です。

## 1. ネットワークブートの有効化

Raspberry Pi 4B でネットワークブートを有効にするには、SPI EEPROM のブートローダー設定を変更します[^eeprom-boot]。Pi 4B は **EEPROM 内のブートローダー** でブート順序を制御します。EEPROM なので何度でも設定変更可能です。

[^eeprom-boot]: [Raspberry Pi Documentation - Raspberry Pi hardware](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html)

```bash
sudo -E rpi-eeprom-config --edit
# BOOT_ORDER=0xf21 に設定
```

`BOOT_ORDER` は右から順に試行するブートモードを 16 進数で並べたものです[^boot-order]。よく見る各桁の意味は次の通りです。

| 値 | ブートモード |
|---|---|
| `1` | SD カード |
| `2` | ネットワーク（PXE） |
| `4` | USB マスストレージ |
| `6` | NVMe |
| `f` | 再起動してリトライ |

`0xf21` の場合、右から `1`（SD カード）→ `2`（ネットワーク）→ `f`（リトライ）の順に試行します。SD カードが見つからなければネットワークブートにフォールバックし、それでもダメなら再起動してリトライします。

[^boot-order]: [Raspberry Pi Documentation - BOOT_ORDER](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#BOOT_ORDER)

## 2. iSCSI LUN への OS 書き込み

適当な Linux マシンから iSCSI LUN に接続し、Raspberry Pi OS を書き込みます。

```bash
# iSCSI 接続（CHAP 認証ありの場合）
sudo iscsiadm -m discovery -t st -p 192.168.0.100
sudo iscsiadm -m node \
    -T iqn.2025-03.com.ugreen:target-1.xxxxx \
    -p 192.168.0.100 \
    --op update -n node.session.auth.authmethod -v CHAP
sudo iscsiadm -m node \
    -T iqn.2025-03.com.ugreen:target-1.xxxxx \
    -p 192.168.0.100 \
    --op update -n node.session.auth.username -v <ユーザー名>
sudo iscsiadm -m node \
    -T iqn.2025-03.com.ugreen:target-1.xxxxx \
    -p 192.168.0.100 \
    --op update -n node.session.auth.password -v <パスワード>
sudo iscsiadm -m node \
    -T iqn.2025-03.com.ugreen:target-1.xxxxx \
    -p 192.168.0.100 --login

# iSCSI LUN のデバイスファイルを確認
# 接続後に追加されたデバイスを lsblk で確認する（今回は /dev/sdc でした。間違い注意！）
lsblk

# Raspberry Pi OS イメージを書き込み
# GUI 不要なので arm64 の Lite 版を使用
sudo dd if=raspios-bookworm-arm64-lite.img of=/dev/sdc bs=4M status=progress

# パーティションテーブル再読み込み
sudo partprobe /dev/sdc

# パーティション構成を確認
# Raspberry Pi OS のイメージは 2 パーティション構成:
#   /dev/sdc1 = boot（/boot/firmware）
#   /dev/sdc2 = root（/）
lsblk /dev/sdc

# パーティション 2（root）を LUN 全体に拡張
sudo growpart /dev/sdc 2
sudo e2fsck -f /dev/sdc2
sudo resize2fs /dev/sdc2
```

## 3. iSCSI 対応 initramfs の生成

通常の Raspberry Pi OS の initramfs[^initramfs] には iSCSI Initiator が含まれていません。chroot 環境で open-iscsi をインストールし、iSCSI 対応の initramfs を生成する必要があります。

[^initramfs]: initramfs（initial RAM filesystem）は、カーネル起動直後にメモリ上に展開される一時的なファイルシステムです。本来の root ファイルシステムをマウントするために必要なドライバやツールを格納しています。iSCSI ブートの場合、ネットワーク接続と iSCSI ログインを initramfs の段階で行う必要があるため、iSCSI 関連ツールを組み込んだ initramfs を生成します。

```bash
# iSCSI LUN のマウント
sudo mkdir -p /mnt/pi-root
sudo mount /dev/sdc2 /mnt/pi-root

# chroot 環境の準備
sudo mount --bind /proc /mnt/pi-root/proc
sudo mount --bind /sys /mnt/pi-root/sys
sudo mount --bind /dev /mnt/pi-root/dev
sudo mount --bind /dev/pts /mnt/pi-root/dev/pts

# chroot 実行
sudo chroot /mnt/pi-root

# open-iscsi と initramfs-tools をインストール
apt update
apt install --reinstall open-iscsi initramfs-tools

# このファイルが存在すると、initramfs 起動時に cmdline の iSCSI パラメータを読み取って自動接続する
# 中身は空でよい（フラグファイル）。詳細: https://sources.debian.org/src/open-iscsi/2.0.874-7.1/debian/README.Debian/
mkdir -p /etc/iscsi
touch /etc/iscsi/iscsi.initramfs

# SSH を有効化（ヘッドレス運用のため）
systemctl enable ssh

# ユーザー作成とパスワード設定
# Bullseye（2022 年 4 月アップデート）以降はデフォルトの pi ユーザーが存在しないため、手動で作成する
# ユーザー名とパスワードはお好みで
useradd -m -G sudo -s /bin/bash pi
echo 'pi:<パスワード>' | chpasswd

# chroot 内のカーネルバージョンを確認
# （uname -r はホスト側のカーネルバージョンを返すため注意）
ls /lib/modules/

# 確認したバージョンを指定して initramfs を再生成
update-initramfs -v -k <確認したバージョン> -c

# 生成確認
ls -la /boot/initrd.img-*

# chroot 終了
exit
```

生成された initramfs は後述の TFTP ディレクトリにコピーします。これで Pi が PXE ブート時に iSCSI 接続できる initramfs が準備できました。

## 4. TFTP ディレクトリ構成

Raspberry Pi 4B は起動時に自身のシリアル番号をディレクトリ名として TFTP サーバーにリクエストします。各 Pi のシリアル番号に対応したディレクトリを作成し、ブートファイルを配置します。

ここでの `tftproot/` は NAS 上の共有フォルダであり、dnsmasq の `tftp-root` で指定したディレクトリです。このディレクトリは NFS でもエクスポートしており、Pi の `/boot/firmware` としてマウントされます（[NAS 側セットアップ](#nas-側セットアップ)参照）。

ブートファイルは iSCSI LUN に書き込んだ Raspberry Pi OS のブートパーティションから取得できます。

```bash
# /nfsshare/tftproot/ は NAS の共有フォルダをマウント済みの前提です
# Pi 固有のディレクトリ作成
mkdir -p /nfsshare/tftproot/<シリアル番号>

# ブートファイルを丸ごとコピー（iSCSI LUN のブートパーティションから）
cp -r /mnt/pi-root/boot/firmware/* /nfsshare/tftproot/<シリアル番号>/

# セクション 3 で生成した iSCSI 対応 initramfs もコピー
cp /mnt/pi-root/boot/initrd.img-* /nfsshare/tftproot/<シリアル番号>/
```

最終的なディレクトリ構成は次のようになります（config.txt と cmdline.txt は後述のセクションで作成）。

```
tftproot/
├── aabbccdd/          ← Pi #3 固有ディレクトリ
│   ├── start4.elf
│   ├── fixup4.dat
│   ├── kernel8.img
│   ├── initrd.img-*   ← iSCSI 対応 initramfs
│   ├── config.txt
│   ├── cmdline.txt
│   ├── *.dtb
│   └── overlays/
├── 11223344/          ← Pi #2
└── 55667788/          ← Pi #1
```

:::message
私の場合は `/boot/firmware/` を丸ごとコピーしましたが、最低限必要なのは `start4.elf`、`fixup4.dat`、`kernel8.img`、`*.dtb`、`overlays/` のようです[^tftp-files]。どなたか試してみてください。

[^tftp-files]: [Network Booting a Raspberry Pi 4 - BitBanged](https://bitbanged.com/posts/streamlining-rpi-osdev/network-booting-a-raspberry-pi-4/)
:::

## 5. config.txt

`config.txt` で `auto_initramfs=1` を指定することで、TFTP ディレクトリ内の initramfs を自動的にロードします。ファームウェアはカーネルファイル名から対応する initramfs ファイル名を自動推定します（例: `kernel8.img` → `initramfs8`）[^auto-initramfs]。

[^auto-initramfs]: [Raspberry Pi Documentation - config.txt](https://www.raspberrypi.com/documentation/computers/config_txt.html)

```ini:tftproot/<シリアル番号>/config.txt
# GPU メモリ最小化（GUI を使わないため）
gpu_mem=16

# initramfs の自動ロード（iSCSI ブートに必須）
auto_initramfs=1

[all]
```

## 6. cmdline.txt

`cmdline.txt` にはカーネルパラメータとして iSCSI の接続情報を記述します。**全パラメータを 1 行で記述する必要があります。**

```text:tftproot/<シリアル番号>/cmdline.txt
ip=::::raspberrypi-1:eth0:dhcp ISCSI_INITIATOR=iqn.1993-08.org.debian:01:rpi4-<シリアル番号> ISCSI_TARGET_IP=192.168.0.100 ISCSI_TARGET_PORT=3260 ISCSI_TARGET_NAME=iqn.2025-03.com.ugreen:target-1.<ターゲットID> ISCSI_USERNAME=<ユーザー名> ISCSI_PASSWORD=<パスワード> root=UUID=<rootパーティションのUUID> rw rootwait cgroup_memory=1 cgroup_enable=memory cgroup_enable=cpuset
```

各パラメータの説明は次の通りです[^iscsi-cmdline-case]。

| パラメータ | 説明 |
|---|---|
| `ip=::::raspberrypi-1:eth0:dhcp` | DHCP でネットワーク設定を取得。ホスト名を指定 |
| `ISCSI_INITIATOR` | この Pi の iSCSI Initiator IQN。シリアル番号を含めて一意にする |
| `ISCSI_TARGET_IP` | iSCSI Target サーバー（NAS）の IP アドレス |
| `ISCSI_TARGET_PORT` | iSCSI ポート（標準: 3260） |
| `ISCSI_TARGET_NAME` | iSCSI Target の IQN |
| `ISCSI_USERNAME` / `ISCSI_PASSWORD` | CHAP 認証情報（CHAP を使わない場合は省略可だが使った方が良さそう） |
| `root=UUID=...` | iSCSI LUN 内の root パーティションの UUID[^uuid] |
| `rw rootwait` | root を読み書き可能でマウント。デバイス準備完了まで待機 |
| `cgroup_memory=1` 等 | cgroup 設定（k8s 動かすのに必要） |

:::message
**iSCSI パラメータの大文字・小文字について**
open-iscsi の initramfs スクリプトは本来小文字のパラメータ名（`iscsi_initiator` 等）をパースします[^iscsi-params]。本記事では大文字で記述していますが、環境によっては小文字でないと認識されない場合があります。動作しない場合は小文字に変更してください。
:::

[^iscsi-params]: [open-iscsi initramfs スクリプト](https://github.com/open-iscsi/open-iscsi)

[^uuid]: iSCSI LUN に接続した状態で `blkid /dev/sdc2` を実行して確認できます。cmdline.txt の UUID と一致しないと root マウントに失敗します。

## 7. fstab

iSCSI LUN 内の `/etc/fstab`[^fstab] を設定します。Raspberry Pi OS のデフォルトの fstab は SD カード前提になっているため、iSCSI + NFS の構成に合わせて書き換える必要があります。

[^fstab]: fstab（file systems table）は、起動時に自動マウントするファイルシステムの一覧を定義するファイルです。各行に「どのデバイスを」「どこに」「どの形式で」マウントするかを記述します。

```bash:iSCSI LUN 内の /etc/fstab
# デフォルトのまま
proc /proc proc defaults 0 0

# root ファイルシステム（iSCSI 経由）
UUID=<rootパーティションのUUID> / ext4 defaults,noatime,_netdev 0 1

# /boot/firmware（NFS 経由で TFTP ディレクトリをマウント）
192.168.0.100:/nfsshare/tftproot/<シリアル番号> /boot/firmware nfs defaults,vers=3,proto=tcp,_netdev 0 2

# パフォーマンス向上のための RAM ディスク（お好みで）
tmpfs /tmp tmpfs defaults,size=100M 0 0
tmpfs /var/tmp tmpfs defaults,size=50M 0 0
tmpfs /var/log tmpfs defaults,size=50M 0 0
```

`_netdev` オプションが重要です。このオプションを指定すると、ネットワークが利用可能になるまでマウントを待機します。iSCSI や NFS のように、ネットワーク経由でアクセスするファイルシステムにはこのオプションが必須です。

`tmpfs` で `/tmp`、`/var/tmp`、`/var/log` を RAM ディスクに配置しています。これにより、頻繁な書き込みがネットワーク I/O を発生させず、パフォーマンスが向上します。ただし、再起動するとログが消えるため、永続化が必要な場合は別途対策が必要です。また、指定した `size` を超えると書き込みが失敗するため、`logrotate` や `journald` の `SystemMaxUse` でログサイズを制限しておくことを推奨します。

# 動作確認

## 起動手順

1. Raspberry Pi 4B の SD カードスロットが空であることを確認
2. Ethernet ケーブルを接続
3. 電源を投入

## 動作確認コマンド

Pi に SSH できれば、ネットワークブート自体は成功していると言えるでしょう。

```bash
# SSH で Pi に接続
ssh pi@<Pi の IP アドレス>
```

あとは iSCSI セッションが確立されていることや、root ファイルシステムが iSCSI LUN からマウントされてそうかを見ると間違いないでしょう。

```console:SSH 接続後の確認実行例
# iSCSI セッション確認
$ sudo iscsiadm -m session
tcp: [1] 192.168.0.100:3260,1 iqn.2025-03.com.ugreen:target-1.<ターゲットID> (non-flash)

# ファイルシステム確認
$ df -h /
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        31G  2.1G   28G   7% /

# ディスク情報
$ lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda      8:0    0   32G  0 disk
├─sda1   8:1    0  512M  0 part
└─sda2   8:2    0 31.5G  0 part /
```


# 運用知見

PXE + iSCSI 構成に移行してから数ヶ月が経過した時点での所感をまとめます。

## HDD から SSD への移行

当初は NAS の HDD 上に iSCSI LUN を配置していましたが、Pi が常時稼働しているため HDD の読み書き音が途切れることなく発生し、生活空間に置くには厳しい状態でした。そこで、NAS に搭載していた R/W キャッシュ用 SSD 2 枚のうち 1 枚を R キャッシュ専用に、もう 1 枚をストレージボリュームとして転用し、iSCSI LUN の配置先を SSD に変更しました。結果として、読み書き音の頻度が大幅に減り、パフォーマンスも向上しました。

## 動かしているもの

この基盤の上では k3s クラスタが稼働しており、さまざまなワークロードを動かしています。k3s クラスタ自体の構築方法は本記事のスコープ外ですが、「何のためにこの構成を組んだのか」のイメージとして、動かしているものを簡単に紹介します。

### アプリケーション

- **Home Assistant**: ホームオートメーション
- **AdGuard Home**: ネットワーク全体の DNS / 広告ブロック
- **Glance**: セルフホストダッシュボード
- **time-news-service**: 時報・ニュース読み上げ（自作）
- **gh-cron-trigger**: GitHub Actions ワークフローの定期実行（自作）[^alt_cronium]

[^alt_cronium]: cronium という GitHub Actions ワークフローを外部から定期実行する仕組みを真似したもの。参考：[GitHub Actions の定期実行ワークフローを「時間通り」に実行する](https://zenn.dev/cybozu_ept/articles/run-github-actions-scheduled-workflows-on-time)

### クラスタ基盤

- **Flux CD**: GitOps によるデプロイ管理
- **Cloudflare Tunnel**: 外部からの HTTPS アクセス
- **external-dns**: Cloudflare Tunnel 用の Cloudflare DNS レコード管理
- **ingress-nginx**: ローカルネットワークからの HTTPS アクセス
- **cert-manager**: ローカルネットワーク向け HTTPS 証明書の発行
- **nfs-provisioner**: NAS の共有フォルダを Persistent Volume として利用
- **Grafana Alloy + kube-state-metrics**: Grafana Cloud へのメトリクス送信
- **Headlamp**: クラスタダッシュボード

## 良かった点

- **SD カードの心配から解放された**: 停電やカーネルパニック後に「SD カードが壊れていないか」と確認する作業がなくなった。精神的な負担が大きく減った
- **集中管理の恩恵**: OS のアップデートやバックアップを NAS 側で一元管理できるため、3 台個別に SD カードを抜き差しする必要がない
- **パフォーマンスの向上**: iSCSI + SSD の組み合わせにより、SD カード時代と比べて体感でも I/O が高速になった
- **接続の信頼性向上**: USB HDD 運用時代は micro USB Type-B の接触不良に悩まされていたが、ネットワークブートでは Ethernet ケーブル（RJ45）のみで完結する。RJ45 はラッチ付きで抜けにくく、接続の信頼性が格段に高い

## 注意すべき点

一方で、この構成には **NAS とスイッチングハブが単一障害点（SPOF）になる** という明確なデメリットがあります。

- **NAS が停止した場合**: iSCSI Target と TFTP/NFS がすべて NAS 上で動作しているため、NAS がダウンすると全 Pi が起動不能になる。稼働中の Pi も root ファイルシステムにアクセスできなくなり、事実上停止する
- **スイッチングハブが故障した場合**: ネットワーク経由でのブートと root ファイルシステムアクセスの両方が断たれるため、同様に全 Pi が停止する

SD カードでは各 Pi が独立して動作できていたことを考えると、可用性の観点ではトレードオフになっています。自宅用途では NAS やスイッチングハブの故障頻度は低いため許容していますが、この SPOF を認識した上で運用することが重要です。

## 今後の課題

現在、各 Pi には Ethernet ケーブルと電源ケーブルの 2 本が接続されています。PoE（Power over Ethernet）対応のスイッチングハブを導入すれば、Ethernet ケーブル 1 本で電力供給とネットワーク接続の両方を賄えるため、電源ケーブルとアダプタを排除できます。

ただし、Raspberry Pi 4B は標準では PoE に対応していないため、別途 PoE HAT（拡張ボード）を各 Pi に装着する必要があります。PoE HAT と PoE 対応ハブの両方を揃える必要がありコストはかかりますが、ケーブル本数がさらに半減し、配線がよりシンプルになります。

# まとめ

Raspberry Pi 4B を PXE + iSCSI でネットワークブートする構成の要点をまとめます。

- **SD カードからの脱却**: NAS の SSD 上に root ファイルシステムを配置し、SD カードの寿命や破損リスクから解放
- **iSCSI の優位性**: NFS root と比較して UnixBench 総合スコアで約 23% 向上。ブロックレベルアクセスにより互換性の問題も起きにくい
- **Proxy DHCP**: 既存のルーターの DHCP と共存しつつ、PXE ブート情報を配信
- **initramfs への iSCSI 組み込み**: `/etc/iscsi/iscsi.initramfs` フラグファイルが initramfs 生成時に iSCSI ツールを組み込む鍵
- **cmdline.txt**: iSCSI 接続情報をカーネルパラメータとして記述
- **SPOF に注意**: NAS とスイッチングハブが単一障害点。自宅用途では許容できるが認識は必要

構成一式は GitHub リポジトリで管理しています（非公開）。
