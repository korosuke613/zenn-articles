---
title: "[Deprecated] Renovate config の変更が想定通りか確認する 〜真の dry-run を求めて〜"
emoji: 🕵️‍♂️
type: tech
topics:
  - Renovate
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/korosuke613/articles/compare-renovate-dry-run
---

:::message alert
**2025/07/27 追記**: 
この記事の内容は古く、**現 Renovate のバージョンではうまく動作しないことを確認しています**（ちょっと前まで使えてたと思うんだけど使えなくなったかは謎）。

また、本記事を出した半年後、2023 年 5 月にリリースされた Renovate [v35.76.0](https://github.com/renovatebot/renovate/releases/tag/35.76.0) より、`platform=local` オプションが追加され、ローカルにある Renovate config を使った dryrun ができるようになりました[^bikkuri]。
今後は `platform=local` オプションを使うことをおすすめします。

なお、ちょうど今年の 1 月に Renovate のローカルコンフィグの dryrun について調査した記事を公開した方がいますので、そちらもご参照ください。

- **[Renovate を手元の repository に対して debug 実行する](https://blog.1q77.com/2025/01/renovate-local-debug/)**

[^bikkuri]: [気づいた時びっくりしてツイートした。](https://x.com/Shitimi_613/status/1949128308605722700)

:::


こんにちは。サイボウズの生産性向上チームの [@korosuke613](https://github.com/korosuke613) です。

依存関係更新のプルリクエストを作ってくれる [Renovate](https://github.com/renovatebot/renovate) ですが、設定が難しいですよね。

Renovate の設定ファイルである Renovate config 変更時に、その変更が想定通りとなっているかどうかを確認する方法はいまいち公式ドキュメントに載っていません（載ってないはず）。その謎を解明するため、我々調査隊は Renovate の奥地へと向かった────────

というわけで今回は、**Renovate config を動作確認する方法の調査をしたので、過程と結果を記します**。

:::message
本記事は [Cybozu Advent Calendar 2022](https://blog.cybozu.io/advent_calendar_2022) の 6 日目のものとなります。~~公開が大変遅くなりすみません。~~

明日（12/7）は [@miyajan](https://twitter.com/miyajan) による [Transit Gateway で AWS を社内ネットワークの延長として使う](https://blog.cybozu.io/entry/2022/12/14/104414) です！
:::

## TL;DR

- 最終的なコマンド: `LOG_LEVEL=debug RENOVATE_CONFIG_FILE=<Renovate config ファイル名> renovate --token <GitHubのパーソナルアクセストークン> --dry-run --schedule= --require-config=ignored <Owner>/<Repo>`
- `RENOVATE_BASE_BRANCH` と `--use-base-branch-config merge` を組み合わせる方法もありますが、デフォルトブランチの設定も混じってしまうためおすすめはしません
- `RENOVATE_CONFIG_FILE` と `--require-config=ignored` を組み合わせることでデフォルトブランチの設定を無視しつつ、ローカルの Renovate config で動作確認できます
- [デフォルトブランチとトピックブランチの動作確認を比較する GitHub Actions の reusable workflow を作りました（対応ログ文言はまだ少ない）](#%E3%81%8A%E3%81%BE%E3%81%91%3A-renovate-config-%E3%81%AE-dry-run-%E3%81%AE%E3%83%AD%E3%82%B0%E3%82%92%E6%AF%94%E8%BC%83%E3%81%99%E3%82%8B-github-actions-%E3%81%AE-reusable-workflow-%E3%82%92%E4%BD%9C%E3%82%8A%E3%81%BE%E3%81%97%E3%81%9F)

## 背景

Renovate は基本的には特に設定をいじらなくても使える[^preset_base]のですが、プルリクエストを言語ごとにまとめたり[^group]、正規表現で管理する依存関係を増やしたり[^regex]したい場合に、config をいじる必要が出てきます。

Renovate には非常に多くの設定項目があり、たいへん柔軟に設定を変更できます。しかし、自由度が高いからこそ設定が難しいです。

クラウドの Renovate を使っている場合、設定変更プルリクエストをマージしないと、その設定変更が本当に想定通りなのかがわかりません。正直一番楽なのはマージして想定通りに動くか見守り、失敗したら修正するという方法です。でもやっぱりマージ前に確認したいです。

というわけで、Renovate の設定を動作確認する方法を調べました。

[^preset_base]: デフォルトの preset である [`config:base`](https://docs.renovatebot.com/presets-config/#configbase) が適用されます。

## Renovate の動作確認をしていく

Renovate の動作確認をするための幾つかの方法を見つけて試した過程と結果を書いていきます。

忙しい人は [TL;DR](#tl%3Bdr)、または、[案 Ⅲ. dry-run する with `RENOVATE_CONFIG_FILE` and `--require-config=ignored` 【本命】](#%E6%A1%88-%E2%85%B2.-dry-run-%E3%81%99%E3%82%8B-with-renovate_config_file-and---require-config%3Dignored-%E3%80%90%E6%9C%AC%E5%91%BD%E3%80%91) に飛んでください。

:::message
本記事で検証した renovatebot/renovate のバージョンは [v34.65.1](https://github.com/renovatebot/renovate/releases/tag/34.65.1) です。
:::

### ユースケース

動作確認で使うユースケース①、②について示します。
それぞれのユースケースは次のようなデフォルトブランチに置いた renovate.json を変更する内容となっています。

```json:デフォルトブランチの renovate.json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:base"
  ],
  "regexManagers": [
    {
      "fileMatch": ["^.tool-versions$"],
      "matchStrings": ["golang (?<currentValue>\\d+\\.\\d+\\.\\d+)"],
      "datasourceTemplate": "golang-version",
      "depNameTemplate": "tool-versions/golang-version"
    }
  ],
  "packageRules": [
    {
      "groupName": "golang-version",
      "matchManagers": ["regex"],
      "matchPackageNames": ["tool-versions/golang-version"]
    }
  ]
}
```

また、依存関係を管理する対象のファイルとして、次の `.tool-versions` が置かれています。

```text:.tool-versions
golang 1.18.1
golangci-lint 1.49.0
```

動作確認に使ったリポジトリは [korosuke613/experiment-renovate-dry-run](https://github.com/korosuke613/experiment-renovate-dry-run) です。

#### ①: 設定を追加する（しかし設定は誤っている）

新たに `.tool-versions` で指定している golangci-lint のバージョンを `regexManagers` でバージョン管理対象にし、golangci-lint のプルリクエストを `tools` という名前にしようとします。

しかし、`matchPackageNames` の指定を間違えてしまっているため、この renovate.json では 2. の目的が達成できません。

```diff json:.tool-versions内のgolangci-lintを更新するための設定を追加する変更
diff --git a/renovate.json b/renovate.json
index 254bcbc..4c7e1a0 100644
--- a/renovate.json
+++ b/renovate.json
@@ -9,6 +9,13 @@
       "matchStrings": ["golang (?<currentValue>\\d+\\.\\d+\\.\\d+)"],
       "datasourceTemplate": "golang-version",
       "depNameTemplate": "tool-versions/golang-version"
+    },
+    {
+      "fileMatch": ["^.tool-versions$"],
+      "matchStrings": ["golangci-lint (?<currentValue>\\d+\\.\\d+\\.\\d+)"],
+      "datasourceTemplate": "github-releases",
+      "depNameTemplate": "golangci/golangci-lint",
+      "extractVersionTemplate": "^v(?<version>.*)$"
     }
   ],
   "packageRules": [
@@ -16,6 +23,11 @@
       "groupName": "golang-version",
       "matchManagers": ["regex"],
       "matchPackageNames": ["tool-versions/golang-version"]
+    },
+    {
+      "groupName": "tools",
+      "matchManagers": ["regex"],
+      "matchPackageNames": ["golangci/golangci-rint"] // 本来は `golangci/golangci-lint` としなければいけない
     }
   ]
 }
```

ブランチ名: [add-golangci-lint-with-typo](https://github.com/korosuke613/experiment-renovate-dry-run/pull/6)

#### ②: 必要のない設定を削除する

デフォルトブランチの Renovate config では、`.tool-versions` 内の Go のバージョンを正規表現で見つけて更新する設定をしています。

しかし、[最近 `.tool-versions` 内の Go のバージョンを更新できるように Renovate 本体が対応した](https://github.com/renovatebot/renovate/pull/18612)ため、正規表現による設定は必要なくなりました。

そのため、`.tool-versions` 内の Go のバージョンを更新するプルリクエストが 2 つできるようになってしまいました。

![](/images/compare-renovate-dry-run/double-same-pull-request.png =600x)
*golang の更新プルリクエストが重複している（[#3](https://github.com/korosuke613/experiment-renovate-dry-run/pull/3)、[#4](https://github.com/korosuke613/experiment-renovate-dry-run/pull/4)）*

そこで、正規表現による Go の更新設定を削除します。

```diff json:正規表現による.tool-versions内のGoの更新設定を削除する変更
diff --git a/renovate.json b/renovate.json
index 254bcbc..39a2b6e 100644
--- a/renovate.json
+++ b/renovate.json
@@ -2,20 +2,5 @@
   "$schema": "https://docs.renovatebot.com/renovate-schema.json",
   "extends": [
     "config:base"
-  ],
-  "regexManagers": [
-    {
-      "fileMatch": ["^.tool-versions$"],
-      "matchStrings": ["golang (?<currentValue>\\d+\\.\\d+\\.\\d+)"],
-      "datasourceTemplate": "golang-version",
-      "depNameTemplate": "tool-versions/golang-version"
-    }
-  ],
-  "packageRules": [
-    {
-      "groupName": "golang-version",
-      "matchManagers": ["regex"],
-      "matchPackageNames": ["tool-versions/golang-version"]
-    }
   ]
 }
```


### 案 Ⅰ. `renovate-config-validator`

ここからいろいろ試していきます。

まず思いつくのは Renovate config を validate するツール renovate-config-validator[^config-validator] です。これを使えば文法間違いを発見できます。

試しに renovate-config-validator を使って validate してみますが、①、②共に特に問題なく通ります。

```
❯ npx --package renovate -c 'renovate-config-validator'
 INFO: Validating renovate.json
 INFO: Config validated successfully
```

①、②のようなユースケースでは、Renovate を動かさないと動作確認は発見できません。

[^group]: `groupName` で実現できます。（[参考](https://docs.renovatebot.com/configuration-options/#groupname)）
[^regex]: `regexManagers` で実現できます。（[参考](https://docs.renovatebot.com/configuration-options/#regexmanagers)）
[^config-validator]: `npx --package renovate -c 'renovate-config-validator'` で実行できます。[参考](https://docs.renovatebot.com/getting-started/installing-onboarding/#reconfigure-via-pr)。

### 案 Ⅱ. dry-run する with `RENOVATE_BASE_BRANCHES` and `--use-base-branch-config merge`

次は Renovate を実際に動かしてみます。`renovate` コマンドを実行することで、任意のタイミングで Renovate を動かすことができます（今回は `npm install --global renovate` をしました）。

例えば次のようなコマンドでトピックブランチ上の Renovate config を使って Renovate を dry-run できます。

```
LOG_LEVEL=debug \
RENOVATE_BASE_BRANCHES=<トピックブランチ名> \
renovate \
  --token <GitHubのパーソナルアクセストークン> \ 
  --dry-run \
  --schedule= \
  --use-base-branch-config merge \
  <Owner>/<Repo>
```

|環境変数 or オプション|説明|
|---|---|
|`LOG_LEVEL=debug`|デフォルトだと出力されるログが少ないため必要であれば付ける。環境変数のみ対応[^logLevel]|
|[`RENOVATE_BASE_BRANCHES=<トピックブランチ名>`](https://docs.renovatebot.com/configuration-options/#basebranches)|Renovateが依存関係を更新しようとするブランチ。環境変数のみ対応。|
|`--token <GitHubのパーソナルアクセストークン>`|dry-run 時は `public_repo` 権限のトークンで十分|
|[`--dry-run`](https://docs.renovatebot.com/self-hosted-configuration/#dryrun)|これをつけないとプルリクを作成しようとする|
|[`--schedule=`](https://docs.renovatebot.com/configuration-options/#schedule)|CLI オプションとすることで、config の schedule 設定を上書きできる。`schedule:monthly` などの設定をしていると、その時間以外ではプルリクの作成をスキップするため、基本的に付けることを推奨。値を空にすることでデフォルト設定を強制する|
|[`--use-base-branch-config merge`](https://docs.renovatebot.com/configuration-options/#usebasebranchconfig)|`RENOVATE_BASE_BRANCHES` で設定したブランチのconfigをデフォルトブランチのconfigとマージする|

特筆すべきは `RENOVATE_BASE_BRANCHES` 環境変数と `--use-base-branch-config merge` オプションです。`RENOVATE_BASE_BRANCHES` で動作確認したい config があるベースブランチを Renovate に教え、`--use-base-branch-config merge` でベースブランチの config を利用します。

~~この方法には落とし穴があります。（後述）~~

#### ユースケース①で実験
ユースケース①の `renovate.json` を使って実行してみます。

```log
❯ LOG_LEVEL=debug RENOVATE_BASE_BRANCHES=add-golangci-lint-with-typo renovate --token $TMP_GH_TOKEN --dry-run --schedule= --use-base-branch-config merge korosuke613/experiment-renovate-dry-run
...
DEBUG: branchifyUpgrades 
DEBUG: Using group branchName template 
DEBUG: Dependency tool-versions/golang-version is part of group golang-version 
DEBUG: Using group branchName template 
DEBUG: Dependency tool-versions/golang-version is part of group golang-version 
DEBUG: detectSemanticCommits() 
DEBUG: getCommitMessages 
...
```

:::message
フルサイズのログはプルリクエスト #6 の [description](https://github.com/korosuke613/experiment-renovate-dry-run/pull/6#issue-1507594993) に貼ってます。
:::

本来ならば、どの Dependency がどのグループに入るかは DEBUG ログに `DEBUG: Dependency <依存名> is part of group <グループ名>` のように表示されますが、 `matchPackageNames` の指定を誤っているため、ログに出力されていないことがわかります。
これで、少なくともこの config は何かが間違っていることがわかります。

その後、config を読み直して `matchPackageNames` の `golangci/golangci-rint` が typo していることがわかり、修正します。（ブランチ名: [add-golangci-lint](https://github.com/korosuke613/experiment-renovate-dry-run/pull/5)）
修正後に再度 dry run すると、今度はちゃんと `DEBUG: Dependency golangci/golangci-lint is part of group tools` と出ていることがわかります。

```log
❯ LOG_LEVEL=debug RENOVATE_BASE_BRANCHES=add-goreleaser renovate --token $TMP_GH_TOKEN --dry-run --schedule= --use-base-branch-config merge korosuke613/renovate-playground
...
DEBUG: branchifyUpgrades
DEBUG: Using group branchName template
DEBUG: Dependency tool-versions/golang-version is part of group golang-version
DEBUG: Using group branchName template
DEBUG: Dependency tool-versions/golang-version is part of group golang-version
DEBUG: Using group branchName template
DEBUG: Dependency golangci/golangci-lint is part of group tools
DEBUG: detectSemanticCommits()
DEBUG: getCommitMessages
...
```

:::message
フルサイズのログはプルリクエスト #5 の [description](https://github.com/korosuke613/experiment-renovate-dry-run/pull/5#issue-1507580616) に貼ってます。
:::

これでユースケース①のような設定変更をデフォルトブランチにマージせずに動作確認できました。

#### ユースケース②で実験

ではユースケース②で試してみましょう。

今度は `Dependency extraction complete` というログと `packageFiles with updates` というログで動作確認します。

- `Dependency extraction complete` は、Renovate がどのマネージャで依存関係をどのくらい見つけたかを数字で表すログになります。
- `packageFiles with updates` はどのマネージャがどのファイルのどの依存関係をどのように更新するか（できるか）を表すログになります。

実際に dry-run すると次のような出力が得られます。

```log
❯ LOG_LEVEL=debug RENOVATE_BASE_BRANCHES=remove-regex-golang-version renovate --token $TMP_GH_TOKEN --dry-run --schedule= --use-base-branch-config merge korosuke613/experiment-renovate-dry-run
...
 INFO: Dependency extraction complete (repository=korosuke613/experiment-renovate-dry-run, baseBranch=remove-regex-golang-version)
       "stats": {
         "managers": {
           "asdf": {"fileCount": 1, "depCount": 2},
           "regex": {"fileCount": 1, "depCount": 1}
         },
         "total": {"fileCount": 2, "depCount": 3}
       }
...
DEBUG: packageFiles with updates (repository=korosuke613/experiment-renovate-dry-run, baseBranch=remove-regex-golang-version)
       "config": {
         "asdf": [
           <省略>
         ],
         "regex": [
           {
             "packageFile": ".tool-versions",
             "deps": [
               {
                 "depName": "tool-versions/golang-version",
                 "currentValue": "1.18.1",
                 "datasource": "golang-version",
                 "replaceString": "golang 1.18.1",
                 "depIndex": 0,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "1.19.4",
                     "newValue": "1.19.4",
                     "releaseTimestamp": "2022-12-06T00:00:00.000Z",
                     "newMajor": 1,
                     "newMinor": 19,
                     "updateType": "minor",
                     "branchName": "renovate/golang-version"
                   }
                 ],
                 "warnings": [],
                 "versioning": "semver",
                 "sourceUrl": "https://github.com/golang/go",
                 "registryUrl": "https://raw.githubusercontent.com/golang/website",
                 "homepage": "https://go.dev/",
                 "currentVersion": "1.18.1",
                 "isSingleVersion": true,
                 "fixedVersion": "1.18.1"
               }
             ],
             "matchStrings": ["golang (?<currentValue>\\d+\\.\\d+\\.\\d+)"],
             "depNameTemplate": "tool-versions/golang-version",
             "datasourceTemplate": "golang-version"
           }
         ]
       }
...
```

おかしいですね。ユースケース②の config には `regexManagers` の設定が全くないのに、`Dependency extraction complete` のログによると `regexManagers` が存在するように見えます。さらに、`packageFiles with updates` でも正規表現で Go のバージョンを更新しようとしていることがわかります。

なぜこのような結果になるかというと、トピックブランチの config とデフォルトブランチの config がマージされているせいです。

`--use-base-branch-config` オプションには `merge` と `none` のどちらかを指定できます（デフォルト `none`）。`merge` の説明は次のようになっています。

> You can configure `useBaseBranchConfig=merge` to instruct Renovate to merge the config from each base branch over the top of the config in the default branch.
> https://docs.renovatebot.com/configuration-options/#usebasebranchconfig

つまり、`merge` はベースブランチ（トピックブランチ）の config とデフォルトブランチ（おそらく多くの場合 `main`）の config を混ぜることになります。そのため、例えばある `packageRules` を消す設定をこの方法で dry-run しても、デフォルトブランチには消したい設定が残っているため、動作確認としては不十分なものとなってしまいます。

[^logLevel]: Renovate は環境変数でのみ log level の指定をサポートしています（[参考](https://github.com/renovatebot/renovate/issues/8291)）。[ロガーとして bunyan というライブラリを使っているため](https://github.com/renovatebot/renovate/blob/7736c59515d9f4b80e7b2cbff20a72e3cd03bccb/lib/logger/index.ts#L25)、指定できる値は bunyan に依存します（[レベル一覧](https://github.com/trentm/node-bunyan/tree/5c2258ecb1d33ba34bd7fbd6167e33023dc06e40#levels)）。

この方法ではユースケース①のような設定の追加では動作確認できても、ユースケース②のような設定の削除では動作確認できません。

### 案 Ⅲ. dry-run する with `RENOVATE_CONFIG_FILE` and `--require-config=ignored` 【本命】

:::message
この方法は、`TWiStErRob/renovate-config` を参考にしました。
https://github.com/TWiStErRob/renovate-config/blob/f6ed6f8609caf024750405916ec5d1d54cd03343/config.js
:::


案Ⅱでいけると思ってたので、どうしたものかといろいろ調べてたところ、`--require-config` というオプションを見つけました。

この方法でも renovate コマンドを使って dry-run するのですが、今度は**リモートリポジトリに存在するデフォルトブランチの Renovate config を無視し、ローカルの Renovate config のみを強制的に使います**。


```
LOG_LEVEL=debug \
RENOVATE_CONFIG_FILE=<Renovate config ファイル名> \
renovate \
  --token <GitHubのパーソナルアクセストークン> \ 
  --dry-run \
  --schedule= \
  --require-config=ignored \
  <Owner>/<Repo>
```

|環境変数 or オプション|説明|
|---|---|
|[`RENOVATE_CONFIG_FILE=<Renovate config ファイルパス>`](https://github.com/renovatebot/renovate/blob/b61a01b48130172224c1a38504b9feef482e1933/docs/development/configuration.md#configuration-file)|Renovate が読む config のファイルパスを指定する。これを指定しないとデフォルトブランチの Renovate config を読みに行こうとする[^renovate_config_file]|
|[`--require-config=ignored`](https://docs.renovatebot.com/self-hosted-configuration/#requireconfig)|デフォルトブランチの Renovate config を無視する|

コマンドがずいぶんスリムになりましたね。

:::message
その他の環境変数、オプションの説明は [dry-run する with `RENOVATE_BASE_BRANCHES` and `--use-base-branch-config merge`](#dry-run-する-with-renovate_base_branches-and---use-base-branch-config-merge) を参照してください。
:::

[^renovate_config_file]: これ、`--require-config=ignored` を設定していても起こった現象であり、なぜかは正直よくわかりませんでした。Renovate むずい。

#### ユースケース①で実験'
ユースケース①の Renovate config で実験します。ユースケース①の結果は案Ⅱと同じです。

```log
❯ LOG_LEVEL=debug RENOVATE_CONFIG_FILE=renovate.json renovate --token $TMP_GH_TOKEN --dry-run --schedule= --require-config=ignored korosuke613/experiment-renovate-dry-run
...
DEBUG: branchifyUpgrades (repository=korosuke613/experiment-renovate-dry-run)
DEBUG: Using group branchName template (repository=korosuke613/experiment-renovate-dry-run)
DEBUG: Dependency tool-versions/golang-version is part of group golang-version (repository=korosuke613/experiment-renovate-dry-run)
DEBUG: detectSemanticCommits() (repository=korosuke613/experiment-renovate-dry-run)
DEBUG: getCommitMessages (repository=korosuke613/experiment-renovate-dry-run)
...
```

`Dependency golangci/golangci-lint is part of group tools` の出力がないため、config が何か間違っていることがわかります。

:::message
フルサイズのログはプルリクエスト #6 の [description](https://github.com/korosuke613/experiment-renovate-dry-run/pull/6#issue-1507594993) に貼ってます。
:::

では、typo を直した Renovate config で実験します。


```log
❯ LOG_LEVEL=debug RENOVATE_CONFIG_FILE=renovate.json renovate --token $TMP_GH_TOKEN --dry-run --schedule= --require-config=ignored korosuke613/experiment-renovate-dry-run
...
DEBUG: branchifyUpgrades (repository=korosuke613/experiment-renovate-dry-run)
DEBUG: Using group branchName template (repository=korosuke613/experiment-renovate-dry-run)
DEBUG: Dependency tool-versions/golang-version is part of group golang-version (repository=korosuke613/experiment-renovate-dry-run)
DEBUG: Using group branchName template (repository=korosuke613/experiment-renovate-dry-run)
DEBUG: Dependency golangci/golangci-lint is part of group tools (repository=korosuke613/experiment-renovate-dry-run)
DEBUG: detectSemanticCommits() (repository=korosuke613/experiment-renovate-dry-run)
DEBUG: getCommitMessages (repository=korosuke613/experiment-renovate-dry-run)
```

`Dependency golangci/golangci-lint is part of group tools (repository=korosuke613/experiment-renovate-dry-run)` と出力されているため、config の変更が想定通りであることがわかりますね！

:::message
フルサイズのログはプルリクエスト #5 の [description](https://github.com/korosuke613/experiment-renovate-dry-run/pull/5#issue-1507580616) に貼ってます。
:::

#### ユースケース②で実験'
では、案Ⅱでは上手くいかなかった、ユースケース②の Renovate config で実験します。

```log
❯ LOG_LEVEL=debug RENOVATE_CONFIG_FILE=renovate.json renovate --token $TMP_GH_TOKEN --dry-run --schedule= --require-config=ignored korosuke613/experiment-renovate-dry-run
...
INFO: Dependency extraction complete (repository=korosuke613/experiment-renovate-dry-run, baseBranch=main)
       "stats": {
         "managers": {"asdf": {"fileCount": 1, "depCount": 2}},
         "total": {"fileCount": 1, "depCount": 2}
       }
...
DEBUG: packageFiles with updates (repository=korosuke613/experiment-renovate-dry-run, baseBranch=main)
       "config": {
         "asdf": [
           {
             "packageFile": ".tool-versions",
             "deps": [
               {
                 "currentValue": "1.18.1",
                 "depName": "golang",
                 "datasource": "github-tags",
                 "packageName": "golang/go",
                 "versioning": "semver",
                 "extractVersion": "^go(?<version>\\S+)",
                 "depIndex": 0,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "1.19.4",
                     "newValue": "1.19.4",
                     "releaseTimestamp": "2022-12-06T19:30:53.000Z",
                     "newMajor": 1,
                     "newMinor": 19,
                     "updateType": "minor",
                     "branchName": "renovate/golang-1.x"
                   }
                 ],
                 "warnings": [],
                 "sourceUrl": "https://github.com/golang/go",
                 "registryUrl": "https://github.com",
                 "currentVersion": "1.18.1",
                 "isSingleVersion": true,
                 "fixedVersion": "1.18.1"
               },
               {
                 "depName": "golangci-lint",
                 "skipReason": "unsupported-datasource",
                 "depIndex": 1,
                 "updates": []
               }
             ]
           }
         ]
       }
...
```

案Ⅱの時と違い、`Dependency extraction complete` に `regex` が出力されなくなり、`packageFiles with updates` も `asdf` マネージャのみになりましたね。
想定通りの変更であることが確認できました。

案Ⅲが dry-run する上で案Ⅱよりもベターそうです。

**Renovate の奥地へと向かった我々は真の dry-run を発見できました。**

## おまけ: Renovate config の dry-run のログを比較する GitHub Actions の reusable workflow を作りました

これで dry-run の良い方法はわかりましたが、あの大量のログを見にいくのは正直つらいです。

そこで、デフォルトブランチとトピックブランチの Renovate config の dry-run の差分を出してくれる GitHub Actions の reusable workflow を作りました。

https://github.com/korosuke613/compare-renovate-logs-workflow

次のように、ジョブサマリーに dry-run のログの diff が表示されます。

![](/images/compare-renovate-dry-run/compare-summary-pr-6.png =400x)
*ユースケース① [誤った設定] の結果([#6](https://github.com/korosuke613/experiment-renovate-dry-run/pull/6))*

![](/images/compare-renovate-dry-run/compare-summary-pr-5.png =400x)
*ユースケース① [正しい設定] の結果([#5](https://github.com/korosuke613/experiment-renovate-dry-run/pull/5))*

![](/images/compare-renovate-dry-run/compare-summary-pr-7.png =400x)
*ユースケース② の結果([#7](https://github.com/korosuke613/experiment-renovate-dry-run/pull/7))*

使い方は簡単で、次のような yaml を配置するだけです。

```yaml:.github/workflows/compare-renovate-logs.yaml
name: Compare Renovate logs

on:
  pull_request:

jobs:
  compare-renovate-logs:
    uses: korosuke613/compare-renovate-logs-workflow/.github/workflows/compare-renovate-logs.yaml@v1
    with:
      renovate-config-file: renovate.json
```

Renovate のログを解析する部分は [korosuke613/analyze-renovate-log](https://github.com/korosuke613/analyze-renovate-log) という Deno 向けの CLI として別リポジトリに作っています。

制約事項として、現状 `Dependency extraction complete` と `packageFiles with updates` のログにしか対応していません。あとついでに FATAL や ERROR といったログレベルのログが標準出力されます。今後増やしていきたいですね。

**本当はこの比較ツールを作った話までを記事にしようと思っていたのですが、dry-run の方法で長くなりすぎました**。ログの分析周りも大変だったので、そのうち続きを書きたいです。


## まとめ

:::message
[TL;DR](#tl%3Bdr) を参照してください。
:::


## おわりに
正直 Renovate むずいです。この記事ではすんなり行ったように見えますが、真の dry-run を見つけるまでに今回書けなかったさまざまな組み合わせを試しました。オプションもめちゃくちゃあるし、ログは仕様が決まっているわけではないので読み解くのが大変でした。

もしかしたら今回紹介した方法、挙動もそのうち変わるかもしれません。

Renovate の設定をゴリゴリ変える人の参考になればと思います。

あと、アドベントカレンダーめちゃ遅れてすみませんでした！！！！！！！！！！！！

そんな僕が所属するサイボウズ生産性向上チームは、今回の記事のような（社内エンジニアの）**開発者の生産性を向上させるためのお仕事**をしています。気になった方は次の記事をご覧ください！！！！！！

https://note.com/cybozu_dev/n/n1c1b44bf72f6
