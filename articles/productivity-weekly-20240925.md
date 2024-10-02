---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-09-25, 2024-09-18)
emoji: 🐸
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240925
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-09-25, 2024-09-18 合併号です。

今回が第 164 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->
<!-- - [@ajfAfg](https://zenn.dev/arjef) -->

:::

# news 📺

## アップグレードされたDockerプランの発表: よりシンプルに、より価値を、より優れた開発と生産性を実現  | Docker
https://www.docker.com/ja-jp/blog/november-2024-updated-plans-announcement/

## Notice of upcoming deprecations and changes in GitHub Actions services - GitHub Changelog
https://github.blog/changelog/2024-09-16-notice-of-upcoming-deprecations-and-changes-in-github-actions-services/

## 【Terraform】aws_iam_role リソースの inline_policy ブロックが非推奨になった
https://zenn.dev/terraform_jp/articles/tf-aws-iam-role-inline-policy-deprecation

Terraform AWS Provider v5.68.0 より `aws_iam_role` の `inline_policy` ブロックが deprecated となったようです。

この記事では、deprecated となった `inline_policy` ブロック置き換えの選択肢（`aws_iam_role_policy` リソース、`aws_iam_role_policies_exclusive`）、および、それらの違いについて説明してくれています。

僕は IAM Role のインラインポリシーを定義するときに毎回 `inline_policy` ブロックを使っており、インラインポリシー用のリソースがあることを知らなかったため、大変助かる内容の記事でした。2 つのリソースの違いについてもわかりやすくてよかったです。

<!-- textlint-disable ja-technical-writing/ja-no-successive-word -->

`inline_policy` ブロック自体はまだ残るようですが早め早めの移行をしていきたいですね。

<!-- textlint-enable ja-technical-writing/ja-no-successive-word -->

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Now available for free on all public repositories: Copilot Autofix for CodeQL code scanning alerts - GitHub Changelog
https://github.blog/changelog/2024-09-18-now-available-for-free-on-all-public-repositories-copilot-autofix-for-codeql-code-scanning-alerts/

## Copilot Chat in GitHub.com is now aware of common support scenarios and GitHub’s documentation - GitHub Changelog
https://github.blog/changelog/2024-09-10-copilot-chat-in-github-com-is-now-aware-of-common-support-scenarios-and-githubs-documentation/

GitHub Copilot Chat in GitHub.com が GitHub のドキュメントやサポートシナリオを基にトレーニングされるようになりました。これにより、GitHub の機能に関する質問やトラブルシューティングへの回答精度の向上が見込めます。

お知らせには、「Copilot Individual で Copilot ナレッジベースを使用できるか？」、「SSH の設定方法」、「ジョブがビルド後のクリーンアップでスタックしキャンセルやタイムアウトを拒否する。どうすれば停止できるか」という質問が例で挙げられています。これらの質問はドキュメントを読めばわかることですが、Copilot へ問い合わせることですばやく知ることができるのは嬉しいですね。

似たような機能として、サポート問い合わせ時に先に Copilot へ問い合わせられる Copilot in GitHub Support という機能もあります[^copilot_support]。適材適所で使っていきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^copilot_support]: [Copilot in GitHub SupportがGA！GitHubの仕様に関するわからないことをすばやく解決できやすくなったよ](https://zenn.dev/korosuke613/articles/copilot-in-github-support)

## Announcing the Public Beta of GitHub Copilot Extensions 🎉 - GitHub Changelog
https://github.blog/changelog/2024-09-17-announcing-the-public-beta-of-github-copilot-extensions-%F0%9F%8E%89/

ブログ版
Enhancing the GitHub Copilot ecosystem with Copilot Extensions, now in public beta - The GitHub Blog
https://github.blog/news-insights/product-news/enhancing-the-github-copilot-ecosystem-with-copilot-extensions-now-in-public-beta/

## Google Workspace Updates: NotebookLM now available as an Additional Service
https://workspaceupdates.googleblog.com/2024/09/notebooklm-now-available-as-additional-service.html

## ZennにDocswellのスライドが埋め込めるようになりました | What's New in Zenn
https://info.zenn.dev/2024-09-18-embed-docswell-slides

# know-how 🎓

## 持続可能なソフトウェア開発を支える『GitHub CI/CD実践ガイド』 - Speaker Deck
https://speakerdeck.com/tmknom/github-cicd-book

ライブ配信の方: https://www.youtube.com/watch?v=tU4oUp4Ym08

## terrraformを使ったGoのLambdaの管理 - カンムテックブログ
https://tech.kanmu.co.jp/entry/2024/09/17/130305

## GitHub Actions の実行履歴に基づいて自動で timeout-minutes を設定
https://zenn.dev/shunsuke_suzuki/articles/ghatm-auto-timeout-minutes

## 独自YAMLファイルをJSON SchemaでLSP補完する
https://songmu.jp/riji/entry/2024-09-23-lsp-support-of-custom-yaml-files-using-json-schema.html

## サイバー攻撃への備えを！「SBOM」（ソフトウェア部品構成表）を活用してソフトウェアの脆弱性を管理する具体的手法についての改訂手引を策定しました （METI/経済産業省）
https://www.meti.go.jp/press/2024/08/20240829001/20240829001.html

# tool 🔨

## Nushell - 型付きシェルの基本とコマンド定義
https://zenn.dev/estra/articles/nu-typed-shell

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
