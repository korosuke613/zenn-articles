---
title: "Productivity Weekly (2023-09-27号)"
emoji: "🏥"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230927"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-09-27 単独号です。

今回が第 126 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## OrbStack 1.0: Fast, light, easy way to run Docker containers and Linux
https://orbstack.dev/blog/orbstack-1.0

[Docker Desktop 代替である OrbStack](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230830#orbstack-%E3%81%A7-k8s-%E3%82%AF%E3%83%A9%E3%82%B9%E3%82%BF%E3%82%92%E7%B0%A1%E5%8D%98%E3%81%AB%E4%BD%9C%E3%82%8C%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB) のベータ期間が終わり、v1.0 がリリースされました。これまでは商用非商用関わらず無料でしたが、ベータ期間が終わったことでとうとう商用利用が有償となりました。現在商用利用している方は、30 日以内（10/21 くらいまでに？）に有償ライセンスを購入する必要があります。

> The app is free for personal, non-commercial use. You must purchase a Pro or Enterprise license for freelance, business, and other commercial use within 30 days. Contact us if you have questions.

Plan は Free、Pro、Enterprise の 3 種類があります。

- Free
  - 価格: $0
  - 個人で非商用利用のみ
- Pro
  - 価格: $8/user/month (yearly) or $10/user/month (monthly)
  - 商用利用可能
  - 優先サポート付き
  - Organization で一括購入可能
- Enterprise
  - 価格: お問い合わせ
  - SAML SSO 利用可能

Individual と Organization の概念があり、Individual（個人）で Pro プランを契約できます。
もし組織として購入を一括で行いたい場合は Organization を作成し、各アカウントを紐づけて行きましょう。

とうとう OrbStack が商用利用有償化しましたが、個人的には OrbStack はとても軽快で使いやすい Docker Desktop 代替なので、お金を払ってでも使って行きたいですね。

各種リンク:
- [Pricing · OrbStack](https://orbstack.dev/pricing)
- [Licensing · OrbStack Docs](https://docs.orbstack.dev/licensing)
- [平木場が色々調べたやつ](https://x.com/shitimi_613/status/1704891867593339194)

:::message
ちなみに、[これが発表された段階](https://x.com/OrbStack/status/1704883390569443558)では、Licensing ページもなければ、Beta 期間中に使ってたユーザの契約までの猶予期間も設定されてなく、めちゃくちゃてんやわんやしました。その後 `within 30 days` の文言が追加されたり Licensing ページが追加されたりしましたが、最初から用意していてほしかったです。
残念ながら Docker Desktop 方式（商用利用ならライセンス買え）スタイルなので、組織としては対応がまあまあめんどいです。
それでも Docker Business よりよっぽど安いので、個人的には嬉しいですね。
:::

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## partial checkout (--filter) オプション追加 - Release v4.1.0 · actions/checkout
https://github.com/actions/checkout/releases/tag/v4.1.0

actions/checkout に partial clone (`git clone --filter`) のオプションが追加されました。partial clone を設定すると大規模なリポジトリにおいて clone や fetch を高速化できるケースがあります。

partial clone 自体の説明は GitHub 公式の解説記事（[英語](https://github.blog/2020-12-21-get-up-to-speed-with-partial-clone-and-shallow-clone/)、[日本語](https://github.blog/jp/2021-01-13-get-up-to-speed-with-partial-clone-and-shallow-clone/)）が詳しいです。
ちなみに [v3.5.3](https://github.com/actions/checkout/releases/tag/v3.5.3) でリリースされた sparse checkout と partial clone との違いなどについてはこちらの記事も図解入りで分かりやすいのでおすすめです。

https://swet.dena.com/entry/2021/07/12/120000

最近は git 自体に大規模リポジトリをうまく扱うための機能が色々追加されているのですが、sparse checkout や partial clone など主要なものは actions/checkout からでもかなり使えるようになってきました。基本的には actions/checkout のデフォルトの挙動は CI 向きになっているため新しいオプションの指定は必ずしも必要ありませんが、大規模なリポジトリを扱っている場合には一度調べてみると良いかもしれません。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub Actions: Transitioning from Node 16 to Node 20 - The GitHub Blog 
https://github.blog/changelog/2023-09-22-github-actions-transitioning-from-node-16-to-node-20/

[actions/runner の方では既にリリース済み](https://github.com/actions/runner/releases/tag/v2.308.0)でしたが、JavaScript の action を実行するための Node.js のバージョンが 16 から 2024 年春を目処に 20 へ移行されることが正式にアナウンスされました。
action 作者の方は Node.js 16 から 20 へのアップデート対応をしていきましょう。

_アップデートの際には公式の各種 actions のように major バージョンを上げてリリースしてもらえると今しばらく Node.js 16 を使わざるを得ない GHES ユーザーは助かります_

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub Actions - Force cancel workflows - The GitHub Blog 
https://github.blog/changelog/2023-09-21-github-actions-force-cancel-workflows/

GitHub Actions のワークフローをキャンセルしても反応がなかった場合に force-cancel するための API が追加。

> Customers should still only use force-cancel if the workflow fails to respond to POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel.

とも書かれているので、基本的には最終手段として考えた方がよさそう。

## Passkeys are generally available - The GitHub Blog 
https://github.blog/2023-09-21-passkeys-are-generally-available/

github.com で passkey が GA。

## Amazon Corretto 21 is now generally available
https://aws.amazon.com/jp/about-aws/whats-new/2023/09/amazon-corretto-21-generally-available/

はやい。

## GitHub Copilot Chat beta now available for all individuals - The GitHub Blog
https://github.blog/2023-09-20-github-copilot-chat-beta-now-available-for-all-individuals/

個人ユーザにも GitHub Copilot Chat が来たそうです．俺は使ったことないけど，使ったことある人の感想求ム．

# know-how 🎓

## RenovateでGitHub成果物のチェックサムを更新する - プログラムモグモグ 
https://itchyny.hatenablog.com/entry/2023/09/22/140000

Renovate の regexManager を活用してシェルスクリプトや Dockerfile 中で curl でダウンロードしてくるツールのバージョンの更新に加えてチェックサムの値も自動で更新する方法が紹介されてます。



# tool 🔨

## 組織でのはてなブログ運営をGitHub上で行うためのテンプレートリポジトリ「HatenaBlog Workflows Boilerplate」を公開しました - はてなブログ開発ブログ 
https://staff.hatenablog.com/entry/2023/09/21/182000

GitHub 上ではてなブログの下書きやレビューをするために必要な GitHub Actions などの一式が揃っているようです。

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
