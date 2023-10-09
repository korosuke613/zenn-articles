---
title: "Productivity Weekly (2023-10-04号)"
emoji: "🐑"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231004"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-10-04 単独号です。

今回が第 127 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## GitHub Actions: Apple silicon (M1) macOS runners are now available in public beta! - The GitHub Blog
https://github.blog/changelog/2023-10-02-github-actions-apple-silicon-m1-macos-runners-are-now-available-in-public-beta/

GitHub Actions でやっと Apple Silicon（M1）のランナーが利用可能に。Larger runner なので無料枠無し。今までの Intel 12core の Larger runner よりも若干高いが、同時に Intel 12 core が値下がりしたため結果として従来の Intel 12 core と比べると半額。
値段の詳細の diff: https://github.com/github/docs/commit/76f7e40122db0ba541ce6729596287ab08b22d0a

https://github.blog/2023-10-02-introducing-the-new-apple-silicon-powered-m1-macos-larger-runner-for-github-actions/#how-to-use-the-runner
ブログの方でも紹介されているのですが、利用するためのラベル名が Intel と M1 で入れ替わっていて、ユーザーから見ると実は BREAKING CHANGES なのでは？

> "The 12-core macOS larger runner is moving from xlarge to large, and is still available by updating the runs-on: key to macos-latest-large, macos-12-large, or macos-13-large."

もともとの intel 12 core の　macOS ランナーですが、macos-latest-xl というラベルで使えたはずなので、ラベル的には多分 BRAKING CHANGES になっていないです。
（動かしてないので推測ですが...）

GitHub Actions: Introducing faster GitHub-hosted x64 macOS runners - The GitHub Blog
https://github.blog/2023-03-01-github-actions-introducing-faster-github-hosted-x64-macos-runners/

GitHub Actions でハイスペックな Larger runners を試す | 豆蔵デベロッパーサイト
https://developer.mamezou-tech.com/blogs/2023/06/09/github-actions-larger-runners/

## How GitHub uses GitHub Actions and Actions larger runners to build and test GitHub.com - The GitHub Blog
https://github.blog/2023-09-26-how-github-uses-github-actions-and-actions-larger-runners-to-build-and-test-github-com/

GitHub 社自身の CI に Larger Runner を活用するためにどのような機能を追加していったかの記事。VM のカスタムイメージ、前ビルドの結果を使ってスキップ、OIDC でプライベートネットワークに接続。
ほとんど初出の話のはずなので今後一般向けにも開放されるかもしれない？

カスタムイメージだけは https://github.com/github/roadmap/issues/826 がそれっぽい。

## Release 6.0.0: Introducing Renovate Community Edition and Renovate Enterprise Edition · mend/renovate-ce-ee
https://github.com/mend/renovate-ce-ee/releases/tag/6.0.0

Renovate CE/EE 登場。

マイグレーション
https://github.com/mend/renovate-ce-ee/blob/6.0.0/docs/migrating-to-renovate-ce.md

compose.yaml
https://github.com/mend/renovate-ce-ee/blob/6.0.0/examples/docker-compose-github.yml

## Release v1.3.0 · actions/create-github-app-token
https://github.com/actions/create-github-app-token/releases/tag/v1.3.0

actions/create-github-app-token v1.3.0 で対象 owner 変えられるようになりました。


## npm provenance general availability - The GitHub Blog
https://github.blog/changelog/2023-09-26-npm-provenance-general-availability/

npm provenance が GA になり、GitHub Actions 以外の CI サービスとして GItLab CI/CD も対応した。
GitHub Actions から npm に publish している人は npm publish --provenance していきましょう。

## Block npm package publishes when names and versions don’t match between manifest and tarball package.json - The GitHub Blog
https://github.blog/changelog/2023-09-27-block-npm-package-publishes-when-names-and-versions-dont-match-between-manifest-and-tarball-package-json/

npm パッケージを npm へ publish する際に、tarball 内の package.json にある名前やバージョンがマニフェストと一致しなかったら publish がブロックされるようになったっぽい。

npm pkg fix で publish 前に確認できるっぽい。

## 「サーバーレス VPC アクセス コネクタ」 から 「ダイレクト VPC」へ置き換えてみました
https://zenn.dev/rescuenow/articles/c694cbacd34039

前もウィで話題になってた GCP の Direct VPC がプレビューになったらしい．
サーバーレス VPC アクセス コネクタからの移行の記事も出てた．
はよ GA になってほしいね．

## Amazon Bedrock Is Now Generally Available – Build and Scale Generative AI Applications with Foundation Models | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/amazon-bedrock-is-now-generally-available-build-and-scale-generative-ai-applications-with-foundation-models/
AWS での生成系 AI のリソースが出た話。

Workers AI: serverless GPU-powered inference on Cloudflare’s global network
https://blog.cloudflare.com/workers-ai/
Cloudflare もエッジで AI 走らせるやつが来ましたね。

# know-how 🎓

## Technology Radar | An opinionated guide to today's technology landscape | Thoughtworks
https://www.thoughtworks.com/radar

Thoughtworks 社の Technology Radar、最新の Vol.29 が公開されました。

## aqua CLI Version Manager 入門
https://zenn.dev/shunsuke_suzuki/books/aqua-handbook

# tool 🔨

## OpenAI創業者も認めたタスク管理ツール「Linear」が評価額4億ドルに | Forbes JAPAN 公式サイト（フォーブス ジャパン）
https://forbesjapan.com/articles/detail/66394

Linear がイケイケですね。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
