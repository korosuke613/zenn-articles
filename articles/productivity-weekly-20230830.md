---
title: "Productivity Weekly (2023-08-30号, 2023-08-23号)"
emoji: "🚚"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230830"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-08-30, 2023-08-23 合併号です。

今回が第 123 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## Repository Actions Runners List - The GitHub Blog
https://github.blog/changelog/2023-08-21-repository-actions-runners-list/

Write 権限があれば登録ランナー一覧が Actions ページから見られるようになったらしい。

## Secret scanning detects secrets in issues for free public repositories - The GitHub Blog
https://github.blog/changelog/2023-08-16-secret-scanning-detects-secrets-in-issues-for-free-public-repositories/

元々リポジトリの git の歴史内にシークレットが含まれていないかを調べる secret scanning が issue にも適用範囲が広がった。対象は public リポジトリのみ。

## Announcing Python in Excel
https://techcommunity.microsoft.com/t5/excel-blog/announcing-python-in-excel-combining-the-power-of-python-and-the/ba-p/3893439

Excel の中で Python コードが書けるようになりました。
現在はベータチャンネルのみの提供。
Python コードは Microsoft クラウド上の隔離されたコンテナ内で実行されるとのことなので、クライアントサイド実行による脆弱性はなさそう。

## Terraform ephemeral workspaces public beta now available
https://www.hashicorp.com/blog/terraform-ephemeral-workspaces-public-beta-now-available

Terraform cloud にて ephemeral workspaces とやらがパブリックベータ。
TTL を設定して ephemeral な環境を作成できるらしい。

## Google Cloud のマネージド Terraform、 Infrastructure Manager 登場！
https://zenn.dev/cloud_ace/articles/introduce-infra-manager

Google Cloud がマネージドな Terraform の実行基盤的なものを提供したらしい（という理解で合ってるかなこれ？）中身の実行基盤としては Cloud Build と書かれているので良い感じにガワをラップした感じなのだろうか。

余談ですが、Google はこの手の IaC を k8s のリソースとして扱って管理できるようにする https://cloud.google.com/config-connector/docs/overview というものを以前から提供していたのでこっちに全力で振り切ってくるかと思いきや Terraform に歩み寄ってきたのが意外でした。

## GPT-3.5 Turbo fine-tuning and API updates
https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates

GPT-3.5 Turbo のファインチューニングが可能になり、ユーザー側でモデルをカスタマイズできるようになったよ。
GPT-4 のファインチューニングは今秋対応予定とのこと。
ファインチューニング API に送受信されるデータは OpenAI や他組織のモデルをトレーニングするために使われることはない。
トレーニングにはお金がかかるし、トレーニング後のモデルの利用による入出力でかかる料金はベースモデルの数倍になるっぽい。

## Upgrade with an Enterprise Account - The GitHub Blog
https://github.blog/changelog/2023-08-22-upgrade-with-an-enterprise-account/

github で　enterprise account が順次ロールアウト。enterprise account って何？

An enterprise account is coming to all Enterprise customers - The GitHub Blog
https://github.blog/2022-12-01-an-enterprise-account-is-coming-to-all-enterprise-customers/

Bring your enterprise together with enterprise accounts for all - The GitHub Blog
https://github.blog/2023-04-05-bring-your-enterprise-together-with-enterprise-accounts-for-all/

## Amazon Detective でセキュリティ調査を改善するために視覚化を強化
https://aws.amazon.com/jp/about-aws/whats-new/2023/08/amazon-detective-visualizations-security-investigations/

視覚化系がまた増えて便利になった話。

## Fig has joined AWS!
https://fig.io/blog/post/fig-joins-aws

みんな大好き Fig さんがどうなっていくのか？注目ですね。

## Google Cloud Domains、生き残るっぽい。レジストラは Squarespace Domains になるけど。
前はこんなこと言ってなかったよな？

> Cloud Domains will continue to be available before and after the closing of the transaction. Google will continue to offer customer support and will be responsible for billing your account. Cloud Domains UI, API and gcloud CLI will continue to be supported.

> クラウド ドメインは、取引の完了前も完了後も引き続きご利用いただけます。Googleは、引き続きカスタマーサポートを提供し、お客様のアカウントの請求に責任を負います。Cloud DomainsのUI、API、gcloud CLIは引き続きサポートされます。

令和最新版: https://support.google.com/domains/answer/13689670?hl=en

7/2 時点: https://web.archive.org/web/20230702090734/https://support.google.com/domains/answer/13689670

## OpenAI、企業向け「ChatGPT Enterprise」提供開始　高速GPT-4でプライバシーも安全

https://www.itmedia.co.jp/news/articles/2308/29/news095.html

## ## ［速報］Google Cloudの開発や問題解決をAIが支援してくれる「Duet AI in Google Cloud」がVSCodeなどで利用可能に。Google Cloud Next '23 － Publickey
https://www.publickey1.jp/blog/23/google_cloudaiduet_ai_in_google_cloudvscodegoogle_cloud_next_23.html

# know-how 🎓

## AWSコスト削減とリソース管理 | 外道父の匠
https://blog.father.gedow.net/2023/08/24/aws-cost-saving/

長文記事ですが、昔から AWS のインフラ周りを取り組まれていた方が AWS で節約するためのテクニックを公開してくれているので勉強になりました。

## iOS開発におけるGitHub Actions self-hosted runnerを利用したオンプレ CI/CD のすゝめ | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/43705/

6 月末に開催された CyberAgent Developer Conference2023 で発表されたセッションの書き起こし記事。GitHub Actions のセルフホストランナーのインフラ基盤をプライベートクラウドを利用して構築している話と、さらに今回 macOS のランナーも自前で用意して提供を始められたようです。

普通に mac をセルフホストランナーとして利用するとジョブごとに環境がクリーンにされないので認証情報が残ってしまうなどの問題が発生するのですが、macOS の VM を活用することでそのあたりの問題を解消し、macOS を提供している CI/CD サービスと同等の使い勝手を実現されたようです。
結果として今まで利用していた CI/CD サービスと比較してビルド時間が 1/3 にまで短縮できたとのことです。


## ZOZO TECH BLOGを支える技術 #2 執筆をサポートするCI/CD - ZOZO TECH BLOG
https://techblog.zozo.com/entry/techblog-writing-support-by-ci-cd

はてなブログへの投稿に CI/CD を適用し、textlint による文章構成、プレビュー用環境への自動デプロイ、本番公開を自動化している事例。公開自体はhttps://github.com/x-motemen/blogsync という CLI ツール利用している。

## GitHub Copilot Patterns & Exercises 🤖をリリースしました！🎉
https://twitter.com/yuhattor/status/1692005132362494191

## 「Datadog入れてみたらAWSの料金が爆発した話」@ゆるSRE勉強会 #1 - Speaker Deck https://speakerdeck.com/rynsuke/datadogru-retemitaraawsnoliao-jin-gabao-fa-sitahua-at-yurusremian-qiang-hui-number-1

やっぱどこも NAT ゲートウェイに悩まされるのだなぁ、と思った。

# tool 🔨

## dnakov/little-rat: 🐀 Small chrome extension to monitor (and optionally block) other extensions' network calls
https://github.com/dnakov/little-rat

chrome extension モニタできるのかー、というのが気になっている。
ソース見てから試してみたい。

## OrbStack で k8s クラスタを簡単に作れるように
https://twitter.com/OrbStack/status/1696431454434062745

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
