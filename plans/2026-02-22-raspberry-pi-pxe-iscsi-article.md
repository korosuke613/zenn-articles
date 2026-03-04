# Plan: Raspberry Pi PXE + iSCSI ネットワークブート記事の作成

## Context

`home-raspberry-pxe` リポジトリに構築した家庭サーバー環境（Raspberry Pi 4B x3 の PXE + iSCSI ネットワークブート）を、Zenn の技術記事として備忘録的にまとめる。SD カード不要でラズパイを運用する構成に焦点を当て、k3s クラスタ等は対象外とする。

## 作成ファイル

- `articles/raspberry-pi-pxe-iscsi-boot.md`

## Frontmatter

```yaml
---
title: "Raspberry Pi 4B を SD カード不要で運用する 〜 PXE + iSCSI ネットワークブートの構築備忘録"
emoji: "🥧"
type: "tech"
topics: ["RaspberryPi", "iSCSI", "PXE", "Docker", "ネットワーク"]
published: false
---
```

- publication_name なし（個人記事）
- emoji `🥧` は既存記事と重複なし

## 記事構成

### 1. はじめに（〜20行）
- 動機: SD カードの摩耗・破損リスクからの脱却
- 概要: PXE + iSCSI でネットワークブートする構成の備忘録
- スコープ: PXE + iSCSI のみ（k3s は別記事）
- リポジトリへのリンク

### 2. なぜネットワークブートか（〜40行）
- SD カードの課題（書き込み寿命、停電時の破損リスク、個別管理の手間）
- ネットワークブートの利点（NAS 集中管理、SSD 耐久性、バックアップ容易）
- iSCSI vs NFS の比較表（ブロック vs ファイルアクセス、性能差）

### 3. システム構成（〜60行）
- ハードウェア一覧表（UGreen NAS + Pi 4B x3）
- アーキテクチャ図（Mermaid）: ルーター、NAS（Docker + iSCSI Target）、Pi x3
- ブートシーケンス図（Mermaid sequence diagram）: 電源ON → DHCP → TFTP → iSCSI login → root mount

### 4. サーバー側セットアップ（〜80行）
- **Docker Compose**: dnsmasq + NFS コンテナ定義
  - `network_mode: host` の必要性（DHCP ブロードキャスト）
- **dnsmasq 設定**: Proxy DHCP + TFTP
  - `port=0`（DNS無効）、MAC ベースのタグ付け、`dhcp-reply-delay=2`
  - :::message で Proxy DHCP の解説（既存ルーターと共存）
- **iSCSI ターゲット**: UGreen NAS のネイティブ iSCSI
  - LUN 作成、CHAP 認証、ACL 設定

### 5. Raspberry Pi 側セットアップ（〜100行）★記事の核心
- **OTP ビット有効化**: `program_usb_boot_mode=1`
- **iSCSI LUN への OS 書き込み**: `dd` + パーティション拡張
- **iSCSI 対応 initramfs 生成**（最重要ステップ）
  - chroot して `open-iscsi` + `initramfs-tools` インストール
  - `touch /etc/iscsi/iscsi.initramfs` ← 秘伝のフラグファイル
  - `update-initramfs` で生成 → TFTP ディレクトリへコピー
- **TFTP ディレクトリ構成**: シリアル番号ベースのディレクトリ
- **config.txt**: `auto_initramfs=1`, `gpu_mem=16`, `arm_boost=1`
- **cmdline.txt**: iSCSI パラメータ一覧表（CHAP 認証情報はマスク）
- **fstab**: `_netdev` オプション、tmpfs 設定

### 6. 動作確認とトラブルシューティング（〜50行）
- 確認コマンド（`iscsiadm -m session`, `df -h /`, `lsblk`）
- よくある問題 Top 4 と対処法
- デバッグ用 tcpdump コマンド

### 7. パフォーマンス（〜40行）
- NFS → iSCSI 移行のベンチマーク結果表
  - Shell Scripts: +52〜113%、UnixBench 総合: +11%
- tmpfs の効果

### 8. まとめ（〜30行）
- 要点の振り返り
- リポジトリリンク

## コンテンツソース（参照先ファイル）

| セクション | 参照ファイル |
|---|---|
| アーキテクチャ図 | `home-raspberry-pxe/docs/iscsi-network-boot-architecture.md` |
| セットアップ手順 | `home-raspberry-pxe/docs/iscsi-network-boot-guide.md` |
| Docker/dnsmasq設定 | `home-raspberry-pxe/docker-compose.yaml`, `config/dnsmasq.conf` |
| ブートパラメータ | `home-raspberry-pxe/tftproot/*/cmdline.txt`, `*/config.txt` |
| ベンチマーク | `home-raspberry-pxe/docs/bench/pi-3/bench-summary.md` |
| 記事スタイル参考 | `zenn-articles/articles/github-billing-api.md` |

## セキュリティ注意

- `cmdline.txt` に含まれる CHAP パスワード（実値）は記事内でマスク（`your_password_here` に置換）

## 検証手順

1. `pnpm exec textlint ./articles/raspberry-pi-pxe-iscsi-boot.md` で校正チェック
2. `pnpm run start` でプレビュー確認（port 8808）
3. frontmatter の emoji 重複チェック（CI で自動検証される）
