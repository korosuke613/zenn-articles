---
title: "Productivity Weekly (2022-02-02号)"
emoji: ""
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220203"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 61 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Serverless Framework V3 Is Live!
https://www.serverless.com/blog/serverless-framework-v3-is-live

サーバーレスアプリケーションを開発するためのフレームワークこと Serverless Framework が v3 にメジャーアップデートしました。

主な変更としては、環境ごとにパラメータを切り替える stage パラメータの導入、CLI の表示の改善、エラーメッセージの原因が分かりやすくなるなどがあります。

stage パラメータは、現在の stage（dev や prod といった）に応じて値が変更される機能です。`params.<stage名>.<任意のキー>` で値を設定し、`${param:<設定したキー>}` でステージに応じた値を取り出すことができます。

また、CLI の表示が改善されました。表示のデザインが新しくなり、余分な情報が排除されたり色が目に優しくなったりと、見やすく内容になりました[^design]。

記事には、各変更の説明、v2 からのアップグレード方法などが載っています。v3 になって使いやすくなったようなので早めに更新したいですね。

[^design]: 言葉での説明がむずい。詳しくは記事を読んでください。

## GitHub Actions: Self-hosted runners can now disable automatic updates | GitHub Changelog
https://github.blog/changelog/2022-02-01-github-actions-self-hosted-runners-can-now-disable-automatic-updates/

GitHub Actions のセルフホストランナーのランナー自動更新を無効化できるようになりました。無効にすることで管理者の任意のタイミングでランナーを更新できるようになります。

:::message
セルフホストランナーには実は自動更新機能があります。セットアップしてから一度もアーカイブを更新していませんという方もいらっしゃると思いますが、実は裏で更新作業が走っており、最新のランナーが使われるようになっています。（もちろんバージョンによっては自動更新機能で更新しきれない場合も確かあった気がしますが）
:::

ただし、サービスとの互換性のため、新しいバージョンが利用可能になってから 30 日以内に手動でランナーを更新する必要があるとも書かれています。更新しなかったらどうなるのかわかりません（ジョブが振られなくなる？？）が、自動更新を無効にしてバージョンを固定したとしても結局短いスパンで手動更新が必要になりそうです。

なんにせよ、アップデートタイミングをコントロールできるオプションが生えたのは嬉しいですね。使いたいケースがあるか分かりませんが覚えておきたいです。

## Dependency graph adds support for GitHub Actions | GitHub Changelog
https://github.blog/changelog/2022-01-31-dependency-graph-adds-support-for-github-actions/

GitHub の Dependency graph が GitHub Actions ワークフローをサポートしました。

Dependency graph はパッケージやライブラリの依存関係を可視化してくれる機能です。自分がどのパッケージに依存しているかも自分が作ったパッケージがどのリポジトリに依存されているかも確認できます。今回、サポート対象に GitHub Actions ワークフローが追加されました。これによりワークフローがどのアクションに依存しているか、自分の作ったアクションがどこに使われているかがすぐに分かります。

![](/images/productivity-weekly-20220203/dependency.png =500x)
*こんな感じです。ref も出てきて良いですね*

地味に嬉しい変更ですね。

## AWS Lambda がイベントソースとして Amazon MSK、Apache Kafka、Amazon MQ for Apache Active MQ、RabbitMQ の Max Batching Window をサポート
https://aws.amazon.com/jp/about-aws/whats-new/2022/01/aws-lambda-max-batching-window-amazon-msk-apache-kafka-mq-rabitmq/

AWS Lambda に呼び出しタイミングを微調整できる Max Batching Window 機能が追加されました。RabbitMQ などからのデータをイベントソースとする際にバッチ処理的にデータを流し込むことが可能になります[^kinesis]。Lambda が使える全てのリージョンで追加コストなしで利用できます。

これまではデータが流れてくるたびに Lambda を実行しなければならなかったため、バッチ処理のように大量のデータを Lambda でまとめて処理したい時は間に Amazon SQS を挟むなどをする必要がありました[^batch]。

今回対応したイベントソースは Amazon MSK、Apache Kafka、Amazon MQ for Apache Active MQ、RabbitMQ の 4 つです。これらをソースとする場合に複雑なことをしなくても呼び出しコストを減らせていけそうでいいですね。

[^kinesis]: これまでも Kinesis および DynamoDB をイベントソースとする場合は同じようなことができていました（[AWS Lambda が Kinesis および DynamoDB イベントソースのカスタムバッチウィンドウをサポート開始](https://aws.amazon.com/jp/about-aws/whats-new/2019/09/aws-lambda-now-supports-custom-batch-window-for-kinesis-and-dynamodb-event-sources/)）。名前は違いますが... 

[^batch]: 参考：[AWS でバッチ処理を実装する際の選択肢とサービス比較](https://zenn.dev/faycute/articles/fb310e3ccd783f)

# tool 🔨

## Docker DesktopからRancher Desktopに乗り換えてみた - knqyf263's blog
https://knqyf263.hatenablog.com/entry/2022/02/01/225546

Docker Desktop の代替になるかもしれないという RancherDesktop に Docker Desktop から乗り換えてみたという記事です。

[去年 Docker Desktop は一部有料化された](https://zenn.dev/korosuke613/articles/productivity-weekly-20210901#docker-is-updating-and-extending-our-product-subscriptions---docker-blog)ため、Docker Desktop の代替が盛んに探されていました（特に Mac は Linux や Windows と比べて Docker Desktop を使わずに Docker 環境を作る方法が面倒）。[podman](https://github.com/containers/podman) や [minikube](https://zenn.dev/korosuke613/articles/productivity-weekly-20210908#replacing-docker-desktop-with-hyperkit-%2B-minikube---cirrus-minor)、[lima](https://zenn.dev/korosuke613/articles/productivity-weekly-20210922#docker-desktop-%E7%84%A1%E3%81%97%E3%81%A7-docker-%E3%82%92%E4%BD%BF%E3%81%86-with-lima-on-mac---cangoxina) などさまざまな代替プロダクトに日の目が当たり、さまざまな人が探求していました。僕も幾つか実際に触ってみたのですが、やはりどれも手軽さでは Docker Desktop に及ばないと言うのが感想でした。

この記事で紹介されている Rancher Desktop は [SUSE](https://www.suse.com/ja-jp/) が開発している Kubernetes 環境を手軽に構築するための GUI アプリケーションです（内部で k3s、lima が使われている）。もともと containerd しか扱っていなかったのですが、最近 dockerd が選べるようになったので、Rancher Desktop も Docker Desktop の代替になりえてきました。

この記事では Docker Desktop から Rancher Desktop への移行方法、Kubernetes クラスタの無効化方法、イメージの脆弱性スキャンなどについてが解説されています。

Docker Desktop のようにインストール・起動するだけで VM の構築など諸々やってくれる、かつ GUI なのは手軽で嬉しいですね。Trivy が内包されておりイメージの脆弱性スキャンも手軽にできるのも便利そうです。Docker Desktop の完全な代替となるかはまだ怪しいですが、Docker Desktop 以外の選択肢が増えるのは嬉しいですね。今後の開発にも期待したいです。

:::message
ちなみに僕も私物 PC で Rancher Desktop を試してみたのですが、初回の依存関係ダウンロードにめちゃくちゃ時間がかかったり、起動がうまくいかなかったりと色々なトラブルに遭遇しました（それでもなんとか使えるようになった）。v1.0.0 とはなっていますがまだまだ不安定な感じもあるので利用する際は注意してください。
:::

## Alfredの代替としてRaycastを使っている - 詩と創作・思索のひろば
https://motemen.hatenablog.com/entry/2022/02/raycast

Mac における有名なランチャーとして [Alfred](https://www.alfredapp.com/) がありますが、似たようなツールである Raycast の紹介記事です。

この記事では Raycast の何が嬉しいかと extension の作成例を書いてくれています。コミュニティベースの Store から拡張機能をインストールできるのは嬉しいなと思いました。

別の人が書いた Raycast を使ってみての所感記事もありました。こちらは Raycast の機能ごとに Alfred と比較してくれています。Alfred をすでに利用している方はこちらの記事が参考になると思います。

https://blog.kyanny.me/entry/2021/12/22/221925

僕は Alfred を普段から利用しているのですが、Raycast も試してみました。コミュニティベースのストアがあったり見た目がなんかカッコよかったりするのは良さそうでした。しかし、Hotkey に任意のキーをダブルタップが設定できなかったため[^double]、Alfred のままで良いかな〜と思いました。

それぞれに良さがあると思うので、自分のユースケースに合っている方を使えば良いかなと感じました。気になる方は触ってみてください。

[^double]: 僕は Command キーのダブルタップでランチャーを起動したいのです。「慣れ」は強い。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [AWS、コンテナ特化で瞬時に起動する軽量VM「Firecracker」オープンソースとしてバージョン1.0に到達。AWS LambdaやAWS Fargateで利用](https://www.publickey1.jp/blog/22/awsvmfirecracker10aws_lambdaaws_fargate.html)
  - AWS が開発しているコンテナの実行に特化した軽量 VM、Firecracker が v1.0 になりました
  - 高速でセキュリティ対策もされていて、実際に Lambda や Fargate で使われているそうです
  - 個人の開発者がこれを直接使うことになるケースがあるかは分かりませんが、自前でサーバーレス環境を作りたい時に使えそうですね（そんな機会が来るかはわからない）

# あとがき
今週は出てきたネタが少なめだったため、余った時間は[竈門禰󠄀豆子が MySQL 5.6 で死ぬ話](https://qiita.com/ykami/items/d45ec72f8a5ea8b3288d)[^nezuko]や [ATOK がシークレットモード搭載した話](https://forest.watch.impress.co.jp/docs/news/1383509.html)[^atok]、[ブラウザで手軽に Zoom バ美肉の話](https://jp.techcrunch.com/2022/02/01/userlocal/)[^babi]なんかで盛り上がりました。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

[^nezuko]: MySQL 5.7 からは解消されているらしい。文字コード界隈は大変そうだ。
[^atok]: 何でもかんでも予測変換に出してくるから画面共有時は学習機能困るのは思ってた。ありがたい機能。
[^babi]: 何番煎じかと言うネタですが、ユーザーローカルが提供していると言う部分がミソでしょうか。結局 Zoom でやろうとするとパソコンが激オモになって使い物にならなくならんすよね。

## omake 🃏
今週のおまけです。

### yarn と npm の栄枯盛衰 | Nullable<T>
https://blog.ikeryo1182.com/yarn-and-npm/

先日 yarn v3 がリリースされました。この記事では yarn v3 の変更に対する感想が載っています。

しかし本当に面白い（興味深い）のはその後の「Why we use yarn」と「yarn vs npm」、「Conclusion」です。なぜ npm があったのに yarn が流行り出したのか、現代において yarn と npm どっちを選べば良いのかといったことが書かれています。確かになーと言う感じでした。

僕も大学生の頃 npm がめちゃくちゃ重い中 yarn を使ってみて、「なんて速いんだ」、「これからは yarn の時代だ！」とか考えていました。しかしいつの間にか npm のパフォーマンスがあんまり気にならないレベルになっていて、「じゃあもう npm でいいじゃん」ってなっちゃいましたね。懐かしいです。

ただ、やはり yarn は yarn でまだまだいいところがあって、Workspace 機能は npm に無い素晴らしい機能でした（もちろん他にも yarn 独自の素晴らしい機能はあります）。モノレポ構成なら yarn だなと思いました。npm v7 くらいから npm にも Workspace 機能が入りましたが、少なくとも入った当初はまだまだ微妙でした（最近はまた違うのかな？）。

最近は pnpm もあるのでこっちも気になりますね。なんかめちゃ速いらしい。

### 楳図かずお大美術展
https://twitter.com/Shitimi_613/status/1489894325177962498

六本木ヒルズの東京シティビューでやってる楳図かずお大美術展に行ってきました。楳図作品に関するいろんな芸術品や書き下ろし作品（ZOKU-SHINGO）の展示（撮影不可）があってとても楽しかったです。正直なところ漂流教室しか読んだことがなかったんですけど他の作品も読みたくなりました。

3/25 まで東京でやってるので皆さん行ってみてください。

https://umezz-art.jp/
