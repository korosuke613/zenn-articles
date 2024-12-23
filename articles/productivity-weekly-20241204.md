---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-12-04, 11-27)
emoji: 🔮
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241127
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-12-04, 2024-11-27 合併号です。

今回が第 170 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@ajfAfg](https://zenn.dev/arjef)

:::

# news 📺

## GitHub Immutable Actionsのご紹介 - APC 技術ブログ
https://techblog.ap-com.co.jp/entry/2024/10/30/154345

GitHub Actions の Custom Action をセキュリティ的に強固にする新機能、Immutable Actions が登場しました（パブリックプレビュー）。

attestation 機能を使った provenance 証明、タグの変更不可、コンテナイメージとして保存など、サプライチェーン攻撃の脅威を減らせる...という感じの機能っぽいです。

パブリックプレビューではありますが、waitlist に入る必要があり、自分はまだこの機能をさわれていません。早く触りたいです。

皆さんの使ってみた記事をお待ちしています。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Announcing TypeScript 5.7 - TypeScript
https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/

ついに TypeScript 5.7 のリリースです！　わいわい！

追加される機能は [TypeScript 5.7 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-5-7-rc/) で発表された内容と同じです。個人的に面白かった機能は、以下に示す過去の Weekly で紹介しているので、そちらをご覧ください。

https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241113#announcing-typescript-5.7-rc---typescript

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Deno 2.1: Wasm Imports and other enhancements
https://deno.com/blog/v2.1

Deno 2.1 来ました！　わいわいわい！

今回も面白そうな機能が目白押しです。以降は個人的に面白かった機能を紹介します。

### First-class Wasm support

Wasm プログラムで定義される関数のインポートは、これまでは専用の関数を駆使して頑張る必要がありましたが、これからは TypeScript プログラムのインポートと同様の方法が使えるようになりました。以下に紹介記事からコード例を引用します:

> ```ts
> // previously
> const wasmInstance = WebAssembly.instantiateStreaming(fetch("./add.wasm"));
> const { add } = wasmInstance;
>
> console.log(add(1, 2));
> // $ deno --allow-read main.ts
> // 3
> ```
>
> ```ts
> // Now in Deno 2.1
> import { add } from "./add.wasm";
>
> console.log(add(1, 2));
> // $ deno main.ts
> // 3
> ```

Wasm プログラムからインポートした関数の型はどうなるのか気になるところですが、しっかり型がついていて静的に型検査されます。例えば Wasm の `i32` 型は TypeScript の `number` 型と解釈されるようです。
さらにすごいことに、Wasm プログラムが TypeScript プログラムをインポートすることも可能です。ただし、文字列やクラスといった複雑な型の値を扱う TypeScript プログラムを Wasm から扱うためには、[両者の間をなんかいい感じに繋ぐツールを使用する必要があるとのことです](https://docs.deno.com/runtime/reference/wasm/#working-with-non-numeric-types)。

今後は両者のコラボレーションがどんどん増えていきそうで楽しみです。

### Long Term Support release

[Deno 2.0 のリリース](https://deno.com/blog/v2.0)時にアナウンスされていた LTS 対応がついに v2.1 から入ります。サポート期間は 6 ヶ月です。

6 ヶ月はやや短い気はしますが、LTS により慎重なバージョンアップが必要な場面でも Deno の採用が増えると嬉しいですね。

### Stack traces in permission prompts

Deno プログラムの実行に必要な権限（e.g. ファイルの read/write、環境変数の read）をインタラクティブに付与できるようになりました。

Deno プログラムに与える権限を必要十分にする作業がかなり楽になって個人的にかなり嬉しいです。ただし、人間が逐一権限を与えていくのも面倒だし、特定の環境（e.g. プロダクション環境）でのみ必要な権限の存在は全然考えられるので、必要十分な権限を静的に列挙してくれるともっと嬉しいなーという気持ちです。（でも完全対応は難しそうです。試しに環境変数に思いを馳せてみると、その名前は動的に作れるので実行時までその名前が確定しません。）

### Turbocharged deno task

`deno task` には今回たくさんの機能が追加されていますが、個人的に最も嬉しい変更は、定義したタスクの依存関係を元にタスクを実行可能になったことです。例えば、タスク A がタスク B に依存している場合、タスク B を実行しようとするとその前に自動でタスク A も実行してくれます。Makefile や Taskfile でよくあるアレです。タスクの依存関係が循環している場合もしっかり考慮されていて、そのような場合はタスク実行前に怒ってくれます。パッケージ間のタスク依存はまだサポートされていませんが、サポートの予定はあるとのことです。

どんどん使いやすくなっていいですね。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## ㊗️GitHub認定試験が日本語に対応しました！
https://x.com/GitHubJapan/status/1867012915125158169

GitHub Certifications こと、GitHub 認定試験が日本語に対応しました！

次の試験が日本語で受けられるようになりました[^multi_lang]。

- GitHub Foundations
- GitHub Administration
- GitHub Actions

残った GitHub Advanced Security 試験、GitHub Copilot 試験はまだ未対応とのことですが、今後対応するようです。

GitHub に関する勉強や腕試し、他者との話を進める上でこういった資格取得は役立ちそうですね。僕も近いうちに受ける予定です。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^multi_lang]: なお、韓国語、スペイン語、ポルトガル語 (ブラジル)にも対応したようです。

## オラクルが所有する「JavaScript」商標登録の取り消し、Denoが米国特許商標庁に申請したと発表
https://www.publickey1.jp/blog/24/javascriptdeno.html

JavaScript をめぐるオラクル vs Deno バトルの紹介記事です。現在「JavaScript」という名称はオラクルが商標登録しており、その影響で言語仕様の名称として ECMAScript が利用されるなど、「JavaScript」という名称の利用が回避されています。この現状に対して、Deno の開発元である Deno Land は次の 3 つの主張をもとに、オラクルが所有する「JavaScript」商標登録の取り消しを申請したとのことです:

- JavaScript は汎用的な名称となった
- オラクルは虚偽の申請をした
- 商標は破棄されている

ECMAScript という名称の由来の 1 つとして、JavaScript という名称の回避があるとは知らなかったので面白かったです。今後の動向に注目です。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# know-how 🎓

## type-driven property-based testingとfuzzingを組み合わせる - Google Slides
https://docs.google.com/presentation/d/1uEatiefEvfAzQpkGElpOlEHwYLhFfKqK9xL3kgXYtpo/preview?slide=id.p

Fuzzing[^fuzzing] の手法の 1 つ [AFL](https://lcamtuf.coredump.cx/afl/) はカバレッジ率を高めるようにテストケースを自動生成できるので、その生成ロジックを Property-based testing（PBT）[^pbt] に組み込んでカバレッジ率を上げよう！という話です。このアイディアを実現する [crowbar](https://github.com/stedolan/crowbar) という OCaml ライブラリも併せて紹介されています。

[^fuzzing]: ランダムに生成された入力を用いて、テスト対象の例外的状況（e.g. クラッシュ、処理されないコーナーケース）を発見するための手法。
[^pbt]: ランダムに生成されたテストケースを用いてテストする手法。ランダムに生成されたテストケースに対する期待する結果は直接書けない（i.e. `foo(randamInput) == ???` の `???` の部分を埋められない）ので、テスト対象の性質（Property）を記述する形でテストを書く。例えば、引数のリスト `xs` を反転する関数 `reverse` の PBT として、`xs == reverse(reverse(xs))` を書いたりする。

この手法の次のモチベーションは僕もめちゃくちゃ感じていて、これを回避するためにわざわざ検査する性質を変えたりするのが面倒くさいです。（例えば、推移律（$x\mathit{R}y \land y\mathit{R}z \to x\mathit{R}z$）の前提を満たすテストケースは滅多に生成されないので、なんらかの対策が必要。）

> AならばBのような論理包含をpropertyとした時、Aが真になるケースが非常に少ない場合、ランダムに生成した入力がそれに当てはまらずテストがパスしてしまうこと（vacous truth）に気をつけなければいけない

面白そうだったので少し試してみました。以下は集合の等価性を検査する関数が推移律（$s1 = s2 \land s2 = s3 \to s1 = s3$）を満たすかテストする PBT です。生成される集合がどれも空集合になるパターンはよくあるので、気になるのは空ではない場合に命題の結論を満たせるかどうかです。これを確かめるため、次のテストは命題の結論部分で用いる等価性検査関数 `myequal` に仕込みを入れています。具体的には、引数で受け取った 2 つの集合がどちらも空ならば `true` を返し、そうでなければ `false` を返します。生成された集合が前提を満たさないならば `guard` 関数によりテストが通過するので、これを突破した場合にテストを落とすことが目的です。

```ocaml
open Crowbar

module MySet = Set.Make(Int)

let myset =
  map [list int] (fun a ->
    MySet.of_list a)

let pp_myset ppf set =
  pp ppf "{%s}" (set |> MySet.to_seq |> List.of_seq |> List.map string_of_int |> String.concat ", ")
let myset = with_printer pp_myset myset

let myequal s1 s2 =
  if MySet.is_empty s1 && MySet.is_empty s2 then true else false


let () =
  add_test ~name:"myset" [myset; myset; myset] @@ fun s1 s2 s3 ->
    guard (MySet.equal s1 s2);
    guard (MySet.equal s2 s3);
    check_eq ~pp:pp_myset ~eq:myequal s1 s3
```

上記のテストを実行したところ[^environment]、次の通り空ではない等価な 3 つの集合が生成されました！　これはすごい！！！！！！

```sh
$ bun -i input/ -o output/ _build/default/examples/myset/test_myset.exe
...(中略)
Crashes found! Take a look; copy/paste to save for reproduction:
echo CQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk= | base64 -d > crash_0.$(date -u +%s)
04:02.30:[ERROR]All fuzzers finished, but some crashes were found!
$ echo CQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk= | base64 -d > crash_0.$(date -u +%s)

$ ./_build/default/examples/myset/test_myset.exe crash_0.1733803377
myset: ....
myset: FAIL

When given the input:

    [{0, 651061555542690057};
     {0, 651061555542690057};
     {0, 651061555542690057}]

the test failed:

    {0, 651061555542690057} != {0, 651061555542690057}

Fatal error: exception Crowbar.TestFailure
```

凄まじい威力なのでドンドン活用していきたいところですが、環境構築がだいぶ大変なのでそこは改善の余地があるなーと感じました。また、今後は多言語に移植しても面白そうです。

[^environment]: 実行環境は次の通り。opam switch: 4.11.2+afl, [bun](https://github.com/ocurrent/bun): v0.3.4

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## docker buildx bake で高速並列ビルド - 誰かの役に立てばいいブログ
https://ymmt.hatenablog.com/entry/2024/12/04/004608

`docker buildx bake` を使うと、複数のコンテナイメージをいい感じに並列ビルドできる話です。ユースケースとしては、k8s 上で複数のマイクロサービスを運用するとき、各サービスに対するコンテナイメージをビルドする場面が紹介されています。Makefile のように、ビルドの依存関係が壊れないようにビルドしてくれる点（例えば、イメージのビルドの前にアプリケーションを必ずビルドできる）がウリとのことです。

複数の AWS Lambda 関数が同一リポジトリで管理されている場合とかにも使えるかもなーと感じました。シンプルな機能なので、覚えておくと活用できる場面が色々ありそうです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Terraform を活用した効率的な S3 バケット管理手法 [DeNA インフラ SRE] | BLOG - DeNA Engineering
https://engineering.dena.com/blog/2024/11/terraform-s3-management/

複数の S3 バケットを Terraform でいい感じに管理する話です。紹介記事で提案されている管理手法を用いたコード例を以下に引用します:

```tf
locals {
  buckets = {
    # バケット名                   バケット設定                           バケットの用途
    "A01-nginxlog-titleA-dev" = module.s3conf.common_bucket       # nginx のログ
    "A01-lblog-titleA-dev"    = module.s3conf.common_bucket       # ロードバランサのログ
    "A01-website-titleA-dev"  = module.s3conf.common_bucket       # ウェブサイト
    "A01-public-titleA-dev"   = module.s3conf.public_bucket       # 公開データ
    "A01-dbbackup-titleA-dev" = module.s3conf.expire_1week_bucket # DB のバックアップ
    "A02-nginxlog-titleA-dev" = module.s3conf.common_bucket       # nginx のログ
    "A02-lblog-titleA-dev"    = module.s3conf.common_bucket       # ロードバランサのログ
    "A02-website-titleA-dev"  = module.s3conf.common_bucket       # ウェブサイト
    "B03-nginxlog-titleB-dev" = module.s3conf.common_bucket       # nginx のログ
    "B03-lblog-titleB-dev"    = module.s3conf.common_bucket       # ロードバランサのログ
    "B03-public-titleB-dev"   = module.s3conf.public_bucket       # 公開データ
  }
}
```

for 式を駆使してバケット名を作ることで実際のバケット名が予測しづらくなったり、バケット名とバケット設定を定義する箇所がバラバラになる事態を防ぐことがモチベーションとのことです。

バケット名とバケット設定を紐づける点と、バケット設定がモジュールな点が大事そうだなと感じました。モジュールなので、また違ったバケットが欲しくなっても対応が楽な点がいいですね。大量の S3 バケットを一元管理したくなったときに思い出したいです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## terraform plan/applyをファイル単位で(スマートに)実行する | iret.media
https://iret.media/128453

ファイル単位で `terraform plan/apply` する手法の紹介記事です。plan/apply 時のオプション `-target` を使うと、plan/apply の対象となるリソース・モジュールを指定できます。そのため、ファイルから自力で抽出したリソース名やモジュール名を `-target` に与えると、ファイル単位で plan/apply ができるといった仕組みになっています。

ユースケースはまだ思いついていませんが、覚えておくといつか役に立つかもです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## AWS アクセス管理を一歩先へ！カミナシのセキュアな AWS アクセス管理を実現するシステムの紹介 - カミナシ エンジニアブログ
https://kaminashi-developer.hatenablog.jp/entry/2024/12/04/080000

必要十分な AWS のアクセス権限を管理するシステムの事例紹介です。カミナシさんで利用されている AWS アカウントは、定常的には ReadOnly アクセスのみ許可されていますが、紹介されているシステムを用いると、Slack App を経由して一時的に特権アクセスが可能になるとのことです。

開発者体験が考え抜かれていて素晴らしい取り組みだなと感じました。また、やはり弊社を含めてどの会社でも必要十分なアクセス権の管理は苦労されているんだなという印象を受けました。この辺りをいい感じに解決してくれる AWS サービスが登場してほしいですね。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# tool 🔨

## 【JavaScript × Terraform】次世代のモダン AltJS「JS.tf」の紹介
https://zenn.dev/terraform_jp/articles/jstf-introduction

ナウでヤングなモダン AltJS、JS.tf の紹介記事です。その名前から推測できるように、なんと Terraform を記述する HCL（HashiCorp configuration language）で JavaScript が書けます。その力は凄まじく、可読性や開発効率の著しい低下が期待できます（[原文](https://zenn.dev/terraform_jp/articles/jstf-introduction#js.tf-%E3%82%92%E4%BD%BF%E3%81%86%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88)リスペクト）。`console.log("hello world")` を意味するコード例を紹介記事から以下に引用します:

> ```tf
> data "js_function_call" "hello_world" {
>   caller   = "console"
>   function = "log"
>   args     = ["hello world"]
> }
>
> data "js_program" "main" {
>   statements = [data.js_function_call.hello_world.statement]
> }
>
> # index.js としてファイル出力
> resource "local_file" "main" {
>   filename = "index.js"
>   content  = data.js_program.main.content
> }
> ```

<!-- textlint-disable -->技術の無駄遣いすこだ……<!-- textlint-enable --><!-- 3点リーダーを2つ連続させることと、3点リーダーの後に句点をつけないのは日本語的に正しいので disable している。1行で書いているのは、このマークダウンのレンダリング時、この部分の文の上部に空白を入れないため。 -->

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Enterprise Server 3.15 is now generally available - GitHub Changelog](https://github.blog/changelog/2024-12-03-github-enterprise-server-3-15-is-now-generally-available/)
  - [Improved support for labeled Actions runners in CodeQL code scanning - GitHub Changelog](https://github.blog/changelog/2024-12-03-improved-support-for-labeled-actions-runners-in-codeql-code-scanning/)
  - [GitHub Copilot Extensions now supported in JetBrains IDEs - GitHub Changelog](https://github.blog/changelog/2024-12-02-github-copilot-extensions-now-supported-in-jetbrains-ides/)
  - [AWS、WebアプリからAmazon S3にアクセスできるUIコンポーネント「Storage Browser for S3」正式リリース － Publickey](https://www.publickey1.jp/blog/24/awswebamazon_s3uistorage_browser_for_s3_1.html)
  - [Terraform 1.10 improves handling secrets in state with ephemeral values](https://www.hashicorp.com/blog/terraform-1-10-improves-handling-secrets-in-state-with-ephemeral-values)
  - [Introducing Amazon Nova: Frontier intelligence and industry leading price performance | AWS News Blog](https://aws.amazon.com/jp/blogs/aws/introducing-amazon-nova-frontier-intelligence-and-industry-leading-price-performance/)
- **know-how 🎓**
  - [Terraform職人のためのOpenTofu再入門2024 #Terraform - Qiita](https://qiita.com/minamijoyo/items/2738b9ad5f6754b68400)
  - [GitHub ActionsのSelf Hosted Runner向けにImage Cache Proxyを導入しました - Hatena Developer Blog](https://developer.hatenastaff.com/entry/2024/11/26/151801)
  - [Kubernetes だけじゃない！Amazon ECS で実現するクラウドネイティブな GitHub Actions セルフホストランナー / CNDW2024 - Speaker Deck](https://speakerdeck.com/ponkio_o/cndw2024)
  - [強いチームと開発生産性 - Speaker Deck](https://speakerdeck.com/onk/2024-11-15-prefer-output-focused-development-team)
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
