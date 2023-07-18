---
title: "Productivity Weekly (2023-07-05号)"
emoji: "🎸"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230705"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-07-05 単独号です。

今回が第 118 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## New expandable event payload view is generally available in all audit logs | GitHub Changelog
https://github.blog/changelog/2023-06-28-new-expandable-event-payload-view-is-generally-available-in-all-audit-logs/

GitHub の Enterprise および Organization において、audit logs の UI で各イベントのペイロードを表示できるようになった。
これまでは API 叩いたり log streaming していないとペイロードを見れなかったはず

## Grouped version updates for Dependabot public beta | GitHub Changelog
https://github.blog/changelog/2023-06-30-grouped-version-updates-for-dependabot-public-beta/

Dependabot でアップデートのグループ化ができるようになりました。
パブリックベータ。

# know-how 🎓

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Actions - Actions Runner General availability | GitHub Changelog](https://github.blog/changelog/2023-06-30-github-actions-actions-runner-general-availability/)
    - GitHub Actions セルフホストランナーの ARC と runner scale sets mode が GA に。
    - 早かったな
  - [GitHub Enterprise Server 3.9 is now generally available | The GitHub Blog](https://github.blog/2023-06-29-github-enterprise-server-3-9-is-now-generally-available/)
    - 手前味噌ですが自分の GHES と github.com の Actions 関連の対応表も v3.9 について書きました
      - https://zenn.dev/kesin11/articles/gha_releasenote_ghes
  - [Copilot June-2023 update | GitHub Changelog](https://github.blog/changelog/2023-06-29-copilot-june-2023-update/)
    - GitHub Copilot の 6 月アプデまとめ。
      - VSCode の Stable で Copilot Chat が使えるようになった
      - VSCode で Copilot を使用してプルリクへのレビューコメントが書けるようになった
      - コード補完の改善
      - など
- **know-how 🎓**
  - [iOS開発におけるGitHub Actions self-hosted runnerを利用したオンプレ CI/CD のすゝめ | CADC 2023](https://cadc.cyberagent.co.jp/2023/sessions/ios-github-actions-self-hosted-runner/)
    - サイバーエージェントさんでセルフホストランナーを運用している whywaita さんの新作。
    - https://github.com/utmapp/UTM で macOS の VM を使うことで、mac でもジョブごとにランナーを使い捨てる運用ができてる。
    - ちなみに macOS 上で VM を立てる場合はライセンス条項が色々面倒なので注意です
- **tool 🔨**
  - [Introducing new and updated models to Azure OpenAI Service - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/ai-cognitive-services-blog/introducing-new-and-updated-models-to-azure-openai-service/ba-p/3860351)

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
