---
title: GitHub Copilot Agentモード登場など｜Productivity Weekly(2025-02-12)
emoji: 🍼
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20250212
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
published_at: 2025-02-28 10:00
---

:::message alert
Productivity Weekly 2025-02-12 号より、**投稿アカウントが [@korosuke613](https://zenn.dev/korosuke613) から [@cy_ept](https://zenn.dev/cy_ept) へ変わります！**
今後 Productivity Weekly の記事を追いかける際は、[@cy_ept](https://zenn.dev/cy_ept) か、[サイボウズ 生産性向上チーム](https://zenn.dev/p/cybozu_ept)パブリケーションをフォローいただけると幸いです。
:::

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2025-02-12 単独号です。

今回が第 178 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@uta8a](https://zenn.dev/uta8a)
- [@ajfAfg](https://zenn.dev/arjef)
- [@takoeight0821](https://zenn.dev/takoeight0821)
- [@takamin55](https://zenn.dev/takamin55)
<!-- - [@naotama](https://zenn.dev/naotama) -->
:::

# news 📺

## GitHub Copilot: The agent awakens - The GitHub Blog
https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens/

GitHub Copilot において、エージェントモードが追加されました（プレビュー）。

エージェントモードは Copilot が反復してコードの変更、エラー認識、修正、コマンド実行等も求めてくるモードです。これまでの Copilot Edits などとは違い、与えた指令に対して単純な 1 つの回答を返して終わりではない、より自律的に動くモードです。

どういうふうな機能なのかはブログ内にある動画を見るのが早いと思います。
まだプレビューであることもあり、利用するには VSCode Insiders の利用が必要です。

僕もプライベートのリポジトリにおいて利用してみたのですが、GPT-4o が利用されているからか[^model]、Clain で Claude や DeepSeek を使った際と比べて回答は微妙でした（感覚）。上位モデルを使えばもっと違う体験になるんだろうなと思っています。

最近は Cline といった生成 AI をエージェント的に使ってコーディングを支援する拡張機能が流行っており、その流れに乗って登場した機能っぽさがあります。どんどん競争してもらいたいですね。

なお、同じブログ内で Copilot Edits が VSCode において GA になったことも書かれています。Edits 自体も便利なのでみなさん使っていきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^model]: GitHub Copilot には Claude 3.5 Sonnet や OpenAI o1 などの高性能モデルを使うことができますが、僕の場合諸事情からまだ GPT-4o しか利用ができません...

## 自分のOSSのマルウェア入り偽物を作られたので通報した - 酒日記 はてな支店
https://sfujiwara.hatenablog.com/entry/2025/02/11/094755

タイトルの通り、自作 OSS の偽物（しかもマルウェア入り）が公開される被害に遭われた話です。攻撃者は偽物を公開するだけでなく、捨て垢でその偽物のスター数を稼いでいたとのことです。

fujiwara さんの注意喚起の通り、スター数だけで OSS の信頼度を評価するとうっかり被害に遭ってしまいそうです。[LayerX さんも似た被害に遭われており](https://x.com/LayerX_tech/status/1889225974547636719)、今一度 OSS のコード読みやバージョン固定を徹底していきたいです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Announcing TypeScript 5.8 Beta - TypeScript
https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/

TypeScript 5.8 Beta きました！　わいわい！
破壊的変更はありません。

デカい変更は以下です:

- Checked Returns for Conditional and Indexed Access Types
  - 返り値の型が条件型の場合の推論が賢くなって、`as` や `any` で誤魔化す必要がなくなります。
  - [uhyo さんの資料](https://speakerdeck.com/uhyo/typescriptnoci-naruda-jin-hua-naruka-tiao-jian-xing-wofan-rizhi-tosuruguan-shu-noxing-tui-lun)もわかりやすいです。
- Support for require() of ECMAScript Modules in --module nodenext
  - TypeScript で `require()` と書いても怒られなくなります。
- The --erasableSyntaxOnly Option
  - [前に紹介があったやつ](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20250129#typescript-5.8%E3%81%AEerasablesyntaxonly%E3%83%95%E3%83%A9%E3%82%B0%E3%80%82enum%E3%82%84namespace%E3%81%8C%E6%B6%88%E3%81%88%E3%82%8B%E6%97%A5%E3%81%8C%E6%9D%A5%E3%81%9F)。

他に知っておくとよさそうな変更として、`--module nodenext` を指定している場合、`import` 時のアサーションとして `assert` が書けなくなった点があります。代わりに `with` を使うとよいです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Copilot Language Server SDK is now available - GitHub Changelog
https://github.blog/changelog/2025-02-10-copilot-language-server-sdk-is-now-available/

GitHub Copilot を[Language Server Protocol](https://microsoft.github.io/language-server-protocol/)経由で使うための SDK が公開されました。
すでに Vim や Xcode など色々なエディタ・IDE が GitHub Copilot をサポートしていますが、SDK を使うことでより手軽に Copilot を導入できるようになりそうです。

_本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_

:::message
特に LSP 対応はしてるけど GitHub Copilot 未対応エディタみたいなエディタなんかを使っている場合は自作できていいですね。関係者は少なそうですが（平木場）。
:::

## Actions Get workflow usage and Get workflow run usage endpoints closing down - GitHub Changelog
https://github.blog/changelog/2025-02-02-actions-get-workflow-usage-and-get-workflow-run-usage-endpoints-closing-down/

GitHub API において、GitHub Actions の利用状況を取得する `GET
/repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing`、`GET
/repos/{owner}/{repo}/actions/runs/{run_id}/timing` API が廃止されます。

この取り組みは、Enterprise、Team プランの顧客を新しい課金プラットフォームへの移行の一環として行われるそうです。

期限について、2025 年 4 月 1 日までに完了する予定と書かれていますが、あくまで移行完了が 4/1 と書かれているだけで、API 廃止も同じタイミングになるのかどうか僕には判断できませんでした。

> The transition of Enterprise and Team plan customers to the new billing platform will complete by April 1, 2025.

[新しい課金プラットフォーム](https://docs.github.com/en/billing/using-the-new-billing-platform/about-the-new-billing-platform)とは Enterprise、Organization 単位で 2024 年末ごろから利用できるようになった機能です。
ダッシュボードから actions や lfs などの細かい使用料金を視覚的に確認できるようになったり、新しく使えるようになった料金取得 API が利用できるようになったりしています。

新しく使えるようになった利用料取得 API `GET
/enterprises/{enterprise}/settings/billing/usage` は以前から存在している `GET
/enterprises/{enterprise}/settings/billing/actions`、`GET
/enterprises/{enterprise}/settings/billing/packages` と違い、Actions、Packages 以外の利用料が取得できるだけでなく、さらに細かいランナーの種類、使用量に加えて発生する課金額なども取得できます。
新しい API はこれら 2 つの API の完全上位互換に近く、断然使い勝手は良いです。

なお、今回の API 廃止に、`GET
/enterprises/{enterprise}/settings/billing/actions`、`GET
/enterprises/{enterprise}/settings/billing/packages` は含まれていません。
新しい課金プラットフォームへの移行を促すならこれら 2 つも廃止対象になりそうですが、実際どうなるのか不明です。

ちなみに僕もこれまで `GET
/enterprises/{enterprise}/settings/billing/actions`、`GET
/enterprises/{enterprise}/settings/billing/packages` を使って利用量を定期的に取得・記録するのをやっていましたが、新しい課金プラットフォームが登場したのでそちらの API を使うようにシステムをすでに改修しました。
前の API は情報がいつまで経っても古い（新しいランナーが追加されても反映されないなど）など、なかなか使い勝手が悪かったのでとても嬉しいです。

もし似たようなことをやってる人がいたら早めに新しい課金プラットフォームの API を使うようにしましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Edit and validate Copilot Autofix suggestions with Copilot Workspace - GitHub Changelog
https://github.blog/changelog/2025-01-31-edit-and-validate-copilot-autofix-suggestions-with-copilot-workspace/

GitHub Advanced Security ユーザー向けに、プルリクエストでも Copilot Autofix が使えるようになりました。プルリクエストに対して Copilot がセキュリティ的に怪しいところの修正案を提示してくれます。
Copilot Autofix 自体は無料ユーザーであっても使うことができます。このアップデートは「プルリクエストでも使用可能になった」という点がポイントですね。GitHub Advanced Security ユーザーのみに解放されているのが惜しいですが、利用可能な方はぜひ使っていきましょう。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

# know-how 🎓

## re:Invent2024で広がった AWS Verified Accessの可能性を探る - Speaker Deck
https://speakerdeck.com/maimyyym/reinvent-2024-verified-access-update-potentiality

AWS Verified Access が HTTP/HTTPS 以外、具体的には TCP 通信で利用可能になりました。
このスライドではユースケース別に整理して Verified Access の使い所を考察しています。
例えば、EC2 に SSH する時に Instance Connect 経由、Session Manager 経由、Verified Access 経由の 3 つを比較して、AWS Verified Access は大規模組織で仕組み化された SSH を提供したいときに使おう、といった話が書かれています。
今後のアップデートに期待する点など、Verified Access を検討する上で役に立つ情報が書かれていると感じました。課金を抑えるためにアクティブ・非アクティブな状態を切り替えたい...

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Terraform v1.11 の Write-Only Attributes を試してみる
https://zenn.dev/terraform_jp/articles/tf-write-only-attributes

Terraform v1.11 で `Write-Only Attributes` と呼ばれる Attribute が追加されました！
これは Terraform v1.10 で登場した `Ephemeral Values` の一種です！

`Ephemeral Values` とは plan ファイルや state ファイルに値が保存されない仕組みのことで、例えばシークレットなどの機密情報を Terraform で扱いたい際に役立ちます。詳しくはこちらの記事をご覧ください。

https://www.hashicorp.com/ja/blog/terraform-1-10-improves-handling-secrets-in-state-with-ephemeral-values

Terraform v1.11 で登場した `Write-Only Attributes` はその名の通り Attribute レベルの Ephemeral Values で、リソースレベルの `Ephemeral resources` と比較すると分かりやすいと思います。

`Write-Only Attributes` を使えば Terraform リソースのある Attribute だけを隠してくれます。Zenn の記事では `aws_ssm_parameter` の例が載っていて、 `value` の代わりに `value_wo` を使うことで値が plan ファイルや state ファイルに保存されない様子が紹介されています。

これを使えば機密情報の登録や更新も Terraform 上からできるわけですが、 `.tf` ファイルは基本的に git 管理すると思います。登録や更新するその隠したい値を git 管理してしまえば元も子もないので、変数などを使って外から値を渡すなど、何かしらの運用上の工夫は求められそうですね！

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

## Four Keys導入からはじめる開発プロセスの改善 - enechain Tech Blog
https://techblog.enechain.com/entry/four-keys

電力取引におけるリスク管理システムを開発しているチームが、新機能を素早くユーザーに提供することが大事なフェーズに入ってきたので Four Keys を活用した様子が書かれています。初めのチームと課題が Four Keys とマッチしていて、自チームの分析をした上で適切な指標を選定できている点が素晴らしいと感じました。
ツールとして Datadog の DORA Metrics を使用されている例は見かけたことがなかったので興味深く感じました。障害対応について PagerDuty との繋ぎこみがあったり、可視化がリッチだったり、と特徴的なところが紹介されていてよかったです。
指標を全員で確認しているところ、開発プロセスの見直しに取り組んでいる点も個人的にグッとくるポイントでした。Four Keys を受けて改善を入れていく時は CI の時間短縮などテクニックに目が行きがちですが、本来はバックログの単位などの開発プロセス全体に取り組んでいってミクロな改善に止まらないことが大切だと考えているので、素晴らしい取り組みだと思いました。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## GoアプリのCI/CDを4倍高速化した汎用的手法まとめ【txdb】
https://zenn.dev/jcat/articles/323ce8b4e4744d

Go プログラムの CI/CD を爆速にした話です。
いくつかの手法で改善しており、例えば [go-txdb](https://github.com/DATA-DOG/go-txdb) という SQL ドライバを使って DB 接続を伴うテストを並列実行しています。go-txdb は単一のトランザクション内でクエリを実行するため、他のテストとの競合を気にする必要がないとのことです。

go-txdb 面白そう！

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Linux Foundation、無料オンラインコース「Kubernetes入門」の提供を開始](https://www.linuxfoundation.jp/press-release/2025/01/free-online-course-introduction-to-kubernetes-now-available-in-japanese/)
    - Linux Foundation が CNCF と共同で作っているオンライン学習コースの日本語版を公開しました。
    - 日本語化されているので敷居が低いのが嬉しいですね。学んでいきましょう
    - https://training.linuxfoundation.org/ja/training/introduction-to-kubernetes-lfs158-jp/
  - [Larger hosted runner enhancements: Edit runner size and Windows Server 4vCPU runner availability - GitHub Changelog](https://github.blog/changelog/2025-01-30-larger-hosted-runner-enhancements-edit-runner-size-and-windows-server-4vcpu-runner-availability/)
    - GitHub Actions の Larger runner において、ランナーのスペックを編集できるようになりました
      - 特に嬉しいのは IP アドレスを静的に固定していた人ですね。IP アドレスが変わらずランナースペックを変えられるのでランナースペックを変えやすくなりました
    - また、Windows Server 2025 4vCPU ランナーが利用可能になりました（パブリックプレビュー）
  - [Go 1.24 is released! - The Go Programming Language](https://go.dev/blog/go1.24)
    - [前回のProductivity Weekly](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20250122#go1.24-new-features)で取り上げた Go 1.24 が正式リリースされました！

# あとがき

:::message alert
Productivity Weekly 2025-02-12 号より、**投稿アカウントが [@korosuke613](https://zenn.dev/korosuke613) から [@cy_ept](https://zenn.dev/cy_ept) へ変わります！**
今後 Productivity Weekly の記事を追いかける際は、[@cy_ept](https://zenn.dev/cy_ept) か、[サイボウズ 生産性向上チーム](https://zenn.dev/p/cybozu_ept)パブリケーションをフォローいただけると幸いです。
:::

上記の通り、実は平木場の名前で Productivity Weekly を出すのは今週号で最後になります。約 4 年前に平木場が初め、一昨年あたりから他の生産性向上チームメンバーにも執筆を手伝っていただくようになっていましたが、最近平木場の本業が忙しくなってきたこともあり、取りまとめを平木場個人ではなく生産性向上チームでの持ち回しで行うようにしました。
今後も記事のネタは執筆していくつもりですが、平木場の名前での執筆は今回が最後になります。
**今まで読んでくださった方々ありがとうございました！！今後ともよろしくお願いいたします！！！**


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
