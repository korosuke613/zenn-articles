---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2025-01-29)
emoji: 🦅
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20250128
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
今週は 2025-01-29 単独号です。

今回が第 177 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->
- [@ajfAfg](https://zenn.dev/arjef)
- [@takoeight0821](https://zenn.dev/takoeight0821)
- [@takamin55](https://zenn.dev/takamin55)
<!-- - [@naotama](https://zenn.dev/naotama) -->
:::

# news 📺

## Amazon EventBridge announces direct delivery to cross-account targets
https://aws.amazon.com/jp/about-aws/whats-new/2025/01/amazon-eventbridge-direct-delivery-cross-account-targets/

Amazon EventBridge Event Bus がクロスアカウントでイベントを送信できるようになりました。記事では、別のアカウントの SQS にイベントを送信する例が書かれており、他にも Lambda に Kinesis Data Stream, SNS, API Gateway にイベントを送信できるようです。
もともとクロスアカウントでイベント駆動のサービスや仕組みを作成するには、イベント送信用に Lambda などの仕組みを別途用意する必要がありましたが、その必要がなくなりそうで便利ですね。

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

## TypeScript 5.8のerasableSyntaxOnlyフラグ。enumやnamespaceが消える日が来た
https://zenn.dev/ubie_dev/articles/ts-58-erasable-syntax-only

enum や namespace が含まれる TypeScript コードに対して警告を出すフラグ `erasableSyntaxOnly` が、TypeScript 5.8 から使用可能になる予定とのことです。

Node.js v23.6.0 では、TypeScript をネイティブに実行可能になりましたが、enum や namespace をはじめとする TypeScript 独自の機能はサポートされていませんでした。これからは `--experimental-strip-types` と併用することで、サポートされない機能を事前に検知できます。

enum や namespace が含まれていても実行できるフラグ `--experimental-transform-types` は以前から存在していたので、今回の追加は少し驚きました。TypeScript としても、今後は enum や namespace を非推奨にしていくなのかもしれません。今後にますます期待ですね。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Intro to Wasm in Deno
https://deno.com/blog/intro-to-wasm

## Bun 1.2 | Bun Blog
https://bun.sh/blog/bun-v1.2

Bun 1.2 がリリースされました！
Bun 1.2 では、S3 の組み込みサポートが追加されました。
S3 API を実装しているクラウドサービス（Amazon S3, Google Cloud Strage, Cloudflare R2）を、軽量なインターフェースで利用できます。

```javascript
import { s3 } from "bun";
const file = s3.file("folder/my-file.txt");
const content = await file.text();
```

S3 クライアントはネイティブ実装されており、`@aws-sdk/client-s3` と比較してダウンロードが 5 倍速いそうです。

_本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_

## 企業がChrome拡張を管理できる「Chrome Web Store for Enterprise」、Google Cloudが発表 － Publickey
https://www.publickey1.jp/blog/25/chromechrome_web_store_for_enterprisegoogle_cloud.html

企業の従業員がインストール可能な Google Chrome の拡張機能を、管理者（e.g. IT 部門）が機械的に制限できる機能が発表されました。

これまでは自然言語によるルールとして制限してきたので、これからはそれを自動化できて嬉しそうです。ただし、ホワイトリスト形式だと新しい拡張機能のお試しが難しくなるので、その辺りをいい感じにする仕組みづくりも大事になってきそうです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Legacy Docker Registry closing down - GitHub Changelog
https://github.blog/changelog/2025-01-23-legacy-docker-registry-closing-down/

2025/02/24 に GitHub Packages の Docker Registry (docker.pkg.github.com) が終了します。**ghcr.io で知られる Container Registry とは別物です！**

Docker Registry は ghcr.io が登場する前まで使われていた Docker イメージのレジストリでした。ghcr.io が GA になった際、既存の Docker レジストリ内のイメージは自動で ghcr.io に移行されました。
しかし、名前空間が衝突したイメージについては自動移行がされなかったようです。
当時 ghcr.io が GA になった際の記事が [Productivity Weekly (2021-06-23号)](https://zenn.dev/korosuke613/articles/productivity-weekly-20210623#github-packages-container-registry-is-generally-available) 号に書かれていました。懐かしいですね。あんまり記憶がないけど docker.pkg.github.com は使いづらかったらしい。

Docker Registry が終了することにより、docker.pkg.github.com 上のパッケージは全て削除されます。

多くの人は影響がないと思われますが、一応 [`GET /users/{username}/docker/conflicts`](https://docs.github.com/en/rest/packages/packages?apiVersion=2022-11-28#get-list-of-conflicting-packages-during-docker-migration-for-user) を使って自動移行が行われなかったイメージが存在するかを確認しておくと良いです。
僕の場合は空配列が返ってきたので多分大丈夫だと思います。なお、`USERNAME` に当たる部分を organization 名に変えても API が実行できたので、org に対しての確認にも使えそうです。

```
❯ gh api \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /users/korosuke613/docker/conflicts
[]
```

もしくは https://github.com/korosuke613?ecosystem=docker&tab=packages を開いて Docker Registry にイメージが存在するかどうかを調べる方法も使えると思います。
いずれも僕の場合は全て ghcr.io に移行済で今回関係ありませんでした。

なお、docker.pkg.github.com に対するリクエストがどうなるのかが気になりましたが、元ページによると、次のようなので、おそらく自動で ghcr.io へのリクエストとしてくれそうです。たぶん。

> If you are not in the small group with conflicting packages, no action is needed, as all requests will automatically forward to GHCR.

正直存在を忘れていましたね。知らないうちにイメージが消失しないように気をつけましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## はてなブログにWebhook機能を追加しました！外部システムとの連携が容易になります - はてなブログ開発ブログ
https://staff.hatenablog.com/entry/2025/01/28/123436

# know-how 🎓

## pnpm workspace を利用したモノレポで「この PR の影響を受けるパッケージ」をフィルタする
https://zenn.dev/layerx/articles/5ef844aa73f051

## 監査ログの出力スキーマをProtocol Buffersで定義する - ベースマキナ エンジニアブログ
https://tech.basemachina.jp/entry/audit-log-protocol-buffers-schema

巨大なスプレッドシートで管理されていた監査ログの仕様を、Protocol Buffers を使って定義し直した話です。
protoc を使い、Protocol Buffers の定義から監査ログ用のロガーへの出力メソッドを自動生成しているそうです。
スキーマ定義言語とコード生成を使ったデータ処理の応用の幅広さを感じる記事でした。

_本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_

## Go 製 CLI ツールにおける selfupdate の実装
https://zenn.dev/ubie_dev/articles/e9d68da8a88cf2

## ECSとRDSをやめて、AWSコストを9割削減しました
https://zenn.dev/beenos_tech/articles/lambda-sqlite-application

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## 高級ホテルの客室タブレットに潜む危険：他客室も操作、盗聴可能だった脆弱性を発見するまで
https://devblog.lac.co.jp/entry/20250124

## とほほの退職入門
https://www.tohoho-web.com/ot/retirement.html

# tool 🔨

## 注目のAIエンジニア「Devin」を入れてみた！購入から初期設定まで | DevelopersIO
https://dev.classmethod.jp/articles/devin-init/

2024 年 12 月に GA になった今話題の AI ツール Devin を入れてみた記事です。
Devin は ChatGPT や GitHub Copilot とは違った形の AI ツールで、これらが単一の作業を効率化してくれるツールであるのに対し、Devin は与えられた指示に従って自律的に行動するツールとなっています。

<!-- textlint-disable ja-technical-writing/no-doubled-conjunctive-particle-ga -->
本当はより詳細な指示が必要ですが、例えば「テストコードを書いて PR を出して」という指示を出すと、リポジトリのクローンからテストコードの作成、コミット、プッシュ、PR の作成、CI 結果の確認と修正などの一連の作業を Devin が行ってくれます。
テストコードを例に上げましたが、Devin GA の発表記事では "While Devin can be an all-purpose tool, we recommend starting with:" と書かれてあり、得意なものはあるようですが all-purpose を謳っています。
<!-- textlint-enable ja-technical-writing/no-doubled-conjunctive-particle-ga -->

https://www.cognition.ai/blog/devin-generally-available

もし本当に all-purpose に使えるのであれば、チームの中で滞っているタスクで優先度や重要度の低いタスクを進めてもらうのにぴったりですね。

Devin とは Slack 上でやりとりができ、しかもフィードバックに従ってタスクの精度も上がっていくとのことなので、まるで一人のエンジニアのチームメイトが増えたかような感覚を抱けそうです。

こちらの記事では初期設定までの流れが掲載されているので、Devin を使い始める場合に参考になりそうです。Devin, ぜひ使ってみたいですね！

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

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
