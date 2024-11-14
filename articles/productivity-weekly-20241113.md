---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-11-13, 2024-11-06)
emoji: 📐
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241113
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-11-13, 2024-11-06 合併号です。

今回が第 168 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->
<!-- - [@ajfAfg](https://zenn.dev/arjef) -->

:::

# news 📺

## Copilot subscription-based network routing is now enforced - GitHub Changelog
https://github.blog/changelog/2024-11-04-copilot-subscription-based-network-routing-is-now-enforced/

## GitHub Copilot code completion in Xcode is now available in public preview - GitHub Changelog 
https://github.blog/changelog/2024-10-29-github-copilot-code-completion-in-xcode-is-now-available-in-public-preview/

## Copilot content exclusion is now generally available in IDEs - GitHub Changelog
https://github.blog/changelog/2024-11-12-content-exclusion-ga/

## Introducing an enhanced local IDE experience for AWS Lambda developers | AWS Compute Blog 
https://aws.amazon.com/jp/blogs/compute/introducing-an-enhanced-local-ide-experience-for-aws-lambda-developers/

## Visual Studio Code October 2024
https://code.visualstudio.com/updates/v1_95

## AWS CodeBuild でビルドの自動再試行のサポートを開始 - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/10/aws-codebuild-retrying-builds-automatically/

## AWS Transit Gateway を経由する通信の送信元をセキュリティグループIDで制御できるようになりました | DevelopersIO
https://dev.classmethod.jp/articles/general-availability-security-group-referencing-aws-transit-gateway/

## Amazon Aurora PostgreSQL Limitless Database is now generally available | AWS News Blog 
https://aws.amazon.com/jp/blogs/aws/amazon-aurora-postgresql-limitless-database-is-now-generally-available/

## Announcing TypeScript 5.7 RC - TypeScript 
https://devblogs.microsoft.com/typescript/announcing-typescript-5-7-rc/

## Cloud RunがIAPでよりお手軽に認証できるようになりました！
https://zenn.dev/iret/articles/cloud-run-iap-auth

## The GitHub Enterprise Server 3.15 Release Candidate is available - GitHub Changelog
https://github.blog/changelog/2024-11-12-the-github-enterprise-server-3-15-release-candidate-is-available/

## おめでとう Go オープンソースリリース15周年！（お祝いメッセージです）
https://go.dev/blog/15years

# know-how 🎓

## go.mod、DockerfileやCI設定に分散しがちなGoのバージョンをまとめて管理する / Go Connect #3 - Speaker Deck 
https://speakerdeck.com/arthur1/go-toolchain-version

## AWS ECS Fargate Autoscaling の実戦的な基礎知識 | 外道父の匠 
https://blog.father.gedow.net/2024/11/08/aws-ecs-fargate-autoscaling-knowledge/

## AWSアカウントを閉鎖する前に見るチェックリスト | DevelopersIO 
https://dev.classmethod.jp/articles/aws-account-close-checklist/

## Introducing Copilot Edits
https://code.visualstudio.com/blogs/2024/11/12/introducing-copilot-edits

## "君は見ているが観察していない"で考えるインシデントマネジメント - Speaker Deck
https://speakerdeck.com/grimoh/jun-hajian-teirugaguan-cha-siteinai-dekao-eruinsidentomanezimento

## SREの組織類型に応じた リーダシップの考察 - Speaker Deck
https://speakerdeck.com/kenta_hi/srenozu-zhi-lei-xing-niying-zita-ridasitupunokao-cha

## FourKeys風の指標で開発生産性が4.5倍になった話 | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/50376/

## Four Keysを活用してチームの開発生産性を改善した時のふりかえりの考え方と手法を紹介します - ZOZO TECH BLOG
https://techblog.zozo.com/entry/improve-mlops-team-capability

## Platform Engineeringの先人 メルカリに学ぶ！ プラットフォームチームの意義と実践のポイント (1/3)|CodeZine（コードジン）
https://codezine.jp/article/detail/20282

## データの信頼性を支える仕組みと技術 - Speaker Deck
https://speakerdeck.com/chanyou0311/detanoxin-lai-xing-wozhi-erushi-zu-mitoji-shu

## git rebaseの苦労を減らすための覚え書き | Atusy's blog 
https://blog.atusy.net/2024/11/07/git-rebase/

## 日本人プログラマ向け、プログラミングに適した「フォント」まとめ。2024年版 － Publickey 
https://www.publickey1.jp/blog/24/2024_1.html

## ZodとJSON modeを使ってChatGPTのレスポンスをJSONで取得 - 動かざることバグの如し 
https://blog.turai.work/entry/20241105/1730734168?utm_source=feed


## 2024-11-01 Developer Productivity室のWeekly News
https://zenn.dev/cadp/articles/9b24a50fdb7dab

# tool 🔨

## 脱データ不整合!? Workflow Engine「Temporal」の魅力
https://zenn.dev/kinosuke01/articles/48fb1687880b59

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