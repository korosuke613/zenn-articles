---
title: attestationsやfeature flagの話など｜Productivity Weekly(2024-06-26)
emoji: 🏷️
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240626
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
published_at: 2024-07-17 12:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-06-26 単独号です。

今回が第 158 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2024-07-03 号の Productivity Weekly は社内イベントのためお休みです。
:::

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
- [@r4mimu](https://zenn.dev/r4mimu)
- [@uta8a](https://zenn.dev/uta8a)

:::

# news 📺

## Artifact Attestations is generally available - The GitHub Blog
https://github.blog/changelog/2024-06-25-artifact-attestations-is-generally-available/

以前 [2024/05/08 号](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240508#introducing-artifact-attestations%E2%80%93now-in-public-beta---the-github-blog) でも触れた Artifact Attestations が GA になりました。この機能を使うことで、コンテナイメージやバイナリといったソフトウェアのビルド成果物が、どのワークフローで作られたものかという来歴を証明できます。
attestation の付与は Public Repository ならどのプランでも利用可能で、[Private Repository は GitHub Enterprise Cloud ライセンスが必要なようです](https://github.com/orgs/community/discussions/129761#discussioncomment-10010109)。

また、Kubernetes admission controller を用いてクラスタ内で attestation の検証を行えるようになりました。導入方法は [Enforcing artifact attestations with a Kubernetes admission controller](https://docs.github.com/ja/actions/security-guides/enforcing-artifact-attestations-with-a-kubernetes-admission-controller) に詳しく書かれていますが、簡単に説明します。

次のようにクラスタ内の attestation の検証を設定します。

1. Sigstore Policy Controller をデプロイする
2. TrustRoot に GitHub を追加し、ポリシーを設定する
3. ポリシーの有効化

ポリシーを有効化すると、TrustRoot で指定した鍵置き場のみを attestation の検証に用いて、ポリシーに従って検証します。Artifact attestation は Private Repository で GitHub の Private の Sigstore インスタンスを使用するので、GitHub を TrustRoot に追加しておく必要があります。また、ポリシーのデフォルトの挙動は attestation の検証が通ったものは全て許可となっているため、特定の Image に制限したいといった細かな設定は `ClusterImagePolicy` で行いましょう。

また、直接この記事と関連しませんが、Trail of Bits の引用で Homebrew について触れられていたところが面白かったです。[homebrew 4.3.0](https://brew.sh/2024/05/14/homebrew-4.3.0/) から `export HOMEBREW_VERIFY_ATTESTATIONS=1` としておくと `brew install` する際に attestation の検証も行われるようになりました。まだ[early betaなので通常利用は推奨されていません](https://blog.trailofbits.com/2024/05/14/a-peek-into-build-provenance-for-homebrew/)が、attestation の活用の広まりを感じます。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Anthropic’s Claude 3.5 Sonnet model now available in Amazon Bedrock: Even more intelligence than Claude 3 Opus at one-fifth the cost | AWS News Blog 
https://aws.amazon.com/jp/blogs/aws/anthropics-claude-3-5-sonnet-model-now-available-in-amazon-bedrock-the-most-intelligent-claude-model-yet/

Amazon Bedrock で使用できる学習モデルに Anthropic の Claude 3.5 Sonnet が追加されました。
Anthropic の出した学習モデルの中で最も性能スコアの高かった Claude 3 Opus よりも性能スコアが高く、それでいてコストは 80% 安いそうです。

GPT-4o や Gemini との比較も載っており、興味深いです。
試しに触ってみましたが、日本語であっても非常に明解な文章を出力してくれている感じがします。

どんどん性能が高くなりコストは低くなる流れは、利用者にとって非常に嬉しいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## GitHub Actions: Ubuntu 24.04 image now available for arm64 runners - The GitHub Blog
https://github.blog/changelog/2024-06-24-github-actions-ubuntu-24-04-image-now-available-for-arm64-runners/

2024 年 6 月時点で Public Beta として提供されている GitHub Actions Arm ランナーに Ubuntu 24.04 のイメージが追加されました。[以前のアナウンス](https://github.blog/changelog/2024-06-03-actions-arm-based-linux-and-windows-runners-are-now-in-public-beta/)と同様、Larger runner としての提供のため、GitHub Team または GitHub Enterprise プランでのみ利用可能です。さらなる進展を待ちましょう！

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## New JavaScript Set methods | MDN Blog 
https://developer.mozilla.org/en-US/blog/javascript-set-methods/

JavaScript には集合を扱うことができる Set オブジェクトが 2014 年くらいからありますが、2 つの集合の差分や共通の値を出すメソッドは無く、サードパーティーのライブラリを使用するか自前で実装する必要がありました。
あれから時が経ち、2023 年後半から主要ブラウザに集合の差分や共通の値を出すメソッドが実装されるようになり、2024 年 6 月についに Firefox にも実装されました。これによりこれらメソッドの Baseline では Widely supported と表示され、開発者は安心して使用できます。

ようやくという気がしますが、便利になって嬉しいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Help us test OpenTofu 1.8.0-alpha1
https://opentofu.org/blog/help-us-test-opentofu-1-8-0-alpha1/

OpenTofu v1.8.0 のアルファ版の紹介です。
Early variable/locals evaluation という新機能により、backend や module source に変数が使えるようになります。つまり、変数でモジュールのバージョン指定ができるようになる地味に嬉しいアップデートです。Terraform では `source` に変数を使いたいと、ちょいちょい議論されていましたが、OpenTofu では実現されるようです。コミュニティベース開発の良さと言えるかも知れませんね。これに伴い、Terraform との互換性がなくなるので `.tofu` 拡張子が作られ、`.tofu` ファイルを `.tf` ファイルよりも優先で見るようになるそうです。ついにといったところでしょうか。

余談ですが、OpenTofu のブログのサムネが可愛いですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Fastlyが開発者向けの無料プランを提供開始。CDNやDDoS対策、Wasm対応ランタイム、KVストアなど提供 － Publickey
https://www.publickey1.jp/blog/24/fastlycdnddoswasmkv.html

CDN で有名な Fastly が開発者向けの無料プランの提供を開始しました。クレジットカードの登録なしで使えるのは嬉しいですね。

機能としては CDN, サーバレスランタイム, 画像の配信最適化などです。[私もアカウントを作って機能をざっと眺めてみたところ](https://zenn.dev/uta8a/scraps/cb5bff850bf020)、特に面白そうに感じたのは次の 3 点です。

- Compute というサーバレスランタイムが Rust SDK をサポートしている
  - 公式には [Rust, JavaScript, Go](https://www.fastly.com/documentation/guides/compute/) の SDK が利用可能
  - Wasm にコンパイルされて、wasmtime というランタイム上で動かすので、他の言語も Wasm に変換できれば動く
- Observability という Compute や CDN のサービスのメトリクスダッシュボードが充実している
- Labs の AI ワークフローがまだ beta だけど面白そう

Cloudflare Workers も Wasm をサポートしていますし、エッジのサーバレス系で Wasm 利用が一般的になってきたのを感じます。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

# know-how 🎓

## 開発生産性指標を向上させるためにやってはいけないアンチパターン - Findy Tech Blog
https://tech.findy.co.jp/entry/2024/06/24/090000

Four Keys 指標に基づいた開発生産性の向上を取り組むうえでのアンチパターンを紹介している記事です。複数のアンチパターンが述べられており、具体例とともに改善点や注意点が記載されていて、指標活用において参考になる内容となっています。いずれのアンチパターンにも共通する根本的な問題として、指標を改善することを目的としてしまうことが挙げられており、指標を向上させることが目的ではなく、開発生産性を向上させた結果が Four Keys 指標の向上に繋がることだと DORA の原典に立ち返って述べられています。いわゆるグッドハートの法則に陥らないように注意が必要ですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 継続的テスト（continuous testing）とシフトレフトな活動をアジャイルにどう取り入れるか？／風間裕也・執筆 - Agile Journey
https://agilejourney.uzabase.com/entry/2024/06/25/103000

テストは DevOps のサイクルの中のどのフェーズでも行えるものだという継続的テストモデルの紹介と、テスト活動をシフトレフトしていくためにはどうしたら良いかという話が書かれています。

ここでいうテストはテストコードを書く自動テストだけでなく、品質保証のための活動として広く捉えているようです。そのため、コードの実装前の仕様決定の段階であっても、テストの観点から仕様の不備を見つけることで、早い段階から不具合の発生を防いて開発全体のコストを下げる取り組みができる、という話がされています。

DevOps の歴史からシフトレフトするための具体的な活動まで触れられていて分かりやすかったです。品質保証やテストのシフトレフトに興味のある方はぜひ読んでみてください。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## feature flag と OpenTelemetry - Speaker Deck
https://speakerdeck.com/biwashi/feature-flag-to-opentelemetry

Feature flag とオブザーバビリティ周辺の話題について触れられています。

プロダクトの新機能の公開や変更を単一のコードベースで簡単に行うために、コード内にフラグを埋め込んで機能のオンオフを制御する Feature flag という仕組みがあります。Feature flag を導入する際にはモニタリング・オブザーバビリティの複雑化に対処する必要があり、フラグの管理システムが必要になります。その管理システムはベンダーごとに差異があるため、OpenFeature という規格が作られました。OpenFeature は各ベンダーと実装の間の抽象化層としての SDK を提供しています。

この発表の中ではさらに OpenFeature と OpenTelemetry の関係性についても触れられていました。フラグの値は動的であり、実行時に解決されます。この過程は評価と呼び、Evaluation API を用いて解決されます。例えば次のように、`v2_enabled` という Feature flag が true になっているかどうかを評価して、返却された結果 `v2Enabled` を使って分岐します。

```go
v2Enabled, _ := client.BooleanValue(
    context.Background(), "v2_enabled", true, openfeature.EvaluationContext{},
)
// Use the returned flag value
if v2Enabled {
    fmt.Println("v2 is enabled")
}

// reference: https://openfeature.dev/docs/reference/technologies/server/go
```

評価には Before, After, Error, Finally の 4 つのライフサイクルがあり、このサイクルの各フェーズに対してロギングのような任意の処理を挟める OpenFeature Hooks という仕組みが提供されています。資料の中では Hooks を用いて Datadog にイベントを送る際に、どの Feature flag が原因でこのイベントが起こったかフィルタをしやすくするために、関数単位で Feature flag を設定して Datadog Facets を用いると検索しやすくなるという実例も紹介されていました。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Gobra で見る形式検証 (mercari.go #26) - Speaker Deck
https://speakerdeck.com/artoy/gobra-dejian-ruxing-shi-jian-zheng-mercari-dot-go-number-26

Gobra という、Go にアノテーションをつけることで Go のプログラムを形式検証できるツールについて紹介されています。

関数の実行前に成り立っている事前条件、関数の実行後に成り立っている事後条件をアノテーションとして Go の関数の前に書いて Gobra を使うと検証ができるようです。Goroutine を含むプログラムの検証も行えるのは興味深いなと思いました。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## CUR による AWS コスト構造の継続的モニタリング
https://zenn.dev/simpleform_blog/articles/20240617-aws-cost-structure-monitoring

SimpleForm さんによる、AWS のコスト構造を継続的にモニタリングを AWS Cost and Usage Report (CUR) を使って行う方法を紹介している記事です。

元々 AWS Cost Categories を用いてコスト分類を検討したそうですが、Cost Categories が要望に満たなかったため、より柔軟にコスト分類を実現できる AWS CUR を使うことにしたそうです。

記事では、コスト構造の定義例、Cost Categories の課題、CUR を使ったコスト構造の継続的モニタリングのためのアーキテクチャ、各フェーズの実装概要が載っています。
コスト構造の定義例、定義したコスト構造に分類するための流れがわかりやすく、似たようなことをしたい際に参考になりそうです。

コスト分析をしていく上でこういった事例はとても参考になります。CUR、活用していきたいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub からの AWS CloudFormation デプロイ自動化 | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/automate-safe-aws-cloudformation-deployments-from-github-jp/

2023 年の末頃に CloudFormation のスタックを各種 Git のホスティングサービスを介してデプロイできるようになりました。GitHub, GitHub Enterprise Server, GitLab, BitBucket に対応しているようです。
https://aws.amazon.com/jp/about-aws/whats-new/2023/11/aws-cloudformation-git-management-stacks/

このブログ記事では、GitHub に一からリポジトリを作り、GitHub Actions を使って lint を導入し、CloudFormation と同期するところまで紹介しています。
GitHub Codespace を使っていたり、GitHub Actions を使って CI を組んだりと、昨今のモダンな開発フローを学ぶことができそうです。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [GitLab、ソフトウェア開発の現状に関する企業調査レポートを発表 ―経営幹部と実務担当者の間にAI、セキュリティ、生産性に対する意識の差 | gihyo.jp](https://gihyo.jp/article/2024/06/gitlab-research2024)
    - GitLab が公開したソフトウェア開発に関する企業調査レポートを技術評論社さんが紹介しています
    - 日本とその他の国で傾向にどういう違いがあるかをいくつかのトピックで紹介してくれていて良いです
    - 気になる人は大元のレポートも読みましょう
  - [AWS Summit Japan 2024セッションレポートまとめ（6/25 13:30更新） | DevelopersIO](https://dev.classmethod.jp/articles/aws-summit-japan-2024-matome/)
    - 先日開催された AWS Summit Japan 2024 セッションのクラスメソッドさんによるレポートをリストアップした記事です
    - いくつかのセッションがどんな内容だったかなんとなくわかります

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
遅くなってすみません今週号でした。
実は来週 Sansan さんとの合同イベントを開催します。現地参加枠はすでに埋まってしまいましたが、オンライン視聴枠はまだ空いてます。興味のある方はぜひご参加ください！

<!-- textlint-disable -->

Sansan vs サイボウズ 開発生産性Tips夏祭り - connpass
https://cybozu.connpass.com/event/322718/

<!-- textlint-enable -->

:::message
2024-07-03 号の Productivity Weekly は社内イベントのためお休みです。
:::


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
