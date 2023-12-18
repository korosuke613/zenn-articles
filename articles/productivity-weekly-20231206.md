---
title: "＜ここにタイトルを入力＞｜Productivity Weekly (2023-12-06号)"
emoji: "🐻"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231206"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-12-06 単独号です。

今回が第 135 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## Introducing Amazon Q, a new generative AI-powered assistant (preview) | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/introducing-amazon-q-a-new-generative-ai-powered-assistant-preview/

## AWS Lambda がログを送信する CloudWatch ロググループをカスタマイズ可能になり、複数の Lambda 関数のログを集約できるようになりました | DevelopersIO 
https://dev.classmethod.jp/articles/aggregate-multiple-function-logs-aws-lambda/

## GitHub Copilot – November 30th Update - The GitHub Blog
https://github.blog/changelog/2023-11-30-github-copilot-november-30th-update/

GitHub Copilot の 11 月のアップデートまとめです。
大まかに箇条書きで紹介します。

- Copilot Chat の使うモデルが GPT-4 となった
- VSCode でのコード参照がパブリックベータ化
  - コード参照は、Copilot の提案に近しいコードを OSS から検索して提示する機能。近しいコードのライセンスやリポジトリを参照できる
- エージェント機能を導入
  - `@workspace` でワークスペース内に詳しいエージェントを利用。`@vscode` で VSCode 自体に詳しいエージェントを利用
- VSCode でのコミット時にコミットメッセージを補完する機能を追加
- JetBrains IDE において Copilot の提案を部分的に受け入れ可能に
  - macOS の場合、`Command` + `→` で部分的に提案を受け入れられる。VSCode では以前から対応されていた機能
- その他様々な改善

GitHub Copilot にはやはりだいぶ力を入れているようで、どんどん便利な機能が入っていきますね。個人的には IntelliJ IDEA をよく使っているので、JetBrains IDE での Copilot の提案が部分的に受け入れられるようになったのが特に嬉しいです。

GitHub Copilot 使いの方は頭に入れておくと良いですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Amazon CloudWatch Logsの異常検出をCloudFormationで設定してみた #AWSreInvent | DevelopersIO
https://dev.classmethod.jp/articles/create-cloudwatch-logs-anomaly-detector-with-cloudformation/

Amazon CloudWatch Logs に異常検出機能が追加されました。この記事は、クラメソさんによる異常検出機能の紹介と試してみた内容になります。
異常検出機能（[log anomaly detection](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/LogsAnomalyDetection.html)）はロググループに新たなパターンのログイベントがあると異常だと検出する機能のようです。

記事では、実験用 Lambda の作成から始まり、異常検出機能の CloudFormation による設定、トレーニング完了後に Lambda で ERROR ログを発生させて異常検出が発生するか確認するという流れになっています。
実際の画面を貼ってくれているためどんなものかイメージが湧きやすいです。

異常検出機能自体は無料とのことなので、CloudWatch Logs を使っている方はぜひ試してみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Trigger pipelines from anywhere: inbound webhooks now in preview - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/trigger-pipelines-from-anywhere-inbound-webhooks-now-in-preview/49864

## IAM Access Analyzer updates: Find unused access, check policies before deployment | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/iam-access-analyzer-updates-find-unused-access-check-policies-before-deployment/

## Announcing Deno Cron 
https://deno.com/blog/cron

Deno に cron 機能が追加され、Deno がホスティングしている Deno Deploy の環境で簡単にスケジュール実行ができるようになりました。

```ts
// ブログのサンプルコードより
Deno.cron("Sample cron job", "*/10 * * * *", () => {
  console.log("This will run every 10 minutes");
});
```

デプロイする.ts にこのようなコードを書くと、 `Deno.cron()` のブロック内のコードをスケジュールで実行してくれるようになります。非常にシンプルですね。

Deno は既に Deno KV や Deno Queues などちょっとした DB 的な機能も既に提供しており[^deno_kv_beta]、Deno Deploy の環境では自分で DB を用意しなくてもこれらの機能を使うことで永続化やキューイングなどが可能です。そこに今回の cron が追加されたことで、ちょっとした自動化のスクリプトなどを動かすのに便利な環境になりそうだなと思いました。

[^deno_kv_beta]: 2023/12/18 時点ではまだ beta ではあります。

自分も早速以前に作成した bluesky へ自動ポストする bot を Deno Deploy + Deno KV で動かそうと試しています。

https://zenn.dev/kesin11/articles/20230623_hatenab_to_bsky

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# know-how 🎓

## CIを高速化する技術⚡️ - 10X Product Blog
https://product.10x.co.jp/entry/2023/12/01/113134

## ついに最強のCI/CDが完成した 〜巨大リポジトリで各チームが独立して・安全に・高速にリリースする〜 - ZOZO TECH BLOG
https://techblog.zozo.com/entry/the-best-cicd

## Starting Detection Engineering in Ubie
https://zenn.dev/mizutani/articles/start-de-ubie

## Terraform職人のためのOpenTofu入門 #Terraform - Qiita
https://qiita.com/minamijoyo/items/16d1b5b15a60d17e350a

[tfmigrate](https://github.com/minamijoyo/tfmigrate) や [tfupdate](https://github.com/minamijoyo/tfupdate) といった Terraform の補助ツールを開発していることで有名な [@minamijoyo](https://github.com/minamijoyo) さんによる、OpenTofu[^opentofu]入門記事です。（タイトルにもあるとおり Terraform をすでに使っている人向けです。）

Terraform と OpenTofu を取り巻く事情や歴史的背景や OpenTofu と Terraform の技術面・文化面での違い、OpenTofu の今後の展望(CNCF への参加についても)などが詳細に書かれており、大ボリュームな内容となっています。

Terraform との違いについては、レジストリ、プロバイダ、tfstate や test フレームワークなど、大きな機能ごとに比較しており、OpenTofu を試したことがない人でも Terraform との違いをある程度把握できます。

Terraform の Go パッケージがほとんど `internal/` 以下に移動していたり、コミュニティからは設計レベルの変更を最近受け付けてなかったりといった、Terraform の OSS としての事情は正直なところ全然知らなかったため、大変勉強になりました。
OpenTofu ではコア機能をライブラリ化したり、RFC により設計変更を提案できるようにする方針であったりと、コミュニティでソフトウェアを育てていく思想であるようなので、個人的にはとても良いなと思っています。
最初登場した時は混沌となるからあまり歓迎していなかったのですが、この記事を読んで考えが大きく変わりました。今後が楽しみです。

OpenTofu に興味が湧いてきた方はぜひこの記事をお読みください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^opentofu]: OpenTofu 自体は[これまでもちょいちょい紹介してきました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230913?redirected=1#the-opentf-fork-is-now-available!)ね。

## Amazon Linux 2023を触ってみて質問がありそうなことをまとめてみました。 | ソフトウェア開発のギークフィード
https://www.geekfeed.co.jp/geekblog/amazonlinux2023-al2023/

## GitHub Actions workflowが完了したらデスクトップ通知を出す - valid,invalid
https://ohbarye.hatenablog.jp/entry/2021/05/01/desktop-notification-on-ci-finish

## そのテスト、最後まで実行されていますか？　jestとnpm-run-allの恐るべき罠
https://zenn.dev/babel/articles/jest-npm-run-all-for-babel

最初は CI が不安定な原因の調査したところ、Jest がメモリ不足で完走できていなかったことが原因だと判明したので対処した話。で終わるかと思いきや、実は隠れていた npm-run-all の問題によって今まで実はテストが最後まで走っていなかったことが判明したという二重に恐ろしい話でした。

`npm-run-all` は自分も Node.js のプロジェクトで利用していたのですが、新しいバージョンがもう長いことリリースされていなかったことは知りませんでした。この機会に他の方法を検討しようと思います。

それと記事中では前半の Jest のメモリ不足の内容で軽く紹介されていただけですが、`catchpoint/workflow-telemetry-action` で GitHub Actions のジョブのメトリクスを簡単に見られるのは便利そうだと思いました。CI のマシンは以外と低スペックだったりするので、開発マシンと比較して動作が謎に不安定な場合は CPU やメモリが不足していないかを確認することを覚えておきたいです。

https://github.com/catchpoint/workflow-telemetry-action


_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub Enterprise Server 3.11 is now generally available - The GitHub Blog
https://github.blog/2023-12-05-github-enterprise-server-3-11-is-now-generally-available/

GitHub Enterprise Server 3.11 が GA になりました 🎉

追加された機能はたくさんありますが、個人的に便利そうな機能をいくつか紹介します。

- [Repository rules (Ruleset とも呼ばれることがある)](https://docs.github.com/en/enterprise-server@3.11/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [リポジトリ横断のセキュリティアラートのダッシュボード](https://docs.github.com/en/enterprise-server@3.11/code-security/security-overview/assessing-code-security-risk)
- [fine-grained token や GitHub Apps が API を呼び出す際に不足している権限の情報をサーバーが返すようになった](https://docs.github.com/en/enterprise-server@3.11/rest/using-the-rest-api/troubleshooting-the-rest-api?apiVersion=2022-11-28#resource-not-accessible)

リリースノート全体はこちら。

https://docs.github.com/en/enterprise-server@3.11/admin/release-notes


_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# tool 🔨

## GitHub-hostedライクにAmazon ECSとAWS Lambdaでself-hosted runnerを管理するツールを作った | なぜにぶろぐ
https://blog.whywrite.it/2023/12/04/release-myshoes-serverless-aws/

whywaita/myshoes-serverless-aws のコードを読んでみる
https://blog.uta8a.net/post/2023-12-06-reading-myshoes-serverless-aws

## 特に個人開発者向け！CodeRabbit(自動レビューツール)を使えばコードの健康まで得られることに気づいた話 
https://zenn.dev/binnmti/articles/7e3690ebe80951

## CI/CD Litmus Test: CI/CD レベルを測定しよう！ - kakakakakku blog
https://kakakakakku.hatenablog.com/entry/2023/11/28/181118

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
