---
title: "Productivity Weekly (2023-10-18号)"
emoji: "😪"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231018"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-10-18 単独号です。

今回が第 129 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## GitHub Repository Custom Properties Beta - The GitHub Blog 
https://github.blog/changelog/2023-10-12-github-repository-custom-properties-beta/

Organization の Admin はリポジトリに追加する新しいメタデータを管理できるようになった。Repositoru Rules との連携について触れられているので、Custom properties + Repository rules + Required workflow の組み合わせを想定してるのかな。

## Requiring workflows with Repository Rules is generally available - The GitHub Blog 
https://github.blog/changelog/2023-10-11-requiring-workflows-with-repository-rules-is-generally-available/

Reusable workflow に pass していることを必須にする機能が Repository rules へ移り GA に。GitHub Enterprise Cloud であれば Organization 全体で設定することが可能。

## Repository Rules - Public Beta - History, Import, Export - The GitHub Blog 
https://github.blog/changelog/2023-10-12-repository-rules-public-beta-history-import-export/

Repository rules を JSON で import/export 可能になり、修正履歴の diff も見られるようになった。GitHub が ruleset-recipes というリポジトリでサンプルを公開してくれているように、ruleset 自体を共有したりバージョン管理できそう。

## CloudWatch launches out-of-the-box alarm recommendations for AWS services 
https://aws.amazon.com/jp/about-aws/whats-new/2023/10/cloudwatch-out-of-the-box-alarm-recommendations-aws-services/

各種 AWS のサービスで推奨される CloudWatch のアラートを提供してくれるようになったらしい。

日本語記事: 様々な AWS サービスで作成を推奨している CloudWatch アラームを、簡単に作れるようになったようです。 - サーバーワークスエンジニアブログ https://blog.serverworks.co.jp/2023/10/18/131241


## Announcing AWS Lambda’s support for Internet Protocol Version 6 (IPv6) for outbound connections in VPC
https://aws.amazon.com/jp/about-aws/whats-new/2023/10/aws-lambda-ipv6-outbound-connections-vpc/

Lambda が VPC 内のリソースに対して IPv6 でアクセスできるようになった。
VPC にアタッチされた Lambda を大量並列起動すると VPC 内の IP アドレス（v4）が枯渇する問題あったけど、あれを回避しやすくなったぞ。

## Amazon EC2 now supports setting AMIs to a disabled state
https://aws.amazon.com/jp/about-aws/whats-new/2023/10/amazon-ec2-amis-disabled-state/

EC2 の Amazon Machine Images (AMIs) で AMI を disable（無効）設定可能になった。以前パブリックに公開した AMI であっても、disable するとそこから EC2 は起動できなくなる。

## Docker、ビルドを40倍高速にする次世代のDocker Buildを開発中。DockerCon 23 － Publickey 
https://www.publickey1.jp/blog/23/docker40docker_builddockercon_23.html

DockerCon 23 のキーノートで Docker Build が 40 倍（！）高速化されるという発表がありました。

どのようにして 40 倍も高速化される予定なのか興味があったので[DockerConのサイト](https://www.dockercon.com/)で登録してキーノートのオンデマンド配信も見てみましたが、Publickey さんの記事のスクショ以上に詳しい情報はありませんでした。具体的な話は続報待ちです。

自分の推測としては、クラウド上でビルドを実行することでキャッシュがチーム間で共有されることと、クラウド上に x86 と Arm のマシンが両方とも使えるので自分のマシンとは異なるアーキテクチャのイメージをビルドするのに QEMU によるエミュレーションが不要になることで高速化が見込めるのかなと予想しています `docker buidx build` の裏で動いている buildkit には既にリモートマシンでビルドさせる機能は存在するので、そのためのリモートマシンを Docker 社が公式に提供してくれるようになるのかもしれませんね。

もし自分の予想通りだとすれば https://depot.dev/ が既に似たようなサービスを提供しているようです。 `docker build` の高速化に興味がある方は試してみるといいかもしれません。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# know-how 🎓

## ソースコードのハッシュ値を利用したCIの高速化 - Cybozu Inside Out | サイボウズエンジニアのブログ 
https://blog.cybozu.io/entry/2023/10/17/134138

ファイルのハッシュ値と依存関係のリストを管理するツールを利用し、結果が変わらないジョブを自動的にスキップさせて不要な CI 実行時間を削減する取り組みの紹介記事です。

[Bazel](https://bazel.build/), [Gradle](https://gradle.org/), [Turborepo](https://turbo.build/) などのビルドツールには元々このような機能が存在しているため正しく設定すればビルドやテストはスキップ（厳密にはキャッシュから前回の結果を取り出すことで完了させる）できるのですが、この記事のアプローチはビルドツールとは別にソースコードハッシュ値計算ツールの[sver](https://github.com/mitoma/sver)を用いて同様の仕組みを外付けで用意することによって実現したようです。

仕組みの構築は少し大変な印象でしたが、上手く使えれば CI の実行時間をかなり削減できそうですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_


## AWS Lambdaの高速なコンテナロードの仕組み | CyberAgent Developers Blog 
https://developers.cyberagent.co.jp/blog/archives/44067/

Lambda のコンテナの内部実装の解説。自分の Lambda 運用に活かせるわけではないけど面白かった。

## Measuring Git performance with OpenTelemetry - The GitHub Blog 
https://github.blog/2023-10-16-measuring-git-performance-with-opentelemetry/

巨大なリポジトリで git のコマンド内部のどこに時間がかかっているかを OpenTelemetry の分散トレーシングを利用して分析したという内容です。

前半は巨大リポジトリにおける問題と git から OpenTelemetry Collector にデータを流す方法について、中盤はたくさんのエンジニアから収集した分散トレーシングデータを分析した際の注意点、最後にこれまで git が巨大リポジトリをうまく扱うために追加してきた数々の機能と他社事例のブログが紹介されています。

個人的には、最後に巨大リポジトリ向けの各オプションとリンク先がインデックスとして優秀なのと、巨大リポジトリを扱っている他社事例が紹介されておりここだけでも見る価値があると思いました。引用したいと思います。

> 1. Create various dashboards to summarize the data and track it over time.
> 2. Consider the use of various Git performance features, such as: [Scalar](https://github.blog/2022-10-13-the-story-of-scalar/), [Sparse Checkout](https://github.blog/2020-01-17-bring-your-monorepo-down-to-size-with-sparse-checkout/), [Sparse Index](https://github.blog/2021-11-10-make-your-monorepo-feel-small-with-gits-sparse-index/), [Partial Clone](https://github.blog/2020-12-21-get-up-to-speed-with-partial-clone-and-shallow-clone/), [FSMonitor](https://github.blog/2022-06-29-improve-git-monorepo-performance-with-a-file-system-monitor/), and [Commit Graph](https://devblogs.microsoft.com/devops/supercharging-the-git-commit-graph/).
> 3. Consider adding a [Git Bundle Server](https://github.com/git-ecosystem/git-bundle-server) to your network.
> 4. Use [git maintenance](https://git-scm.com/docs/git-maintenance) to keep your repositories healthy and efficient.
> 5. Consider enabling [parallel checkout](https://matheustavares.gitlab.io/posts/parallel-checkout) on your large repositories.
> You might also see what other large organizations are saying:
>
> - [Canva](https://www.canva.dev/blog/engineering/we-put-half-a-million-files-in-one-git-repository-heres-what-we-learned/)
> - [Dropbox](https://dropbox.tech/application/speeding-up-a-git-monorepo-at-dropbox-with--200-lines-of-code)
> - [Tower](https://www.git-tower.com/blog/git-performance/)

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## 開発生産性、上から見るか 下から見るか / development productivity and cognitive science - Speaker Deck
https://speakerdeck.com/sugamasao/development-productivity-and-cognitive-science

プロダクト規模と開発チームが肥大化（複雑化）するにつれて増大する認知負荷に対してどうアプローチしましょうかというお話．
認知負荷を分類し，それらを減らすためにどのようにアプローチしたかを説明してくれてます．
プログラマー脳っぽい話だなと思ったらまさに紹介されていた．

あと最後の方で，Four Keys が課題外在性負荷の指標として役立つのではみたいなことも言ってました．
課題外在性負荷はソフトウェアで解決する問題領域と本質的には関係ない部分で発生する認知負荷のことです．
言われてみればそうなのかもという感じ．

# tool 🔨

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
