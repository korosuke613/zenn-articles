---
title: "Productivity Weekly (2023-08-16号)"
emoji: "⛹️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230816"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-08-16 単独号です。

今回が第 122 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)

:::

# news 📺

## X-Accepted-GitHub-Permissions header for fine-grained permission actors - The GitHub Blog
https://github.blog/changelog/2023-08-10-x-accepted-github-permissions-header-for-fine-grained-permission-actors/

GitHub Apps か新しい fine-grained のトークンを使用して API を呼び出した際に x-accepted-GitHub-permissions というヘッダーにどの権限が必要なのか返してくれるようになった。
これは覚えておくとデバッグが捗りそう。特に今後は PAT を発行する際に fine-grained トークンを使いたいし、GitHub Actions でも permissions を設定する機会が今後増えるのは間違いないし。

## HashiCorp adopts Business Source License
https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license

ハシコの OSS が BSL になった話。

関連。

- [Business Source License 1.1. 零細企業経営者視点 | by V | Aug, 2023 | Medium](https://voluntas.medium.com/business-source-license-1-1-8c83662568cb)
- [Terraformのライセンスの変更とその影響](https://zenn.dev/the_exile/articles/b90fe8c5c41694)


## Direct VPC egress in Cloud Run sends traffic over a VPC easily | Google Cloud Blog
https://cloud.google.com/blog/products/serverless/announcing-direct-vpc-egress-for-cloud-run/

Google Cloud の Cloud Run にて Direct VPC egress が Preview になりました。
Cloud Run から VPC 内のリソースにアクセスするための機能で、これまでは VPC Access Connector という別のリソースを作成剃る必要がありましたが、これが不要になります。
Direct VPC egress を用いると VPC Access Connector のインスタンス代がかからなくなります。
また、Cloud Run から VPC 内のリソースにアクセスするためのネットワークのレイテンシーが軽減され、パフォーマンスが向上するとのことです。

Direct VPC egress はまだプレビュー機能なので本番適用は控えたほうがよいですが、検証環境において Cloud Run から VPC 内のリソースにアクセスする際には、VPC Access Connector を使うよりもこちらを使ったほうがお手軽で良さそうです。

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*


## Network Load Balancer now supports security groups
https://aws.amazon.com/jp/about-aws/whats-new/2023/08/network-load-balancer-supports-security-groups/

色々嬉しい。

- [[アップデート] 遂に Network Load Balancer でセキュリティグループがサポートされました | DevelopersIO](https://dev.classmethod.jp/articles/nlb-security-group/)
- [Network Load Balancer (NLB) がセキュリティグループをサポートして何が嬉しいのか整理してみた | DevelopersIO](https://dev.classmethod.jp/articles/benefits-of-network-load-balancer-supports-security-groups/)

## actions/runner に Node.js v20 が搭載、v12 は削除 | Release v2.308.0 · actions/runner
https://github.com/actions/runner/releases/tag/v2.308.0

前回取り上げたランナー内蔵の Node.js のバージョン問題でついに v20 が搭載された。代りに昔 Deprecated 済みの v12 はいよいよ削除された。
あとほとんどの人に関係はないですが、公式の runner コンテナイメージに linux/arm64 が追加されました。actions-runner-controller とかを使っている人は arm のランナーを簡単に建てられるようになるのかも？

## Rancher Desktop が Rosetta 2 に対応 | Release Rancher Desktop 1.9 · rancher-sandbox/rancher-desktop
https://github.com/rancher-sandbox/rancher-desktop/releases/tag/v1.9.0

> Virtual machine type can be set to qemu or vz (Apple Virtualization Framework). vz requires macOS 13.0 Ventura on Intel and macOS 13.3 on Arm (M1, M2) machines. Rosetta can be enabled to run Intel container images on M1/M2 computers under vz emulation.

## Enhanced push protection features for developers and organizations - The GitHub Blog
https://github.blog/2023-08-09-enhanced-push-protection-features-for-developers-and-organizations/

シークレットを含むコードの push を防ぐ push protection は今までリポジトリ単位だったがユーザー自身の設定として ON にすることが可能になったのと、Organization にどれだけガードされたかを見るダッシュボードが追加された。

## HCP Vault Secrets extends secret sync to GitHub Actions
https://www.hashicorp.com/blog/hcp-vault-secrets-extends-secret-sync-to-github-actions

Secret Sync が GitHub Actions で使えるようになったらしい。

# know-how 🎓

## DeepLのChrome拡張機能を使ってるとGitHubのページ内検索で表示崩れが起きる - Carpe Diem
https://christina04.hatenablog.com/entry/deepl-chrome-extension

GitHub でブラウザ検索した時に表示が壊れるのは DeepL のブラウザ拡張が悪さしてるらしい。
最近結構頻発して困ってたので助かる。

## 1リリース6,108行から18行へ。ビッグバンリリースを改善した話 - CARTA TECH BLOG
https://techblog.cartaholdings.co.jp/entry/2023/08/15/163000

## GitHub Actions のストレージ空き容量を限界まで拡張する
https://zenn.dev/pinto0309/scraps/c6413eb15a1b2a

GitHub Actions の GitHub hosted ランナーにプリインストールされているツールを削除することでストレージの空き容量を確保する方法の紹介。
[runner-images の installers](https://github.com/actions/runner-images/tree/main/images/linux/scripts/installers) のプリインストールツール群を逆算し、apt でインストールされているツールや docker image などを削除することで最終的に 63GB 程度の空き容量を確保できるとのことでした。

若干ハック的な方法ではありますが、GitHub Actions のランナーのストレージ容量が足りなくなった時には参考になりそうです。さらにストレージ容量が欲しい場合は素直に [Larger runner](https://docs.github.com/en/actions/using-github-hosted-runners/about-larger-runners) を使うのがいいと思います。

余談ですが、[ドキュメント](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources)では Linux の GitHub hosted ランナー の SSD の容量は 14GB と書かれているのですが、検証記事によるとデフォルト起動時には 27GB 空いているとのことです。
気になったため、自分のリポジトリで確認してみたところ、22GB 空いていました。

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        84G   62G   22G  75% /
tmpfs           3.4G  172K  3.4G   1% /dev/shm
tmpfs           1.4G  1.1M  1.4G   1% /run
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/sda15      105M  6.1M   99M   6% /boot/efi
/dev/sdb1        14G  4.1G  9.0G  31% /mnt
tmpfs           694M   12K  694M   1% /run/user/1001
```

では、 14GB と書かれているのは何なのかというと、[GitHub Hosted ランナーが起動している Azure VM(Standard_DS2_v2)](https://learn.microsoft.com/ja-jp/azure/virtual-machines/dv2-dsv2-series#dsv2-series) の一時ストレージのようです。ファイルシステムや Azure VM について詳しくないのですが、GitHubのドキュメントを読んだだけでは、ストレージとして使えるのは 14GB ということなのかなと思っていたので、この機会に勉強になりました。

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*


## Four tips to keep your GitHub Actions workflows secure - The GitHub Blog
https://github.blog/2023-08-09-four-tips-to-keep-your-github-actions-workflows-secure/

主に公開リポジトリにおいて、issur や pr のタイトルとか経由でコマンドインジェクションされうる箇所があるよ、みたいな案内とか、PVR 有効化しようねとかそういうのが書いてあります。

## Renovateで正規表現を使い独自フォーマットファイルの依存を自動更新をする - notebook
https://swfz.hatenablog.com/entry/2020/06/09/031148

Renovate の regexManager という上級者向けの機能の解説。
これを使うと Dockerfile 内で外から curl などで追加でダウンロードするツールのバージョンを指定するための ENV などの記述の更新を Renovate に任せることが可能になります。
公式ドキュメントの regexManager の使い方をもう少し噛み砕いて解説してくれている。
https://docs.renovatebot.com/user-stories/maintaining-aur-packages-with-renovate/#updating-versions-with-renovate

ちなみに dockerfile などに関しては自分で同様の設定を書かずともプリセットが存在するので、上記記事を読んで理解した上でこのプリセットの正規表現で事足りそうならばこれを使うのが早い。
https://docs.renovatebot.com/presets-regexManagers/

ちなみに自分用の renovate config のプリセットにはこういう感じで Dockerfile に加えて Earthfile も対象にできるようしました
https://github.com/Kesin11/renovate-config/pull/1

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
