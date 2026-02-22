# Plan: 「運用してみて」セクションに k3s ワークロード紹介を追加

## Context

記事が PXE + iSCSI のインフラ構築に焦点を当てているため、「この基盤の上で何が動いているのか」が読者に伝わらない。冒頭で「k3s クラスタについては対象外」と述べているが、軽くワークロードを紹介することで構築のモチベーションが伝わる。

## 対象ファイル

- `articles/raspberry-pi-pxe-iscsi-boot.md`

## 修正内容

### 「運用してみて」セクション内に「## 動かしているもの」サブセクションを追加

配置: `# 運用してみて` の冒頭説明文の直後、`## 良かった点` の直前（L531 付近）。

深入りせず箇条書きで簡潔に紹介。k3s 上のワークロードのみ（NAS 上の Jellyfin/Komga/Immich は対象外）。

#### アプリケーション

- **Home Assistant**: ホームオートメーション
- **AdGuard Home**: ネットワーク全体の DNS / 広告ブロック
- **Glance**: ステータスダッシュボード
- **time-news-service**: 時報・ニュース読み上げ
- **gh-cron-trigger**: GitHub Actions ワークフローの定期実行
- **drawio-viewer**: Draw.io 図の表示・共有

#### クラスタ基盤

- **Flux CD**: GitOps によるデプロイ管理
- **Cloudflare Tunnel**: 外部からの HTTPS アクセス
- **external-dns**: Cloudflare Tunnel 用の Cloudflare DNS レコード管理
- **ingress-nginx**: ローカルネットワークからの HTTPS アクセス
- **cert-manager**: ローカルネットワーク向け HTTPS 証明書の発行
- **nfs-provisioner**: NAS の共有フォルダを Persistent Volume として利用
- **Grafana Alloy + kube-state-metrics**: Grafana Cloud へのメトリクス送信
- **Headlamp**: クラスタダッシュボード

## 検証

- `pnpm exec textlint ./articles/raspberry-pi-pxe-iscsi-boot.md` でエラーゼロを確認
