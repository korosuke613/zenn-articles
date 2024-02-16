---
title: 公開repoでのActionsスペック増強、tfのテストにモックが追加など｜Productivity Weekly(2024-01-24号)
emoji: 🎾
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240124
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
published_at: 2024-02-12 10:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-01-24 単独号です。

今回が第 140 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## GitHub-hosted runners: Double the power for open source - The GitHub Blog
https://github.blog/2024-01-17-github-hosted-runners-double-the-power-for-open-source/

GitHub がホストしている GitHub Actions ランナーについて、**パブリックリポジトリに限り** Linux と Windows でそれぞれ vCPU が 2 倍、メモリが 2 倍、ストレージが 10 倍になりました。

CPU 4 vCPU,メモリ 16 GB、ストレージ 150 GB で使用できます。
macOS は今回の記事では言及されておらず、変わりないようです。

使用にあたってワークフロー中のランナーのラベルを編集する必要は無く、そのままでスペックの上がったランナーが使用されます。

なお、記事中で「2023 年の GitHub Actions の総実行時間は 70 億分」とあります...！
よりビルド時間が短くなると開発者の生産性も上がりますし、GitHub 側のコスト削減にもなると思われるので、一石二鳥ですね！
パブリックリポジトリでのビルドに関してはありがたく使わせていただきます。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Copilot Content Exclusions Feature Update - The GitHub Blog
https://github.blog/changelog/2024-01-18-copilot-content-exclusions-feature-update/

GitHub Copilot のコンテンツ除外機能が復活しました。

content exclusions は元々去年末に public beta としてリリースされた機能です。ユーザが指定した任意のファイルやディレクトリを GitHub Copilot から除外することを可能とする機能でした（business 向け）。しかし、その後のリリースで重大なバグが見つかりロールバックされていました。

時系列:
- 2023/11/08 content exclusions 機能が public beta に: [Copilot Content Exclusion is now available in Public Beta - The GitHub Blog](https://github.blog/changelog/2023-11-08-copilot-content-exclusion-is-now-available-in-public-beta/)
- 2023/11/20 content exclusions 機能をロールバック: [Copilot content exclusions - Temporary rollback and upcoming fix - The GitHub Blog](https://github.blog/changelog/2023-11-20-copilot-content-exclusions-temporary-rollback-and-upcoming-fix/)
- 2024/01/18 content exclusions 機能が復活:（本記事）

今回、重大なバグが解消され、再リリースされたため、再び GitHub Copilot for Business ユーザは content exclusions 機能を利用できるようになりました。
また、元々のバグ修正だけでなく、パフォーマンス最適化や他の IDE でも利用可能になりました。

シークレットを扱う `.env` などの copilot に触って欲しくないファイルにおいては copilot を慎重に扱う必要があったため、今回の変更で機械的に除外できるようになったのは嬉しいですね。まだベータ版ではありますが、活用していきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Release v4.0.0 · actions/cache
https://github.com/actions/cache/releases/tag/v4.0.0

GitHub Actions の公式アクションである actions/cache のメジャーアップデートである v4.0.0 がリリースされました。

メジャーアップデートされた理由は Node.js 20 (`node20`)が利用されるようになったからかと思われます。これで公式の主要アクションのほとんどが Node.js 20 に対応したのではないでしょうか？（actions/cache は遅かった方に思える）

また、今回新機能として `save-always` フラグが追加されました。これはキャッシュの保存を常に行うようにするフラグです。通常、ジョブが失敗した場合キャッシュは保存されません。

例えばトピックブランチのジョブにおいて、`npm ci` は成功してその後のテスト等で失敗した場合、失敗したのはテストであるため npm のキャッシュは保存したいというケースがあります。そう言った場合にこのフラグがあると嬉しいですね。

Node.js 16 はすでに公式のサポートが終了しているため、早めに Node.js 20 に移行することをお勧めします[^node18]。基本的にバージョンアップして損はないと思うので、皆さん上げましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^node18]: GitHub Actions の JavaScript アクションでは Node.js 18 を指定できないため、`node16` の次は `node20` になります。

## Terraform 1.7 adds test mocking and config-driven remove
https://www.hashicorp.com/blog/terraform-1-7-adds-test-mocking-and-config-driven-remove

2024 年 1 月に Terraform 1.7 が GA になりましたね。

Terraform v1.6 でテストが導入されましたが、さらに v1.7 ではテストのモックが追加されました。
v1.6 でのテストでは plan または apply を使用して、実際のプロバイダを呼び出すことによって実行されていました。
しかし、`resource`, `data source`, `module`, `provider` のモックが利用できるようになり、認証することなくテストを実行できるようになります。
また、実際に API を叩かないので、プロビジョニングに時間がかかるリソース (データベースインスタンスなど) をモックすれば、テスト・スイートを実行するのに必要な時間を削減できる利点があります。

[公式ドキュメント](https://developer.hashicorp.com/terraform/tutorials/configuration-language/test#mock-tests)にも mock のチュートリアルが追加されていたので、興味がある方はそちらも参照してみてください。

個人的にテストのモックが目玉だと感じましたが、config-driven remove や import block 内で `for_each` が使えるようになったり地味に嬉しい変更もあります。

詳しくは[リリースノート](https://github.com/hashicorp/terraform/releases/tag/v1.7.0)をご覧ください。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Amazon ECS enables easier EC2 capacity management, with managed instance draining | Containers
https://aws.amazon.com/jp/blogs/containers/amazon-ecs-enables-easier-ec2-capacity-management-with-managed-instance-draining/

Amazon ECS on EC2 で、EC2 インスタンスの draining をマネージドにやってくれる機能が追加されました。

今まで ECS で使用している EC2 インスタンスが何らかの理由で終了した際に、ECS のタスクが要求数を満たさず、可用性が犠牲になるということがありました。
それを避けるために、ECS 利用者は次のようなブログ記事を参考に、自分たちで EC2 インスタンスの draining を実装したりして可用性を確保していました。
https://aws.amazon.com/jp/blogs/compute/how-to-automate-container-instance-draining-in-amazon-ecs/

今回、ECS 側に EC2 インスタンスをマネージドドレインする機能が追加されたことで、ユーザーが独自に実装することなくタスク数が前もって確保されるようになりました。
次のような流れで、可用性を保ちながら EC2 インスタンスを終了させることができるようになるようです。

1. なんらかの理由で AutoScaling が EC2 インスタンスを終了しようとすると、ECS がインスタンスをドレインモードに設定し、一時的にインスタンスの終了を遅らせます
2. ドレインモードにある EC2 インスタンスで新たにタスクが立ち上がることはなくなり、新しいタスクは EC2 インスタンスのキャパシティに空きがあればそこに増やし、無ければキャパシティプロバイダが EC2 インスタンスを増やせるようイベントを発火します
3. その後、ドレインモードになっている EC2 インスタンスを終了させるようです

とてもありがたいですね。ちなみに、私はこの公式のブログが出る前にマネージドインスタンスドレインのオプションがあることに気付きました...！なんか嬉しいです！
@[tweet](https://twitter.com/defaultcf/status/1747544937179353439)

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## リリース頻度を毎週から毎日にしてみた - NTT Communications Engineers' Blog
https://engineers.ntt.com/entry/2024/01/19/094639

NTT Communications さんによるリリース頻度を毎週から毎日にした方法とふりかえりについての記事です。

NTT Communications さんが開発する NeWork というサービスでは、元々毎週の決まった日にリリースを行なっていた（緊急対応除く）ようですが、フィードバックに即応してもすぐにリリースできなかったり、リリース直前に駆け込みマージがあってばたついたり、スケジュールを合わせる必要があったり、リリースが手動でミスする可能性があったりと、さまざまな課題があったそうです。

それらの課題を解決するために自動リリースの仕組みが導入され、本記事で説明されています。自動リリースは GitHub Actions で行われており、ワークフローをコードごと公開してくれています。さらに、ワークフローの説明が詳細に書かれているため、大変ありがたいです。

リリース頻度を毎日に、かつ、自動で行うようになってどうなったかも書かれており、同じような困り事を抱えているチームには特に参考になる記事だと思います。リリースフロー、よくしていきたいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## TerraformとCloud RunとCloud Load BalancingでCI/CDを突き詰めた
https://devblog.pirika.org/entry/2023/07/26/113000

Google Cloud のインフラを IaC と CI/CD で整備する方法を紹介しています。
Google App Engine で構築されていたアプリケーションを Cloud Run に移行し、Terraform や Cloud Build を使って自動デプロイを実現したそうです。

Terraform で Cloud Run アプリケーションをどのように管理するか問題は、自分も直面したことがあるので共感する内容でした。
こちらのブログでは、Terraform にはダミーのイメージを定義し、イメージ更新の際は更新用に用意したシェルスクリプトから `gcloud` コマンドを使うという方法をとっています。
フロントエンド、バックエンドなど各アプリケーションを逐次的にデプロイすると時間がかかるため、バックグラウンドでデプロイコマンドを行い、wait で待機するという方法をとっている点が特徴的です。

デプロイされた Cloud Run アプリケーションは、Cloud Load Balancing でリビジョンタグに基づいてルーティングするようにしているそうです。
このリビジョンタグは git ブランチ名やタグから自動的に生成しているため、開発用にデプロイした環境にも簡単にアクセスできるとのことで、開発者以外にとっても便利そうです。

殆ど全てのインフラが自動デプロイされており、快適な職場だと感じました。
また、ローカル開発環境も整備しているそうで、 Google が公式で提供する Cloud Pub/Sub エミュレーターはもちろんのこと、Cloud Storage, Cloud Tasks などのエミュレーターも使っているとのこと。サードパーティ製ですが、Cloud Storage のエミュレーターがあるのは知りませんでした。
余談ですが、Google Cloud にも Localstack のようなまとまったエミュレーターがあると嬉しい...

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## プラットフォーム エンジニアリングのキャリアを積むための基盤づくり
https://cloud.google.com/blog/ja/products/application-development/how-to-become-a-platform-engineer/

Google がプラットフォームエンジニアの業務内容や必要なスキルの紹介を含む、プラットフォームエンジニアリング分野の概要を紹介しています。

DevOps 革命やクラウドネイティブの発展、観測可能性と SRE の進歩から得られた教訓がある一方で、認知負荷の増加やセキュリティの複雑さが増していると指摘されています。
この課題に対して、プラットフォームエンジニアというロールを定義し、プラットフォームエンジニアに共通の特性や設計ループと顧客重視の重要性を紹介しています。

これまでも、しばしばプラットフォームエンジニアリングについての記事はいくつか見かけていました。
今回の記事はプラットフォームエンジニアが重視するべきトピックや、プラットフォームエンジニアが避けるべきことなど、具体的な話が含まれているのが特徴的です。

我々サイボウズ生産性向上チームもプラットフォームエンジニアリングに近しい活動をしているので、これからもこの分野の情報には注目していきたいです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 1分で出来る Android Lint と GitHub code scanning の連動
https://zenn.dev/yumemi_inc/articles/8d1603b5a8ea26

Android Lint の結果を GitHub Code Scanning にアップロードすることで本来は脆弱性管理用の GitHub のページ上で Lint の結果を確認できるようにする方法の紹介記事です。

こちらの記事の内容のより詳しい内容は先日行われた [Android Test Night #9](https://testnight.connpass.com/event/305270/) で発表されたようで、そのスライドも公開されていました。

https://speakerdeck.com/hkusu/android-nojing-de-jie-xi-niokeru-sarif-huairunohuo-yong

SARIF というフォーマット自体はセキュリティ関連のスキャンツールで有名な Trivy で知っていたのですが、Android Lint などの各種 Lint ツールが最近では SARIF に対応しているということは知りませんでした。GitHub Code Scanning の UI 上で未対応の Lint 結果などを管理できるのは便利そうですが、Private リポジトリだと GitHub Advanced Security の有料プランが必要なのが惜しいですね。

一方で標準フォーマットが定まれば GitHub 以外のサービスやツールも今後対応してくれる可能性が高いはずなので、SARIF というフォーマットには今後も注目しておきたいなと思います。



_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# tool 🔨

## superwhisperでの音声入力を試す | Web Scratch  
https://efcl.info/2024/01/17/superwhisper/

<!-- textlint-disable -->
最近、Mac OSアプリの一つの紹介記事で、Whisperという音声認識のモデルを利用しているアプリを紹介しました。自分も、MacBook Pro M2 Proで使ってみましたが、話し終わった後に数秒で文字予告書が完了するので待ち時間のストレスはなく認識制度もそこそこ高い印象です。

そのような内容を書き起こすたので、文書の書き起こしとしては認識制度が低いから使いにくいというキャズムはもう超えたのかなと感じました。

こちらの記事では紹介されていなかったのですが、superwhisperには音声認識に加えて、LALAMによる正規を行ってくれる機能も内蔵されており、音声認識モデルのサイズ+LALAMのプロンプとの組み合わせで認識モデルをカスタムすることも可能です。
おそらく認識後の書き起こしをそのままLLMに渡して整形してもらう構造になってそうなので、フロンフトを工夫することで話した内容を自動的に予約してもらったり、過剰書に書き直してもらうってことも可能そうです。ただ現状ではLLMの挙動は、挙動は怪しいというか、結果が安定していない気がします。ご視聴ありがとうございました

個人的には単なる音声認識以上の機能を持っていてなかなか面白いし未来を感じるのでいろいろ試して使いこなしてみたいと思います
<!-- textlint-enable -->

----

実は↑は原稿を読み上げて superwhisper で書き起こしてもらったものです。使用した音声認識と LLM のモデルは無料で利用できる範囲の性能のものを使っています。音声認識と LLM の結果がまだ不安定なので 3 つに分割して読み上げてそれぞれ何度かリテイクしたもののうち良かったものをコピペしています。以下がその原稿です。

> 最近話題のWhisperという音声認識のモデルを利用しているmacOSのアプリの紹介記事です。
>
> 自分もMacBookPro M2 Proで使ってみましたが、話し終わったあとに数秒で文字起こしが完了するので待ち時間のストレスはなく、認識精度もそこそこ高い印象です。むしろ、考えながら話しているとあーとかえーなどを言い淀んでしまったり、冗長な表現で話してしまうのですが当然そういった内容も書き起こされるので、文章の書き起こしとしては認識精度が低いから使いにくいというキャズムはもう超えていたのだなと感じました。
>
> こちらの記事では紹介されていなかったのですが、superwhisperには音声認識に加えてLLMによる整形を行ってくれる機能も内蔵されており、音声認識モデルのサイズ + LLMのプロンプトの組み合わせで認識モデルをカスタムすることも可能です。おそらく認識後の書き起こしをそのままLLMに渡して整形してもらう構造になってそうなので、プロンプトを工夫することで話した内容を自動的に要約してもらったり箇条書きに書き直してもらうということも可能そうです。ただ、現状ではLLMの挙動は怪しいというか、結果が安定していない気がします。
>
> 個人的には単なる音声認識以上の機能を持っていてなかなか面白いし未来を感じるので、色々試して使いこなしてみたいと思います。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Actions - Repository Actions Runners List is now generally available - The GitHub Blog](https://github.blog/changelog/2024-01-17-github-actions-repository-actions-runners-list-is-now-generally-available/)
    - GitHub Actions の Repository Actions Runners List が GA になりました
    - `repo:write` 権限を持つユーザなら誰でもリポジトリで利用可能なランナーを確認できる機能です
    - これでどのランナーが利用可能かの確認が容易になります

# あとがき
いやー大変遅くなってしまって申し訳ないです。今週号でした。毎回ですがタイトルが悩ましいです。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

