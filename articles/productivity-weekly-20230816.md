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

:::

# news 📺

## X-Accepted-GitHub-Permissions header for fine-grained permission actors - The GitHub Blog
https://github.blog/changelog/2023-08-10-x-accepted-github-permissions-header-for-fine-grained-permission-actors/

GitHub において、GitHub Apps、もしくは fine-grained な Personal Access Token を使用して API を呼び出した際に、どの権限が必要なのかを返すヘッダー `x-accepted-github-permissions` が追加されました。

API を呼び出すと成否に関わらず、`x-accepted-github-permissions: repository_projects=write; organization_projects=admin` のようなヘッダーが返ってきます。
必要な権限のセットが `;` で区切られており、上記の例だと、`repository_projects=write` もしくは `organization_projects=admin` のどちらかが必要であることを示しているとのことです。

OAuth アプリや古い PAT（Classic）にある `x-accepted-oauth-scopes` ヘッダでも必要なスコープを出してくれていましたが、それと似たような機能になります。

実際に触ってみました。
僕が持つプライベートリポジトリに対して、プルリクエストを GET する API を叩いて検証しました。今回は fine-grained PAT を使っています。

無事 `X-Accepted-Github-Permissions: pull_requests=read; contents=read` がヘッダに含まれていましたね。

この場合、`pull_requests=read` と `contents=read` のどちらかが必要であるという意味になりますが、実際に `contents=read` だけを付与した fine-grained PAT で API を叩いてみると 403 が返ってきました。逆に `pull_requests=read` だけを付与した fine-grained PAT で API を叩いてみると想定通りのレスポンスが返ってきました。

自分の解釈が間違っているのか、他の条件を満たせていなかったのかはちょっとよくわかりませんが、今後も色々な API で触って検証してみようと思います。

:::details コマンドの詳細
`Pull requests: Read-only` のみを付与。

```
❯ GH_TOKEN=$TMP_GH_TOKEN gh api \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -i repos/korosuke613/playground-private/pulls/1
HTTP/2.0 200 OK
<省略>
X-Accepted-Github-Permissions: pull_requests=read; contents=read
<省略>
{
  "url": "https://api.github.com/repos/korosuke613/playground-private/pulls/1",
<省略>
```

`Contents: Read-only` のみを付与。

```
❯ GH_TOKEN=$TMP_GH_TOKEN gh api \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -i repos/korosuke613/playground-private/pulls/1
HTTP/2.0 403 Forbidden
<省略>
X-Accepted-Github-Permissions: pull_requests=read; contents=read
<省略>
{
  "message": "Resource not accessible by personal access token",
  "documentation_url": "https://docs.github.com/rest/pulls/pulls#get-a-pull-request"
}
```

:::

なかなか便利ですね！GitHub Apps、fine-grained PAT が使いやすくなりました。GitHub Actions を使う上でも permissions 設定をやりやすくなりますね。覚えておきたいです。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## HashiCorp adopts Business Source License
https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license

ハシコの OSS が BSL になった話。

関連。

- [Business Source License 1.1. 零細企業経営者視点 | by V | Aug, 2023 | Medium](https://voluntas.medium.com/business-source-license-1-1-8c83662568cb)
- [Terraformのライセンスの変更とその影響](https://zenn.dev/the_exile/articles/b90fe8c5c41694)


## Direct VPC egress in Cloud Run sends traffic over a VPC easily | Google Cloud Blog
https://cloud.google.com/blog/products/serverless/announcing-direct-vpc-egress-for-cloud-run/

Cloud Run で Direct VPC egress が Preview！
サーバーレス VPC アクセスコネクタ無しで Cloud Run から VPC へアクセスできるのでめっちゃタイムリーに嬉しい。

## Network Load Balancer now supports security groups
https://aws.amazon.com/jp/about-aws/whats-new/2023/08/network-load-balancer-supports-security-groups/

色々嬉しい。

- [[アップデート] 遂に Network Load Balancer でセキュリティグループがサポートされました | DevelopersIO](https://dev.classmethod.jp/articles/nlb-security-group/)
- [Network Load Balancer (NLB) がセキュリティグループをサポートして何が嬉しいのか整理してみた | DevelopersIO](https://dev.classmethod.jp/articles/benefits-of-network-load-balancer-supports-security-groups/)

## Release v2.308.0 · actions/runner
https://github.com/actions/runner/releases/tag/v2.308.0

[以前](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230802)に GitHub Actions のランナーに内蔵されている Node.js のバージョンが v16 からついに v20 にアップデートされそうな件を紹介しましたがそれに進展がありました。新たに公開された[actions/runner@v2.308.0](https://github.com/actions/runner/releases/tag/v2.308.0)にて v20 が内蔵されるようになり、代わりに以前から Deprecated だった v12 が削除されました。

ただ、action がどの Node.js のバージョンを使用するかは[aciton側で指定する仕組み](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#runsusing-for-javascript-actions)のため、すぐに v20 が使用されるわけではないのでユーザーが気にする必要はありません。おそらく近いうちに GitHub から v16 -> v20 へのマイグレーションパスについて何らかのアナウンスがあるのではないかと思うのでそれを期待しましょう。

また、actions/runner@v2.308.0 から公式に提供されているランナーが動くコンテナイメージの[actions-runner](https://github.com/actions/runner/pkgs/container/actions-runner)に linux/arm64 版が追加されました。k8s などの環境でセルフホストランナーを構築していて、Arm 版のランナーも構築したい場合にはこのイメージをそのまま使用するか、これをベースにして自前の Dockerfile で拡張するということが可能になるかと思います。

*本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)*

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

GitHub Actions のランナーにはじめからプリインストールされているツールを削除して空き容量を確保する方法の紹介。
ドキュメント上では SSD の容量は 14GB と書かれているのですが、そもそも最初から 27GB 空いていたらしいのがまずちょっと意外だった。ビルド時にストレージの容量を大量に必要とする場合には思い出したいテクニック。

ちなみに 2023/06 に GA したばかりのハイスペックな Larger runner は SSD の容量が通常のランナーより圧倒的に多いので、最初からこちらを使用するという選択肢もあります。

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
