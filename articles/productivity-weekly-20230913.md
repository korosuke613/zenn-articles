---
title: "Productivity Weekly (2023-09-13号, 2023-09-06号)"
emoji: "🗿"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230913"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-09-13, 2023-09-06 合併号です。

今回が第 124 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## ⚠️ Node.js 16 is now end of life, please upgrade to Node.js 18.
https://twitter.com/nodejs/status/1701309614263001569

[前々からアナウンスされていた](https://zenn.dev/korosuke613/articles/productivity-weekly-20220615#bringing-forward-the-end-of-life-date-for-node.js-16-%7C-node.js)通り、Node.js 16 が 9/11 に EOL となりました。

Node.js の LTS 後のサポートは LTS から数えて通常 2 年半続くのですが、Node.js 16 は依存してるソフトウェアのサポート終了に合わせて 7 ヶ月近く早い EOL となりました。

多くの方が現在の LTS である Node.js 18 へ移行済みかと思いますが、まだ移行していない方は早めに移行しましょう。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Node v20.6.0 (Current) | Node.js
https://nodejs.org/ja/blog/release/v20.6.0

Node.js の v20.6.0 がリリース
.env が組み込みでサポートされたそうな。

## Bun 1.0 | Bun Blog
https://bun.sh/blog/bun-v1.0

Bun 1.0 リリース🎉

## The OpenTF fork is now available!
https://opentf.org/fork

[先日、HashiCorp が OSS 製品のライセンスを BUSL に変更する発表を受け、Terraform を OSS として継続するための団体、OpenTF Foundation が爆誕しました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230816?redirected=1#opentf-foundation-%E7%88%86%E8%AA%95)。OpenTF Foundation は生まれましたが、Terraform を fork したリポジトリはまだ公開されていませんでした。

しかし、先日、OpenTF Foundation が Terraform の fork を公開しました。[opentffoundation/opentf](https://github.com/opentffoundation/opentf) です。ライセンスは変わらず MPL-2.0 です。

いまいちどこから fork したのかわかりませんが、opentf による最初のコミットは https://github.com/opentffoundation/opentf/commit/b9573d438bd539da85a72641330d4d600e926f1b のようです。

> **What will be the first release of OpenTF?**
>
> The first release will be 1.6.0-alpha, forked from the most recent commit that was still MPL-licensed.

FAQ によると、Terraform 1.6.0-alpha までは MPL ライセンスであるため、OpenTF の最初のリリースは 1.6.0-alpha までの変更が含まれていそうです。（ちなみに [1.6.0-beta からは BUSL となっています。](https://github.com/hashicorp/terraform/commit/b145fbcaadf0fa7d0e7040eac641d9aef2a26433)）

リポジトリは公開されましたが、OpenTF はまだリリースされていません。どうやら、Terraform Registry が Terraform 以外で使えなくなったため、独自のレジストリを準備中とのことです。

> Create initial OpenTF Registry. HashiCorp recently made some (unannounced) changes to the terms of the Terraform Registry, saying it may only be used with Terraform. To unblock the alpha release, we are launching an initial OpenTF Registry. We'll develop the official OpenTF Registry solution via an official RFC process later.

OpenTF Registry ができしだい、OpenTF がリリースされそうですね。

正直な話、個人的には Terraform の実装が分かれることでこれからの混沌は避けられないと思うので、あんまり歓迎はしていません。しかし、今まで Terraform で商売をしていた人たちにとっては死活問題なのでしょうがないのかなという気持ちです。

今後もウォッチしていきたいですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## actions/create-github-app-token: GitHub Action for creating a GitHub App Installation Access Token
https://github.com/actions/create-github-app-token

GitHub 公式で GitHub Apps のトークンを払い出すアクションが出た。

cybozu/octoken-action お役御免説...？

## マイクロソフト、お客様向けの Copilot Copyright Commitment を発表 - News Center Japan
https://news.microsoft.com/ja-jp/2023/09/12/230912-copilot-copyright-commitment-ai-legal-concerns/

Microsoft が Copilot Copyright Commitment を発表。
Copilot の出力を使用して第三者から著作権侵害で訴えられた場合、マイクロソフトは顧客を弁護し、訴訟の結果生じた不利な判決や和解の金額を支払うとのこと。
対象は、有償版の Microsoft の Copilot サービス（Word, Excel, PowerPoint の AI 支援機能も含む）、Bing Chat Enterprise、GitHub Copilot など。
利用者は Copilot 製品のガードレールとコンテンツフィルター機能を有効にしている必要がある。

## Dual Static IP ranges for GitHub-hosted Larger runners - The GitHub Blog
https://github.blog/changelog/2023-09-06-dual-static-ip-ranges-for-github-hosted-larger-runners/

Larger runner で IP 固定化を有効にした場合の IP レンジが 2 つに拡張されて今までの 500 並列制限を突破できるようになりました。
一方で既に IP 固定化を利用している場合でも IP レンジが拡張されるとのことなので、固定化された IP を通すような FW の設定をしていた場合はそちらも忘れずに修正する必要がありそう。

## Organization Archiving general availability - The GitHub Blog
https://github.blog/changelog/2023-09-06-organization-archiving-general-availability/

Organization をまるごとアーカイブする機能が GA。OSS みたいにコミュニティベースの org を閉じるときに便利なのかな？
Enterprise ならチームがまるごと解散した際にその Organization をまるごとアーカイブするとう使い道もあるかもしれない。

## Change your theme | Confluence Cloud | Atlassian Support
https://support.atlassian.com/confluence-cloud/docs/change-your-theme/

Confluence にダークテーマがきたよ．ダークテーマ大好き民のみんなは今すぐ変更だ！

## Built-in port forwarding | Visual Studio Code August 2023
https://code.visualstudio.com/updates/v1_82

VSCode に組み込みで ngrok みたいな機能が追加された。
https://code.visualstudio.com/docs/editor/port-forwarding
デフォルトは private モードで url にアクセスするためには自分と同じ GitHub アカウントが必要だが、public にすると本当に誰でもアクセスできる。

セキュリティ上の理由で ngrok みたいなサービスの利用を禁止する会社もあると思うので、これが標準機能で乗ってくるのはちょっとうれしくない気もする。

## Amazon Aurora and Amazon RDS announces Extended Support for MySQL and PostgreSQL databases
https://aws.amazon.com/jp/about-aws/whats-new/2023/09/amazon-aurora-rds-extended-support-mysql-postgresql-databases/

Aurora で postgres や MySQL のコミュニティのサポート終了後でも、バージョンアップグレード期間を延長してくれる課金サービスが出ました。
お世話になるべきではないサービスです。

## Amazon SES email receiving service expands to 7 new regions
https://aws.amazon.com/jp/about-aws/whats-new/2023/09/amazon-ses-email-service-7-regions/

SES のメール受信が東京リージョンでできるようになった。

## AWS Backup announces support for Amazon Aurora continuous backup
https://aws.amazon.com/jp/about-aws/whats-new/2023/09/aws-backup-amazon-aurora-continuous-backup/

AWS Backup から Aurora の継続バックアップが取れるようになったらしい。Aurora にはポイントインタイムリカバリという同様の機能があるが、それは今までは AWS Backup からは操作できなかったとのこと。AWS Backup の立ち位置がよく分からない。

# know-how 🎓

## Actions Runner Controller Deep Dive！ - APC 技術ブログ
https://techblog.ap-com.co.jp/entry/2023/09/01/182021
https://techblog.ap-com.co.jp/entry/2023/09/06/121449

Actions Runner Controller の解説記事。しかも最新の scale sets を使うバージョン。
さらに Docker in Docker を有効にする方法の解説もあり。

さらに次回作も予告されていて、次はいよいよコードの解説とのこと。

## octocovで任意のメトリクスを記録できるようにした（カスタムメトリクス） - Copy/Cut/Paste/Hatena
https://k1low.hatenablog.com/entry/2023/09/06/083000

GitHub Actions のみでカバレッジを表示できる octocov がカバレッジ以外に任意のデータも集計できるようになったようです。
go test -bench の結果を octocov が集計して pull-req に表示させる例が紹介されています。
工夫次第で色々使えそう。


## セキュリティ SaaS を「プログラマブル」に再設計した話 ― Shisho Cloud の正式リリースによせて - Flatt Security Blog
https://blog.flatt.tech/entry/shisho_cloud_ga_backyard
Shosho Cloud という Flatt Security 社のサービスが正式リリース。
AWS/Google Cloud 上のリソース設定をセキュリティに検査してくれるサービス
このブログではサービスの思想を紹介している。

## ZOZOTOWN AndroidチームにおけるQodanaを活用したビルドワーニングへの取り組み - ZOZO TECH BLOG
https://techblog.zozo.com/entry/zozotown-android-improve-build-warning

JetBrains 製の静的解析ツールの Qodana を GitHub Actions で実行した事例。

InteliJ 系の IDE のチェック機能と同等のものを外に出したツールなので各言語の Lint ツールとは全く別物という認識なのですが、無料のコミュニティ版だと JVM、Android、Python しか対応していないらしいのであまり興味が湧いていない
https://www.jetbrains.com/ja-jp/qodana/buy/

# tool 🔨

## Release v4.5.0 · suzuki-shunsuke/tfcmt
https://github.com/suzuki-shunsuke/tfcmt/releases/tag/v4.5.0

terraform の新しめの機能である import と moved についても表示できるようになった、ということだと思われます。

## Oktaが無料のパスワードマネージャ「Okta Personal」を公開 － Publickey
https://www.publickey1.jp/blog/23/oktaokta_personal.html

Okta が無料のパスワードマネージャを出したらしい．
現時点ではアメリカとカナダのみ利用可能で，今後利用できる国を拡大するんだって。

ちなみに，公式サイトには ChatGPT による謎の愛のポエムが書いている．こういう使い方でいいんだよ．
https://www.oktapersonal.com/

## Slack AI で、仕事をもっとスマートに | Slack
https://slack.com/intl/ja-jp/blog/productivity/product-innovations-dreamforce-2023


- [Slack AI | 新規登録 | Slack](https://slack.com/intl/ja-jp/ai)

以前の Slack GPT とは別っぽい...？
発表: https://slack.com/intl/ja-jp/blog/productivity/product-innovations-dreamforce-2023 を読むと、
チャンネルのハイライト - 要約
スレッドサマリー - 要約
質問と回答 - 検索
あたりが提供される。学習データには使用されないらしい。

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
