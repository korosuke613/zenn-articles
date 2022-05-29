---
title: "Productivity Weekly (2022-05-25号)"
emoji: "☕️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220525"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 75 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Terraform 1.2 Improves Exception Handling and Updates to the CLI-driven Workflow
https://www.hashicorp.com/blog/terraform-1-2-improves-exception-handling-and-updates-to-the-cli-driven-workflow
https://github.com/hashicorp/terraform/releases/tag/v1.2.0

Terraform 1.2 がリリースされました。precondition/postcondition で動的な値の検証ができるようになりました。また、`replace_triggered_by` で特定のリソースやリソースの属性に変化があったときに replace を発生させられるようになりました。

precondition は resource/data 作成前に渡された variable などを検証できる機能です。data と組み合わせることで validation でできない検証もできます。検証に失敗するとリソースは作られずコマンドが失敗します。postcondition は resource/data/output 作成後にそれらの値、属性を検証できる機能です。検証に失敗するとコマンドが失敗します（巻き戻りません）。

正直使い所や使い分けが難しいです。ここら辺はさっそくクラメソさんが precondition/postcondition をわかりやすく解説してくれているので、こちらを参照してください（[Terraform v1.2 の新機能 precondition と postcondition を調べた | DevelopersIO](https://dev.classmethod.jp/articles/terraform-precondition-postcondition/)）。

`replace_triggered_by` は指定した属性に変化があった場合にリソースを作り直す（replace する）構文です。`# forces replacement` の属性を利用者側が指定できるような感じです。[`-replace` オプション](https://www.terraform.io/cli/commands/plan#replace-address)と違って自分で指定する必要がないのは嬉しいですね。

なかなかすぐにいろんな場所で使えるテクニックではなさそうですが、かゆいところに手が届く系の機能追加かなと思います。覚えておきたいですね。

## Development Container CLI
https://code.visualstudio.com/blogs/2022/05/18/dev-container-cli

Microsoft が dev container CLI と Development Containers Specification を発表しました。

VSCode では、Remote Containers 拡張機能を使って開発環境として用意したコンテナ内での開発ができます。今回、それについての仕様や利用するための CLI をオープンソースで公開したようです。

こちらの記事（[dev container CLIとDevelopment Containers Specificationについて](https://zenn.dev/nmemoto/articles/devcontainer-cli)）が日本語で今回の件を説明しており、わかりやすかったです。こちらの記事もご参照ください。

devcontainer の仕組み、devcontainer.json を VSCode の外で使いまわせるようになり、ゆくゆくは JetBrains IDE なんかでも使えるようになるかもしれません。未来があっていいですね。

## Improved REST API documentation | The GitHub Blog
https://github.blog/2022-05-24-improved-rest-api-documentation/

GitHub の REST API ドキュメントが改善されました。

3 カラムレイアウトとなり、パラメータの説明と例を同時に見やすくなりました。また、例で意味のある値が使われるようになり、GitHub CLI での例も追加されています。他にも、パラメータテーブルの改善、レスポンスのスキーマの追加、可能性のあるステータスコードの追加、ナビゲーションの改善などがあります。

以前は正直とても使いづらい API ドキュメントでした。レスポンススキーマが無かったので試行錯誤を繰り返さなければいけなかったのを覚えています。ステータスコードも何が飛んでくるかよくわからなかったし、1 つのページにコンテンツが詰め込まれすぎてページがカックカクになり開くのも大変だったのを覚えています。

新しい REST API ドキュメントは非常に使いやすいですね。ありがたいです。

## Math support in Markdown | The GitHub Blog
https://github.blog/2022-05-19-math-support-in-markdown/

GitHub の Markdown で数式を記述できるようになりました。LaTeX 形式をサポートしており、[MathJax](https://www.mathjax.org/) というライブラリで描画されます。

普段の LaTeX と似たように、`$` で囲むとインライン表示となり、`$$` で囲むとブロック表示となります。

数学的なライブラリを作るときや計算量を最適化するプルリクを送る時などに使えそうです。個人的には学生の頃に欲しかったですね（ロボコンで数式書きたい場面が多々あった）。必要な人は使っていきましょう。

:::message
そういえば Zenn も数式の記述に対応していましたね。僕は Zenn を GitHub リポジトリ同期しているので GitHub 側から見ても数式が表示されるのは嬉しいです。（そもそも数式書く機会がないんだけど）

- インライン表示 `$\sqrt{3x-1}+(1+x)^2$`: $\sqrt{3x-1}+(1+x)^2$
- ブロック表示 `$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$`: $$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
:::

## Updates to Markdown pasting on GitHub | GitHub Changelog
https://github.blog/changelog/2022-05-19-updates-to-markdown-pasting-on-github/

GitHub の Markdown において、テキストを選択した状態で URL をペースト (`cmd|ctl` + `v`) すると `[...](https://...)` の形式で貼り付けられるようになりました。また、スプレッドシートのセルや HTML のテーブルを選択して貼り付けるとマークダウンの表形式で貼り付けられるようになりました。

どういうものかは記事内の GIF を見るのが早いです。

もし従来通りの貼り付け方をしたい場合は `cmd|ctl` + `shift` + `v` または `cmd|ctl` + `shift` + `option|alt` + `v` でできます。

選択して貼り付けで `[...](https://...)` 形式になってほしいとは個人的に思っていたのでこれは嬉しいです。VSCode なんかはそういう挙動になってたのでなおさら。テーブルを変換してくれるのも結構嬉しいですね。マークダウンのテーブル形式に直すの面倒だったので。

## Actions can now run in a Node.js 16 runtime | GitHub Changelog
https://github.blog/changelog/2022-05-20-actions-can-now-run-in-a-node-js-16-runtime/

GitHub Actions において、アクションの `runs.using` で `node16`（Node.js 16）を指定できるようになりましたというアナウンスがされました。この変更自体は[以前も紹介しました](https://zenn.dev/korosuke613/articles/productivity-weekly-20220216#javascript-actions%E3%82%92node16%E3%81%A7%E5%8B%95%E3%81%8B%E3%81%99%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B---kengo's-blog)通り、GitHub-hosted runner においては去年の 12 月くらいから対応されていました。GitHub Enterprise Server においても 3.3 以降であれば最新の actions/runner を使えば利用できたようなので、アナウンスが遅れてやってきた感じになります。

このアナウンスにはアクション作成者向けのメッセージも載っており、GHES 3.3 より前で BRAKING CHANGES が加えられる可能性を利用者に通知するためメジャーアップデートする必要があると書かれています。確かに actions/*のアクションが Node.js 16 で動くようになった際は軒並みメジャーアップデートされていましたね。

Node.js 12 は今の所引き続き使えるとのことですが、12 は 2022 年 4 月末でサポート終了となったので、特別な理由でもない限りは使わないことを強くお勧めします。また、まだ 12 を使っている古いアクションやワークフローがあれば 16 に移行しましょう。

# know-how 🎓

## 「LeanとDevOpsの科学」を実際にチームに適用した際の工夫 - talk at DevOpsDays Tokyo 2022 - Visional Engineering Blog
https://engineering.visional.inc/blog/412/devops-days-tokyo-2022-after/

ビズリーチさんが DevOpsDays Tokyo 2022 で発表した『Lean と DevOps の科学』の four keys を測定した話（スライド）と補足と質問への回答記事です。

スライドでは、まず事前知識（ソフトウェアプロセス改善（SPI）について、計測の必要性、デリバリーパフォーマンス指標 four keys について、four keys を改善するケイパビリティについてなど）の説明があり、その後計測のための具体的な事例が説明されています。事例としては、計測の仕様やケイパビリティ保有調査、計測結果の活かし方などが説明されています。また、エンジニアからの相談例や工夫・苦労したポイントなども書かれています。

記事にはスライドの補足ともらった質問への回答も書かれているので、スライドと一緒に読むのをお勧めします。

four keys が気になっている方にもこれから計測と改善を始めたい人にも既にやってる人にも参考になる内容であると思います。改善していきたいですね。

## オンコールアラートアンチパターン - ださろぐ@はてな
https://dasalog.hatenablog.jp/entry/2022/05/23/141749

オンコールアラート（即座に対応を求めることを目的としたアラート）のアンチパターン集です。アンチパターンごとにどういう対処をするのが良いかが書かれています。

個人的に心当たりのあるパターンがいくつかあるな...と思いました。とりあえずアラートを設定してヨシ！とはならないので、気をつけていきたいですね。既存のアンチパターンも直していきたい。

## 長年運用されてきたモノリシックアプリケーションをコンテナ化しようとするとどんな問題に遭遇するか？ / SRE NEXT 2022
https://speakerdeck.com/nulabinc/sre-next-2022

ヌーラボさんによる長い歴史のあるモノリシックアプリケーション（Backlog）をコンテナ化するときに遭遇する問題と対処法をまとめたスライドです。

スライドでは、アーキテクチャの説明、コンテナ化プロジェクトの説明（体制、方針、スケジュールなど）、遭遇した問題と解決法（複数）などが紹介されています。

長い歴史を持つアプリケーションを運用しているところには割と親近感が湧きそうな内容だなと思いました。遭遇した問題に心当たりがある人も多そうです。これからコンテナ化していくぞいというところは参考になりそうです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [AWS Summit Online - 2022年5月25日, 26日 開催！| AWS](https://aws.amazon.com/jp/summits/japan/)
    - AWS Summit Japan がオンライン開催で開催されていました
    - サインインすればアーカイブをオンデマンドで視聴できます
  - [Tailwind CSS の一歩進んだ書き方](https://zenn.dev/ixkaito/articles/advanced-tailwindcss)
    - Tailwind CSS を使う上での便利な書き方集です
- **tool 🔨**
  - [Next Export Optimize Images](https://next-export-optimize-images.vercel.app/)
    - next/image を SSG で使えるようにするライブラリです
    - next/image は画像の最適化をやってくれるコンポーネントですが、SSG では使えません
    - それを SSG で使えるようにするためのライブラリです

# あとがき
先週号（2022-05-18 号）を投稿した次の日に今週号を投稿するとは思ってもみませんでした。がんばった、俺。

昨日先週号を出したばっかなのであんまりあとがきに書くこともないっすね。

そういえば僕は Civilization という文明を指導して世界の覇権国家を目指すゲームが好きなんですけど、その Civilization っぽいゲーム Old World が日本語対応するみたいなので買って遊んでみました（[ターン制ストラテジー「Old World」のSteam/GOG版の配信がスタート。日本語表示は6月中に実装予定](https://www.4gamer.net/games/504/G050406/20220519129/)）。遊んでみた感想としてはめちゃくちゃ Civ っぽいのですが、考えることが多くて慣れるまで難しいです。でも面白いです。そっくりすぎないところは良かったですね。

:::message
そういえば、Revue を試験的に始めてみました。Subscribe すると、Productivity Weekly 最新号が出たらメールが届きます。よかったら登録してみてください。
- [Productivity Weekly 💪 | Revue](https://www.getrevue.co/profile/korosuke613_productivity_weekly)
:::

:::message
生産性向上チームの夏のインターンのエントリーが 6/3 から始まっています。興味がある方はぜひエントリーしてください。エントリー期間は 5/23〜6/3 までです。

- [生産性向上 - デザイン&リサーチ - サイボウズインターンシップ&イベント 2022 エンジニア&デザイナー | サイボウズ株式会社](https://cybozu.co.jp/company/job/recruitment/intern/improvement.html)
:::

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## おまけ 🃏:  さよなら「あなたとJAVA」 - きしだのHatena
https://nowokay.hatenablog.com/entry/2022/05/25/034700

かの有名なあなたと JAVA が終わったようです。

```text:Javaと言えばこれだった
　あなたとJAVA,
今すぐダウンロー
　　　　　　　　　ド
```

まあ改行がおかしいこと自体はちょっと前に直ったらしいんですけどね（[あなたとジャバ、今すぐダウンロードの改行位置に関して](https://arigato-java.download/newline/)）。

どうやらいつの間にか「あなたと JAVA 今すぐダウンロード」自体がなくなってしまってなんかそれっぽいよくあるページになってしまったようですね。「Get Java for desktop applications」。

改行位置が修正されてしまった件は伏線だったのかもしれません。少なくとも僕が学生の頃からあの赤いちょっとダサいページでした。5 年後くらいには「あなたと JAVA 今すぐダウンロード」を知らない人も出てくるんだろうなと思うとやはり寂しさを感じてしまいますね。

別に Java が終わったわけじゃないんですけど。
