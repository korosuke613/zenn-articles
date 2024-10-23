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
- [@ajfAfg](https://zenn.dev/arjef)

:::

:::message
2024-10-02 号は Productivity Weekly が開催されなかったためお休みです。
:::

# news 📺

## End of life for Actions Node16 - GitHub Changelog
https://github.blog/changelog/2024-09-25-end-of-life-for-actions-node16/

## Actions: new images and ubuntu-latest changes - GitHub Changelog
https://github.blog/changelog/2024-09-25-actions-new-images-and-ubuntu-latest-changes/

## Introducing “CI/CD Admin” – A New Pre-Defined Organization Role for GitHub Actions - GitHub Changelog
https://github.blog/changelog/2024-09-25-introducing-ci-cd-admin-a-new-pre-defined-organization-role-for-github-actions/

## GitHub Copilot now available in github.com for Copilot Individual and Copilot Business plans - The GitHub Blog
https://github.blog/news-insights/product-news/github-copilot-now-available-in-github-com-for-copilot-individual-and-copilot-business-plans/

## Repository level Actions Usage Metrics - public preview
https://github.blog/changelog/2024-10-01-repository-level-actions-usage-metrics-public-preview

## Annotations in the GitHub Actions log view
https://github.blog/changelog/2024-10-01-annotations-in-the-github-actions-log-view

## Evolving GitHub Issues (Public Preview) - GitHub Changelog
https://github.blog/changelog/2024-10-01-evolving-github-issues-public-preview/

## Amazon ElastiCache and Amazon MemoryDB announce support for Valkey | AWS Database Blog
https://aws.amazon.com/jp/blogs/database/amazon-elasticache-and-amazon-memorydb-announce-support-for-valkey/

## Streamlined coding, debugging, and testing with GitHub Copilot Chat in VS Code - GitHub Changelog
https://github.blog/changelog/2024-10-03-streamlined-coding-debugging-and-testing-with-github-copilot-chat-in-vs-code/

## Visual Studio Code September 2024
https://code.visualstudio.com/updates/v1_94

VSCode の 9 月分の更新！　わいわい！

個人的に面白かった機能とその軽い説明は以下です:

- Public code matching in chat
  - Copilot Chat においても、GitHub Copilot が出力したコードが GitHub.com で公開されているコードと一致するか検査できるようになりました。
  - これまでは Chat では検査できませんでした。
  - 以下にこの機能をわかりやすく説明する画像を紹介記事から引用します:
    - ![Copilot Chat 内でコードが一致するか検査している様子](https://code.visualstudio.com/assets/updates/1_94/code-references.png)
- Drag and drop files to add chat context
  - ファイルのドラッグ&ドロップで Copilot Chat にコンテキストを追加できるようになりました。
  - これまでファイルをコンテキストに追加する場合、テキストでファイル名を記述する必要がありました。
  - 次のリンク先の動画がわかりやすいです:
    - https://code.visualstudio.com/assets/updates/1_94/copilot-attach-dnd.mp4

先月に引き続き Copilot Chat の改善が多かったです。そのほかにもたくさんの改善が入ってて、どんどん便利になっていて嬉しいですね。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Copilot Chat in VS Code upleveled with new GitHub skills - GitHub Changelog
https://github.blog/changelog/2024-10-07-copilot-chat-in-vs-code-upleveled-with-new-github-skills/

## AWS、生成 AI を活用したバーチャルアシスタント AWS re:Post Agent を発表 - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/09/aws-re-post-agent-generative-ai-powered-virtual-assistant/

# know-how 🎓

## terraform-aws-provider 5.68.0 で非推奨になった aws_iam_role の inline_policy の改修を行ったときのメモ✍️
https://sadayoshi-tada.hatenablog.com/entry/2024/09/28/150009

小ネタです。タイトルにある通り、terraform-aws-provider 5.68.0 にてリソース `aws_iam_role` の引数 `inline_policy` が非推奨になり、代わりにリソース `aws_iam_role_policy` の使用が推奨されています。この改修の際、ナイーブに Terraform コードから `inline_policy` を消して `aws_iam_role_policy` を使うと、Terraform ステートからは `inline_policy` が消えない問題があり、このままでは 2 つのポリシーがコンフリクトするので import を使おうね、という話です。

微妙にハマりがちポイントだと思うので、知っておくと改修の際に役立ちそうです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

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

## Four Keysを活用してチームの開発生産性を改善した時のふりかえりの考え方と手法を紹介します - ZOZO TECH BLOG
https://techblog.zozo.com/entry/improve-mlops-team-capability

## 【新刊】2024年10月26日発売『エンジニアチームの生産性の高め方〜開発効率を向上させて、人を育てる仕組みを作る』
https://x.com/gihyo_hansoku/status/1843813933196685766

## 「みんなで金塊堀太郎」という施策で億単位のコスト削減を達成 & 表彰されました | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/47408/

# tool 🔨

## kellyjonbrazil/jc
https://github.com/kellyjonbrazil/jc

主要なシェルコマンドの出力結果を JSON や YAML 形式の文字列に変換するツールです。変換をサポートするコマンドの数は、2024 年 10 月 22 日現在 169 となっています。以下に使用例を引用します:

```sh
$ dig example.com | jc --dig
[{"id":38052,"opcode":"QUERY","status":"NOERROR","flags":["qr","rd","ra"],
"query_num":1,"answer_num":1,"authority_num":0,"additional_num":1,
"opt_pseudosection":{"edns":{"version":0,"flags":[],"udp":4096}},"question":
{"name":"example.com.","class":"IN","type":"A"},"answer":[{"name":
"example.com.","class":"IN","type":"A","ttl":39049,"data":"93.184.216.34"}],
"query_time":49,"server":"2600:1700:bab0:d40::1#53(2600:1700:bab0:d40::1)",
"when":"Fri Apr 16 16:09:00 PDT 2021","rcvd":56,"when_epoch":1618614540,
"when_epoch_utc":null}]
```

発想はわかるけど本当にやったの！？というツールです。ここまで多くのパーサーを書くには眠れない夜もあっただろう。種々のシェルコマンドを駆使して出力結果の特定の部分だけ抜き出すのは場当たりすぎて大変がちなので、`jc` & `jq` のコンビで楽にシェル芸していきたいですね。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Go製CLIツールGatling Commanderによる負荷試験実施の自動化
https://speakerdeck.com/okmtz/gozhi-cliturugatling-commanderniyorufu-he-shi-yan-shi-shi-nozi-dong-hua

OSS の負荷試験ツール [Gatling](https://github.com/gatling/gatling) をもとに、次の 2 つのツールを作って運用している話です:

1. 並列処理により大規模な負荷をかけられる Gatling Operator
2. Gatling Operator による負荷試験で発生する細々とした作業を全自動化する Gatling Commander

もう少し詳しい説明は次の通りです。まず、Gatling 単体だと ZOZO さんが期待する負荷をかけられませんでしたが、仮想マシンの台数増加による手法はマシンの準備や実行タイミングの調整といった運用面の課題がありました。そこで、Kubernetes クラスタ上で複数の Gatling を実行する Kubernetes Operator [Gatling Operator](https://github.com/st-tech/gatling-operator) が開発されました。Gatling Operator により元々の課題は解決できましたが、また異なる運用上の課題が発生しました。それが Gatling オブジェクトの自動作成や負荷試験の自動停止を始めとするトイルです。このトイルを削減する目的で [Gatling Commander](https://github.com/st-tech/gatling-commander) が開発され、Gatling/Gatling Operator による負荷試験が全自動化されました。今後は、この負荷試験を定期実行して継続的にシステムのパフォーマンスを監視したいとのことです。

k8s による負荷試験の並列化に留まることなく、全自動化まで取り組まれていてめちゃくちゃすごいという気持ちです。全自動化まで行けると CI 上で実行できるのでめちゃくちゃ嬉しいですね。一方で、全自動化はどこかで割り切りが必要がちだと思っているので、自動化しづらいテストシナリオはなかったのかな？と少し気になりました。負荷試験の経験がほとんどないので、想像以上に自動化が効く分野の説もあります。
今後僕も大規模な負荷試験に関わることは全然考えられるので、手法の 1 つとして覚えておきたいです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

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
