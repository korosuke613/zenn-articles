---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-09-25, 2024-09-18)
emoji: 🐸
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240925
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-09-25, 2024-09-18 合併号です。

今回が第 164 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->
- [@ajfAfg](https://zenn.dev/arjef)

:::

# news 📺

## アップグレードされたDockerプランの発表: よりシンプルに、より価値を、より優れた開発と生産性を実現  | Docker
https://www.docker.com/ja-jp/blog/november-2024-updated-plans-announcement/

## Notice of upcoming deprecations and changes in GitHub Actions services - GitHub Changelog
https://github.blog/changelog/2024-09-16-notice-of-upcoming-deprecations-and-changes-in-github-actions-services/

## 【Terraform】aws_iam_role リソースの inline_policy ブロックが非推奨になった
https://zenn.dev/terraform_jp/articles/tf-aws-iam-role-inline-policy-deprecation

## Now available for free on all public repositories: Copilot Autofix for CodeQL code scanning alerts - GitHub Changelog
https://github.blog/changelog/2024-09-18-now-available-for-free-on-all-public-repositories-copilot-autofix-for-codeql-code-scanning-alerts/

## Copilot Chat in GitHub.com is now aware of common support scenarios and GitHub’s documentation - GitHub Changelog
https://github.blog/changelog/2024-09-10-copilot-chat-in-github-com-is-now-aware-of-common-support-scenarios-and-githubs-documentation/

## Announcing the Public Beta of GitHub Copilot Extensions 🎉 - GitHub Changelog
https://github.blog/changelog/2024-09-17-announcing-the-public-beta-of-github-copilot-extensions-%F0%9F%8E%89/

ブログ版
Enhancing the GitHub Copilot ecosystem with Copilot Extensions, now in public beta - The GitHub Blog
https://github.blog/news-insights/product-news/enhancing-the-github-copilot-ecosystem-with-copilot-extensions-now-in-public-beta/

## Google Workspace Updates: NotebookLM now available as an Additional Service
https://workspaceupdates.googleblog.com/2024/09/notebooklm-now-available-as-additional-service.html

## ZennにDocswellのスライドが埋め込めるようになりました | What's New in Zenn
https://info.zenn.dev/2024-09-18-embed-docswell-slides

# know-how 🎓

## 持続可能なソフトウェア開発を支える『GitHub CI/CD実践ガイド』 - Speaker Deck
https://speakerdeck.com/tmknom/github-cicd-book

ライブ配信の方: https://www.youtube.com/watch?v=tU4oUp4Ym08

## terrraformを使ったGoのLambdaの管理 - カンムテックブログ
https://tech.kanmu.co.jp/entry/2024/09/17/130305

Terraform だけで AWS Lambda のビルド・デプロイを完結させる方法として、自作 Terraform プロバイダーを用いるアプローチが紹介されています。話のコンテキストがやや大きいので、このアプローチを説明する前に参考記事で取り組まれている課題を軽く説明します。AWS Lambda のリソースをデプロイする際、その Lambda 上で動作するプログラムは実行可能な形式で ZIP ファイルに詰める必要があります。実行可能な形式であればよいので、プログラムがスクリプト（e.g. Python）の場合はそのまま ZIP ファイルに詰めればよいのですが、例えば Go の場合はビルド結果を詰める必要があります。しかし、Terraform で AWS Lambda をデプロイするためのリソース [`aws_lambda_function`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function) はビルドを行わないので、一連のインフラのデプロイにそのビルドを組み込むには工夫が必要です。命令セットアーキテクチャの差異により、ローカルのビルド結果は必ずしも Lambda 上では動かない点にも気を配る必要があります。リソース [`null_resource`](https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource) を用いれば任意のシェルコマンドを Terraform 内で実行できますが、この方法による問題点として参考記事では以下が挙げられています:

> - archive_fileがデータソースであるため、terraformを実行するたびにzipファイルが作成される *1
> - 特にCIやAtlantis*2でterraformを実行する場合、意図しないタイミングでLambdaの更新が実行される
> - npm installやpip installなどzipファイル作成前の処理の定義が複雑になる

この辺りの問題は開発者の頭を長年悩ませていて、様々なアプローチで解決が試みられています。例えば、[Terraform 外でビルドを除く Lambda の管理を行うツール lambroll を用いる方法](https://tech.toreta.in/entry/2020/12/05/000000)や、[Lambda（とそれに依存するリソース）を AWS SAM で定義する方法](https://zenn.dev/cybozu_ept/articles/migrate-from-serverless-framework)があります。参考記事の新しさは何と言っても自作プロバイダーを用いる点です。自作プロバイダーならリソースを作り直すタイミングをプロバイダーで制御できるため、必要なときだけ ZIP ファイルを作り直すことも容易に実現できます。使用技術が Terraform だけな点も嬉しいです。

ちょうど僕もこの問題に取り組んでいて、自作プロバイダーの道も考えていたので、先を越された悔しさと仲間を見つけた嬉しさの両方があります。このアプローチで気になった点としては、ZIP ファイル作成の前処理の定義方法の複雑さは変わっていないのではという点と、ビルドが必要かどうかの判断はビルドツールの責務ではという点です。自作プロバイダーの強みはリソースを作り直すタイミングをプロバイダーで制御できる点だと考えているので、既存のビルドツールといい感じに組み合わせられるとこの辺りを綺麗に解決可能なんじゃないかと感じています。

個人的にはまだ物足りなさを感じるものの、こういうのは手を動かして形にすることが一番尊くてえらいので、成果物を OSS や記事として公開していただけてめちゃくちゃ嬉しいです。僕の取り組みの中でもし今後自作プロバイダーの方向に進んだら真っ先に参考になる記事でした。僕も負けじとこの問題の解決を狙っていきたいです💪

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## GitHub Actions の実行履歴に基づいて自動で timeout-minutes を設定
https://zenn.dev/shunsuke_suzuki/articles/ghatm-auto-timeout-minutes

## 独自YAMLファイルをJSON SchemaでLSP補完する
https://songmu.jp/riji/entry/2024-09-23-lsp-support-of-custom-yaml-files-using-json-schema.html

## サイバー攻撃への備えを！「SBOM」（ソフトウェア部品構成表）を活用してソフトウェアの脆弱性を管理する具体的手法についての改訂手引を策定しました （METI/経済産業省）
https://www.meti.go.jp/press/2024/08/20240829001/20240829001.html

# tool 🔨

## Nushell - 型付きシェルの基本とコマンド定義
https://zenn.dev/estra/articles/nu-typed-shell

誰もが夢見る型付きシェルスクリプトの紹介記事です。言語仕様の解説だけでなく、利便性向上のために必要な環境構築法も紹介されています。Nushell の型システムには、File-sizes 型（値は `64mb` など）や Durations 型（値は `2min + 12sec` など）のような特徴的な型が存在するとのことです。TypeScript のような Any 型も存在しており、プログラム実行前に型検査できない部分は実行時に型検査します。また、部分的型付けが導入されているとのことで、例えば `{x: int}` というレコード型の値を引数として受け取る関数に `{x: 1, y: 1}` を与えられます。

型付きシェルスクリプトといえば [Cotowali](https://zenn.dev/zakuro9715/articles/mitou-2021-cotowali) とかもありますが、Nushell はインタラクティブシェルとしても使えるのが利点そうです。一方で、POSIX に準拠していない点は少し気になりました。

僕はプログラミング言語オタクなので Nushell の型システムが壊れていないか少し試してみたのですが、嬉しいことに壊れている箇所は見つけられませんでした。部分型付けと Mutable 変数どちらもサポートしている点で悪さができそう（Java では次のプログラムのように、型検査は通るが型の不整合起因のランタイムエラーが出る場合があります）だと思ったんですが、少し変なことをしようとすると Any 型に丸められて実行時に型検査されるので、この壁を突破するのはなかなか難しかったです。しっかり型安全そうなので、安心して Nushell プログラムが書けますね。

```java
class A { int x; A(int x){this.x = x;} }
class B extends A { int y; B(int x, int y){super(x); this.y = y;} }

B[] foo = {new B(1,1)};
A[] bar = foo;
bar[0] = new A(1);
System.out.println(foo[0].y); // ArrayStoreException
```

型システムの表現力がまだあまり高くなかったり、エコシステムも発展途上そうなので仕事で使うのは難しいかもしれませんが、プライベートで使い込んでいきたいプログラミング言語でした。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
