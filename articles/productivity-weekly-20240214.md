---
title: "＜ここにタイトルを入力＞｜Productivity Weekly (2024-02-14号)"
emoji: "😍"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: 
  publish_link: "https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240214"
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
今週は 2024-02-14 単独号です。

今回が第 142 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Deprecation notice: v1 and v2 of the artifact actions - The GitHub Blog
https://github.blog/changelog/2024-02-13-deprecation-notice-v1-and-v2-of-the-artifact-actions/

## Copilot in GitHub Support is now available! - The GitHub Blog
https://github.blog/2024-02-09-copilot-in-github-support-is-now-available/

## Go 1.22 is released! - The Go Programming Language
https://go.dev/blog/go1.22

より詳細：https://go.dev/doc/go1.22


## Dockerの設定を大きく省力化する「Docker Init」コマンドが正式リリース。DockerfileやCompose設定ファイルなど自動生成 － Publickey
https://www.publickey1.jp/blog/24/dockerdocker_initdockerfilecompose.html

Docker Desktop 4.18 から、`docker init` がベータで入っていましたが、それが Docker Desktop 4.27 で GA となりました。
`docker init` は実行して訊かれる質問に答えると Dockerfile や compose.yaml などを自動で生成してくれる Docker のサブコマンドです。

ちなみに私は OrbStack 1.4.3 を使っており、`docker init` は使えません...
今回は私物のマシンで `docker init` を試してみました。

Docker のサブコマンドはプラグイン形式になっているらしく、init のバージョンは次のものが入っていました。

```
$ docker init --version
Version:    v1.0.0
Git commit: ######
```

使いたい言語、そのバージョン、使用するパッケージマネージャー、使用するポートなどを訊かれ、答え終わると .dockerignore, Dockerfile, compose.yaml, README.Docker.md を生成してくれました。

なお、対応している言語には限りがあり、もしリストに無い場合は「Don't see something you need? Let us know!」を選択すると Google Form にリクエストを送信するようお願いが表示されます。

サクッと Docker まわりのテンプレートを引っ張ってくることができるので、プロジェクトの初動で少し楽になりますね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## GitHubのMerge Queueとは何か？それと、認識しておきたいこと - Mitsuyuki.Shiiba
https://bufferings.hatenablog.com/entry/2024/02/10/173552

## Testing HashiCorp Terraform
https://www.hashicorp.com/blog/testing-hashicorp-terraform

Terraform plan や validate は問題無く実行できたのに、terraform apply で失敗したことはありませんか？私は何度もあります...

この記事では、テストピラミッドを示しながら、ユニットテストから順に Terraform でのテストの書き方を教えてくれています。
次のように例を示しながら、説明がされています。

- ユニットテスト
  - 例えば local を使った変数で関数を使って処理したものを渡すものがあった際に、期待したものになっているかをテストする
  - run ブロックと assert を使ってテストできる
  - `command = plan` で plan 時だけに走らせる
- コントラクトテスト
  - 例えば resource で期待していない変数が来ないかをテストする
  - variable ブロックと validation を使ってテストできる
  - plan で実行される
- インテグレーションテスト
  - 例えば apply 時にローカルにファイルが生成されるとして、それがきちんと存在するかテストする
  - run ブロックと assert を使ってテストできる
  - apply 時に実行される
- エンドツーエンドテスト
  - 例えば apply 後にリソースが正常に動作していることを確かめる
  - check ブロックを使ってテストできる
  - apply 時に実行される

またユニットテストとコントラクトテストは plan 時に実行されるので、こちらを重点的に書いておくことで apply まで行く前にテストで落とすことができ、時間の節約にもなる旨が書かれています。

私は check ブロックの存在をよく理解していなかったので、この記事でその有用性をよく知りました。
また Terraform のテストでテストピラミッドを意識するということもなかったので、今後はこの記事を参考にテストを書いてみようかと思います。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## デプロイ頻度やリードタイムの正確な計測にこだわらなくていい（前提はあるが） - mtx2s’s blog
https://mtx2s.hatenablog.com/entry/2024/02/12/210309

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

