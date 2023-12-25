---
title: "＜ここにタイトルを入力＞：Productivity Weekly (2023-12-13号)"
emoji: "🐁"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231213"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-12-13 単独号です。

今回が第 136 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## New Organization Repositories List Feature Preview - The GitHub Blog
https://github.blog/changelog/2023-12-06-new-organization-repositories-list-feature-preview/

## CSSで句読点括弧のカーニングができるようになるぞ！ 日本語が読みやすくなる最近サポートされた・近日サポートされるCSSの機能のまとめ | コリス
https://coliss.com/articles/build-websites/operation/css/css-4-features-for-i18n.html

CSS の話なので、生産性向上とかけ離れた話に見えるかもしれません。本記事を取り上げた理由は後述します。

生産性向上チームとして気になったのは「文字間のスペーシングに関するプロパティの追加」です。
特に日本語の文章はひらがな、カタカナ、漢字、英字、数字が混在するのが常で、英字、数字が混在する場合にスペースを入れた方が読みやすいというのがあります。
Google Chrome は今後、**デフォルトで** 英字、数字の前後にスペースを挿入することを計画しているようです。

※この挙動がデフォルトなのは、CSSWG によって定められているようで、Google Chrome の一存ではないことを添えておきます。
https://drafts.csswg.org/css-text-4/#text-autospace-property

2023 年 12 月現在はフラグを有効化しなければスペースは入りません。次のフラグを有効にするとスペースが入るようになります。
`chrome://flags/#enable-experimental-web-platform-features`

![](/images/productivity-weekly-20231213/compare_text_autospace.png)
*Wikipedia の Google のページを開いた図*

左がフラグを有効にしたウィンドウ、右がフラグを無効にしたウィンドウです。左の文章ではひらがな・カタカナ・漢字と英単語・数値の間にスペースが空いていることがわかります。

実は生産性向上チームメンバーの多くには日本語中の英単語・数値の左右に半角スペースを入れる習慣があります。
この Google Chrome の変更によって半角スペースを入れなくても良くなるかもしれない、ということで今後も半角スペースを入れ続けるかが問われています。

とはいえ、現状 Google Chrome だけで Firefox や Safari(WebKit) には来ていないですし、サービス提供者側次第では空白を入れない選択をとるかもしれないので、ますます空白を入れる入れないの溝が深まるだけかもしれません...
ちなみに私は半角スペースを入れる派です。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## RustでTestcontainers入門: テストコードから依存サービスを起動してテスト環境を作成する - kymmt
https://blog.kymmt.com/entry/testcontainers-rs

## cache を最適化して RuboCop の CI 実行時間を劇的に改善した話 - JMDC TECH BLOG
https://techblog.jmdc.co.jp/entry/20231211

## DevFest Tokyo 2023: Google Cloudでチームで安全にデプロイをする - Speaker Deck
https://speakerdeck.com/sakajunquality/devfest-tokyo-2023-introduction-to-cloud-deploy

## AWS の組織移行をしました - freee Developers Hub
https://developers.freee.co.jp/entry/aws-multi-account-mng

freee さんが既存の AWS Organizations 下のアカウントを新しい Organizations に全て移行したとのことで、意思決定の過程や移行でやることが書かれています。

AWS でのクラウド基盤構築におけるケイパビリティやその依存関係については私はよく理解していなかったので、勉強になりました。
私もきちんと読み込んで、基盤整備をやっていきたいと強く思いました。
https://docs.aws.amazon.com/whitepapers/latest/establishing-your-cloud-foundation-on-aws/working-with-the-capabilities.html

また生産性向上チームでも IaC は主に Terraform を使っていますが、Access Control Tower の Terraform 管理について公式でドキュメントがあるのは知りませんでした...！
https://docs.aws.amazon.com/controltower/latest/userguide/aft-getting-started.html

移行がブロックされる原因として「管理アカウント上に多くのワークロードがある」はわかるなぁという感じです。
Organizations を閉じて、新しい Organizations のメンバーに入れるのが現実的なのも納得です。

生産性向上チームとして、今後の Organizations のあり方を考えているところ、ちょうどこの記事を見つけることができました。
参考にさせていていだきます🙏

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
