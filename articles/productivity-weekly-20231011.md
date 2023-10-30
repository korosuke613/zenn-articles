---
title: "State of DevOps 2023レポートが公開！日本語版はまだ：Productivity Weekly (2023-10-11号)"
emoji: "🍵"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231011"}
published_at: "2023-10-31 10:00"
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-10-11 単独号です。

今回が第 128 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)

:::

# news 📺

## 2023 State of DevOps Report  |  Google Cloud
https://cloud.google.com/devops/state-of-devops?hl=en

2023 年版の State of DevOps Report が公開されました。
State of DevOps Report は Google の DevOps Research and Assessment（DORA）チームが毎年公開している DevOps や開発生産性にまつわる年次レポートです。(2023/10/11 現在、日本語ページだと 2022 年の日本語版のレポートに飛ばされるので注意)

今年のレポートの概要は以下のとおりです。

### 健全な組織文化の確立
  - 文化は、技術的能力を構築し、技術的パフォーマンスを高め、組織のパフォーマンス目標を達成し、従業員を成功に導くための基盤である
  - [Westrum の組織類型の定義](https://cloud.google.com/architecture/devops/devops-culture-westrum-organizational-culture?hl=ja)における、創造的な文化を持つチームは、組織パフォーマンスが 30％ 高い
  - 注目すべき新発見は、ソフトウェア開発に対するユーザー重視のアプローチをとる組織が、パフォーマンスの有意な向上につながっていた

### ユーザーを重視する
- ユーザーを深く理解し、ユーザーからのフィードバックを繰り返し調整し、取り入れている組織は、ユーザーを重視していない組織に比べ、パフォーマンスが 40% 高く、仕事満足度は 20% 高いことが分かった
  - これは、ユーザーに焦点を当てることで、製品開発チームと運用チームがユーザーのために適切なものを作ることができるためである
  - そのような組織は、ユーザーのニーズに強く焦点を当てながら、デリバリー、オペレーション、組織的パフォーマンスにわたって強みを発揮できる
- また、ユーザーを重視する組織は組織の開発能力、従業員満足度も高くなる

### コード・レビューの高速化でソフトウェア・デリバリーのパフォーマンスを向上
  - コードレビューを高速化することは、ソフトウェアデリバリーのパフォーマンスを向上させる最も効果的な方法である
  - 効率的なコードレビュープロセスは、コードの改善、知識の伝達、コードの所有権の共有、チームの所有権、透明性につながる
  - コードレビューが高速化されたチームは、ソフトウェアデリバリーのパフォーマンスが 50% 向上している
  - ペアプログラミングはコードレビューの時間を短縮できるプラクティスである

### 質の高い文書化で技術力を増幅する
  - 高品質のドキュメンテーションは、組織のパフォーマンスを向上させる
  - たとえば、トランクベースの開発では、質の高い文書が整備されている場合と質の低い文書が整備されている場合とを比較して、組織のパフォーマンスに与える影響が 12.8 倍になると推定されている
  - 「組織内で過小評価されている」と感じているグループでは、ドキュメンテーションの質が高まるにつれて、燃え尽き症候群のレベルが高まると報告されており、今後の調査項目となっている

### クラウドでインフラの柔軟性を高める
  - パブリッククラウドを使用すると、クラウドを使用しない場合と比較して、インフラの柔軟性が 22% 向上する
  - この柔軟性は、柔軟性のないインフラと比較して、組織のパフォーマンスを 30% 向上させる。クラウドの価値を最大限引き出すために重要なのは、クラウドが提供する差別化された特性や能力、すなわちインフラの柔軟性を活用することである
  - クラウドコンピューティングは柔軟なインフラを可能にするが、ただクラウドを使っているだけだと、その利点は自動的には実現しない
  - 単にデータセンターからクラウドへの「リフトアンドシフト」は効果がなく、場合によっては逆効果である
  - クラウドを適切に活用すると、エンジニアの仕事の満足度や生産性が向上し、燃え尽き症候群のリスクは減少する
  - クラウドコンピューティングの 5 つの特性（オンデマンド自己サービス、広範なネットワークアクセス、リソースプーリング、迅速な弾力性、測定可能なサービス）を最大限に活用することが、成功への鍵である
  - 複数のクラウドを使うことも柔軟性を高めるが、それぞれのプラットフォームが異なるため、運用の複雑性が増す可能性がある

### 仕事を公平に配分する
- 昨年のレポートにおいて、女性と自認する回答者や性別を自称する回答者、組織内で過小評価されていると感じている回答者は、男性と自認する回答者、及び組織内で過小評価されていると感じていない回答者よりも燃え尽き症候群のレベルが高いことがわかっている
  - 女性である、または性別を自称する回答者は、男性である回答者よりも 6％ 高いレベルの燃え尽き症候群を経験したと報告した
  - また、何らかの形で過小評価されていると自認する回答者は、過小評価されていないと自認する回答者よりも 24％ 高いレベルの燃え尽き症候群を経験したと報告した
- 女性であると回答した回答者、または性別を自称した回答者は、男性であると回答した回答者よりも 40％ 多く反復的な仕事、計画性のない仕事、同僚から見えにくい仕事、自分の専門スキルに直接結びつかない仕事をより多くしていると報告している
  - この調査結果は、これらのグループが報告した燃え尽き症候群を部分的に説明している。
- そこで、仕事を公平に分配することで、燃え尽き症候群を軽減できるのではないかと考えた
- その結果、男性であると回答した人、女性であると回答した人、または性別を自称する回答者において、仕事の分配が燃え尽き症候群を軽減させることがわかった
- 燃え尽き症候群を発症する人たちは、帰属感が不確実であるために過小評価されていると感じている可能性がある
- そのため、燃え尽き症候群を軽減するためには、帰属文化を作ることが重要である

今回のレポートを読んで印象的だったのは以下のとおりです。

- ユーザー中心主義の効果が絶大
  - 開発生産性と従業員のやりがいが高まる
  - さらに、開発能力(トランクベース開発、CI/CD など)の向上にもつながる
- 素早いコードレビューは開発生産性を向上させる
  - そのため、モブプログラミングの効果は高い
- ChatGPT や Copilot のような AI を交えた開発についての話題は少なかった
- 燃え尽き症候群が生産性を低下させる
  - 燃え尽き症候群対策として、組織文化の改革と帰属意識の醸成が必要

本記事では概要程度の紹介になっておりますので、さらに詳細を知りたくなった方はぜひレポートを読んでみてください。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

:::message

#### 2023/10/30 追記 by [@korosuke613](https://zenn.dev/korosuke613)
今回 State of DevOps Report 2023 を紹介してくれた [@r4mimu](https://zenn.dev/r4mimu) さんが、後日、レポートのまとめを記事に書いてくれました。
さらに深掘りされているので、興味持った方は読んでみてください。
~~早く日本語版出てほしいはある~~

- [State of DevOps Report 2023 のまとめ](https://zenn.dev/cybozu_ept/articles/c0ad1f13cb8d72)

:::

## Amazon EKS extended support for Kubernetes versions available in preview | Containers
https://aws.amazon.com/jp/blogs/containers/amazon-eks-extended-support-for-kubernetes-versions-available-in-preview/

Amazon Elastic Kubernetes Service (EKS) の Kubernetes バージョン延長サポートオプションがプレビューで利用可能になりました。
サポート延長は 12 か月までとのことです。
これにより、特定の Kubernetes バージョンが標準サポートと延長サポート機能を合わせて最大 26 か月間利用できるようになります。

EKS 1.23 (2023/10 サポート終了) から自動で適用され、オプトインなど追加のアクションや設定は不要です。
プレビュー期間は延長サポートに対して追加料金はかからず、正式利用可能予定の 2024 年初旬からはクラスターごとに追加料金が発生するそうです。

>  Clusters running version 1.23 will automatically upgrade to version 1.24 in October 2024 when the extended support period for version 1.23 ends.

とあることから、サポート終了後は自動的に次のバージョンにアップグレードされることが分かります。

Kubernetes バージョン更新追従は大変なので、このような延長サポート機能はありがたいですね。
ただ、延長サポート機能は自動的に適用されるため、意図しないバージョン延長サポートによって追加料金が発生してしまう可能性には注意です。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_


## Actions - Secure deployment rollouts to protected environments based on select tag patterns - The GitHub Blog 
https://github.blog/changelog/2023-10-06-actions-secure-deployment-rollouts-to-protected-environments-based-on-select-tag-patterns/

GitHub Actions の Environments の設定でデプロイ可能なブランチを制限することは以前から可能だったようですが、今回からタグでも同様の制限が可能になりました。

デプロイのルールとして先にタグを打ってからデプロイするようなフローを強制したい場合などに使えそうです。個人的にはさらにデプロイに必要なトークンなどを Environments に紐づいた Secret と保存しておくことで、GitHub Actions からデプロイするフローにさらに強制力を持たせることが可能になると思いました。

実際にデプロイ可能なタグを制限したときの挙動を実験してみたので、興味がある方はこちらのスクラップも見てみてください。

https://zenn.dev/kesin11/scraps/046fdf7f9eba65

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_



## Terraform 1.6 adds a test framework for enhanced code validation
https://www.hashicorp.com/blog/terraform-1-6-adds-a-test-framework-for-enhanced-code-validation

2023 年 10 月 4 日に Terraform 1.6 がリリースされました。
細かなアップデートはいくつかありますが、印象的なのは `terraform test` コマンドでしょうか。(ドキュメントは[こちら](https://developer.hashicorp.com/terraform/language/tests?ajs_aid=474da431-0ceb-4f54-b577-b98049a8b39e&product_intent=terraform))


`terraform test` では HCL 構文で書かれたテストコードを実行できます。
デフォルトではルートディレクトリと `tests` ディレクトリの下のうち、拡張子が `.tftest.hcl` であるテストコードを実行します。

テストコードは `run` ブロックで定義しアサーションが評価されます。

例えば、以下のような Google Compute Instance を作成するコードがあったとします。

```hcl:main.tf
resource "google_compute_instance" "tf_test" {
  name         = "tf-test-instance"
  machine_type = "n2-standard-2"
  zone         = "asia-northeast1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
    access_config {
    }
  }

  metadata = {
    foo = "bar"
  }
}
```

この `tf_test` インスタンスのインスタンス名をテストするには以下のようなテストコードを書きます。

```hcl:main.tftest.hcl
run "check_instance_name" {
  command = plan
  assert {
    condition     = google_compute_instance.tf_test.name == "tf-test-instance"
    error_message = "Instance name is not tf-test-instance"
  }
}
```

実際に実行すると以下のようになります。

```console
❯ tf test
main.tftest.hcl... in progress
  run "check_instance_name"... pass
main.tftest.hcl... tearing down
main.tftest.hcl... pass

Success! 1 passed, 0 failed.
```

試しにインスタンス名を `tf-test-instance` から `tf-test-instance1` に変更してみると以下のようにテストが失敗します。

```console
 ❯ tf test
main.tftest.hcl... in progress
  run "check_instance_name"... fail
╷
│ Error: Test assertion failed
│ 
│   on main.tftest.hcl line 4, in run "check_instance_name":
│    4:     condition     = google_compute_instance.tf_test.name == "tf-test-instance1"
│     ├────────────────
│     │ google_compute_instance.tf_test.name is "tf-test-instance"
│ 
│ Instance name is not tf-test-instance
╵
main.tftest.hcl... tearing down
main.tftest.hcl... fail

Failure! 0 passed, 1 failed.
```

上記の例では `command = plan` としたので plan 結果からテストを検証しています。
`command = apply` とすると、実際にリソースを作成してテストを評価し、テスト終了後は自動的にリソースは削除されます。
そのため、`terraform apply` してみて初めて気がつく、構文や設定系のミスがテストで検出できるかもしれません。

`run` ブロックでは `variables` や `module`, `providers` などのブロックを定義でき、リソースファイルに定義したものをオーバーライドできるので、テストの拡張性も高そうです。

[公式チュートリアル](https://developer.hashicorp.com/terraform/tutorials/configuration-language/test?ajs_aid=474da431-0ceb-4f54-b577-b98049a8b39e&product_intent=terraform)では `http` データソースを使って、 Web サイトがデプロイされて正常に稼働しているかを `terraform test` で検証するという高度なテストを紹介しています。そちらも参考にしてみてください。

バージョン 1.5 の import 機能に続き、標準で便利な機能がされ嬉しいですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_


## 🤖Ask AIがCircleCI Discuss(http://discuss.circleci.com )に登場！
https://twitter.com/CircleCIJapan/status/1709362246852517907

CircleCI Discuss で AI に質問できる機能が追加されました。百聞は一見にしかずなので AI がどれぐらいのレベルの回答をしてくれるのか早速試してみました。

> Config.ymlを分割したい

https://twitter.com/Kesin11/status/1709582126205849946?conversation=none

[Dynamic Configuration](https://circleci.com/docs/ja/dynamic-config/) を利用すれば分割できるのは正しいですね。その先が驚きで、さらに発展形として [bufferings/split-config](https://circleci.com/developer/orbs/orb/bufferings/split-config)というサードパーティの Orb を利用することも提案してくれました。Dynamic Configuration は公式ドキュメントが存在しますが、サードパーティの Orb はさすがにドキュメントには存在しないはずなので AI はドキュメント以外も情報源にしていそうですね。

> リポジトリが巨大なのでcheckoutに数十分もかかります。なんとか高速化する方法はないでしょうか？

https://twitter.com/Kesin11/status/1709584713722310844?conversation=none

次の質問はちょっといじわるな内容で、CircleCI では自分の知る限り `checkout` では `git clone --depth=1` などのオプションを追加できないので標準機能では対応できないはずなのです。これに対する回答は `checkout` を使う代わりに `git clone --depth` を使うか、[issmirnov/fast-checkout](https://circleci.com/developer/ja/orbs/orb/issmirnov/fast-checkout) というサードパーティの Orb を提案してくれました。こちらの Orb は自分も初めて知ったのですが、中身を見ると Git の Partial Clone と Sparse Checkout を実行していたので AI の回答文は正しいと思います。

個人的には今回試した質問に対する AI の回答は技術的にも文章も妥当な回答だと思いました。もちろん AI の回答が 100%正しいとは限らないのですが、ググって発見した情報も 100%正しいとは限らないので、今後は AI と検索の両方で見つけた情報から総合的に判断していく時代になるかもしれないと感じました。

反響がさみしいと早々に引っ込んでしまうかもしれないらしいので、皆さんもぜひ AI に質問してみましょう！

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# know-how 🎓

## GitHub Actions のコスト戦略 - GeekFactory
https://int128.hatenablog.com/entry/2023/10/07/214726

GitHub Actions は public リポジトリで通常の GitHub-hosted runner（いわゆる larger runner じゃないランナー）を使う上では無料です。しかし、private リポジトリやいわゆる larger runner は従量課金となっています（無料枠もあったりするが）。Self-hosted runner は従量課金の対象外となりますが、runner を動かすコストは結局発生します。
OSS 等で使うならともかく、業務で GitHub Actions を使う上で無視できないのがコストです。コストを最大限抑えたら開発体験が悪くなります。かといってコストを最大限許容すると開発体験は上がるかもしれませんが余剰リソースが発生してもったいないです。コストと開発体験をいい感じの塩梅にするのは簡単ではありません。

この記事では、GitHub Actions のコスト構造、Actions に限らない CI ジョブの特徴、Kubernetes で Self-hosted runner を動かした場合のコスト戦略（コスト計測、最適化）について解説されています。Amazon EKS 上で動かす場合を題材としていますが、他の手法でも十分参考になる内容だと思いました。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Actions Runner Controller Deep Dive！- コード解説 後編 - - APC 技術ブログ 
https://techblog.ap-com.co.jp/entry/2023/09/29/182024

[actions/actions-runner-controller](https://github.com/actions/actions-runner-controller) の最新機能である Scale Set のコード解説。いよいよ本丸とも言える GitHub へのロングポーリングとランナーのオートスケール機能の解説編です。

前半・後半と合わせるとかなりの長編記事ですが、ARC の k8s 上のコンポーネントがどの機能に対応していて、どういう仕組みでランナーがスケールアウト、スケールインしているかが解説されています。生産性向上チームでは k8s を使わない [philips-labs/terraform-aws-github-runner](https://github.com/philips-labs/terraform-aws-github-runner) を利用しているので ARC のコードはあまり読んだことがなかったのですが、行っていることはやはり何となく似ているという印象を受けました。

Scale Set の機能に関しては API ドキュメントがまだ公開されていないので詳しくは分からないことが多く、早く公開してほしいなと思っています。

次回は ARC のメトリクス監視についての解説が予告されているので楽しみにしましょう。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

<!-- textlint-disable ja-technical-writing/no-mix-dearu-desumasu -->

- **news 📺**
  - [Secure by Design: AWS to enhance MFA requirements in 2024 | AWS Security Blog](https://aws.amazon.com/jp/blogs/security/security-by-design-aws-to-enhance-mfa-requirements-in-2024/)
    - AWS Organizations の管理アカウントのルートユーザでコンソールにサインインする場合、2024 年半ば以降から MFA の使用を義務付けることを AWS が発表しました
    - 多くの AWS Organizations の管理アカウントのルートユーザは MFA を有効にしていると思います（主観）が、有効にしていない場合はこれを機に有効にしておきましょう
- **know-how 🎓**
  - [仕様が読めるようになるOAuth2.0、OpenID Connect 入門 - Speaker Deck](https://speakerdeck.com/authyasan/shi-yang-gadu-meruyouninaruoauth2-dot-0-openid-connect-ru-men)
    - OAuth2.0、OpenID Connect の入門スライドです
    - OAuth とは何か、OIDC とは何かなどを図解を交えてわかりやすく解説されています

<!-- textlint-enable ja-technical-writing/no-mix-dearu-desumasu -->

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
今週号でした。最近は僕が kintone 開発チームにチーム体験に行ってたり、給与評価のために今年やったことを書かなきゃいけなかったりと、なかなか時間が取れません。

そういや今週号から試験的にタイトルにでかめトピックのワードを入れるようになりました。Zenn はタイトルに 70 字制限があるので、まあまあ大変ですが 😇

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## Engineering Productivity Meetup #1 in Tokyo - connpass
https://cybozu.connpass.com/event/298452/

サイボウズの東京オフィスで開発者の日々の生産性を高めるための知見や技術を語り合うイベントを開催されます（宣伝）。
発表・質問・交代含む 10 分程度の LT 形式です。簡単な自動化でもなんかすごい改革でも、「開発生産性の向上」に関する内容であればなんでもいいので、みなさんどしどし参加してください。


