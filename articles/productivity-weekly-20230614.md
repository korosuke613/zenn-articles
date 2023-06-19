---
title: "Productivity Weekly (2023-06-14号)"
emoji: "🧁"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230614"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-06-14 単独号です。

今回が第 116 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## Announcing Live Tail in Amazon CloudWatch Logs, providing real-time exploration of logs
https://aws.amazon.com/jp/about-aws/whats-new/2023/06/live-tail-amazon-cloudwatch-logs/

めちゃ良い。CloudWatch logs アプリ開発時に最新みるの不便すぎたので。

- [[アップデート] Amazon CloudWatch Logs でリアルタイムでログを確認出来る Live Tail 機能が追加されました | DevelopersIO](https://dev.classmethod.jp/articles/live-tail-amazon-cloudwatch-logs/)

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## Release v3.5.3 · actions/checkout
https://github.com/actions/checkout/releases/tag/v3.5.3

actions/checkout、v3.5.3 で sparse checkout オプションが追加されました。
巨大モノレポで全部チェックアウトすると時間がかかるようなケースでご利用ください。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## GitHub Copilot Product Specific Terms の第三者から訴えられた場合は GitHub が最大 50 万ドルまで保護する話が消えている件
https://twitter.com/miyajan/status/1668433255924891649
https://twitter.com/miyajan/status/1668864479826939908

## Release v1.5.0 · hashicorp/terraform
https://github.com/hashicorp/terraform/releases/tag/v1.5.0

Terraform 1.5.0 リリース。
前に出た import ブロックとかが利用できるようになってるはずなので、楽しみですね。

# know-how 🎓

## 社内用GitHub Actionsのセキュリティガイドラインを公開します | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20230609-github-actions-guideline/

まだ読んでないけどめちゃ参考になりそう

## Developer experience: what is it and why should you care? | The GitHub Blog
生産性系の記事だったので。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# tool 🔨

## OrbStack
https://docs.orbstack.dev/

確かに早い気がする。まだ利用 30 分くらいだけど。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
  - [プログラミングのためのBGMなど、仕事や勉強の邪魔にならない無料で使えそうなBGM集。2023年版 － Publickey](https://www.publickey1.jp/blog/23/bgmbgm2023.html)
    - ある意味生産性向上ネタです。
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
