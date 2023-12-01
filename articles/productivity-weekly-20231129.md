---
title: "Productivity Weekly (2023-11-29号, 2023-11-22号)"
emoji: "🥘"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231129"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-11-29, 2023-11-22 合併号です。

今回が第 134 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
- [@uta8a](https://zenn.dev/uta8a)

:::

# news 📺

## Amazon ECR pull through cache now supports additional upstream registries
https://aws.amazon.com/jp/about-aws/whats-new/2023/11/amazon-ecr-pull-through-cache-additional-upstream-registries/

外部のコンテナレジストリから直接 pull する代わりに ECR から pull を行い、ECR に存在しなかった場合は自動的に外部からの pull を裏で行ってくれるプルスルーキャッシュ機能の対象として可能なレジストリとして、新たに Docker Hub, Azure Container Registry, GitHub Container Registry が加わったようです。

以前から ECR Public、Kubernetes container registry, Quay に対応していたので主要なレジストリはほぼ網羅されたのではないでしょうか。

自分も以前から ECR にこのような機能があるのは知っていたのですが、どのような場合に便利なのか分かっていなかったので改めて調べてみました。

https://dev.classmethod.jp/articles/deploy-ecs-from-docker-official-container-ecr-pull-through-cache/
https://dev.classmethod.jp/articles/ecr-pull-through-cache-repositories/

上記 2 つの記事より、コンテナを実行する環境をプライベートサブネットに配置している場合はなるべく通信をインターネットに出したくないため、VPC エンドポイントでアクセス可能な ECR からの pull に限定しつつもパブリックなイメージを利用するのに便利であるということが分かりました。

インターネットに通信を出したくない要件がある場合は当然ながら、NAT Gateway 経由でインターネットへの通信を大量に行うとコストがそれなりにかかってしまうため文字通り ECR をキャッシュとして利用することでコストを抑える効果も期待できそうです。

新たに追加された 3 つのコンテナレジストリから pull するイメージをお使いの場合は、ECR プルスルーキャッシュを利用してみてはいかがでしょうか。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Node.js 20.x runtime now available in AWS Lambda | AWS Compute Blog
https://aws.amazon.com/jp/blogs/compute/node-js-20-x-runtime-now-available-in-aws-lambda/

## Custom Organization Roles are now GA - The GitHub Blog
https://github.blog/changelog/2023-11-16-custom-organization-roles-are-now-ga/

# know-how 🎓

## Security best practices for authors of GitHub Actions - The GitHub Blog
https://github.blog/2023-11-16-security-best-practices-for-authors-of-github-actions/

# tool 🔨

## ysk8hori/delta-typescript-graph-action: This GitHub Action uses Mermaid to visualize in a diagram the files that were changed in a Pull Request and their related dependency files.
https://github.com/ysk8hori/delta-typescript-graph-action

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
