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

CloudWatch Logs で最新のログをリアルタイムで閲覧できる機能「Live Tail」が追加されました。

ロググループの閲覧時に「自動再試行」というボタンを押すと数秒おきにリロードしてくれる機能がありますが、ロググループやログストリームを複数跨いで取得することはできませんでした。

今回追加された「Live Tail」では、指定したロググループにフィルターを適用することで、フィルターに合致したログをリアルタイムに取得できます。

試しに Live Tail を使ってみました。
WebSocket でフィルターに合致するログが飛んできていることを確認しました。ロググループを跨いで取得できています。

そこで流れてきたログの直前・直後のログを見たい時は、ログストリームのリンクをクリックすると、そのログの記録されたログストリームが開かれ、確認できるようになります。

なお、Live Tail 機能は従量課金で使用できます。
執筆時点（2023-06-26）では、無料枠があり、毎月 1,800 分の利用が無料です。
それを超えると、1 分あたり $0.01 かかります。

https://aws.amazon.com/cloudwatch/pricing/
※ 2023-06-26 現在、日本語のドキュメントでは Live Tail の記述がまだ無いので注意が必要です

便利そうですが、お金がかかるので停止するのを忘れないようにしましょう。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## Release v3.5.3 · actions/checkout
https://github.com/actions/checkout/releases/tag/v3.5.3

actions/checkout、v3.5.3 がリリースされました。

このリリースでは、`sparse-checkout` オプションが追加されています。
https://github.com/actions/checkout/pull/1369

指定したディレクトリやファイルのみチェックアウトすることができます。

また、cone モードの有効化・無効化を選択できるよう、`sparse-checkout-cone-mode` オプションが追加されています。
というのも、cone モードを有効化すると、ディレクトリの指定しかできません。
cone モードを無効化すると、パターンによってディレクトリやファイルを指定できるようになります。

ただし cone モードを無効化するとパフォーマンスが低下するため、基本的に有効化することが推奨されています [^cone] 。

[^cone]: [Git - git-sparse-checkout Documentation](https://git-scm.com/docs/git-sparse-checkout#_internalsnon_cone_problems)

巨大モノレポで全部チェックアウトすると時間がかかる場合、`sparse-checkout` オプションは有用そうです。

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
https://github.blog/2023-06-08-developer-experience-what-is-it-and-why-should-you-care/

より良い開発者体験への投資が、開発者の生産性に大きく影響することが書かれています。
以下に重要そうだなと思ったところを書き出してみました。

- 開発者体験を最適化するには、開発者が生産的で影響力があり、満足できるコラボレーション環境を作ること
- 今日のソフトウェア開発には様々なツール、テクノロジー、サービスが関わっており、開発者は複雑な環境を管理する必要がある
- 優れた DevEx は環境・プロセス・ワークフローの一貫性を高め、面倒な手動プロセスを自動化する
  - 結果、開発者の生産性向上、セキュリティの強化に繋がる
- [Forrester opportunity Snapshot](https://humanitec.com/blog/key-findings-from-forrester-opportunity-snapshot) によれば、回答者の 74% が「Dev Ex の向上は、開発者の生産性を向上させることができる」と回答している

生産性向上の恩恵がわかりやすく書かれています。

もし生産性向上がもたらす恩恵を他の人に伝えたい時は、この記事を見るよう薦めてみると良いかもしれません。

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
