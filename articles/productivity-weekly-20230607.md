---
title: "Productivity Weekly (2023-06-07号)"
emoji: "🚉"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230607"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-06-07 単独号です。

今回が第 115 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## Security enhancements to required approvals on pull requests | GitHub Changelog
https://github.blog/changelog/2023-06-06-security-enhancements-to-required-approvals-on-pull-requests/

GitHub のプルリクのブランチ保護や承認に関するセキュリティが強まるらしい。
現在展開中とのこと

ローカルで作成され保護されたブランチにプッシュされたマージコミットは、その内容がシステムで作成されたマージと異なる場合、却下されます。
古くなったレビューを却下するブランチ保護は、レビュー後にマージベースが変更されるたびに、承認を却下するようになりました。
プルリクエストの承認は、それが提出されたプルリクエストに対してのみカウントされるようになりました。

## GitHub Actions - Just-in-time self-hosted runners | GitHub Changelog
https://github.blog/changelog/2023-06-02-github-actions-just-in-time-self-hosted-runners/

ephemeral との違いがよくわかってないけどなんか来た。
あーもしかして常駐 VM でジョブ発生時に使い捨てランナー立ててくれるってことなのかな
それはそれでおもろそう。

https://twitter.com/Kesin11/status/1665335604366962688

## View repository pushes on the new activity view | GitHub Changelog
https://github.blog/changelog/2023-05-31-view-repository-pushes-on-the-new-activity-view/

activity という項目がリポジトリに対して追加された。全ブランチであったイベントを時系列で眺められるのが便利そう。
GitHub で Activity ビューが追加されました。リポジトリごとにどのようなアクティビティがあったか確認できます。アクティビティやユーザーで絞り込んだりできます。
git clone やダウンロードといったものはここに表示されないので、完全な証跡としては使えなさそう。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*


## Notion Projects 
https://www.notion.so/product/projects

Notion に Timeline の View がついて、プロジェクト管理ツールとしてより機能が増えた印象
GitHub Project にも date を書ける場所が増えてたし、最近プロジェクト管理ツールがアツい

# know-how 🎓

## コンテナのセルフホストランナーの中でコンテナを使えるようにするrunner-container-hooks
https://zenn.dev/kesin11/articles/20230514_container_hooks

jobs..services とか jobs..container や、各ステップで uses: docker:// とかする際、VM ではなくコンテナ方式の self-hosted runner でどうやって実現しているかの話でした。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*


## オフライン「リハビリ」勉強会をやってみたらだいぶ良かった！ - BASEプロダクトチームブログ
https://devblog.thebase.in/entry/2023/06/07/110000

生産性向上チームもイベントのハイブリッド開催にシフトしていこうとしてますし，ぶっつけ本番よりもこういうリハビリ挟んだ方がいいかも？

## AWS CLI を使いこなそう ! ~ 2 種類の補完機能 / aws sso / yaml-stream の紹介 - 変化を求めるデベロッパーを応援するウェブマガジン | AWS
https://aws.amazon.com/jp/builders-flash/202306/handle-aws-cli/?awsf.filter-name=*all

aws cli の補完ってみんなどんな感じですか？
aws sso login --profile my-dev-profile こんな感じで使う。AWS_PROFILE と組み合わせて aws sso login できるように

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# tool 🔨

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
