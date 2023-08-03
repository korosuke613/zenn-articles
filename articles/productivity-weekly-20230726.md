---
title: "Productivity Weekly (2023-07-26号)"
emoji: "🏪"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230802"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-07-26 号です。

今回が第 119 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@kesin11](https://zenn.dev/kesin11)

:::

# news 📺

## GitHub Actions: Update on save-state and set-output commands - The GitHub Blog
https://github.blog/changelog/2023-07-24-github-actions-update-on-save-state-and-set-output-commands/

GitHub Actions 初期から存在する save-state, set-output というコマンドは以前に Deprecated アナウンスがあって廃止時期まで名言されていたのですが、延期が決定したようです。しかも次に期限が明記されていない。

save-state, set-output は既にドキュメントからも削除されているので新規に使う人が意識することは無いはずですが、昔に作られた actions がこれらの機能を使っていることがあるので混乱を避けるために延期されたのかもしれない？

*本項の執筆者: [@kesin11](https://zenn.dev/kesin11)*

# know-how 🎓

## GitHub の merge queue で 「マージ待ち」を解消した話 - Akatsuki Hackers Lab | 株式会社アカツキ（Akatsuki Inc.)
https://hackerslab.aktsk.jp/2023/07/20/183510

7/12 に GA したばかりの merge queue の活用事例。以下の引用みたいな状況で、かつボトルネック部分（テスト時間とか）をどうしても解消できないようなケースでは merge queue は便利なのかもしれない。

> 私の担当するゲーム内通貨管理基盤の GitHub リポジトリでは PR のマージ後に走る、同時に実施できない 15 分程度の E2E test が存在しました。 すなわち PR をマージして 15 分程度、違うブランチをマージできないといった課題を抱えていたのです。

## Github Merge Queueの何が嬉しいのか - ymtdzzz.dev
https://ymtdzzz.dev/post/merit-of-github-merge-queue/

こちらも嬉しい事例の紹介記事。
テストに時間がかかる以外にも PR のマージでコンフリクトが多発するような場合にも merge queue を使うと便利っぽい

## Git履歴をgit resetとgit rebaseで管理する（翻訳）｜TechRacho by BPS株式会社
https://techracho.bpsinc.jp/hachi8833/2023_07_24/131590

squash & merge だと巨大なコミットができてしまうので、reset & rebase を使って綺麗なコミットにしようという主張。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## AWS コストの最適化を検討する時、最初にチェックしたい定番の項目をまとめてみた（2023年夏版） | DevelopersIO
https://dev.classmethod.jp/articles/aws-cost-optimize-cheat-sheet-202307/

クラスメソッドさんが、AWS のコスト最適化を検討する際にチェックしたい項目をまとめています。
主要サービスごとにチェックリストがあり、それぞれのチェック項目に対して、どのように検討・対応すればいいか、推奨度合い、関連リンクが載っています。

例えば、以下のようなチェック項目があります。（これらは一例であり、多くの項目があります。）
- Amazon EC2: 停止または削除可能（利用頻度が低い・用途不明・代替可能）なリソースの有無
- Amazon S3: 不完全なマルチパートアップロードをクリーンアップ
- Amazon CloudWatch: Amazon CloudWatch Logs の利用状況（保存期間、利用状況、不要なログ）
- ...

どのように検討・対応すればよいかも箇条書きで簡潔に書かれており、とてもわかりやすいです。
サービスごとにまとまっているため、Cost Explorer などでコスト配分の大きいサービスから確認していくと良いかもしれませんね。

みなさんも AWS のコスト最適化、やっていきましょう。

:::message
何気にチェックリストの各サービスはすべて `Amazon` から始まるサービスでした。
Amazon〜 から始まるサービス名は、独立したサービスに付けられています（対して AWS〜 から始まるサービスは他のサービスを利用しています）。
料金体系も独立しているため、自然と `Amazon` から始まるサービスが多いリストとなったのかもしれませんね。

- [AWSサービス名の「AWS ○○」と「Amazon ○○」の違いを調べてみた | DevelopersIO](https://dev.classmethod.jp/articles/awsservice_naming/)
:::

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## 開発生産性の最新動向を知ろう！開発生産性Conference参加レポート #開発生産性con_findy | DevelopersIO
https://dev.classmethod.jp/articles/development-productivity-conf-report-sato/

この前のカンファレンスがクラメソさんにまとめられていた（全てではなさそう

# tool 🔨

## Metrics for issues, pull requests, and discussions - The GitHub Blog
https://github.blog/2023-07-19-metrics-for-issues-pull-requests-and-discussions/

GitHub リポジトリの issue やプルリクエストの time to first response、time to close などのメトリクス集計ができる GitHub Actions のアクションが GitHub によってリリースされました。

https://github.com/github/issue-metrics

どれだけ早く issue やプルリクエストのに反応できてるかみたいな指標を GitHub Actions でお手軽に集計できます。
記事には使い方だけでなく、いろんな立場の人のためのユースケースも載っています。

僕の管理してるリポジトリに issue が活発なものはなかったので、プルリクエストを対象に実際に試してみました。

- [github/issue-metrics アクション触ってみる](https://zenn.dev/korosuke613/scraps/c801cb634bb42c)

全体の time to first response や time to close ももちろんのこと、どのプルリクエストに時間がかかったのかなどもわかり、なかなかおもしろいです。クエリを工夫して柔軟に集計できるのも良いですね。
ただ、得られたデータをどう活用するかは利用者の手にかかっているので、そこはがんばらないといけません。

OSS だけじゃなく、プライベートな製品リポジトリでも活用できそうです。

*執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Copilot Chat ベータ版がすべての組織で利用可能に - GitHubブログ](https://github.blog/jp/2023-07-24-github-copilot-chat-beta-now-available-for-every-organization/)
  - [Repository Rules are generally available - The GitHub Blog](https://github.blog/changelog/2023-07-24-repository-rules-are-generally-available/)
    - Branch Protection の上位互換（だと自分は思ってる）の Repository Rules が GA
    - Repository Rules について解説してる記事はまだあまりなくて、探してもこれぐらいしか見つからない。
      - [GitHub の Repository Rules を試してみる](https://zenn.dev/korosuke613/scraps/84794d9baed038)
      - [次世代ブランチ保護ルール リポジトリルールについて | AQ Tech Blog](https://techblog.asia-quest.jp/202304/next-generation-branch-protection-rules-about-repository-rules)
    - GitHub Enterprise ユーザーであれば作った ruleset を他のリポジトリに使い回すのも簡単にできるらしいのと、コミットやブランチの命名規則まで制限できるので、もし今までチーム内でルールを遵守させるために comit hooks などを自作していた場合はこの仕組みに乗り換えると github が自動でやってくれるので便利そうです。
  - [Go1.21 New Features](https://zenn.dev/koya_iwamura/articles/0f24b53dcc179f)
    - Go1.21 は 8 月リリース予定。
    - 1.21 から最初のバージョンが 1.x ではなく 1.x.0 のようにパッチバージョン込みになった
    - PGO: Profile-guide optimization(インライン展開するやつ)がデフォルトで有効化される。速度は 2-7%早くなり、コンパイル時間は最大 6%悪化するように。
    - log/slog 構造化ログ、ログレベルを指定可能な logger が package に入った
- **know-how 🎓**
  - [Google Online Security Blog: Supply chain security for Go, Part 3: Shifting left](https://security.googleblog.com/2023/07/supply-chain-security-for-go-part-3.html)
    - Shift left: セキュリティに関する施作を開発の早い段階で組み込むこと
    - CI でリリース前に脆弱性チェックを走らせると、開発時点では脆弱な依存の上で行われてしまうので脆弱な依存を用いる時間が長くなる。だから開発段階から手元でセキュリティに関するチェックを回しましょうという話。
    - Go は govulncheck や fuzz test など Shift left のためのサポートが豊富。
- **tool 🔨**
  - [Google、iPaaS「Application Integration」正式リリース。Salesforceやkintone、BigQuery、MySQLなど多数のサービスをGUIで接続 － Publickey](https://www.publickey1.jp/blog/23/googleipaasapplication_integrationsalesforcekintonebigquerymysqlgui.html)
    - Integration PaaS という分野があるらしい。クラウドサービスを組み合わせたり、一元化するもの(Zapier とか)
    - ノードベースのビジュアルエディタで様々なサービスを連携できる。
    - これ試してみたい気持ちちょっとある(探求ネタ)
# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
