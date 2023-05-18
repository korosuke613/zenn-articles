---
title: "Productivity Weekly (2023-05-17号)"
emoji: ""
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230517"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-05-17 単独号です。

今回が第 113 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## Private Access to the AWS Management Console is generally available
https://aws.amazon.com/jp/about-aws/whats-new/2023/05/aws-management-console-private-access/

AWSマネジメントコンソールへのアクセス制限。組織的には嬉しかったりする……かも？

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## GitHub Actions - Actions Runner Controller Public Beta | GitHub Changelog
https://github.blog/changelog/2023-05-10-github-actions-actions-runner-controller-public-beta/

## Terraform Cloud updates plans with an enhanced Free tier and more flexibility
https://www.hashicorp.com/blog/terraform-cloud-updates-plans-with-an-enhanced-free-tier-and-more-flexibility

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## Container Registry deprecation  |  Container Registry documentation  |  Google Cloud
https://cloud.google.com/container-registry/docs/deprecations/container-registry-deprecation

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## Google Cloud、クラウドで開発環境を提供する「Cloud Workstations」正式リリース。ゼロトラストのBeyondCorpとの統合など新機能 － Publickey
https://www.publickey1.jp/blog/23/google_cloudcloud_workstationsbeyondcorp.html


*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# know-how 🎓

## DevEx: What Actually Drives Productivity - ACM Queue
https://queue.acm.org/detail.cfm?id=3595878

DX 社（Four Keys の Nicole Forsgren とかプロダクティビティ界隈の人たちが集まって作られた会社）が出した、開発生産性を測定するための新しいアプローチについての論文。

このフレームワークは、DevEx を、フィードバックループ、認知負荷、フロー状態という 3 つの次元で測定する。
これら 3 つの次元それぞれを、perceptions（開発者の認識）と workflows（システムやプロセスに関する客観的なデータ）の 2 つの軸で把握する。
さらに、全体の指標となる KPI も設定する。

この手法は、ファイザーや eBay などの企業で実地検証された。
eBay では、リードタイムを6倍短縮し、リリースを2倍早くした。

## CTOの視点から見たAzure OpenAI ServiceとOpenAIのChatGPT APIの深堀り比較 - Qiita
https://qiita.com/lazy-kz/items/32e8e7c86bdce67beb48

Azure OpenAI Service 導入の方が良さげだなー。

関連: [Azure OpenAI Chat Completion General Availability (GA) | Microsoft Learn](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/whats-new#azure-openai-chat-completion-general-availability-ga)

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Edit workflow files on GitHub Mobile | GitHub Changelog](https://github.blog/changelog/2023-05-11-edit-workflow-files-on-github-mobile/)
    - 出先でgithub actionsのワークフロー間違いを修正できるようになったよ！
    - これでどこでも働けるね！
  - [CloudflareスタックにAIをもたらすConstellationの紹介](https://blog.cloudflare.com/ja-jp/introducing-constellation-ja-jp/)
    - Cloudflare Workers上で機械学習モデルを実行して、渡されたデータから推論した結果を出力できる
- **know-how 🎓**
  - [君はVS Codeのデバッグの知られざる機能について知っているか](https://qiita.com/_ken_/items/c5aa4841be74b06530b4)
    - 自分はもう3年以上VSCodeメインなのに全然知りませんでした……
- **tool 🔨**
  - [ellie/atuin: 🐢 Magical shell history](https://github.com/ellie/atuin)
    - Rust 実装のシェル履歴管理ツール
    - sqlite でシェルの履歴を保存して，インタラクティブに検索したり統計情報出したりできるそうな．
    - リモートに保存して異なる端末間で同期もできて，E2Eで暗号化してるらしい．
    - 触ってないけど便利そー

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
