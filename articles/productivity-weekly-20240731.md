---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-07-31)
emoji: 🍦
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240731
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-07-31 単独号です。

今回が第 161 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Copilot Enterprise Mixed Licensing beta - The GitHub Blog
https://github.blog/changelog/2024-07-26-copilot-enterprise-mixed-licensing-beta/

## Copilot text completion for pull request descriptions beta - The GitHub Blog
https://github.blog/changelog/2024-07-24-copilot-text-completion-for-pull-request-descriptions-beta/

## Run workflows set as workflow_dispatch manually - The GitHub Blog
https://github.blog/changelog/2024-07-30-run-workflows-set-as-workflow_dispatch-manually/

## Actions Usage Metrics is generally available - The GitHub Blog
https://github.blog/changelog/2024-07-25-actions-usage-metrics-is-generally-available/

## Ask sophisticated questions about diverse GitHub primitives on GitHub Mobile - The GitHub Blog
https://github.blog/changelog/2024-07-30-ask-sophisticated-questions-about-diverse-github-primitives-on-github-mobile/

## 2024年7月27日時点におけるAWS CodeCommitとAmazon CloudSearchの新規利用に関して
https://dev.classmethod.jp/articles/aws-start-to-restrict-codecommit-and-cloudsearch/

## OpenTofu 1.8.0 is out with Early Evaluation, Provider Mocking, and a Coder-Friendly Future
https://opentofu.org/blog/opentofu-1-8-0/

## Slack のスケジュール投稿がスレッド内でできるようになった
https://x.com/SlackHQ/status/1816461445585916409

# know-how 🎓

## NATゲートウェイの通信内容を調査して対策し、コストを約60％削減した話 - ZOZO TECH BLOG
https://techblog.zozo.com/entry/wear-natgateway-cost-down

NAT ゲートウェイを通る通信の詳細を VPC フローログで調査し、本来は NAT ゲートウェイを通らずに済むはずの通信経路を整理することでコストを削減したという記事です。

- AWS サービスへの通信は VPC エンドポイントを利用して NAT ゲートウェイを通らないようにした
- 本来は Private subnet 内で完結するはずの無駄に NAT ゲートウェイを通ってしまっていた通信経路の見直し
- ECR のプルスルーキャッシュを使って初回以降は NAT ゲートウェイから外向きの通信が発生しなくなるようにした

自分も業務で NAT ゲートウェイのコスト削減を調査したことがあるのですが、紹介されている対策の 1 つ 1 つは NAT ゲートウェイのコスト削減策としてよく知られている方法という認識です。
こちらの記事は、最初に VPC フローログと名前解決のクエリログを分析することで、推測ではなく確かな根拠を持って個別の問題に対して対応している点がとても参考になりました。 "推測するな、計測せよ" ですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## 2024年版のDockerfileの考え方＆書き方 | フューチャー技術ブログ
https://future-architect.github.io/articles/20240726a/

最近のアップデートを取り込んだ 2024 年版の Dockerfile の書き方について紹介されています。

最近では `docker init` で各言語ごとのベストプラクティスが盛り込まれている Dockerfile を生成してくれるようになりました。生成される Dockerfile はマルチステージビルドは当然として `--mount=type=cache` や `--mount=type=bind` など比較的新しい機能も使われており、この記事では主にそれらの新しめの機能について解説されていました。`docker init` をまだ実行したことがない方は、ぜひお手元で試してみてください。

ちなみに、この記事について同僚から `RUN --mount=type=bind` は `COPY` と異なり.dockerignore が効かないため本来はビルドに不要なファイルが誤って持ち込まれてしまう可能性など `COPY` よりも扱いが難しいのではないかという意見があって少し盛り上がりました。自分もそのあたりは少し気になっており、コンテナにファイルをコピーする `COPY` よりも単にファイルをマウントする `--mount=type=bind` の方が効率は良いと思われるのですが、よほど大きなコードベースでない限りは従来の `COPY` でも十分なのではないかという気もします。

一方で、Docker 社のブログでは `--mount=type=bind` は割と以前から登場しており、例えば M1 mac が登場したことで x86/Arm のクロスコンパイルが Docker 界隈の重要トピックの 1 つであった 2021 年頃のブログでは、すでに Dockerfile での bind mount について触れられていました[^mount_default]。

https://www.docker.com/ja-jp/blog/faster-multi-platform-builds-dockerfile-cross-compilation-guide/

今回、上記のブログ以外にも改めて Docker の公式ドキュメントなどを見てみると割と bind mount を推している雰囲気を感じました。自分は今まで `COPY` で特に困った経験はないのですが、bind mount についても気にしていきたいと思います。

[^mount_default]: ブログ中では `--mount=target=.` という記述になっており、日本語訳が微妙なので分かりにくいですが `type` を省略した場合は `type=bind` がデフォルトの挙動ですので、これは `--mount=type=bind,target=.` と等価なはずです。`type` を省略した場合の挙動は Dockerfile のリファレンスで確認しました。 https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/reference.md#run---mount





_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## 社内プライベートなprotoリポジトリへの移行 | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/48747/

## GitHub の削除されたリポジトリや非公開のリポジトリに誰でもアクセスできるの？
https://zenn.dev/kou_pg_0131/articles/github-repo-access

## 生成 AI や Gemini の基本について学べる Generative AI Study Jam 開催のお知らせ
https://developers-jp.googleblog.com/2024/07/gemini-gen-ai-study-jam.html

## Cloud Build リポジトリ第 2 世代で変更された機能を紹介
https://zenn.dev/cloud_ace/articles/cloud_build_repo_v2

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
