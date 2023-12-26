---
title: "Deno cronやOpenTofu、CI高速化など｜Productivity Weekly (2023-12-06号)"
emoji: "🐻"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231206"}
published_at: "2023-12-27 10:00"
---

:::message

<!-- textlint-disable @proofdict/proofdict -->

大変遅くなってしまいすみません。12 月はとにかく忙しかったです（あとネタ多すぎ）。
年内はあと 2023-12-13 号を予定しています。~~2023-12-20 号はなんとも言えない。~~

<!-- textlint-enable -->

:::

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
- [@Kesin11](https://zenn.dev/kesin11)

:::

# news 📺

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

10X さんによる、CI を高速化するためのテクニックや事例、取り組み紹介記事です。

キャッシュの利用やマシンスペックの最適化などの基本的なことはもちろん、テスト分割やジョブの依存関係・実行順序の見直しなどちょっとテクニカルなことも書かれています。高速化を実践してみて、改善前と改善後でどうテスト実行時間が変わったかなどの事例も載っています。

最後には著者が高速化を実現するために日々取り組んでいることが載っており、新たな高速化アイデアを作り出すのに参考になりそうです。
個人的には `「CI 遅い…待てない…」と日々思い続ける` が「わかる...」という気持ちになりました。だんだん慣れちゃうんですよねほんと。

各テクニックでは、CircleCI、GitHub Actions の両方でどうすればいいかのヒントも示してくれているため、とりあえずやってみるの精神で試し始められると思います。

できうる限りで CI を高速化していきたいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

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

## GitHub Actions workflowが完了したらデスクトップ通知を出す - valid,invalid
https://ohbarye.hatenablog.jp/entry/2021/05/01/desktop-notification-on-ci-finish

macOS において、GitHub Actions のワークフローが完了したらデスクトップ通知を出す方法を紹介する記事です。

macOS では AppleScript という言語を使うことにより、デスクトップ通知を出したりウィンドウを動かしたりといった操作ができます。
この記事では、AppleScript をターミナルから実行する組み込みコマンド osascript と GitHub CLI を組み合わせて、GitHub Actions のワークフローが完了したらデスクトップ通知を出す方法が紹介されています。
サンプルコードが書かれているため、すぐに試すことができます。

僕も使ってみたのですが、デスクトップ通知は気づかないことがあるので、アラートを出すようにしてみました。

```sh
alias ghn='gh run watch -i10 && osascript -e "display alert \"GitHub Actions workflow is done\" buttons {\"OK\"}"'
```

AppleScript では `display alert` でアラートを出せます[^apple_script_ref]。

![](/images/productivity-weekly-20231206/display_alert.png =400x)
*OK ボタンだけある*

例えば Flaky で時間のかかるようなテストを実行しなきゃいけない時などに、作業中にすぐにワークフローの実行完了を知ることができて（場合によっては re-run もできる）便利です。
割と簡単にできるので、似たようなことを考えている人はぜひ試してみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^apple_script_ref]: 参考にしたサイト: [AppleScriptの概要と主要コマンド(随時更新) - Kekeの日記](https://bobchan1915.hatenablog.com/entry/apple-script-abstract)

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

以前から GitHub Actions のセルフホストランナーをオートスケールさせるための [whywaita/myshoes](https://github.com/whywaita/myshoes) を作られている whywaita さんがそのノウハウを活かして ECS で手軽にオートスケール可能なセルフホストランナーの基盤を構築するための [whywaita/myshoes-serverless-aws](https://github.com/whywaita/myshoes-serverless-aws) を公開されました。


生産性向上チームの [@uta8a](https://zenn.dev/uta8a) が早速詳しい解説記事も公開してくれたので、詳しい仕組みが気になる方は whywaita さんの記事とあわせて uta8a さんの記事も参考になると思います。

https://blog.uta8a.net/post/2023-12-06-reading-myshoes-serverless-aws

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Introducing Amazon Q, a new generative AI-powered assistant (preview) | AWS News Blog](https://aws.amazon.com/jp/blogs/aws/introducing-amazon-q-a-new-generative-ai-powered-assistant-preview/)
    - AWS が AI アシスタント AmazonQ を発表しました（プレビュー）
    - 主にチャットベースのコミュニケーションをサポートしていそうです
    - Jira や GitHub などの外部サービスをデータソースとすることでチャットのカスタマイズも可能です
    - 外部データソースを簡単に繋げられそうなのは便利ですね。正式リリースが楽しみです
  - [AWS Lambda がログを送信する CloudWatch ロググループをカスタマイズ可能になり、複数の Lambda 関数のログを集約できるようになりました | DevelopersIO](https://dev.classmethod.jp/articles/aggregate-multiple-function-logs-aws-lambda/)
    - Amazon CloudWatch Logs において、Lambda のログを送信するロググループをカスタマイズできるようになりました
    - クラメソさんの記事ではロググループを集約する方法が紹介されていますね
    - 似たような Lambda 関数が多くある場合に便利そうです
  - [Trigger pipelines from anywhere: inbound webhooks now in preview - Announcements - CircleCI Discuss](https://discuss.circleci.com/t/trigger-pipelines-from-anywhere-inbound-webhooks-now-in-preview/49864)
    - CircleCI のパイプラインを Webhook でトリガーできるようになりました
    - これにより任意のタイミングでパイプラインを実行できるようになります
    - これまでも API でパイプラインを実行できましたが、Webhook を使うことでより簡単にパイプラインを実行できるようになります
      - また、Webhook Trigger の場合はコンフィグファイルのパスを指定できるようです
    - 例えば GitHub App でコメント時に CircleCI に Webhook を送ってコメントに返信するといったことも簡単にできるようになりそうですね
  - [IAM Access Analyzer updates: Find unused access, check policies before deployment | AWS News Blog](https://aws.amazon.com/jp/blogs/aws/iam-access-analyzer-updates-find-unused-access-check-policies-before-deployment/)
    - AWS の IAM Access Analyzer において、未使用のアクセス権限を検出できるようになりました（Unused Access Analyzer）
    - 元々の IAM Access Analyzer は S3 バケットや IAM ロールなどのリソースに対して、外部アクセス可能なものを検出する機能でした（無料）
    - 今回追加された Unused Access Analyzer は、IAM ポリシーやロール、ユーザのリソースに対して長らく未使用となっているもの検出する機能です（有料）
    - Organization 横断で各アカウントの未使用リソースを横断して調べることもできます
    - 定期的にチェックして余計な権限を削除していきたいですね
- **know-how 🎓**
  - [ついに最強のCI/CDが完成した 〜巨大リポジトリで各チームが独立して・安全に・高速にリリースする〜 - ZOZO TECH BLOG](https://techblog.zozo.com/entry/the-best-cicd)
    - ZOZO さんによる、巨大モノレポで複数チームが独立してリリースしていくためにどうしたかを紹介した記事です
    - これまでの背景や課題、刷新内容、刷新してどうなったかなどが書かれています
    - 巨大なモノレポでリリースを複数行うとなるとそうなるよなという困り事が詰まっていてどこも苦労してそうと思いました
  - [Amazon Linux 2023を触ってみて質問がありそうなことをまとめてみました。 | ソフトウェア開発のギークフィード](https://www.geekfeed.co.jp/geekblog/amazonlinux2023-al2023/)
    - GEEKFEED さんによる、今年正式リリースされた Amazon Linux 2023 に関するよくある質問まとめです
      - 公開日はちょっと古い（9 ヶ月前）ので、最新の情報かどうかは確認しましょう
    - これまでの最新版であった Amazon Linux 2 からの移行に関することや、2 との違いなどがいろいろ書かれており参考になります
    - 個人的には「`/var/log` 配下にログがない」みたいな情報は何も知らないと戸惑うのでありがたいです
      - とはいえ基本 Ubuntu しか触らないから Amazon Linux は本当に触る機会がない
  - [Starting Detection Engineering in Ubie](https://zenn.dev/mizutani/articles/start-de-ubie)
    - Ubie さんによる、セキュリティ監視の課題と取り組みを紹介した記事です
    - 著者が大事だと思う Detection Engineering の要素、内製予定のセキュリティ監視基盤について、セキュリティ監視基盤の課題などが書かれています
    - ログの集約、分析、検索、アラートポリシーの管理やアラート自動対応などが全て詰まった汎用的な基盤を独自に作る取り組みは面白いと思いました。実際セキュリティ基盤はバラバラに存在しがちなので、一元化したりニーズに合わせるにはこういう取り組みが必要なのかなと思いました
- **tool 🔨**
  - [特に個人開発者向け！CodeRabbit(自動レビューツール)を使えばコードの健康まで得られることに気づいた話](https://zenn.dev/binnmti/articles/7e3690ebe80951)
    - AI を使ったコードレビューツール CodeRabbit を紹介した記事です
    - PR のサマリーやファイルごとの変更の概要、懸念点に対するコメントなどを自動でしてくれるようです
    - 僕もプライベートで遊んでみたのですが、単純なミスはもちろんのことロジックの不備などパッと見わからないようなものも指摘してくれて、孤独な個人開発者には嬉しいのかなと思いました
  - [CI/CD Litmus Test: CI/CD レベルを測定しよう！ - kakakakakku blog](https://kakakakakku.hatenablog.com/entry/2023/11/28/181118)
    - AWS が公開している CI/CD のスコアやレベルを測定できるサイト CI/CD Litmus Test[^litmus]の紹介記事です
    - リポジトリを走査するような大掛かりなものではなく、複数の設問に Yes/No で答えていくだけのシンプルなものになっています
    - 試験後に著者が紹介している AWS の CI/CD に関するプラクティスのドキュメントを読みつつ自分らの CI/CD の改善点を洗い出していけそうですね

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^litmus]: Litmus Test はみんな大好きリトマス試験のことを表していそうですね。酸性・アルカリ性を測定する紙を使った試験で、中学校の理科かなんかでやった記憶。

# あとがき
<!-- textlint-disable @proofdict/proofdict -->

大変遅くなってしまいすみません。12 月はとにかく忙しかったです（あとネタ多すぎ）。
年内はあと 2023-12-13 号を予定しています。~~2023-12-20 号はなんとも言えない。~~

<!-- textlint-enable -->

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

