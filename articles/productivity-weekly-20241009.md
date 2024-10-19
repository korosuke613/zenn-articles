---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-10-09)
emoji: 🫧
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241009
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
今週は 2024-10-09 単独号です。

今回が第 165 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

:::message
2024-10-02 号は Productivity Weekly が開催されなかったためお休みです。
:::

# news 📺

## GitHub Copilot now available in github.com for Copilot Individual and Copilot Business plans - The GitHub Blog
https://github.blog/news-insights/product-news/github-copilot-now-available-in-github-com-for-copilot-individual-and-copilot-business-plans/

GitHub Copilot in GitHub.com の一部の機能を Copilot Individual と Copilot Business プランのユーザーでも使えるようになりました（プレビュー）。これまでは Copilot Enterprise プランでのみ利用可能でした。

GitHub.com 上で Copilot Chat が使えるようになることで、任意のリポジトリに関する質問が手軽にできるようになったり、プルリクエストのサマリーを Copilot に作成させたり、失敗した Actions のジョブの分析をさせたりできます。

Individual ユーザはすぐに利用できますが、Business ユーザは管理者による有効化が必要になります。使いたい場合は管理者に許可を取りましょう。

なお、プレビュー機能であるため、通常の規約とは異なりプレリリース規約が適用されます。規約を確認した上で利用するようにしましょう。

https://x.com/GitHubJapan/status/1839472005718139083

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Introducing “CI/CD Admin” – A New Pre-Defined Organization Role for GitHub Actions - GitHub Changelog
https://github.blog/changelog/2024-09-25-introducing-ci-cd-admin-a-new-pre-defined-organization-role-for-github-actions/

GitHub の定義済み Organization Role において、新たに CI/CD Admin ロールが追加されました。このロールには、GitHub Actions に関する設定を行うための権限が付与されています。

2024 年 3 月に GitHub Actions に関する権限を設定できるようにはなっていたため、カスタムロールとして独自に同じロールを作ることはできましたが、カスタムロールの上限が 10 個しかないことと、デフォルトでロールが用意されている方が使いやすいことから、このロールの追加は嬉しいです。

GitHub Actions に関する権限は渡したいが、Organization Admin 権限は渡したくない、という場合は珍しくないと思うので、積極的に活用していきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Actions: new images and ubuntu-latest changes - GitHub Changelog
https://github.blog/changelog/2024-09-25-actions-new-images-and-ubuntu-latest-changes/

GitHub Actions において、Ubuntu 24.04 ランナーが GA となり、今後 `ubuntu-latest` が徐々に 24.04 に切り替わっていくことが発表されました。

移行は 10/30 までに完了します。それまでは 22.04 と 24.04 が同じラベルで混在することになるので、両方のバージョンで動くようにするか、あるいは `ubuntu-22.04` などの明示的なバージョン指定をするのが良いです。

また、この記事ではついでに macOS 15 ランナーがパブリックべーたとして利用可能になったことも紹介されています（なぜ別の changelog としないのか...）。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Repository level Actions Usage Metrics - public preview
https://github.blog/changelog/2024-10-01-repository-level-actions-usage-metrics-public-preview

[GitHub において、今年 7 月に GA となった Actions Usage Metrics ](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240731#actions-usage-metrics-is-generally-available---the-github-blog)ですが、リポジトリレベルでも見られるようになりました（プレビュー）。これまでは GitHub Enterprise Cloud の Organization レベルでのみ利用可能でした。

Changelog では次のように、GitHub Enterprise Cloud 利用者向けに使えるようになる旨が書かれています。

> Actions Usage Metrics is in public preview for all GitHub Enterprise Cloud customers at the repository level.

しかし、実際のところ READ 権限のあるリポジトリでは Enterprise と関係なくても利用可能なようです。

![](/images/productivity-weekly-20241009/actions-usage-metrics.png)
*これは自分のリポジトリ https://github.com/korosuke613/zenn-articles/actions/metrics/usage*

上記は自分がオーナーのリポジトリですが、[facebook/react](https://github.com/facebook/react/actions/metrics/usage) のように関わりのないリポジトリでも利用できました。
てっきり GHEC の Enterprise 配下リポジトリだけの話かと思っていましたが、もしかしたら GHEC のユーザーであるかどうかだけで判断されているのかもしれません。

Actions Usage Metrics を使ってどういうワークフロー、ジョブに時間がかかっているかを分析してみましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Evolving GitHub Issues (Public Preview) - GitHub Changelog
https://github.blog/changelog/2024-10-01-evolving-github-issues-public-preview/
GitHub の Issue が刷新されます（プレビュー）。Issue の親子関係を設定できるようになったり、ラベルとは別に Issue のタイプ（Bug、Feature、Initiative、Task）を設定できるようになったり、検索にカッコを使えるようになったり、UI が若干変わったりしています。

親子関係やタイプは登場したばかりで上手く使うのが難しい気がしますが、便利そうならどんどん使ってみましょう（API や Webhook でのペイロードがどうなるのか気になる）。

現在は Organization 単位でパブリックベータとなっています。使いたい方は waitlist に登録しましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Amazon ElastiCache and Amazon MemoryDB announce support for Valkey | AWS Database Blog
https://aws.amazon.com/jp/blogs/database/amazon-elasticache-and-amazon-memorydb-announce-support-for-valkey/

## Streamlined coding, debugging, and testing with GitHub Copilot Chat in VS Code - GitHub Changelog
https://github.blog/changelog/2024-10-03-streamlined-coding-debugging-and-testing-with-github-copilot-chat-in-vs-code/

## Visual Studio Code September 2024
https://code.visualstudio.com/updates/v1_94

## Copilot Chat in VS Code upleveled with new GitHub skills - GitHub Changelog
https://github.blog/changelog/2024-10-07-copilot-chat-in-vs-code-upleveled-with-new-github-skills/

## AWS、生成 AI を活用したバーチャルアシスタント AWS re:Post Agent を発表 - AWS 
https://aws.amazon.com/jp/about-aws/whats-new/2024/09/aws-re-post-agent-generative-ai-powered-virtual-assistant/

# know-how 🎓

## terraform-aws-provider 5.68.0 で非推奨になった aws_iam_role の inline_policy の改修を行ったときのメモ✍️
https://sadayoshi-tada.hatenablog.com/entry/2024/09/28/150009

## BunでNode.jsのツールをSingle-file executable binaryにしてバイナリを配布する | Web Scratch
https://efcl.info/2024/10/06/bun-single-file-executable-binary/

## GA になった BigQuery の history-based optimizations で SQL が最適化されるか確認してみた。
https://dev.classmethod.jp/articles/ga-bigquery-history-based-optimizations-sql-check/

## [アップデート] AWS CodePipeline で CodeBuild セットアップなしでコマンド実行が出来る新しいビルドアクション「Commands」を使ってみた
https://dev.classmethod.jp/articles/codepipeline-action-commands/

## 「GitHub CI/CD実践ガイド」イベント基調講演ダイジェスト＋FAQ #Forkwell_Library
https://zenn.dev/tmknom/articles/github-cicd-book

最近あったイベントの発表者自身によるブログまとめ
https://forkwell.connpass.com/event/326361/

## つよつよリーダーが 抜けたらどうする？ 〜ナビタイムのAgile⽀援組織の変遷〜
https://speakerdeck.com/navitimejapan/tuyotuyoridaga-ba-ketaradousuru-nabitaimunoagile-yuan-zu-zhi-nobian-qian

## Four Keysを活用してチームの開発生産性を改善した時のふりかえりの考え方と手法を紹介します - ZOZO TECH BLOG
https://techblog.zozo.com/entry/improve-mlops-team-capability

## 【新刊】2024年10月26日発売『エンジニアチームの生産性の高め方〜開発効率を向上させて、人を育てる仕組みを作る』
https://x.com/gihyo_hansoku/status/1843813933196685766

## 「みんなで金塊堀太郎」という施策で億単位のコスト削減を達成 & 表彰されました | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/47408/

# tool 🔨

## kellyjonbrazil/jc
https://github.com/kellyjonbrazil/jc

## Go製CLIツールGatling Commanderによる負荷試験実施の自動化
https://speakerdeck.com/okmtz/gozhi-cliturugatling-commanderniyorufu-he-shi-yan-shi-shi-nozi-dong-hua

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [End of life for Actions Node16 - GitHub Changelog](https://github.blog/changelog/2024-09-25-end-of-life-for-actions-node16/)
    - GitHub Actions の GitHub-hosted runner において、いよいよ Node.js 16 がデフォルトでインストールされなくなりました
    - [2024 年 6 月 30 日よりデフォルトの Node.js は 20 となっていました](https://github.blog/changelog/2024-05-17-updated-dates-for-actions-runner-using-node20-instead-of-node16-by-default/)が、Node.js 16 はインストールされたままであり、`ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true` 環境変数を設定することで引き続きデフォルトの Node.js を 16 とできていました
    - 今回インストールもされなくなったことで、この方法も使えなくなります
  - [Annotations in the GitHub Actions log view - GitHub Changelog](https://github.blog/changelog/2024-10-01-annotations-in-the-github-actions-log-view/)
    - GitHub Actions のジョブ詳細画面においてアノテーションが表示されるようになりました
    - これまではワークフローサマリーの画面にしか表示されなかったため、正直どのジョブのことなのかやジョブ詳細画面でのアノテーションの確認ができなくて不便でした
    - 便利になりますが、デフォルトで折りたたまれているので個人的には展開してほしいです（気づかないため）
- **know-how 🎓**
- **tool 🔨**

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
