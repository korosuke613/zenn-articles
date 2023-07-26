---
title: "Productivity Weekly (2023-07-19号, 2023-07-05号)"
emoji: "🎸"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230705"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-07-05, 2023-07-19 合併号です。

今回が第 118 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## AWS CodeBuild が GitHub Actions をサポート開始
https://aws.amazon.com/jp/about-aws/whats-new/2023/07/aws-codebuild-github-actions/

Github Actions のセルフホストランナーとは関係なく、CodeBuild が actions（actions/setup-node とか）を解釈して実行できるようになったということか？？
確かに actions の中身は js とか Dockerfile だし、https://github.com/nektos/act みたいな Github Actions のエミュレータみたいな先行事例も存在するので可能そうではある。

リリースノートを見てもイマイチ分かっていないのですが、制約を見る感じそんな雰囲気を感じる。
https://docs.aws.amazon.com/codebuild/latest/userguide/action-runner.html
> Limitations of the GitHub action runner in CodeBuild

・github context はサポートしていないのでそれに依存している actions は動かない
・Docker container actions を使う場合は privileged mode が必要（CodeBuild 内で Docker in Docker するのかな？）

https://dev.classmethod.jp/articles/codebuild-github-actions/
https://developer.mamezou-tech.com/blogs/2023/07/12/githubactions-with-codebuild/

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## [新機能] 失敗したテストのみを再実行 (circleci tests run) - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/circleci-tests-run/48579

CircleCI において、失敗したテストのみを再実行できるようになりました。
失敗したビルドだけ再実行することは以前から可能でしたが、失敗したテストだけを再実行することはできませんでした。

この機能を使うためには、`circleci tests run` コマンドを使ってテストを実行する必要があります。これまで [`circleci tests split` を使ってテストの分割と並列実行をしていた](https://circleci.com/docs/ja/parallelism-faster-jobs/)場合は、テストの分割単位を使い回すことができるようです。

詳しくはドキュメントを参照ください。

- [失敗したテストのみを再実行する (プレビュー) - CircleCI](https://circleci.com/docs/ja/rerun-failed-tests/)

E2E テストなどで flaky な理由でたまにテストが落ちるようなとき、全部のテストをやり直さなくても済むようになるので、救われるプロジェクトは結構多そうですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Arm support for Docker executor (Preview) - CircleCI Changelog
https://circleci.com/changelog/#arm-support-for-docker-executor-preview

CircleCI の docker executor において、arm インスタンスを使えるようにする機能がプレビュー版で追加されました。

気になる消費クレジットについては、ディスカッションに載っています。例えば `arm-medium` (2 vCPU, 4GB RAM) は 13 クレジット/分です。同サイズの x86 インスタンスは 10 クレジット/分となっており、少しだけ高いですね。価格に関しては GA になると変更される可能性があります。

- [[Product Launch] ARM + Docker - Preview - Build Environment - CircleCI Discuss](https://discuss.circleci.com/t/product-launch-arm-docker-preview/48601)

今までも machine executor であれば arm インスタンスは使えましたが、machine executor だとコンテナ上でジョブを実行するという CircleCI の基本スタイルと異なります。

docker executor で arm インスタンスが使えるようになったことで、普通のジョブと同じ使い勝手のままコンテナを arm ネイティブで実行できるようになるので、開発メンバが Apple Silicon で開発してるとかデプロイ先の ECS が Arm オンリーみたいな環境である場合、CI/CD を含めて x86 コンテナを完全に不要にできます。
本番環境を arm にする場合、CI/CD のために x86 コンテナを用意しなければいけないや、エミュレーションによって遅くなるのを我慢しないといけないという問題が潜在的にあったのが解決されそうですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## New expandable event payload view is generally available in all audit logs | GitHub Changelog
https://github.blog/changelog/2023-06-28-new-expandable-event-payload-view-is-generally-available-in-all-audit-logs/

GitHub の Enterprise および Organization において、audit logs の WebUI で各イベントのペイロードを表示できるようになりました。
これまでは API を叩いたり [log streaming](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230426#api-requests-are-available-via-audit-log-streaming---public-beta-%7C-github-changelog) をしていないとペイロードを見られませんでした。

ペイロードで得られる情報は API、log streaming で得られる情報と同じで、例えば `repo.download_zip` の場合、ユーザーエージェントやトークンの種類（GitHub App server-to-server token）などが含まれています。

これまで詳細を知りたければ API を叩いたり、log streaming を有効化する必要がありましたが、これからは手軽に WebUI 上でログの詳細が見れるようになって良いですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Grouped version updates for Dependabot public beta | GitHub Changelog
https://github.blog/changelog/2023-06-30-grouped-version-updates-for-dependabot-public-beta/

Dependabot でアップデートのグループ化ができるようになりました。
パブリックベータ。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## AWS Lambda now detects and stops recursive loops in Lambda functions
https://aws.amazon.com/jp/about-aws/whats-new/2023/07/aws-lambda-detects-recursive-loops-lambda-functions/

AWS Lambda において、Amazon SQS または Amazon SNS 間での再帰的な呼び出しを検出して停止するようになりました。

具体的には、Lambda 上で特定のバージョン以降の AWS SDK の関数を使って SQS、SNS にイベントを送信すると、何回関数が呼び出されたか監視し、同じトリガーイベントで 16 回以上イベント送信が発生した場合に停止するようです。
検知すると、Lambda は次の呼び出しを停止した後、デッドレターキューなどにイベントを送信します。また、AWS Health ダッシュボードにも通知が来るようです。

また、この機能はオプションであるため、意図した挙動であれば無効化できます（デフォルトでオンになっている）。

意図せずループさせてしまい、意図しないコストが発生してしまうのを防ぐための施策となります。こういうのありがたいですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Improvements to granular access tokens on npm - The GitHub Blog
https://github.blog/changelog/2023-07-11-improvements-to-granular-access-tokens-on-npm/

npm にも GitHub の fine grained token のように read only やパッケージの範囲を絞れる新しいトークン形式が最近追加されていて、それの有効期限を完全に自由に設定できるようになったらしい。
allowing for durations that span multiple years. が嬉しいですね。セキュリティ的にはよろしくないだろうけど・・・

## GitHub Copilot 関係の更新

### Visual Studio Code June 2023
https://code.visualstudio.com/updates/v1_80#_github-copilot

Copilot にチャットで新しいプロジェクトをテンプレートから作ってもらったり、検索のための正規表現を作ってもらえるようになる。
正規表現を考えるのはちょっと手間なので便利そう

### GitHub Copilot July 14th Update - The GitHub Blog
https://github.blog/changelog/2023-07-14-github-copilot-july-14th-update/

GitHub Copilot for Business の API が beta で追加。今までは UI からシートを割り当てるしかなかったが API で行えるようになり、割り当て済みのアカウント情報に最後に使った日などの情報も入っているらしいので棚卸しに便利そう。
社内で Copilot のアカウント管理してくれている方に伝えたら喜ばれそう？

### Copilot June-2023 update - The GitHub Blog
https://github.blog/changelog/2023-06-29-copilot-june-2023-update/

GitHub Copilot の 6 月アプデまとめ。
- VSCode の Stable で Copilot Chat が使えるようになった
- VSCode で Copilot を使用してプルリクへのレビューコメントが書けるようになった
- コード補完の改善
- など

### GitHub Enterprise Server 3.9 is now generally available | The GitHub Blog
https://github.blog/2023-06-29-github-enterprise-server-3-9-is-now-generally-available/

GHES と github.com の Actions 関連の対応表
https://zenn.dev/kesin11/articles/gha_releasenote_ghes

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# know-how 🎓

## GitHub Copilot 関連

### GitHub Copilotの全社導入とその効果 - ZOZO TECH BLOG
https://techblog.zozo.com/entry/introducing_github_copilot

### サイバーエージェントのGitHub CopilotのAnalyticsデータを公開！利用開始から約3ヶ月でエンジニアの生産性は向上したのか？ | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/43059/

### A developer's guide to prompt engineering and LLMs - The GitHub Blog
https://github.blog/2023-07-17-prompt-engineering-guide-generative-ai-llms/

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## Docker Desktop for Macの代替ツールOrbStackを導入したら社内バックアップが停止してしまった話 – CloudNative Inc. BLOGs
https://blog.cloudnative.co.jp/18182/

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Introducing passwordless authentication on GitHub.com - The GitHub Blog](https://github.blog/2023-07-12-introducing-passwordless-authentication-on-github-com/)
  - [GitHub Actions – OIDC integration with AWS no longer requires pinning of intermediate TLS certificates](https://github.blog/changelog/2023-07-13-github-actions-oidc-integration-with-aws-no-longer-requires-pinning-of-intermediate-tls-certificates/)
    - GitHub Actions から AWS への OIDC でサムプリントをべた書きしないといけなかった件、対応されてべた書きする必要がなくなったそう
  - [GitHub Actions - Actions Runner General availability | GitHub Changelog](https://github.blog/changelog/2023-06-30-github-actions-actions-runner-general-availability/)
    - GitHub Actions セルフホストランナーの ARC と runner scale sets mode が GA に。
    - 早かったな
  - [GitHub CLI project command is now generally available! - The GitHub Blog](https://github.blog/2023-07-11-github-cli-project-command-is-now-generally-available/)
    - 新 Project を gh から操作できる gh-project の extension がアーカイブされて gh v2.31.0 から本体に取り込まれた。
    - 新 Project の API はたしか GraphQL が必要で、API を叩くために GraphQL のドキュメントとにらめっこするのが REST に比べるとかなり面倒だった記憶がある。
    - 今後は Project 関連の操作であれば github actions から gh を使うのが簡単そう。
- **know-how 🎓**
  - [iOS開発におけるGitHub Actions self-hosted runnerを利用したオンプレ CI/CD のすゝめ | CADC 2023](https://cadc.cyberagent.co.jp/2023/sessions/ios-github-actions-self-hosted-runner/)
    - サイバーエージェントさんでセルフホストランナーを運用している whywaita さんの新作。
    - https://github.com/utmapp/UTM で macOS の VM を使うことで、mac でもジョブごとにランナーを使い捨てる運用ができてる。
    - ちなみに macOS 上で VM を立てる場合はライセンス条項が色々面倒なので注意です
- **tool 🔨**
  - [Introducing new and updated models to Azure OpenAI Service - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/ai-cognitive-services-blog/introducing-new-and-updated-models-to-azure-openai-service/ba-p/3860351)

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
