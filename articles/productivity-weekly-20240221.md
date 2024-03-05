---
title: ＜ここにタイトルを入力＞｜Productivity Weekly (2024-02-21号)
emoji: 🛞
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240221
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
今週は 2024-02-21 単独号です。

今回が第 143 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Announcing end-of-support for AWS SDK for Go (v1) effective July 31, 2025 | AWS Developer Tools Blog
https://aws.amazon.com/jp/blogs/developer/announcing-end-of-support-for-aws-sdk-for-go-v1-on-july-31-2025/

AWS SDK for Go の v1 が 2024 年 7 月 31 日にからメンテナンスモードに入り、一年後の 2025 年 7 月 31 日にサポートが終了することが発表されました。

メンテナンスモードでは、重大なバグ修正とセキュリティ対応のみが行われるようになり、サポート終了後は全くアップデートされなくなります。

移行先としては、SDK v2 があります。移行ガイドもちゃんと用意されています。

- [Migrating to the AWS SDK for Go V2 | AWS SDK for Go V2](https://aws.github.io/aws-sdk-go-v2/docs/migrating/)

サポート終了まではまだ期間がありますが、移行は決して簡単ではないかもしれないので、早めに v2 へ移行していきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Scaling Docker Compose Up | Docker
https://www.docker.com/blog/scaling-docker-compose-up/
[日本語版記事](https://www.docker.com/ja-jp/blog/scaling-docker-compose-up/)

Docker Compose v2.22 から利用可能になった `docker compose watch` の紹介とバックエンド、フロントエンド開発における具体例が Docker の公式ブログから紹介されています。

compose.yml に `watch` を追加することで、ファイルの変更を検知して自動でコンテナの再ビルド（rebuild）やコンテナへのファイル同期（sync）が可能になりました。記事中ではフロントエンドは package.json が更新されたときには `rebuild` で `RUN npm install` をやり直し、 `src/` 次のファイルが更新されたときは `sync` でファイルの同期だけを行っていました。

このように `rebuild` と `sync` を使い分ける理由は、パッケージの再インストールが必要になった場合はコンテナ内で行うことが望ましいので `rebuild` でパッケージの再インストールを含めコンテナを作り直し、`src/` ファイルの更新であれば `sync` でコンテナ内に同期だけを行うことで、フロントエンド開発において主流となっている Hot Module Reload（HMR）による開発体験を損なわないようにするためだそうです。

従来では開発環境に Docker Compose を利用する際にはローカルでのファイル修正をコンテナ側に反映させるためにバインドマウントを利用することが一般的でしたが、watch コマンドはマウントではなく変更があったファイルをコンテナ内にコピーする手法のようです。[Docker Composeのドキュメント](https://docs.docker.com/compose/file-watch/)にはこのあたりの違いの説明も書かれていたので、気になる方はそちらも参照してみてください。

ちなみに、[Docker Compose v2.22.0](https://github.com/docker/compose/releases/tag/v2.22.0)は 2023/09/22 リリースと比較的新しいため、コマンドが使えなかった場合は手元で `docker compose version` を実行してバージョンを確認してみましょう。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## AWS Control Tower introduces APIs to register Organizational Units
https://aws.amazon.com/jp/about-aws/whats-new/2024/02/aws-control-tower-apis-register-organizational-units/

AWS の Control Tower で OU まわりの API のエンドポイントが増えました。
今まで AWS コンソールからしかできなかった OU のベースライン有効化などが API 経由で可能となり、IaC で管理できる範囲が増えたと言えるでしょう。

Terraform の AWS プロバイダーである terraform-provider-aws v5.39.0 では、執筆時点でこの API に対応するリソースはまだ無いようです。
今後対応リソースが増えると管理がより楽になるかもしれません。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## aws_ecs_task_definition に CI/CD との競合を防ぐ track_latest 引数がリリースされました | DevelopersIO
https://dev.classmethod.jp/articles/aws-ecs-task-definition-supports-track-latest-args/

Terraform で ECS を管理していて、別途 CI/CD などでタスク定義のリビジョンを追加、過去のリビジョンを削除するとします。その後、`terraform apply` を叩くと、リビジョン追加ではなく新しくタスク定義自体を作り直そうとする挙動がありました。
Terraform の state が古いものを参照していて、その実態が削除されると Terraform としては新たに作るしかなくなるからですね。

今回追加された `track_latest` を有効化することで、Terraform は常に最新のタスク定義を見るようになります。
これによりタスク定義を作り直すことなく、リビジョンを追加するだけになります。

...個人的にはタスク定義は常に Terraform で更新するようにしたいかな、と思っています。今回の `track_latest` が入ったところで、結局 Terraform 側の定義も更新する必要があるからです。
Renovate を上手く設定すると Terraform の定義中のイメージを更新できるので、CI/CD で `terraform apply` まで実行すればよりスムーズに運用できるんじゃないか、と思います。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## Renovateを使ってフロントエンドのバージョンアップを改善した話 | PR TIMES 開発者ブログ
https://developers.prtimes.jp/2024/02/16/renovate-frontend/

Renovate でパッケージの自動アップデートを実現された事例で、Renovate の設定や運用方法をかなり詳細に紹介されています。

Renovate の設定ファイル（renovate.json）で設定できるオプションは豊富[^renovate-config]でかなり細かい挙動まで変更できるのですが、もはやどういうオプションが存在するのかを把握するのも難しいため、実践されている方の設定ファイルを見るだけでもきっと発見があると思います。それぞれのオプションについてコメントも書かれていて分かりやすいです。

[^renovate-config]: 利用可能な設定の一覧ページはかなりすごいことになっています。[Configuration Options | Renovate Docs](https://docs.renovatebot.com/configuration-options/)

個人的には記事中でも紹介されているこちらの偶数バージョンのみをアップデートするという `allowedVersions` の例が目からウロコでした。Node.js のようにバージョンの奇数偶数で安定版と開発版を分けているプロジェクトだと Renovate が採用したくないバージョンも自動で pull-request を作ってしまうので毎回手動でクローズする手間が面倒なこともあったのですが、この設定を参考にすればそのような場合も柔軟に対応できそうです。

```json
{
    {
      "matchPackageNames": ["node"],
      "matchManagers": ["dockerfile"],
      // Node.jsは偶数バージョンのみアップデートする
      "allowedVersions": "/^[0-9]*[02468]([.-].*)?$/"
    },
}
```


_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## フロントエンドのGitHub Actions実行時間を削減するために取り組んだこと | PR TIMES 開発者ブログ
https://developers.prtimes.jp/2024/02/16/github-actions-frontend/

PR TIMES さんによる、フロントエンドの GitHub Actions 実行時間削減事例です。

今回は、実行時間は実行時間でも、billable time という GitHub Actions の課金単位を削減することが目的となっています。billable time は、純粋な実行時間と異なります（例えば、平均 45 秒で終わるジョブを平均 15 秒で終わるようにしても、課金時間はどちらも 1 分となる。）。

GitHub Actions の各種調査から始まり、調査結果を元にいくつかの対応を行なっています。

- 調査: billable time が長いワークフロー洗い出し、削減可能かどうかを調査、不要なワークフローを調査、など
- 対応: 並列実行ジョブを直列化、lint や test を差分のみに行う、キャッシュの無駄な保存を減らす、Renovate 見直し、concurrency 設定、など

その結果、全体として 25,000 分の billable time 削減ができたとのことです。なかなか劇的に効果が表れていてすごいです。

純粋な実行時間を減らしたければ、1 つのジョブを並列化する例をよく見ますが、今回は billable time 削減に着目しているため、むしろ直列化しています。ワークフロー/ジョブの純粋な実行時間を減らすことを主題に置いた記事は多いですが、billable time を削減することを主題にした記事はあまり見かけないので、面白かったです。

また、ジョブで時間がかかっている箇所の調査には、我が生産性向上チームの kesin11 さんが作った [Kesin11/actions-timeline](https://github.com/Kesin11/actions-timeline) が使われています。便利ですので、Actions の実行時間に関する調査の際は使ってみてください。

- [GitHub Actionsのワークフローを可視化するactions-timelineを作った](https://zenn.dev/cybozu_ept/articles/20231002_actions_timeline)

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Repository Custom Properties GA and Ruleset Improvements - The GitHub Blog](https://github.blog/changelog/2024-02-14-repository-custom-properties-ga-and-ruleset-improvements/)
    - GitHub において、repository custom properties が GA になりました
    - repository custom properties に関しては以前の記事も参照ください（[1](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231018#github-repository-custom-properties-beta---the-github-blog), [2](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231213#new-organization-repositories-list-feature-preview---the-github-blog)）
- **know-how 🎓**
  - [Goのテスト安定性向上のためにFlakyなテストを再試行する機能を導入する提案 - tomato3713’s blog](https://tomato3713.hatenablog.com/entry/go-proposal-62244-flakytest)
    - Go で flaky なテストを再施行する機能を導入する提案を紹介した記事です
      - 2023/11/15 に accepted になったので、今後導入される予定だとか
    - 提案が accept されるまでの議論や提案のまとめがわかりやすく書かれており、読み応えがあります
- **tool 🔨**
  - [GitHub、脆弱性のあるコードを実際にデバッグして学べる「Secure Code Game」シーズン2がスタート － Publickey](https://www.publickey1.jp/blog/24/githubsecure_code_game2.html)
    - GitHub が公開している、脆弱性のあるコードをデバッグして学べる「Secure Code Game」のシーズン 2 がスタートしたとのことです
    - GitHub Codespaces で手軽に開始できるのが良いですね


# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
