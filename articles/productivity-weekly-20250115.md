---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2025-01-15)
emoji: ⛓️‍💥
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20250115
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
    _本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_
    _本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_
    _本項の執筆者: [@naotama](https://zenn.dev/naotama)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2025-01-15 単独号です。

今回が第 175 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@uta8a](https://zenn.dev/uta8a)
- [@ajfAfg](https://zenn.dev/arjef)
- [@takoeight0821](https://zenn.dev/takoeight0821)
<!-- - [@takamin55](https://zenn.dev/takamin55) -->
- [@naotama](https://zenn.dev/naotama)
:::

# news 📺

## Node.js の最新リリースでは TypeScript をネイティブ実行可能に、ただし利用には注意点も
https://nodejs.org/en/blog/release/v23.6.0
https://www.totaltypescript.com/typescript-is-coming-to-node-23
https://satanacchio.hashnode.dev/everything-you-need-to-know-about-nodejs-type-stripping


_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Evolving GitHub Issues (public preview) - GitHub Changelog
https://github.blog/changelog/2025-01-13-evolving-github-issues-public-preview/


_本項の執筆者: [@naotama](https://zenn.dev/naotama)_

## GitHub Models introduces JSON schema support for response formats - GitHub Changelog
https://github.blog/changelog/2025-01-08-github-models-introduces-json-schema-support-for-response-formats/


_本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_

## Malware detection prevents Docker Desktop to start · Issue #7527 · docker/for-mac
https://github.com/docker/for-mac/issues/7527


_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Announcing the new AWS Asia Pacific (Thailand) Region | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/announcing-the-new-aws-asia-pacific-thailand-region/

# know-how 🎓

## ECSのIaCあるある『Serviceとタスクの更新をどこでやる問題』に向き合う一例 - Nealle Developer's Blog
https://nealle-dev.hatenablog.com/entry/2025/01/08/175433 

Terraform などで IaC をする際、アプリケーションのデプロイまでを IaC の責務とするかどうかは悩ましい問題です。
この記事では、Terraform は最初のタスク定義だけを作成する責務を負い、サービスでは data で取得した最新のタスク定義を参照するようにしています。
さらに ecspresso は各環境の設定の差分を吸収し、タスク定義を JSON として出力するために使用されています。
ecspresso でそのような使い方ができるのは知らなかったので、なるほどと思いました。

最近、弊チームでもこの問題に向き合いまして、この記事と似た構成で構築しました。
違う点は、構築するサービスの環境がそこまで複雑でないことから、タスク定義の各 attribute は ignore せず、サービスからのタスク定義の参照を ignore しています。
また ecspresso は使用せずに GitHub Actions 内で AWS CLI を実行し、最新のタスク定義の JSON を取得しています。
これにより、タスク定義のほとんどを IaC の責務としつつ、イメージだけを aws-actions/amazon-ecs-render-task-definition で更新できるようになりました。

今後環境の差分が多くなってきたら、差分を ecspresso に吸収させる仕組みを検討してみたいと思います。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## 保守しやすく変化に強いソフトウェアを支える柱　自動テストとテスト駆動開発、その全体像 ～Software Design 2022年3月号「そろそろはじめるテスト駆動開発」より | http://gihyo.jp 
https://gihyo.jp/article/2024/01/automated-test-and-tdd 


_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Rustプロジェクトのビルド高速化に関するベストプラクティス（ローカル環境編）
https://zenn.dev/fairydevices/articles/59cd718341da58 


_本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_

## anyhowユーザー向けeyre/miette入門
https://zenn.dev/yukinarit/articles/ee9617f20b0361 


_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## オラクル、JavaScriptの商標を自主的に手放すつもりはないとDenoに通告 － Publickey
https://www.publickey1.jp/blog/25/javascriptdeno_1.html 

# tool 🔨

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
