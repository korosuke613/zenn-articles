---
title: Docker Build Check登場やActionsの話など｜Productivity Weekly(2024-08-14,08-07)
emoji: 🕯️
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240814
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
published_at: 2024-09-03 10:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-08-14, 2024-08-07 合併号です。

今回が第 162 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Docker ビルドチェックの紹介: ベストプラクティスによるDockerfileの最適化 | Docker
https://www.docker.com/ja-jp/blog/introducing-docker-build-checks/

`docker build` 時に Dockerfile のベストプラクティスに従っているかどうかをチェックする機能、Docker Build Checks が登場しました。`docker build` 時に Docker 公式による Dockerfile のチェックが走り、必要に応じて警告を出してくれます。また、`docker build --check` のように `--check` オプションを付けることでビルドせずにチェックのみを行うことも可能です。

今まで Dockerfile の linter は Docker 公式では存在せず、3rd party のもののみが存在しました。今回公式で機能が入ったことで、手軽にビルドせずに Dockerfile をチェックできるようになりました。

なお、[Checking your build configuration | Docker Docs](https://docs.docker.com/build/checks/) によると、Docker Desktop 特有の機能ではなく、buildx v0.15.0 以降で利用可能とのことです。CI でも利用できて良いですね。

> - Buildx version 0.15.0 and later
> - docker/build-push-action version 6.6.0 and later
> - docker/bake-action version 5.6.0 and later

記事では、checks 機能は渡された引数や base image を含むビルド全体を評価するものであり、ただの静的解析ではないと説明されています。
また、IDE との統合も行われており、VSCode 上で警告を確認している図もあります。

僕は OrbStack 1.7.0 を利用しているのですが、内蔵 Buildx が v0.16.2 であったため、すぐに試すことができました。

[nginxinc/docker-nginx の最古のタグである 1.7.5](https://github.com/nginxinc/docker-nginx/blob/1.7.5/Dockerfile) をビルドチェックしてみたところ、次のような結果が出ました。

```text:docker build --check の例
❯ docker build --check https://github.com/nginxinc/docker-nginx.git#1.7.5
[+] Building 4.6s (5/5) FINISHED                                                                                                       docker:orbstack
 => [internal] load git source https://github.com/nginxinc/docker-nginx.git#1.7.5                                                                 1.6s
 => resolve image config for docker-image://docker.io/docker/dockerfile-upstream:1.8.1@sha256:e87caa74dcb7d46cd820352bfea12591f3dba3ddc4285e19c7  0.0s
 => CACHED docker-image://docker.io/docker/dockerfile-upstream:1.8.1@sha256:e87caa74dcb7d46cd820352bfea12591f3dba3ddc4285e19c7dcd13359f7cefd      0.0s
 => [internal] load metadata for docker.io/library/debian:wheezy                                                                                  2.9s
 => [auth] library/debian:pull token for registry-1.docker.io                                                                                     0.0s

WARNING: InvalidBaseImagePlatform
Base image debian:wheezy was pulled with platform "linux/arm/v7", expected "linux/arm64" for current build
Dockerfile:1
--------------------
   1 | >>> FROM debian:wheezy
   2 |
   3 |     MAINTAINER NGINX Docker Maintainers "docker-maint@nginx.com"
--------------------

WARNING: MaintainerDeprecated - https://docs.docker.com/go/dockerfile/rule/maintainer-deprecated/
Maintainer instruction is deprecated in favor of using label
Dockerfile:3
--------------------
   1 |     FROM debian:wheezy
   2 |
   3 | >>> MAINTAINER NGINX Docker Maintainers "docker-maint@nginx.com"
   4 |
   5 |     RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
--------------------

WARNING: LegacyKeyValueFormat - https://docs.docker.com/go/dockerfile/rule/legacy-key-value-format/
"ENV key=value" should be used instead of legacy "ENV key value" format
Dockerfile:8
--------------------
   6 |     RUN echo "deb http://nginx.org/packages/mainline/debian/ wheezy nginx" >> /etc/apt/sources.list
   7 |
   8 | >>> ENV NGINX_VERSION 1.7.5-1~wheezy
   9 |
  10 |     RUN apt-get update && apt-get install -y nginx=${NGINX_VERSION}
--------------------
```

各種ソースを解決できるかの確認がされ、その後ルールに引っかかった項目が出力されました。
プラットフォームの不一致、`MAINTAINER` の非推奨、`ENV` の古い書き方が警告されていますね。

チェック項目は [Build checks | Docker Docs](https://docs.docker.com/reference/build-checks/) に載っています。項目自体はそこまで多くなく、まだまだ増えるのかなという感じです。個人的には [UndefinedVar](https://docs.docker.com/reference/build-checks/undefined-var/) なんかは間違いに気づかずにビルドしてこけて気づくことがたまにあるので先にチェックできるのは嬉しいですね。

なお、スリーシェイクさんが検証記事を出してくれています。ありがたいですね。もっと詳しく知りたい方はこちらも参照ください。

- [Docker Build Check について検証をしてみた | sreake.com | 株式会社スリーシェイク](https://sreake.com/blog/docker-build-check/)

公式で出てくれたのが嬉しいですね。`docker build` 前にチェックをする癖をつけたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Revised release plan for Copilot subscription-based network routing - The GitHub Blog
https://github.blog/changelog/2024-08-06-revised-release-plan-for-copilot-subscription-based-network-routing/

GitHub Copilot の[ネットワークリクエストがサブスクリプションプランによってルーティングされるようになる変更](https://github.blog/changelog/2024-07-31-copilot-network-requests-are-now-routed-based-on-subscription/)が 7/31 に行われましたが、顧客側がファイアウォールの調整期間を確保するためにこの変更がロールバックされました。

2024/10/31 に再度有効化されるとのことです。

そもそもこの変更は何かというと、GitHub Copilot Individual、Business、Enterprise で Copilot が通信するホストが別れるというものになります。それぞれ次の接続先と通信するようになる予定です。

- Individual: `https://*.individual.githubcopilot.com`
- Business: `https://*.business.githubcopilot.com`
- Enterprise: `https://*.enterprise.githubcopilot.com`

この変更によりガバナンス強化を期待できます。需要の高そうなユースケースで言うと Copilot Individual へのアクセスをブロックするというものがあります。

GitHub Copilot Individual は個人アカウントで契約するプランですが、デフォルトでは[「Copilot に送った情報を Copilot の改善のために GitHub が利用できる」設定](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-policies-as-an-individual-subscriber#enabling-or-disabling-prompt-and-suggestion-collection)となっています。設定で Disable にはできます。なおこの設定は Business、Enterprise においてはデフォルトで Disable となっています（そもそも変更できなさそう）。
また、訴訟などのリスク回避のためにパブリックコードとマッチする提案はさせない設定をオンにしたいかもしれません。

これらの設定は Business、Enterprise プランでは一律で設定し、個人が有効無効を選択できないようにできます。
Copilot の利用は構わないけど先の設定は安全側に倒したいという組織にとって、ガバナンスを効かせるために GitHub Copilot Individual の利用を禁止しているケースもあることでしょう。

しかし、これまで Copilot Individual のみを機械的に利用できなくするというのは難しかったです（`*.githubcopilot.com` へのアクセスを制限すれば Copilot 自体の利用はブロックできたけど、Business、Enterprise も使えなくなるという問題があった。）。

今回の変更により、 Copilot Business、Enterprise のみは許可し、Individual は利用できなくすることを強制できるようになって、上記のようなケースに対応できるようになりました。
組織内ネットワークでの制限や、PC に入れたネットワークフィルタリングツールでの制限などで、業務コードでの Copilot 利用をより安全にできることでしょう。

10 月 31 日に再度有効化されるとのことですので、Individual の利用をブロックしたい人はそれまでに情報システムや情報セキュリティ部門と調整しましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub Modelsのご紹介：GitHub上に新世代AIエンジニアを - GitHubブログ
https://github.blog/jp/2024-08-02-introducing-github-models/

GitHub が新たなサービス、GitHub Models を発表しました。

GitHub Models はさまざまな LLM に対するプロンプトやパラメータを検証できるサービスです。Llama 3.1 や GPT-4o、Phi 3 などのさまざまなモデルがサポートされています。

GitHub 上のプレイグラウンドでモデルの選択やパラメータ調整、プロンプトの作成・応答が可能です。また、GitHub Codespaces 上での利用も可能で、モデルに応じたコードのテンプレートから Codespaces を起動し、GitHub のトークン経由でコードからモデルを検証できます。

なお、あくまで検証目的であるため、ちゃんと [rate limit](https://docs.github.com/github-models/prototyping-with-ai-models#rate-limits) が用意されています。
例えば tier Low のモデル、かつ、Copilot 未契約/Copilot Individual の場合は以下になっています。

- リクエスト上限（分）: 15
- リクエスト上限（日）: 150
- リクエストあたりのトークン上限: 8000 in, 4000 out
- 同時リクエスト上限: 5

モデルやプランによって rate limit は異なりますが、検証目的であれば困らない程度の制限かと思います。

現在は limited public beta となっており、waitlist に入り使えるのを待つ必要があります。僕も waitlist に登録していたのですが、最近実は使えるようになっていることがわかりました（特にメールで使えるようになったよみたいなお知らせは来てなかった）。

実際に使ってみたところ、色々なモデルを手軽に試せるようになったのはとても便利だと思いました。モデルを動かすためにハイスペックマシンを用意したり、OpenAI API のようなサービスに登録したりする必要がなく、GitHub アカウントのみでモデルを試せるようになったのはとても嬉しいですね。

他にも使えるようになった方が Zenn のスクラップに触ってみた感想とか書いてくれてて参考になります。

- [GitHub Modelsお試し](https://zenn.dev/kaakaa/scraps/c88309e9917d18)

今後 LLM を使った何かを開発する際にまずは GitHub Models で性能を試そうとなりそうです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Introducing Structured Outputs in the API | OpenAI
https://openai.com/index/introducing-structured-outputs-in-the-api/

OpenAI API において、ユーザが設定したスキーマに応じて構造化された出力を返す機能 Structured Outputs が追加されました。

これまで JSON 出力を強制させることはできましたが、スキーマについてはプロンプト文章内でいい感じに指示するといった方法が必要でした。あくまで文章内での指示であり、必ずしもスキーマ通りの出力が得られるとは限りませんでした。
実際、上記記事によると、プロンプトでの指定は最新の GPT-4 だと 35% 程度、GPT-4o でも 85%程度の精度しか見込めていませんでした。今回追加された機能を用いることで 100%の精度を実現できたとのことです。

Structured Outputs は、Function calling および `response_format` において実現できます。詳しくは [Structured Outputs - OpenAI API](https://platform.openai.com/docs/guides/structured-outputs) を参照してください。なお、古いモデルは対応しておらず、例えば 2024/08/29 時点で `gpt-4o` では対応しておらず、GPT-4o の最新のモデルである `gpt-4o-2024-08-06` は対応してたりします。

僕は本ブログ記事である Productivity Weekly を OpenAI API を使って文法間違いや誤字脱字の検出を行なっています[^ai-review]。今回の機能追加に伴い、僕も Structured Outputs を使うようにしてみました。気になる人は参考ください。

- [feat: support Structured Outputs by OpenAI API · korosuke613/zenn-articles@4eb3fe6](https://github.com/korosuke613/zenn-articles/commit/4eb3fe6c9f5a77652f0ea1aca67cf84f2b9faf7f)

プロンプトでの指定よりも確実にスキーマ通りの出力を得られるようになったのはとても嬉しいですね。JSON を吐き出させてる人はぜひ使ってみてください。

[^ai-review]: [LLMを用いてブログ記事の文法間違い・誤字脱字検出を自動化する](https://zenn.dev/cybozu_ept/articles/ai-blog-review-on-github) を読んでね✌️

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## GitHub Actions arm runnerはじめました - KAKEHASHI Tech Blog
https://kakehashi-dev.hatenablog.com/entry/2024/08/05/100000

GitHub Actions の larger runner において、パブリックベータとなった Arm ランナーのメリット・デメリットについて紹介しています。
メリットとしては x86 の同性能のランナーと比較して 37% 料金が安いこと、Arm アーキテクチャ用のアプリケーションのビルドがネイティブに行えるため高速化が期待できることです。
ちなみに、チームメンバーの @miyajan が Arm ランナーで Docker マルチプラットフォームビルドを検証してくださっていますので、[こちら](https://zenn.dev/cybozu_ept/articles/build-multi-platform-image-with-arm64-runner)も合わせてご覧ください。注意点としては、Arm バイナリが提供されていないツールやライブラリ、Action を利用している場合は、そのままではワークフローを利用できないことがあるため、事前に確認が必要です。

larger runner なので Team または Enterprise プランが必要ですが、利用できる場合はメリットが大きいので、ぜひ検討してみてください。

 _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Terraformでセキュアに開発するwith 1Password - スタディスト Tech Blog
https://studist.tech/terraform-1password-dev-87891a4497af

ローカル端末から Terraform コマンドを実行する際の認証情報の管理について、1Password CLI を利用してセキュアに管理する方法を紹介しています。
具体的には、1Password CLI を利用してシークレットを取得するコマンドを、direnv の `.envrc` に記述することで、ディレクトリごとに環境変数への export と unset を自動化しつつ、ローカル端末のクリップボードや history に認証情報が残らないようにしています。

自分は 1Password CLI で都度コマンドを実行していたので、direnv と組み合わせるのはなるほどなと思い参考にさせていただきました。

 _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## ChatGPTを活用したブログレビューシステム | QualiArtsエンジニアブログ
https://technote.qualiarts.jp/article/79/

GitHub で記事を管理している技術ブログにおいて、GitHub Actions で ChatGPT を利用したレビューの仕組みを導入した事例を紹介しています。
数ある LLM のうち、なぜ ChatGPT を選択したのか選定理由や、ChatGPT に送るプロンプト、リクエストのパラメータも共有されており参考になります。レビュー結果はプルリクエストの suggestion として表示させるのが、地味にレビュイー体験が向上するポイントですね。

実はこの Productivity Weekly も AI レビューを導入しており、かなり似た構成で運用しています。そちらについては @korosuke613 が記事を書いているので、興味がある方は[こちら](https://zenn.dev/cybozu_ept/articles/ai-blog-review-on-github)をご覧ください。

 _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## E2Eテストの部分実行によるテスト時間短縮 - Cybozu Inside Out | サイボウズエンジニアのブログ
https://blog.cybozu.io/entry/2024/08/13/110000

サイボウズの kintone 開発チームにおける E2E テストの部分実行によるテスト時間短縮の取り組みについて紹介しています。
Gradle の TestFilter には `includeTestsMatching` という機能があり、これを利用してテストクラスやメソッドを指定して部分実行することで、テスト時間を短縮しています。
機能ごとにテストを実行する仕組みを導入できた理由として、プロダクトが大きくなったことに伴い機能ごとにサブチームに分割しており、さらにそれぞれのサブチーム内に QA がテストを整理していたことを挙げています。今回の取り組みではフロントエンドのでのテスト部分実行について述べられており、今後の課題として、サーバーサイドのテストにも適用できるかどうかが挙げられています。今後の展開が楽しみです。

 _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## プラットフォームエンジニアリングのためのセルフサービス基盤の実装 | ドクセル
https://www.docswell.com/s/yaegashi/KN1R1G-gamt4

自分も参加した [GitHub Actions Meetup Tokyo #4](https://gaugt.connpass.com/event/324715/) でのバンダイナムコスタジオさんの発表です。

内容としては社内における自動化タスクの実行基盤として GitHub Actions を採用し、社内から使いやすいように独自の UI などを実装した話が中心でした。GitHub Actions を CI/CD というよりもタスクランナーとして活用する場合、Slack などを利用して chatbot から実行できるようにする事例[^gha_slack_chatbot]はよく耳にするのですが、ここまで独自の設定ファイルや UI を作り込んでいる事例は珍しいと思います。

[^gha_slack_chatbot]: バンダイナムコスタジオと同じゲーム開発分野で、作り込んだ SlackApp から GitHub Actions を起動する事例 [UnityのアプリビルドをGitHub Actionsに移行した話【CAGC2024】](https://speakerdeck.com/cyberagentdevelopers/unitynoapuribirudowogithub-actionsniyi-xing-sitahua-cagc2024)

個人的には GitHub Actions の [Custom Deployment Protection Rules](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/creating-custom-deployment-protection-rules) の活用事例が興味深かったです。今回の発表では、GitHub Actions から Azure へのデプロイ処理後に再び GitHub Actions に処理を戻すという複雑なケースにおいて、今まではポーリングで実現していたのを Custom Deployment Protection Rules の仕組みに置き換えることで GitHub Actions の費用を削減できたという事例が紹介されていました。

Custom Deployment Protection Rules 自体は公開時に Productivity Weekly でも[2023年5月](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230426#github-actions%3A-create-and-share-your-own-deployment-protection-rules-for-safe-and-controlled-deployments-%7C-github-changelog)に取り上げたことがあるのですが、そのときの自分にはあまり使い道が思いつきませんでした。今回の発表のような使い道は GitHub のドキュメントにも書かれていないので、自分は発明だと思いました。

サイボウズでは GitHub Actions をヘビーに使いこなしているチームで似たようなポーリングを行っているワークフローがあり、こちらでは Azure のような GitHub Actions 外のサービスではなく、 GitHub Actions 内の別のワークフローの完了を待ってから実行するという使われ方でした。今回の発表を参考にさせてもらい、このようなケースも Custom Deployment Protection Rules によってポーリングを置き換えるアイディアを思いついたので、自分の方で検証してみました。この機能を使うために必要な GitHub App の作り方や、ワークフローの書き方など最初から試してみたのでそもそも Custom Deployment Protection Rules がどういう機能なのかもイメージがつくと思います。

https://zenn.dev/kesin11/scraps/444f1b8e3454d0

ニッチにニッチを重ねたような話ですが、GitHub Actions の使い方の幅が広がるという意味では興味深いと思うので興味がある方は参考になるかもしれません。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Sign-up for the GitHub Copilot Extensions waitlist - GitHub Changelog](https://github.blog/changelog/2024-08-13-sign-up-for-the-github-copilot-extensions-waitlist/)
    - [以前紹介した GitHub Copilot を拡張できる GitHub Copilot Extensions](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240522#introducing-github-copilot-extensions%3A-unlocking-unlimited-possibilities-with-our-ecosystem-of-partners---the-github-blog) の waitlist が開始されました
    - 元々 limited public beta で提供されており、だんだんと使えるようになるという話になっていましたが、waitlist が始まったことで興味ある人は早く使えるようになりそうです
    - なお、waitlist は enterprise または org 単位での登録となります
  - [GitHub Copilot Chat and pull request summaries are now powered by GPT-4o - The GitHub Blog](https://github.blog/changelog/2024-07-31-github-copilot-chat-and-pull-request-summaries-are-now-powered-by-gpt-4o/)
    - GitHub Copilot Chat および Copilot によるプルリクエストサマリ生成に、GPT-4o が利用されるようになりました
    - 応答時間の短縮や正確で信頼性の高い応答が期待できるようです
  - [What’s new with GitHub Copilot: July 2024 - The GitHub Blog](https://github.blog/ai-and-ml/github-copilot/whats-new-with-github-copilot-july-2024/)
    - GitHub Copilot の 7 月の新機能について紹介されています
    - `@github` コマンドを使って、GitHub のインデックス化されたリポジトリに関する質問を Copilot Chat でできるようになったようです
      - しかし、自分の環境では使えませんでした。条件があるのかも
  - [Enhanced Repo Insights Views - GitHub Changelog](https://github.blog/changelog/2024-08-12-enhanced-repo-insights-views/)
    - GitHub のリポジトリインサイトビューの新 UI が利用できるようになりました（ベータ）
    - 日付範囲が指定しやすくなったり、体験が良くなったようです
  - [【新機能】BigQuery で JSON オブジェクトのキーの一覧を取得できるようになりました | DevelopersIO](https://dev.classmethod.jp/articles/gcp-bigquery-json-object-keys/)
    - BigQuery において、`JSON_KEYS` 関数が追加され、JSON オブジェクトのキーの一覧を取得できるようになりました
  - [Publication Free でもメンバー同士の記事レビューを体験できるようになりました | What's New in Zenn](https://info.zenn.dev/2024-08-05-publication-free-review)
    - Zenn の Publication Free において、記事レビューを体験できるようになりました
    - ただ、一記事あたり 3 件のコメントまでと制限があります。あくまで体験ということですね
    - 記事レビュー機能は Pro プランのみで元々使えました

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
遅くなってすみません、08/07, 08/14 合併号でした。
8/24-28 まで鹿児島、28-31 まで福岡に行ってたのですが、台風との戦いで楽しかったですね。なんだかんだ言っていい感じに回避できました。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
