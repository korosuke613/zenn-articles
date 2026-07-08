---
title: GitHub の Custom properties でリポジトリ横断の情報を一元管理、利用すると便利って話
emoji: 🛍️
type: idea
topics:
  - 生産性向上
  - GitHub
published: true
published_at: 2026-07-08 12:30
publication_name: cybozu_ept
---

:::message
この記事は、[CYBOZU SUMMER BLOG FES '26](https://summer-blog-fes.cybozu.io/2026/)の記事です。
:::

みなさんこんにちは。サイボウズ生産性向上チームの平木場（[korosuke613](https://zenn.dev/korosuke613)）です。

生産性向上チームではちょっと前から GitHub の **Custom properties** という機能を使い始めました。使い始めてから 3 ヶ月くらい経過しましたが、今では業務フローの一部としてなくてはならない存在となっています。一方で、活用の道はまだまだありそうだと考えています。
Custom properties の情報はあまり日本語で出回ることがなく、まだまだ知名度が低いのかなと感じます。**今回は、GitHub の Custom properties とは何か、そしてそれをどのように使っているかの事例を紹介します。**

# GitHub の Custom properties とは

GitHub の [Custom properties](https://docs.github.com/ja/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization) は、Organization 配下のリポジトリに独自のメタデータ（キーと値）を付与できる機能です[^custom-properties-history]。付与した値はリポジトリの `Settings > Custom properties` から確認や編集ができるほか、REST API や GraphQL API 経由で一覧取得したり、後述する Repository Ruleset の適用条件として使ったりできます。

[^custom-properties-history]: Custom properties は 2023 年 10 月 12 日に Beta として公開され（[GitHub Repository Custom Properties Beta](https://github.blog/changelog/2023-10-12-github-repository-custom-properties-beta/)）、2024 年 2 月 14 日に GA（一般提供）となりました（[Repository Custom Properties GA and Ruleset Improvements](https://github.blog/changelog/2024-02-14-repository-custom-properties-ga-and-ruleset-improvements/)）。

Custom properties には Enterprise レベルと Organization レベルの 2 種類があります。Enterprise レベルで定義すると配下の全 Organization に強制適用されますが、今回紹介するのは Organization レベルで定義しているものです。

## 1. Custom properties を定義する

Custom properties の定義は `Organization settings > Repository > Custom properties > Properties タブ` から行います。

![](/images/github-custom-properties-example/new_property.png)
*Custom property 作成画面<br />（Match regular expression と Require this property for all repositories の展開を見せるためにチェックを入れている）*

プロパティ作成画面の `Type` では、次の 5 種類から選べます。

- `Text`: 自由入力のテキスト（`Match regular expression` で正規表現によるバリデーションも設定可能）
- `Single select`: あらかじめ決めた選択肢から 1 つだけ選ぶ
- `Multi select`: あらかじめ決めた選択肢から複数選ぶ
- `True/false`: true/false の真偽値
- `URL`: URL 形式のバリデーション付きテキスト

さらに次の設定で、プロパティを「Organization 側で値を強制する」のか、「各リポジトリの持ち主に値を決めさせるのか」を使い分けられます。

- `Allow repository actors to set this property`: 有効にすると Organization 管理者だけでなく、リポジトリ側のユーザーやリポジトリレベルの Custom properties 権限を持つ GitHub App も値の設定や更新ができるようになります
- `Require this property for all repositories`: 有効にすると全リポジトリでこのプロパティへの値設定が必須になり、明示的に値を設定していないリポジトリにはデフォルト値が適用されます
  - さらに `Require explicit user-specified values` というチェックボックスも有効にすると、リポジトリの作成、移譲、更新の際にデフォルト値への自動フォールバックを許さず、明示的な値の指定をユーザーに要求できます

:::message
**強制するのにその権限がない設定パターンの場合は？**
`Require explicit user-specified values` が要求する「明示的な値の指定」は、あくまで**そのプロパティに値を設定する権限を持つユーザーや App**に対するものです。そのため `Allow repository actors to set this property` が無効（＝Organization 管理者以外はそもそも値を設定する権限を持たない）の状態で、Organization 管理者以外がリポジトリを作成した場合は、この制約の対象外となり、単純にデフォルト値が自動的に継承されます。作成がブロックされることはありません。
:::

## 2. Custom properties を設定する

プロパティ定義後は各リポジトリでの設定が必要です（デフォルト値を設定している場合は、未設定のリポジトリに自動適用されます）。`Organization settings > Repository > Custom properties > Set values タブ` で複数リポジトリをまとめて設定できます。もしくは、リポジトリの `Settings > Custom properties` でリポジトリごとに設定できます。

## 3. Custom properties で絞り込む

Custom properties の値は `props.プロパティ名:値` という[検索クエリの構文](https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories)として扱えます。例えば `props.environment:product` と書くと、`environment` が `product` のリポジトリだけに絞り込めます（この `props.` 修飾子は特定の 1 つの Organization に検索範囲を絞った場合のみ有効です）。
この構文は特定の画面専用のものではなく、リポジトリ検索や API など Custom properties を条件として指定できる箇所で共通して使われています。

一番手軽に体験できるのは、Organization のリポジトリ一覧画面での絞り込みです。検索バーに `prop` と入力すると Organization で定義済みの Custom properties 一覧がサジェストされ、そのまま `props.environment:product` のように入力してリポジトリ一覧を絞り込めます。

![](/images/github-custom-properties-example/repositories_filter.png)
*Organizationのリポジトリ一覧画面のクエリに `props.execution-type:long-running` を入れ、長期間実行されうる系リポジトリのみを表示させている*

# 事例: 生産性向上チームでの定義と管理

私が所属する生産性向上チームは、チームで 1 つの GitHub Organization を持っています。チームが管理するリポジトリは基本的にすべてこの Organization 配下に集約されており、Custom properties もこの Organization に対して定義しています。

現在、次の 4 つの Custom properties を定義しています。

![](/images/github-custom-properties-example/defined_properties.png)
*Custom properties 一覧*

| プロパティ名 | 型 | 許容値 | 目的 |
|---|---|---|---|
| `environment` | single_select | `product` / `internal` / `sandbox` | 提供範囲の分類（チーム外か[^ept_product]、チーム内か、個人の実験系か） |
| `execution-type` | multi_select | `oneshot` / `scheduled` / `long-running` / `static` | どのタイミングで実行するかの分類 |
| `maintenance-status` | single_select | `active` / `stable` / `besteffort` / `deprecated` / `unmaintained` | 運用ステータス[^maintenance_status] |
| `runtimes` | multi_select | `Node.js` / `Deno` / `Bun` / `Docker` / `GitHub Actions` / `Terraform` / ... / `none` | GitHub の Linguist だけでは判別できない追加のランタイムやツールへの依存 |

[^ept_product]: 生産性向上チームは社内の他チームが顧客に当たります。したがって、我々にとってのプロダクトは「社内の他チームに提供しているもの」という意味になります

[^maintenance_status]: ぶっちゃけこの分類方法でいいのか？ってなってるので、このプロパティに関しては今後も議論の余地があります。必要に応じて値の追加や削除、名称変更をしていく予定です

導入のきっかけは「約 110 リポジトリ[^many_repos]を横断した対応を楽にしたい」という素朴なモチベーションでした。生産性向上チームでは多数のリポジトリを抱えていますが、「どれが社内外に実際に提供しているプロダクトか」「どのリポジトリが今も活発にメンテされているか」といった情報が各メンバーの頭の中にしかなく、横断的なタスク（脆弱性対応やセキュリティ設定の展開など）のたびに確認コストがかかっていました。

[^many_repos]: アーカイブされたものを除いて約 110 リポジトリです。もちろん重要な用途のリポジトリもあれば、個人メンバーの実験用リポジトリもあります。

これらのプロパティは Terraform（[`github` provider](https://registry.terraform.io/providers/integrations/github/latest/docs)）で管理しています。

生産性向上チームは Organization 内の全てのリポジトリをローカルに集約するためのリポジトリを持っています。Virtual monorepo[^virtual_monorepo]という手法です。
この Virtual monorepo 内に置いた `repositories.yaml` という 1 つの YAML ファイルに全リポジトリの Custom properties の値をまとめて記述しています。

[^virtual_monorepo]: 参考: [Virtual monorepo のすゝめ - 誰かの役に立てばいいブログ](https://ymmt.hatenablog.com/entry/2026/06/18/230120)

```yaml:repositories.yaml の例
# こういうのがリポジトリ数分あるイメージ
Product_repo_A:
  environment: product
  execution-type:
    - long-running
  runtimes:
    - Terraform
    - Docker
  maintenance-status: active

Internal_repo_B:
  environment: internal
  execution-type:
    - oneshot
    - scheduled
  runtimes:
    - GitHub Actions
  maintenance-status: stable
```

Terraform 側はこの YAML を読み込んで `for_each` で各リポジトリに Custom properties を反映します。`repositories.yaml` を編集して PR を作り、`terraform plan/apply` を回すだけで Organization 全体の設定が更新されます。

ちなみに、初回の設定時は Virtual monorepo 上で AI コーディングエージェントに各リポジトリの Custom properties を自動で推測させました。その後人間がレビューして、必要に応じて修正や補完をしました。便利ですね。

:::message
**ドリフト対策**
Terraform で一括管理していても、`repositories.yaml` に書かれた「あるべき値」と GitHub 上の「実際の値」がズレることがあります。例えば誰かが GitHub の UI から直接 Custom properties を書き換えたり、リポジトリが archive されたりするケースです。

これを検知するために、GitHub API（`GET /orgs/{org}/properties/values` など）で実際の値を取得し `repositories.yaml` と突き合わせて差分をレポートするスキャナーツール、および、repositories.yaml への反映ツールを用意しています。これらを定期的に実行し、ドリフトの解消を図っています[^manual_trigger]。
:::

[^manual_trigger]: 実はこの仕組み、以前は GitHub Actions の週次自動実行になっていました。しかし、Terraform の apply や Custom properties の書き込みには Organization 管理者相当の強い権限が必要になることと、滅多にドリフトすることもないので月一程度の実行で十分だと判断したことから、現在は手動運用に戻しています。


# 事例: 生産性向上チームでの活用

設定した Custom properties は、実際に次のような場面で使っています。

## Organization Ruleset でのレビュー必須化

![](/images/github-custom-properties-example/repository_rulesets_filter.png)
*`props.<property_name>:<value>` でそのプロパティの値を持つリポジトリを絞り込める*

Custom properties は Ruleset の適用対象（target）の条件として指定できます。

生産性向上チームでは、我々が社内の他チームに提供中のサービスに関するリポジトリ（`environment=product`）を対象に、GitHub の Repository Ruleset で「変更にはチームレビューを必須にする」というルールを設定しています（`Require review from specific teams` に Team で指定しています）。なお、ここでは説明を簡単にするために条件を単純化しており、実際にはもう少し細かい条件で絞っています。
Custom properties を使うことで、全リポジトリ一律でレビュー必須にせずとも、条件にあったリポジトリのみレビュー必須にするということが簡単に行えます。また、リポジトリが増えても手作業でルールを追加する必要がないのが良いです。

## dependabot security alert 対応の優先度付け

![](/images/github-custom-properties-example/security_overview_filter.png)
*`props.<property_name>:<value>` でそのプロパティの値を持つリポジトリを絞り込める*

Custom properties は Security Overview のフィルタリング条件としても使えます。

dependabot から大量のセキュリティアラートが上がってくる中で、全部を同じ優先度で捌くのは現実的ではありません。`environment=product` のリポジトリのような、重要なリポジトリから優先して対応する、という判断基準として使っています。

## AI コーディングエージェントの横断作業の足がかりにする

生産性向上チームは前述の通り約 110 ものリポジトリを少人数で管理しており、リポジトリ群を横断する変更や調査の機会が多いチームです。Virtual monorepo 上で AI コーディングエージェントにリポジトリ横断な作業をさせることも最近は多いです。そのリポジトリがどういう存在で、内部コードがどのように実行されるかといった情報は、AI コーディングエージェントの情報収集を手助けしてくれます。

また、確実に情報を与えるために、Virtual monorepo の `CLAUDE.md` には、`repositories.yaml`（我々が Custom properties の値を管理しているファイル）から生成した Custom properties 込みのリポジトリ一覧を載せています[^sync_update]。この一覧が横断でリポジトリを扱う際の足がかりになります。

[^sync_update]: `repositories.yaml` 更新時に自動で CLAUDE.md も更新されるようにしてます。

## ドキュメントの自動生成

`repositories.yaml` を入力として、AI と人間のどちらも読みうるドキュメントをスクリプトで自動生成しています。チームで運用しているサービス群の一覧やそのメンテナンス状況をまとめたドキュメントや `CLAUDE.md` などが含まれます。

つまり `repositories.yaml` を 1 箇所直して PR とスクリプト実行を経れば、Organization 上の設定と、AI と人間向けの各種ドキュメントがまとめて更新される、という設計になっています。直近でもリポジトリを 1 つリネームした際に、この仕組みのおかげで関連する複数のファイルが自動的に更新されました。

# おわりに

GitHub Custom properties は単体で見ると「リポジトリにメタデータを付けられる機能」であり、ただタグをつけるだけではあまり利点がありません。どんなメタデータが必要か、そのメタデータをどう活用するかをセットで考える必要がありますが、うまくハマると便利です。

我々の Custom properties の運用にもまだまだ改善の余地がありますし、さらなる活用方法も今後見つかるだろうと思っています。
**これを読んでいただいた皆さんも Custom properties を使ってみて、ぜひブログなどで事例を共有していただけると嬉しいです。**
