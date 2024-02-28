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
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Announcing end-of-support for AWS SDK for Go (v1) effective July 31, 2025 | AWS Developer Tools Blog
https://aws.amazon.com/jp/blogs/developer/announcing-end-of-support-for-aws-sdk-for-go-v1-on-july-31-2025/

## Scaling Docker Compose Up | Docker
https://www.docker.com/blog/scaling-docker-compose-up/
[日本語版記事](https://www.docker.com/ja-jp/blog/scaling-docker-compose-up/)

Docker Compose v2.22 から利用可能になった `docker compose watch` の紹介とバックエンド、フロントエンド開発における具体例が Docker の公式ブログから紹介されています。

compose.yml に `watch` を追加することで、ファイルの変更を検知して自動でコンテナの再ビルド（rebuild）やコンテナへのファイル同期（sync）が可能になりました。記事中ではフロントエンドは package.json が更新されたときには `rebuild` で `RUN npm install` をやり直し、 `src/` 次のファイルが更新されたときは `sync` でファイルの同期だけを行っていました。

このように `rebuild` と `sync` を使い分ける理由は、パッケージの再インストールが必要になった場合はコンテナ内で行うことが望ましいので `rebuild` でパッケージの再インストールを含めコンテナを作り直し、`src/` ファイルの更新であれば `sync` でコンテナ内に同期だけを行うことで、フロントエンド開発において主流となっている Hot Module Reload（HMR）による開発体験を損なわないようにするためだそうです。

従来では開発環境に Docker Compose を利用する際にはローカルでのファイル修正をコンテナ側に反映させるためにバインドマウントを利用することが一般的でしたが、watch コマンドはマウントではなく変更があったファイルをコンテナ内にコピーする手法のようです。[Docker Composeのドキュメント](https://docs.docker.com/compose/file-watch/)にはこのあたりの違いの説明も書かれていたので、気になる方はそちらも参照してみてください。

ちなみに、[Docker Compose v2.22.0](https://github.com/docker/compose/releases/tag/v2.22.0)は 2023/09/22 リリースと比較的新しいため、コマンドが使えなかった場合は手元で `docker compose version` を実行してバージョンを確認してみましょう。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Repository Custom Properties GA and Ruleset Improvements - The GitHub Blog
https://github.blog/changelog/2024-02-14-repository-custom-properties-ga-and-ruleset-improvements/

## AWS Control Tower introduces APIs to register Organizational Units
https://aws.amazon.com/jp/about-aws/whats-new/2024/02/aws-control-tower-apis-register-organizational-units/

## aws_ecs_task_definition に CI/CD との競合を防ぐ track_latest 引数がリリースされました | DevelopersIO
https://dev.classmethod.jp/articles/aws-ecs-task-definition-supports-track-latest-args/

# know-how 🎓

## Renovateを使ってフロントエンドのバージョンアップを改善した話 | PR TIMES 開発者ブログ
https://developers.prtimes.jp/2024/02/16/renovate-frontend/

## フロントエンドのGitHub Actions実行時間を削減するために取り組んだこと | PR TIMES 開発者ブログ
https://developers.prtimes.jp/2024/02/16/github-actions-frontend/

## Goのテスト安定性向上のためにFlakyなテストを再試行する機能を導入する提案 - tomato3713’s blog
https://tomato3713.hatenablog.com/entry/go-proposal-62244-flakytest

# tool 🔨

## GitHub、脆弱性のあるコードを実際にデバッグして学べる「Secure Code Game」シーズン2がスタート
https://www.publickey1.jp/blog/24/githubsecure_code_game2.html

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
