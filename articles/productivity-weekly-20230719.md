---
title: "Productivity Weekly (2023-07-19号, 2023-07-05号)"
emoji: "🎸"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230705"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-07-05, 2023-07-19 合併号です。

今回が第 118 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## AWS CodeBuild が GitHub Actions をサポート開始
https://aws.amazon.com/jp/about-aws/whats-new/2023/07/aws-codebuild-github-actions/


AWS CodeBuild にて、GitHub Actions のアクションを使用できるようになりました。

詳しいドキュメントはコチラです。
https://docs.aws.amazon.com/codebuild/latest/userguide/action-runner.html

すでに試されている方がいらっしゃいます。
https://dev.classmethod.jp/articles/codebuild-github-actions/
https://developer.mamezou-tech.com/blogs/2023/07/12/githubactions-with-codebuild/

これにより、便利なものがたくさんある GitHub マーケットプレイスのアクションを、AWS CodeBuild で使用することができます。

ただし、github context に依存したものは使えません。
また Issue や PullRequest への書き込みなど、GitHub Actions のワークフローからなら簡単にできた操作もできません。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## [新機能] 失敗したテストのみを再実行 (circleci tests run) - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/circleci-tests-run/48579

CircleCI において、失敗したテストのみを再実行できるようになりました。
失敗したビルドだけ再実行することは以前から可能でしたが、失敗したテストだけを再実行することはできませんでした。

この機能を使うためには、`circleci tests run` コマンドを使ってテストを実行する必要があります。これまで [`circleci tests split` を使ってテストの分割と並列実行をしていた](https://circleci.com/docs/ja/parallelism-faster-jobs/)場合は、テストの分割単位を使い回すことができるようです。

詳しくはドキュメントを参照ください。

- [失敗したテストのみを再実行する (プレビュー) - CircleCI](https://circleci.com/docs/ja/rerun-failed-tests/)

E2E テストなどで flaky な理由でたまにテストが落ちるようなとき、全部のテストをやり直さなくても済むようになるので、救われるプロジェクトは結構多そうですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Arm support for Docker executor (Preview) - CircleCI Changelog
https://circleci.com/changelog/#arm-support-for-docker-executor-preview

CircleCI の docker executor において、arm インスタンスを使えるようにする機能がプレビュー版で追加されました。

気になる消費クレジットについては、ディスカッションに載っています。例えば `arm-medium` (2 vCPU, 4GB RAM) は 13 クレジット/分です。同サイズの x86 インスタンスは 10 クレジット/分となっており、少しだけ高いですね。価格に関しては GA になると変更される可能性があります。

- [[Product Launch] ARM + Docker - Preview - Build Environment - CircleCI Discuss](https://discuss.circleci.com/t/product-launch-arm-docker-preview/48601)

今までも machine executor であれば arm インスタンスは使えましたが、machine executor だとコンテナ上でジョブを実行するという CircleCI の基本スタイルと異なります。

docker executor で arm インスタンスが使えるようになったことで、普通のジョブと同じ使い勝手のままコンテナを arm ネイティブで実行できるようになるので、開発メンバが Apple Silicon で開発してるとかデプロイ先の ECS が Arm オンリーみたいな環境である場合、CI/CD を含めて x86 コンテナを完全に不要にできます。
本番環境を arm にする場合、CI/CD のために x86 コンテナを用意しなければいけないや、エミュレーションによって遅くなるのを我慢しないといけないという問題が潜在的にあったのが解決されそうですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## New expandable event payload view is generally available in all audit logs | GitHub Changelog
https://github.blog/changelog/2023-06-28-new-expandable-event-payload-view-is-generally-available-in-all-audit-logs/

GitHub の Enterprise および Organization において、audit logs の WebUI で各イベントのペイロードを表示できるようになりました。
これまでは API を叩いたり [log streaming](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230426#api-requests-are-available-via-audit-log-streaming---public-beta-%7C-github-changelog) をしていないとペイロードを見られませんでした。

ペイロードで得られる情報は API、log streaming で得られる情報と同じで、例えば `repo.download_zip` の場合、ユーザーエージェントやトークンの種類（GitHub App server-to-server token）などが含まれています。

これまで詳細を知りたければ API を叩いたり、log streaming を有効化する必要がありましたが、これからは手軽に WebUI 上でログの詳細が見られるようになって良いですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Grouped version updates for Dependabot public beta | GitHub Changelog
https://github.blog/changelog/2023-06-30-grouped-version-updates-for-dependabot-public-beta/

Dependabot で依存関係のパッケージをグループにして、1 つのプルリクエストにまとめることができる機能がパブリックベータになりました。

これまでは、プルリクエストが 1 つにまとまっていないので一覧時に見づらかった他、複数の依存関係が同時に更新されないことが理由でテストが落ちるといったことが起こりがちでした。
それらの問題がこの機能を使うことで解消されます。
依存関係のパッケージ名で一致したもの[^wildcard]をグループにすることができます。また、除外設定を行うことで、指定したパッケージをグループから除外することもできます。

[^wildcard]: パターンにはワイルドカード(`*`)を利用できます。

ただし Dependabot が行うセキュリティアップデートにはグループは適用されず、従来どおり個別のプルリクエストが作成されます。

生産性向上チームでは、前からグループ機能がありより細かく設定ができる [Renovate](https://github.com/renovatebot/renovate) を使っていて、今回の機能追加で Dependabot に乗り換えることはなさそうです。
ただ日頃 Dependabot を使っている方にとってはこの機能は便利かと思うので、この機会に使ってみてはいかがでしょうか。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## AWS Lambda now detects and stops recursive loops in Lambda functions
https://aws.amazon.com/jp/about-aws/whats-new/2023/07/aws-lambda-detects-recursive-loops-lambda-functions/

AWS Lambda において、Amazon SQS または Amazon SNS 間での再帰的な呼び出しを検出して停止するようになりました。

具体的には、Lambda 上で特定のバージョン以降の AWS SDK の関数を使って SQS、SNS にイベントを送信すると、何回関数が呼び出されたか監視し、同じトリガーイベントで 16 回以上イベント送信が発生した場合に停止するようです。
検知すると、Lambda は次の呼び出しを停止した後、デッドレターキューなどにイベントを送信します。また、AWS Health ダッシュボードにも通知が来るようです。

また、この機能はオプションであるため、意図した挙動であれば無効化できます（デフォルトでオンになっている）。

意図せずループさせてしまい、意図しないコストが発生してしまうのを防ぐための施策となります。こういうのありがたいですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Improvements to granular access tokens on npm - The GitHub Blog
https://github.blog/changelog/2023-07-11-improvements-to-granular-access-tokens-on-npm/

npm にも GitHub の fine grained token のように read only やパッケージの範囲を絞れる新しいトークン形式が最近追加されていて、それの有効期限を完全に自由に設定できるようになったらしい。
allowing for durations that span multiple years. が嬉しいですね。セキュリティ的にはよろしくないだろうけど・・・

### GitHub Enterprise Server 3.9 is now generally available | The GitHub Blog
https://github.blog/2023-06-29-github-enterprise-server-3-9-is-now-generally-available/

GitHub Enterprise Server (GHES) 3.9 が GA になりました。

GitHub Projects でロードマップのビューが使用できるようになったりしています。

また、[Actions Runner Controller](https://docs.github.com/en/enterprise-server@3.9/actions/hosting-your-own-runners/managing-self-hosted-runners-with-actions-runner-controller/about-actions-runner-controller) が使えるようになったとあります。
Actions Runner Controller は k8s を使ったセルフホストランナーなので、ランナーのスケールイン・アウトを柔軟に行うことができます。

ちなみに、kesin11 さんが GHES と github.com の Actions 関連の対応表を書いてくださっていて、毎度参考にしています 🙏
https://zenn.dev/kesin11/articles/gha_releasenote_ghes

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# know-how 🎓

## GitHub Copilot 関連

### GitHub Copilotの全社導入とその効果 - ZOZO TECH BLOG
https://techblog.zozo.com/entry/introducing_github_copilot

ZOZO さんによる、GitHub Copilot 導入事例です。
GitHub Copilot 導入の背景や、導入する上での課題（セキュリティ、ライセンス侵害リスク、費用対効果）と対応、社内での利用 Tips 共有などが書かれています。

特に興味深かったのは次の 3 点でした。

- ライセンス侵害が問題になった場合の GitHub 社からの補償について、カスタマーへの問い合わせ
- 試験導入の詳細と、それを踏まえた費用対効果の見積もり
- 社内での利用 Tips 共有（社内 LT 会）

以前、[ライセンス侵害が問題になった際は最大 50 万ドルの支援が受けられるという文言が規約から消えている話](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230614#github-copilot-product-specific-terms-%E3%81%AE%E7%AC%AC%E4%B8%89%E8%80%85%E3%81%8B%E3%82%89%E8%A8%B4%E3%81%88%E3%82%89%E3%82%8C%E3%81%9F%E5%A0%B4%E5%90%88%E3%81%AF-github-%E3%81%8C%E6%9C%80%E5%A4%A7-50-%E4%B8%87%E3%83%89%E3%83%AB%E3%81%BE%E3%81%A7%E4%BF%9D%E8%AD%B7%E3%81%99%E3%82%8B%E8%A9%B1%E3%81%8C%E6%B6%88%E3%81%88%E3%81%A6%E3%81%84%E3%82%8B%E4%BB%B6)をしましたが、結局最大いくらまで支援してくれるのかはわかっていませんでした。
「GitHub Copilot Product Specific Terms」および「GitHub Customer Agreement」によると GitHub による無制限の補償が受けられるというのは嬉しいですね。（記事の注釈にもある通り、契約内容などによって詳細は異なる可能性があるので注意が必要です。）

また、試験導入が詳しく書かれており、どのように費用対効果を見積ったかがわかるのはとても参考になります。
最終的に数字を出せるのは導入を検討している企業にとって嬉しいかもしれません。

社内 LT 大会は僕も GitHub Copilot を利用しているので普通に気になりました。資料探せば見つかるかな。

GitHub Copilot 導入を考えている企業にはとても参考になると思います。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

### サイバーエージェントのGitHub CopilotのAnalyticsデータを公開！利用開始から約3ヶ月でエンジニアの生産性は向上したのか？ | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/43059/

サイバーエージェントさんによる GitHub Copilot 事例です。
GitHub Copilot の利用状況(accept rate、利用エディタ)、導入することでエンジニアの生産性は向上したのかについてが書かれています。

特に accept rate のデータが興味深かったです。どれだけ VSCode 上で GitHub Copilot が推薦したコードを完全に採用したかの推移がグラフで載っています。
平均 3 割近く採用されており、個人的にはなかなか高い数字だと感じました。これだけ採用されているとやはりコーディングの効率は上がっていそうと感じます。

ちなみに、GitHub Copilot の Accept Rate は現状 API で取得できません。
どのようにデータを得たのか気になったのですが、サイバーエージェントの中の人によると、GitHub 社からデータをいただいたようです。
言えばくれるんですね。僕も気になります。

> GitHub社よりCopilotのAccept Rate(Copilotの推薦の採用率)のデータを頂いたので、ブログを更新しました
https://twitter.com/lionbaby/status/1681504795004407808

みなさんも accept rate をいただき、組織内でどれだけ GitHub Copilot による貢献があるのかを調べてみてはいかがでしょうか。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

### A developer's guide to prompt engineering and LLMs - The GitHub Blog
https://github.blog/2023-07-17-prompt-engineering-guide-generative-ai-llms/

GitHub がプロンプトエンジニアリングと LLMs の開発者向けガイドを出しています。

LLMs がどのようにして動作するかの簡単な説明、LLMs を使用したアプリケーションはどう動作すべきかが書かれています。
そして GitHub Copilot でのプロンプトエンジニアリングの工夫が書かれています。

記事を読んで、GitHub Copilot の裏側でどのようなことが起こっているか想いを馳せてみてはいかがでしょうか。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## Docker Desktop for Macの代替ツールOrbStackを導入したら社内バックアップが停止してしまった話 – CloudNative Inc. BLOGs
https://blog.cloudnative.co.jp/18182/

Docker Desktop for Mac 代替のツールはいくつかありますが、そのうちの 1 つの OrbStack が最近注目されているように思います。
高速で起動し、軽量を謳っており、筆者も気になっています。

今回読んだこの記事では、OrbStack がホームディレクトリ配下にスパースファイルを作成していて、それがバックアップを逼迫している話が書かれています。
スパースファイルを考慮していないバックアップシステムがバックアップしようとするとこうなるんだと初めて知りました...皆さんもお気をつけください...

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Introducing passwordless authentication on GitHub.com - The GitHub Blog](https://github.blog/2023-07-12-introducing-passwordless-authentication-on-github-com/)
    - GitHub が PassKeys による認証に対応しました
    - GitHub は WebAuthn 自体には対応していましたが、今回 PassKeys にも対応したことで利便性が増しました
    - PassKeys の使えるサイトが増えていっていいですね
  - [GitHub Actions – OIDC integration with AWS no longer requires pinning of intermediate TLS certificates](https://github.blog/changelog/2023-07-13-github-actions-oidc-integration-with-aws-no-longer-requires-pinning-of-intermediate-tls-certificates/)
    - [前回チラッと書いた](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230628#github-actions-%E2%80%93-update-on-oidc-integration-with-aws-%7C-github-changelog)、GitHub Actions から AWS への OIDC において、AWS が証明書の pinning を辞めたことでサムプリントを適当な値にしても良くなった件ですが、GitHub からも公式にアナウンスがされました
  - [GitHub Actions - Actions Runner General availability | GitHub Changelog](https://github.blog/changelog/2023-06-30-github-actions-actions-runner-general-availability/)
    - GitHub Actions セルフホストランナーの Actions Runner Controller と Runner Scale Sets mode が GA になりました
    - どういうものかは[先日](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230517#github-actions---actions-runner-controller-public-beta-%7C-github-changelog)の記事を参照してください
  - [GitHub CLI project command is now generally available! - The GitHub Blog](https://github.blog/2023-07-11-github-cli-project-command-is-now-generally-available/)
    - 新しい GitHub Projects を GitHub CLI (gh) から操作できる gh-project extension がアーカイブされ GitHub CLI v2.31.0 から本体に取り込まれました
    - 「新 Projects の API は GraphQL が必要なので、API を叩くために GraphQL のドキュメントとにらめっこするのが REST に比べるとかなり面倒だった記憶がある」という意見が会では出ました
    - 今後は Projects 関連の操作が楽になりますね
  - GitHub Copilot 関係の更新
    - [Visual Studio Code June 2023](https://code.visualstudio.com/updates/v1_80#_github-copilot)
      - VSCode の 1.80 における GitHub Copilot の更新です
      - GitHub Copilot Chat で新しいプロジェクトをテンプレートから作ってもらったり、検索のための正規表現を作ってもらえるようになります
      - それぞれの機能は `github.copilot.advanced` で有効化する必要があります
    - [GitHub Copilot July 14th Update - The GitHub Blog](https://github.blog/changelog/2023-07-14-github-copilot-july-14th-update/)
      - GitHub Copilot の 7 月アプデまとめ
        - for Business でユーザ管理 API が beta で追加
          - 例えば、今までは UI からシートを割り当てるしかなかったが、割り当て済みのアカウント情報に最後に使った日などの情報も入っているらしいので棚卸しに便利そう
    - [Copilot June-2023 update - The GitHub Blog](https://github.blog/changelog/2023-06-29-copilot-june-2023-update/)
      - GitHub Copilot の 6 月アプデまとめ
        - VSCode の Stable で Copilot Chat が使えるようになった
        - VSCode で Copilot を使用してプルリクへのレビューコメントが書けるようになった
        - コード補完の改善
        - など
- **know-how 🎓**
  - [iOS開発におけるGitHub Actions self-hosted runnerを利用したオンプレ CI/CD のすゝめ | CADC 2023](https://cadc.cyberagent.co.jp/2023/sessions/ios-github-actions-self-hosted-runner/)
    - サイバーエージェントさんでセルフホストランナーを運用している whywaita さんの新作です
    - https://github.com/utmapp/UTM で macOS の VM を使うことで、mac でもジョブごとにランナーを使い捨てる運用となっています
    - ちなみに macOS 上で VM を立てる場合はライセンス条項が色々面倒なので注意です
    - これを実現したのはすごいと思います
- **tool 🔨**
  - [Introducing new and updated models to Azure OpenAI Service - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/ai-cognitive-services-blog/introducing-new-and-updated-models-to-azure-openai-service/ba-p/3860351)


*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# あとがき

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

##  【現地orオンライン(予定)】GitHub dockyardコミュニティ 竣工イベント！ - connpass
https://github-dockyard.connpass.com/event/289714/

2023/08/05（土）に「GitHub dockyard コミュニティ竣工イベント！」というイベントが開催されます。
サイボウズの東京オフィスで開催予定です。（オンライン配信も予定されています）

GitHub の開発者向けコミュニティイベントとのことで、GitHub 製品に精通している方々によるセッションがいくつかあります。
個人的には GitHub Project をあまり追っかけられていないので、「自称日本一 GitHub Projects を使っているので魅力を伝えたい！」が気になりますね。
とはいえ残念ながら僕はイベントを知る前から先約が入っていたため、参加できません。残念 🥲

気になる方はぜひ参加してみてください！
