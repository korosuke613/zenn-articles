---
title: "Productivity Weekly (2023-05-10号)"
emoji: "⛺️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230510"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-05-10 単独号です。

今回が第 112 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
今週号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにします。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。
:::

# news 📺

## More secure private attachments | GitHub Changelog
https://github.blog/changelog/2023-05-09-more-secure-private-attachments/

宮田さんのツイート
https://twitter.com/miyajan/status/1655914766102298629?conversation=none

*本項の執筆者: [@defaultcf](https://twitter.com/defaultcf)*

## GitHub Actions: All Actions will run on Node16 instead of Node12 | GitHub Changelog
https://github.blog/changelog/2023-05-04-github-actions-all-actions-will-run-on-node16-instead-of-node12/

[以前より告知されていた](https://github.blog/changelog/2022-09-22-github-actions-all-actions-will-begin-running-on-node16-instead-of-node12/)通り、GitHub Actions において、5/18 より GitHub Actions で動作する全ての JavaScript アクションは Node.js v16 で動作するようになります。

元々 JavaScript アクションで指定できる Node.js のバージョンは v12 のみでした(`node12`)が、一昨年末から Node.js v16 も指定できるようになりました(`node16`)[^node16][^actions_can]。

5/18 以降は `node12` を指定しても Node.js v16 で動作するようになります。
（もとより Node.js v12 自体は 2022 年 4 月にサポートが終了しています。）

JavaScript アクションを開発している方でまだ `node12` を指定している方は `node16` でも動くようにアクションを更新しましょう。

そういや [Node.js 16 は 2023 年 9 月にサポート終了予定](https://nodejs.org/en/blog/announcements/nodejs16-eol)ですが、まだ `node18` は出ていませんね。

[^node16]: [JavaScript Actionsをnode16で動かすようにする - Kengo's blog](https://zenn.dev/korosuke613/articles/productivity-weekly-20220216#javascript-actions%E3%82%92node16%E3%81%A7%E5%8B%95%E3%81%8B%E3%81%99%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B---kengo's-blog)
[^actions_can]: [Actions can now run in a Node.js 16 runtime | GitHub Changelog](https://zenn.dev/korosuke613/articles/productivity-weekly-20220525#actions-can-now-run-in-a-node.js-16-runtime-%7C-github-changelog)

## GraphQL improvements for fine-grained PATs and GitHub Apps | GitHub Changelog
https://github.blog/changelog/2023-04-27-graphql-improvements-for-fine-grained-pats-and-github-apps/

github において fine-grained な PAT、および GitHub Apps で GraphQL が叩けるようになった。
とはいえ相変わらず有効期限が有限である問題は解決してないはずなのであまり選択肢には入らない気がする

## Secret scanning's push protection is available on public repositories, for free | GitHub Changelog
https://github.blog/changelog/2023-05-09-secret-scannings-push-protection-is-available-on-public-repositories-for-free/

github の secret scanning の push protection が全てのパブリックリポジトリで利用可能になったお y

## Introducing Actions on the Repository view on GitHub Mobile | GitHub Changelog
https://github.blog/changelog/2023-05-09-introducing-actions-on-the-repository-view-on-github-mobile/

GitHub Mobile で Actions の情報が見れるようになったよ

https://twitter.com/Shitimi_613/status/1655958448176259072?conversation=none

## Codespaces Settings Sync Updates | GitHub Changelog
https://github.blog/changelog/2023-05-04-codespaces-settings-sync-updates/

Codespaces において VSCode の設定の同期が双方向でできるようになったよ

## Terraform Cloud no-code provisioning is now GA with new features
https://www.hashicorp.com/blog/terraform-cloud-no-code-provisioning-is-now-ga-with-new-features

*本項の執筆者: [@defaultcf](https://twitter.com/defaultcf)*

## Slack、さまざまなAIをSlackに統合する「Slack GPT」発表 - Publickey
https://www.publickey1.jp/blog/23/aislackslack_gpt.html

未読スレッドの要約、メールの文面生成などなどができるようになる。

*本項の執筆者: [@defaultcf](https://twitter.com/defaultcf)*

# know-how 🎓

## Technology Radar | An opinionated guide to technology frontiers | Thoughtworks
https://www.thoughtworks.com/radar

半年に一度ほど更新される、Thoughtworks 社の Technology Radar の最新版 Vol.28 が公開。

*本項の執筆者: [@defaultcf](https://twitter.com/defaultcf)*

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [The new code search and code view is now generally available | GitHub Changelog](https://github.blog/changelog/2023-05-08-the-new-code-search-and-code-view-is-now-generally-available/)
    - github の code search が GA になったよ
- **know-how 🎓**
  - [GitHub Actionsにおける設定ミスに起因したGitHubスタッフのアクセストークン漏洩](https://blog.ryotak.net/post/github-actions-staff-access-token/)

- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
