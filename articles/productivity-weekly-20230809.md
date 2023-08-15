---
title: "Productivity Weekly (2023-08-09号)"
emoji: "🎮"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230809"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-08-09 単独号です。

今回が第 121 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)

:::

# news 📺

## GitHub Actions: Required Workflows will move to Repository Rules - The GitHub Blog
https://github.blog/changelog/2023-08-02-github-actions-required-workflows-will-move-to-repository-rules/

GitHub Actions の Required Workflows が Repository Rules 内の機能に移行します。
2023/09/20 より Repository Rules から Required Workflows を設定できるようになり、かつ、既存の Required Workflows は自動的に Repository Rules に移行されていきます。2023/10/18 以降は既存の Required Workflow の画面にアクセスできなくなるようです。
GHES の場合はバージョンによって影響が異なります（対応はそれほどしなくて良さそう）。

required workflow は Organization を横断して必須のワークフローを設定できる機能です（private beta）。以前の Weekly でも取り上げているので、そちらも参照ください（[1](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230111#github-actions-%E2%80%93-support-for-organization-wide-required-workflows-public-beta), [2](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230315#github-actions---required-workflows-improvements-%7C-github-changelog)）。


*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Introducing code referencing for GitHub Copilot - The GitHub Blog
https://github.blog/2023-08-03-introducing-code-referencing-for-github-copilot/

来たわね

> Admission to the private beta for GitHub Copilot code referencing is limited to users with an active Copilot for Individuals subscription. Signing up does not guarantee access.
>
> As a Copilot for Business user, you are not currently eligible to join the waitlist.

ちな GitHub Copilot for Business ユーザは waitlist に入ることすらできず

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Codespaces gives you a free upgrade - The GitHub Blog
https://github.blog/changelog/2023-08-04-codespaces-gives-you-a-free-upgrade/

Codespaces の CPU とメモリスペックが向上したらしい。料金はそのままらしいので単純にユーザーとして嬉しいアップデート

## Codecov is now open source - Codecov
https://about.codecov.io/blog/codecov-is-now-open-source/

Codecov が Business Source License で公開されてセルフホスト用の docker-compose も公開された。
docker-compose はセルフホストの商用サービスを辞める代わりのデモ用途っぽい。FAQ を少し見た感じ、高可用性を求める人は自前で docker-compose をベースに自前でカスタムするかクラウドの商用サービスに契約してね、というスタンスっぽい。

> Codecov is now open source - Codecov

この話、Business Source License なので OSS ではないのですが、どういう条件のライセンスなのか見るのを忘れていました。
完全な予想ですが、競合他社がこれ使って同じようなサービスを作っちゃダメですよ〜〜〜みたいなことが書かれているのかもしれない？

## Datadog、低コストで大容量ログを管理できる階層を発表｜Datadog Japan合同会社のプレスリリース
https://prtimes.jp/main/html/rd/p/000000042.000077474.html

index を貼らない代わりに低コストで保存できるタイプのログ階層を提供。
datadog の DASH2023 で発表されたらしい。
参考: DASH 2023 で発表された Datadog の新機能！日本語まとめ https://qiita.com/minorun365/items/8c147288154f4b9fdc11

大容量のログを保存したい、かつそんなに検索しないという場合に有効そう。

## The GitHub Enterprise Server 3.10 Release Candidate is available
https://github.blog/changelog/2023-08-08-the-github-enterprise-server-3-10-release-candidate-is-available/

## Simplified post-migration identity mapping for Enterprise Managed Users - The GitHub Blog
https://github.blog/changelog/2023-08-07-simplified-post-migration-identity-mapping-for-enterprise-managed-users/

- GHES から GHEC に移行する時に使えるツール GitHub Enterprise Importer のアップデート
- 移行後のユーザアクティビティは、git commit 以外の issue や PR の主体はマネキンというプレースホルダーID に紐づけられて表示されるようになる。マネキンを GHEC でのユーザに再度紐付けるには、マネキンの回収という作業が必要。この作業は以前はユーザに invitation リンクを送り、ユーザが許可するという形だった。これが Invitation プロセスを skip できるように簡略化された。これは Importer の CLI のバージョンを v1.0.0 に上げることで使用可能になる。

このニュース自体は大したものではないけど、GitHub Enterprise Importer というのを初めて知ったので話題に上げました。

## Terraform Cloud now supports multiple configurations for dynamic provider credentials
https://www.hashicorp.com/blog/terraform-cloud-now-supports-multiple-configurations-for-dynamic-provider-credent

Terraform Cloud での OIDC について、1 つのプロバイダにつき複数のアカウントがあっても使えるようになった。

# know-how 🎓

## Pull Request（プルリク）を小さくする戦略 - 開発チームのパフォーマンス向上のための第一歩 - Agile Journey
https://agilejourney.uzabase.com/entry/2023/07/31/103000

Findy Teams+で PR マージまでの時間が長い現状把握から出発し、PR 分割、Feature Flags、PR テンプレートの充実、Slack 通知、レビュワー自動アサイン、ラベルルールなどを整備してマージまでの時間を大幅に改善した事例

Four keys が盛り上がっていますが、メトリクスを見られるようにするのはゴールではなくてスタートにすぎなくてそこから改善していく実例として良い記事だと思いました。

## 【メルカリ×DeNA】何を計測すべき？開発生産性可視化のWhy-What-How | Findy Team+ Lab
https://blog.findy-team.io/posts/mercari_dena/

開発生産性カンファレンスのメルカリと DeNA の方によるパネルディスカッションの書き起こし。
パネルディスカッションなのでスライドに情報がほとんどないので書き起こしを公開してくれたのが嬉しい。Four Keys のメトリクスをどうやって取得するのか、人事評価に結びつけるべきなのか、経営層に見せるべきなのかなど結構突っ込んだ話がされていたので個人的には良いセッションでした。

# tool 🔨

## Project IDX
https://idx.dev/

Google 製の Web ベース IDE らしい。

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
