---
title: "Productivity Weekly (2021-05-19号)"
emoji: "💕"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 26 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## AWS App Runner のご紹介 | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/introducing-aws-app-runner/

AWS がコンテナ化されたウェブアプリケーションを簡単に構築するためのサービス AWS App Runner をリリースしました。コンテナを用意すれば、運用・公開に必要なリソース（エンドポイントや証明書など）は全て App Runner 側で用意してくれます。また、スケーリングも自動で行ってくれるようです。コンテナイメージは ECR から取得したイメージを使用するか、もしくは Github に上げたコードを取得・ビルド[^build]したイメージを利用できます。

さっそくクラメソさんがいくつか記事を出していました。コンソールからの起動だけじゃなく、AWS Copilot を使った起動方法も紹介してくださっていますね。

- [新サービスAWS App Runnerがローンチされたので試してみた | DevelopersIO](https://dev.classmethod.jp/articles/release-aws-app-runner/)
- [AWS App RunnerのサービスをAWS Copilotで起動させてみた | DevelopersIO](https://dev.classmethod.jp/articles/aws-app-runner-create-by-aws-copilot/)
- [Webアプリケーションのデプロイを簡単にする新サービスAWS App Runnerがリリース！AWS Copilotでデプロイ＆CI/CDパイプライン構築してみた | DevelopersIO](https://dev.classmethod.jp/articles/aws-app-runner-with-aws-copilot/)

何かアプリケーションをデプロイしたい時、アプリケーションだけでなく、運用や公開するために必要なその他もろもろも用意する必要があります。細かいチューニングをしたければ全て自前でやったほうが良いですが、そうでない場合は面倒です。AWS App Runner を使えばコンテナ化されたアプリケーションの開発に集中できて良いですね。

[^build]: Dockerfile からビルドするといったものではなく、Python3 か Node.js v12 で作られたアプリケーションをコンテナ化してくれるというものらしいです。

## GitHub Artifact Exporter open source release | The GitHub Blog
https://github.blog/2021-05-18-github-artifact-exporter-open-source-release/

GitHub が、GitHub 上の情報（コミット、マイルストーン、プロジェクト、プルリクエスト、リリース）を取得できるツール「GitHub Artifact Exporter」を公開しました。GitHub は強力な API を提供していますが、非エンジニアなどの API を叩くのに慣れてない人が手軽に GitHub 上のデータを取ってこれるようにこのツールをリリースしたとのことです。

実際に触ってみました。

GitHub Artifact Exporter 使ってみる
https://zenn.dev/korosuke613/scraps/dcc883e4ab8625

触ってみた感想としては、まだまだ開発途中という印象でした（一番面倒だったのは GUI のバイナリが提供されていないので手元でビルドして使う必要があったこと）。また、API を叩くことに慣れている方はこのツールをわざわざ使う必要はないと思いました。

ただ、やはり API を叩くのに慣れていない人に取っては手軽にデータを取ってこれるのは間違いなさそうです。誰でも手軽にデータを取得できるのは良いですね。

## GitHub OCTO | Flat Data
https://octo.github.com/projects/flat-data

GitHub OCTO[^octo] が Git と GitHub でデータを簡単に操作できるようにするプロジェクトである Flat Data を発表しました。Flat Data を使うことで、データセットを簡単にリポジトリに取り込んで可視化できます。Flat Data は 3 つのソリューションからなっており、それぞれが「Flat Editor: GUI で Flat Action を使ったワークフローを作る」、「Flat Action: データを取得・後処理し、GitHub リポジトリに登録する」、「Flat Viewer: データを可視化して共有を容易にする」という役割を持っています。

実際に触ってみて、自身のコントリビューション数を Flat Viewer で可視化しました。

https://zenn.dev/korosuke613/scraps/0eef7641bcd48f

https://twitter.com/Shitimi_613/status/1395066290172174339

実際やってみようとしたら慣れが必要ですが、後処理をするための便利なライブラリが提供されていたり、データを用意するだけで簡単にデータを可視化できたりと、データを手軽に可視化して共有したいとなった時になかなか便利そうですね。

[^octo]: GitHub's office of the CTO の略で、GitHub の CTO 室的な組織のようです。最近できた？

# know-how 🎓

## The do’s and don’ts of integration testing | syrett.blog
https://syrett.blog/the-dos-and-donts-of-integration-testing/

安定した信頼性のあるインテグレーションテストの実現のためにやるべきこと・やるべきでないことリストです。やるべきこと・やるべきでないことと、その詳細・理由が簡潔に記されています。チートシート的な使い方もできそうです。

英語で記述されていますが、あまり文量が多くないのでそんなに読むのが大変ではないため、気軽に読めます。テストに関わる人へおすすめしたい記事です。
## Selenium, AWS Lambda, AWS Fargate, AWS Developer Tools を使ったサーバーレスなUIテスト | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/serverless-ui-testing-using-selenium-aws-lambda-aws-fargate-and-aws-developer-tools/

Selenium, AWS Lambda, AWS Fargate, AWS Developer Tools を使ってサーバーレスで UI テストを行うための手法を紹介した記事です。

AWS Fargate、AWS Step Functions を使うことで複数の Lambda 上で並列に UI テストを行うことができるため、UI テストを高速に実行できます。この記事では、どうやって実現するかが詳細に説明されています。また、説明されている構成を用意するための [CloudFormation テンプレートが公開されている](https://github.com/aws-samples/serverless-ui-testing-using-selenium)ので、自分の環境で試してみることも可能です。

UI テストを自動で行おうとするとテスト環境の用意や並列実行がなかなか大変です。CI/CD のクラウドサービスを利用することで比較的簡単に用意はできますが、並列実行数に制限があったりサービス側の状況次第ではジョブが立ち上がるまでに時間がかかったりしてしまいます。この記事で説明されている手法を用いることで、そういった制限にとらわれず UI テストを高速に回すことができそうですね。

# tool 🔨
## Slidev
https://sli.dev/

スライドをマークダウンで作る系のツールです。まだリリースしたばかりなのでパブリックベータで提供されています。Sli**dev**という名前の通り、developer friendly なツールであることをであることを謳っています。

下の記事が Slidev の使い方や特徴的な機能を紹介しています。
https://zenn.dev/ryo_kawamata/articles/introduce-slidev

シンタックスハイライトを楽に適用できる。SPA（シングルページアプリケーション）として出力可能で、スライド一覧の表示やダークモードの切り替えなどがプレゼンしながらできるようです。インカメラをスライドに出しながらプレゼンできることと録画機能が個人的に面白かったです。昨今の情勢にあったリモートでのプレゼンを意識していそうですね。

スライドを作成する際はなかなかスタイルを考えるのが面倒なのでこういうツールはありがたいですね。開発者向けであるとのことなので、僕も次回プレゼンを作る必要が出たときに使ってみたいと思いました。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Video uploads now generally available | GitHub Changelog](https://github.blog/changelog/2021-05-13-video-uploads-now-generally-available/)
  - GitHub での動画のアップロード機能が GA になりました。
  - issue や PR、discussion、README など、Markdown が書けるところはだいたい使えそうです。
  - 不具合の再現手順とか UI の改修イメージとか貼るのによさそうですね。
- [AWS Amplify Hosting announces server-side rendering (SSR) support for Next.js web apps](https://aws.amazon.com/jp/about-aws/whats-new/2021/05/aws-amplify-hosting-announces-server-side-rendering-support-for-next-js-web-apps)
  - AWS Amplify がサーバサイドレンダリング(SSR)をサポートしました。
  - ただし、Next.js に限ります。
  - SSR アプリケーションの公開がしやすくなりましたね。

# あとがき
最近は気になったネタがあったら Productivity Weekly 記事を書く前に 1 回触ってたりします（今回の GitHub Artifact Exporter や Flat Data のような）。その結果記事を出すのがちょい遅れてしまう感じです。ちょっと前は「すぐに記事出さなきゃ！」という気持ちだったのですが、最近は 2, 3 日遅れてもそんなに読者は困らなそうと思うようになってきたので、ベストエフォートで早めに書くようになりました。気持ち的にも楽でちょうどいいです。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### デートサイエンス | 大阪工業大学
![](https://storage.googleapis.com/zenn-user-upload/itfychzz4vqdotagpjtzzuumlu5r =300x)

https://www.oit.ac.jp/japanese/juken/date_science/

デートサイエンスは一番身近なデータサイエンス。とのことです。さまざまな恋愛に関する数字を紹介しているサイトです。全体的におしゃれ。データサイエンスとデートをかけているんですね。

ページに飛ぶと以下のようにセリフが流れていきます。

![](https://storage.googleapis.com/zenn-user-upload/8iegmdjq5btn1kzqrt3uhxvmdl2c =350x)

気になるセリフをクリックすると下のようなエモい感じの写真とエピソード（関連する数字にまつわる説明）が表示されます。

![](https://storage.googleapis.com/zenn-user-upload/c1za3tnopzfvmwsal2186j80dguc =350x)

面白くて色々なセリフをクリックしたのですが、甘酸っぱいストーリーが広がっていて、なんかこう来るものがありますね。~~僕も学生の頃を色々と思い出しました。~~

真面目な話をすると色々な数字を知ることができるので勉強になって良いです。

このサイトなんなんだろうと思ったら、大阪工業大学のデータサイエンス学科開設を宣伝するためのサイトなんですね。面白いです。
