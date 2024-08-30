---
title: setup-javaで取ってくるJDKをキャッシュしてセルフホストランナーの転送量を節約する
emoji: 📉
type: tech
topics:
  - githubactions
published: true
published_at: 2024-08-17 11:00
publication_name: cybozu_ept
---


<!-- textlint-disable -->

:::message
この記事は、[CYBOZU SUMMER BLOG FES '24](https://cybozu.github.io/summer-blog-fes-2024/) (生産性向上 セイサンシャインビーチ Stage) DAY 6 の記事です。
:::

<!-- textlint-enable -->

こんにちは。サイボウズ株式会社、生産性向上チームの平木場です。今回は、GitHub Actions のセルフホストランナーの通信量削減のために行った setup-java で取ってくる JDK をあらかじめキャッシュした方法を紹介します。

内容としては、以前チームメンバーが発表したスライドの「Amazon Corretto との転送量を削減」（P14-P18）をちょっと詳しくしたものになります。背景や転送量の分析方法の詳しい説明はスライドをご覧ください。

https://speakerdeck.com/defaultcf/seruhuhosutorannatointanetutotonojian-nozhuan-song-liang-woxue-jian-siteiruhua


# 背景
生産性向上チームでは、社内向けにオートスケールする GitHub Actions セルフホストランナー環境[^kininaru]を提供しており、広く利用していただいています。

[^kininaru]: 気になる人は「[philips-labs/terraform-aws-github-runner による GitHub Actions セルフホストランナーの大規模運用 | ドクセル](https://www.docswell.com/s/miyajan/ZW1XJX-large-scale-github-actions-self-hosted-runner-by-philips-terraform-module#p1)」を参照ください。

我々のセルフホストランナーは AWS の EC2 インスタンスを利用しており、構成的にランナーとインターネットとの通信に NAT ゲートウェイを通るようになっています。
NAT ゲートウェイは転送量に応じて課金されます。VPC フローログを分析したところ、通信先のドメイン上位に `corretto.aws` がランクインしていました。

![](/images/cache-corretto-on-self-hosted-gha/transfer-top.png)
*https://speakerdeck.com/defaultcf/seruhuhosutorannatointanetutotonojian-nozhuan-song-liang-woxue-jian-siteiruhua?slide=9*

`corretto.aws` は [Amazon Corretto](https://aws.amazon.com/jp/corretto) という OpenJDK ディストリビューションのダウンロード元です。
この Amazon Corretto ですが、圧縮された状態で Corretto 21 が 210MB、Corretto 17 が 194MB となっており、毎回ダウンロードすると転送量がかさみます。

調べたところ、Amazon Corretto は GitHub Actions の [actions/setup-java](https://github.com/actions/setup-java) を使ってダウンロードされていました。

`setup-java` は対象の JDK がインストール済みであれば JDK のダウンロードをスキップする仕組みになっています。したがってランナーのインスタンスを使い回すことでキャッシュを効かせることが可能です。
しかし、我々のセルフホストランナーは環境をクリーンにするためにインスタンスは使いまわさない（1 ジョブ終わったらインスタンスは破棄される）ようにしており、必ず `setup-java` を使うジョブで JDK をダウンロードしてしまっているという状況でした。

# やりたいこと

そこで、`setup-java` でダウンロードする JDK（今回は Amazon Corretto）をあらかじめキャッシュしておいて、転送量を削減したいというのが今回のテーマです。

我々のセルフホストランナーは、ランナーや各種入ってると嬉しいソフトウェア（Docker や jq、GitHub CLI や AWS CLI など）のインストールをあらかじめ行った共通の Amazon Machine Image (AMI) を用意し、その AMI からインスタンスを起動することで、ランナー起動の高速化と利用者のインストール作業の省略を計っています。

AMI 自体は定期的に作成・更新されるようになっており、その AMI に setup-java と同じような方法で JDK をあらかじめインストールしておくことで、setup-java が毎回ダウンロードしなくても済むようにします。

# setup-java の JDK キャッシュの仕組み
この方法を考えるにあたって、まず `setup-java` が JDK をどうインストールしているのか、どうやってインストール済みと判断しているのかを知る必要があります。

:::message
[actions/setup-java v4.2.2](https://github.com/actions/setup-java/tree/v4.2.2) を参照しています。今後のバージョンで仕様が変わる可能性があります。
:::

まず前提として、今回は次のような入力を `setup-java` に与えているとします。

```yaml
- uses: actions/setup-java@6a0805fcefea3d4657a47ac4c165951e33482018 # v4.2.2 
  with:
    distribution: 'corretto'
    java-version: '21'
```

インストールの大まかな流れは次のようになっています。

1. インストール済みの JDK のバージョンとパスを取得する ([ref](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/base-installer.ts#L49))
   1. キャッシュディレクトリより、キャッシュ済みバージョン一覧を取得 ([ref](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/base-installer.ts#L102-L122))
   2. キャッシュ済みバージョン一覧より、`with.java-version` で指定したバージョンを満たす JDK のバージョンとパスを取得 ([ref](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/base-installer.ts#L124-L137))
2. 見つからなかった場合、JDK をインストールする ([ref](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/base-installer.ts#L53-L62))
   1. ダウンロード URL の取得 ([ref](https://github.com/actions/setup-java/blob/67fbd726daaf08212a7b021c1c4d117f94a81dd3/src/distributions/corretto/installer.ts#L55-L88))
   2. ダウンロードしてインストール ([ref](https://github.com/actions/setup-java/blob/67fbd726daaf08212a7b021c1c4d117f94a81dd3/src/distributions/corretto/installer.ts#L26-L53))
3. JDK をデフォルトの JDK として設定する ([ref](https://github.com/actions/setup-java/blob/67fbd726daaf08212a7b021c1c4d117f94a81dd3/src/distributions/base-installer.ts#L164-L175))

## キャッシュディレクトリを調べる

「1.1 キャッシュディレクトリより、キャッシュ済みのバージョン一覧を取得」を調べることでどこに JDK をキャッシュしているかがわかります。

https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/base-installer.ts#L102-L103

`tc.findAllVersions()` でキャッシュされている JDK のバージョンを取得しています。この関数は [@actions/tool-cache](https://github.com/actions/toolkit/tree/f003268b3250d192cf66f306694b34a278011d9b/packages/tool-cache) にあります。

`@actions/tool-cache` は GitHub Actions の公式ツールキットで、ツールのダウンロードやキャッシュを行うためのユーティリティです。これを使うことで `setup-*` 系のアクションを作る人はランナーのどこにキャッシュすればいいかを気にせずに済むということですね。

:::message
@actions/setup-java v4.2.2 は [package.json](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/package.json#L35) で `"@actions/tool-cache": "^2.0.1"` と指定しています。
今回は `@actions/tool-cache` の [v2.0.1](https://github.com/actions/toolkit/tree/500d0b42fee2552ae9eeb5933091fe2fbf14e72d/packages/tool-cache) を参照します。
:::

ではどこのディレクトリにキャッシュしているかを調べるために `findAllVersions` 関数を調べます。

https://github.com/actions/toolkit/blob/500d0b42fee2552ae9eeb5933091fe2fbf14e72d/packages/tool-cache/src/tool-cache.ts#L548

`_getCacheDirectory()` があやしいですね。さらに見てみましょう。

https://github.com/actions/toolkit/blob/500d0b42fee2552ae9eeb5933091fe2fbf14e72d/packages/tool-cache/src/tool-cache.ts#L746-L750

どうやら `RUNNER_TOOL_CACHE` 環境変数を参照しているようです。GitHub Actions マニアの人ならどこかで見たことありませんか？

そう。実は公式ドキュメントにちゃんと載っているんですよね。

> `RUNNER_TOOL_CACHE`: The path to the directory containing preinstalled tools for GitHub-hosted runners. For more information, see "Using GitHub-hosted runners". For example, `C:\hostedtoolcache\windows`
https://docs.github.com/en/enterprise-cloud@latest/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#default-environment-variables

ドキュメントには GitHub ホストランナー用のディレクトリと書いてありますが、セルフホストランナーでも同じように使えるようです。
では環境変数の中身はなんなのか調べてみます。

EC2 でまっさらな Ubuntu のインスタンスを作り、[GitHub のドキュメント](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners#adding-a-self-hosted-runner-to-a-repository)にあるやり方で手動でセルフホストランナーをセットアップ、起動して実験します。

```yaml:RUNNER_TOOL_CACHE に何が入っているか調べる実験
steps:
  - run: echo $RUNNER_TOOL_CACHE
```

実行結果は次のようになりました。

```shell:実行結果
$ echo $RUNNER_TOOL_CACHE
/home/ssm-user/actions-runner/_work/_tool
```

ホームディレクトリでランナーセットアップを行ったため、セルフホストランナー関係のファイルは `~/actions-runner` 以下に配置されています。
`<ランナーのディレクトリ>/_work/_tool` がキャッシュディレクトリとなったようです。
`_work` については、ランナーのセットアップ時に聞かれる work folder にあたります。

> Enter name of work folder: [press Enter for _work]

`<work folder>/_tool` が `RUNNER_TOOL_CACHE` になることがわかりました。

:::message
ちなみに、`RUNNER_TOOL_CACHE` は自前で設定することも可能です。どうやら、`RUNNER_TOOL_CACHE` や `RUNNER_TOOLSDIRECTORY`、`AGENT_TOOLSDIRECTORY` などの環境変数がない場合に、`<work folder>/_tool` と決定されるようです。

```cs:actions/runnerより
case WellKnownDirectory.Tools:
    // TODO: Coallesce to just check RUNNER_TOOL_CACHE when images stabilize
    path = Environment.GetEnvironmentVariable("RUNNER_TOOL_CACHE") ?? Environment.GetEnvironmentVariable("RUNNER_TOOLSDIRECTORY") ?? Environment.GetEnvironmentVariable("AGENT_TOOLSDIRECTORY") ?? Environment.GetEnvironmentVariable(Constants.Variables.Agent.ToolsDirectory);

    if (string.IsNullOrEmpty(path))
    {
        path = Path.Combine(
            GetDirectory(WellKnownDirectory.Work),
            Constants.Path.ToolDirectory);
    }
    break;
```
https://github.com/actions/runner/blob/a77fe8a53fe9fc2a77ae4f511d46d04197bdde66/src/Runner.Common/HostContext.cs#L286-L296

:::

キャッシュディレクトリの大元はわかりました。次は JDK がどう配置されるかを調べます。

`findAllVersions()` では引数に「ツール名（`toolName`）」、「アーキテクチャ（`arch`）」を取り、それらを組み合わせて探すディレクトリのパスを構築しています。

https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/base-installer.ts#L103

`toolcacheFolderName` を調べます。

https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/base-installer.ts#L80-L82

`toolcacheFolderName` は `Java_<ディストリビューション名>_<パッケージタイプ>` で決定されます。[ディストリビューション名は `Corretto`](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/corretto/installer.ts#L23)、パッケージタイプはデフォルト値の `jdk` です。

したがって、`toolcacheFolderName` は `Java_Corretto_jdk` となります。

`architecture` については指定しない場合自動でマシンのアーキテクチャを推定するようです。今回の実験では `x64` となりました。

それではとうとう実際に JDK がどこにキャッシュされるかを調べます。
Corretto 21 を setup-java でインストールし、キャッシュディレクトリの構造を調べます。

```txt:Corretto 21 をインストールしてキャッシュディレクトリを調べる
$ cd ~/actions-runner

$ ls _work/_tool/Java_Corretto_jdk
21.0.4-7.1

$ ls _work/_tool/Java_Corretto_jdk/21.0.4-7.1
x64  x64.complete

$ ls _work/_tool/Java_Corretto_jdk/21.0.4-7.1/x64
ADDITIONAL_LICENSE_INFO  ASSEMBLY_EXCEPTION  LICENSE  README.md  bin  commitId.txt  conf  include  jmods  legal  lib  man  release  version.txt
```

どうやら次のような構成になってるようですね。これで JDK のキャッシュディレクトリの構造がわかりました。

```
$RUNNER_TOOL_CACHE
└── Java_<ディストリビューション>_jdk (Java_Corretto_jdk)
    └── <バージョン> (21.0.4-7.1)
        ├── <アーキテクチャ>.complete (x64.complete)
        └── <アーキテクチャ> (x64)
            └── JDK のファイル群
```

これらがどのように決定されているかと、`x64.complete` の謎は [`findAllVersions()`](https://github.com/actions/toolkit/blob/500d0b42fee2552ae9eeb5933091fe2fbf14e72d/packages/tool-cache/src/tool-cache.ts#L544-L563) を読めばわかります。

```typescript:findAllVersions() の実装にコメント👀を加えたもの
export function findAllVersions(toolName: string, arch?: string): string[] {
  const versions: string[] = [] // 👀 見つけたバージョン一覧

  arch = arch || os.arch() 
  // 👀 arch -> x64
  const toolPath = path.join(_getCacheDirectory(), toolName) 
  // 👀 toolPath -> $RUNNER_TOOL_CACHE/Java_Corretto_jdk -> ~/actions-runner/_work/_tool/Java_Corretto_jdk

  if (fs.existsSync(toolPath)) {
    const children: string[] = fs.readdirSync(toolPath) // 👀 toolPath ディレクトリ内を抽出
    // 👀 children -> ['21.0.4-7.1']
    for (const child of children) {
      if (isExplicitVersion(child)) { // 👀 バージョンが一意に定まるか？調べてるっぽい
        const fullPath = path.join(toolPath, child, arch || '')
        // 👀 fullPath -> ~/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/x64
        if (fs.existsSync(fullPath) && fs.existsSync(`${fullPath}.complete`)) {
          // 👀 組み立てたパスが存在している、
          //   かつ、~/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/x64.complete が存在している
          versions.push(child)
          // 👀 見つけたバージョン一覧に 21.0.4-7.1 を追加
        }
      }
    }
  }

  return versions
}
```

バージョンディレクトリ内のアーキテクチャごとに `<アーキテクチャ>.complete` というファイルがないとキャッシュされていないと判断されるようですね。
これは注意が必要ですねぇ。

## インストールで何をやっているか調べる

ではどのように JDK をインストールしているかを調べます。
setup-java でのインストール方法がわかればそれを真似してうまい具合に同じインストールができるはず。

### ダウンロード URL の取得
「2.1: ダウンロード URL の取得」を調べます。

ダウンロード URL は CorrettoDistribution クラスの [`findPackageForDownload` メソッド](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/corretto/installer.ts#L55-L88)で取得しているようです。

`findPackageForDownload` は大まかに次のことをやっています。

1. 利用可能バージョン一覧の取得 ([ref](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/corretto/installer.ts#L90-L130))
   1. `https://corretto.github.io/corretto-downloads/latest_links/indexmap_with_checksum.json` から最新のバージョン一覧を取得([ref](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/corretto/installer.ts#L99-L110))
   2. バージョン一覧から、OS、アーキテクチャ、パッケージタイプに一致する URL を取得([ref](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/corretto/installer.ts#L112-L115))
2. `with.java-version` で指定されたバージョンに一致するものがあればフルのバージョン番号と URL を返す ([ref](https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/distributions/corretto/installer.ts#L74-L87))
   1. URL から整形されたバージョン番号を抽出する ([ref](https://github.com/actions/setup-java/blob/cd89f46ac9d01407894225f350157564c9c7cee2/src/distributions/corretto/installer.ts#L178-L186))
   2. 整形されたバージョン番号を JDK 本来（？）のバージョン番号に整形する ([ref](https://github.com/actions/setup-java/blob/cd89f46ac9d01407894225f350157564c9c7cee2/src/util.ts#L155-L163))

バージョン一覧は `https://corretto.github.io/corretto-downloads/latest_links/indexmap_with_checksum.json` から取得しているようです。ちょっと中をのぞいてみましょう。

たくさんのプラットフォームに対応しているようですが、今回は Ubuntu を想定しているので Linux の部分を見てみます。

```json:indexmap_with_checksum.jsonの抜粋
{
  ...
  "linux": {
    "aarch64": { ... },
    "arm": { ... },
    "arm-musl": { ... },
    "x64": {
      "jdk": {
        "8": { ... },
        "11": { ... },
        "15": { ... },
        "16": { ... },
        "17": { ... },
        "18": { ... },
        "19": { ... },
        "20": { ... },
        "21": {
          "deb": { ... },
          "rpm": { ... },
          "tar.gz": {
            "checksum": "3f0a55a891b72d567d0e7220777b969a",
            "checksum_sha256": "ee88014fe758f93180f34cfca2158de4e1834472136296521998f52e146afb3c",
            "resource": "/downloads/resources/21.0.4.7.1/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz"
          },
          "tar.gz.pub": { ... },
          "tar.gz.sig": { ... }
        },
        "22": { ... },
        "23": { ... }
      }
    },
    "x86": { ... }
  }
  ...
}
```

色々詰まった json となっていますが、次のような構造になっていました。

```
.
└── <プラットフォーム>
    └── <アーキテクチャ>
        └── <バージョン>
            └── <パッケージタイプ>
                └── <ファイルタイプ>
                    ├── checksum
                    ├── checksum_sha256
                    └── resource
```

ファイルタイプについて、Linux の場合は `tar.gz` になる模様です。

https://github.com/actions/setup-java/blob/6a0805fcefea3d4657a47ac4c165951e33482018/src/util.ts#L53-L55

これで `resource` にあるパスを組み合わせると我々の求めているダウンロード URL を得られますね。

Ubuntu で Corretto 21 をインストールする場合のダウンロード URL は次のようになります。

`https://corretto.aws/downloads/resources/21.0.4.7.1/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz`

また、`findPackageForDownload` メソッドでは、URL に加えてフルのバージョン番号も呼び出し元関数に返しています。

そもそも OpenJDK には、`<メジャー>.<マイナー>.<パッチ>+<ビルド番号>` とするバージョン番号の形式[^jep]があり、Amazon Corretto もこの形式に従っています。
したがって、ダウンロード URL から取得できる `21.0.4.7.1` は整形されたものであり、実際は `21.0.4+7.1` となります。

このフルのバージョン番号は GitHub Actions でログとして出力されたり、後ほどインストール先ディレクトリを作るために使用されます。

[^jep]: [JEP 223: New Version-String Scheme](https://openjdk.org/jeps/223) や [Javaのバージョン番号の形式を理解する - Magnolia Tech](https://blog.magnolia.tech/entry/2021/11/14/213822) を参照。

### ダウンロードしてインストール

「2.2: ダウンロードしてインストール」を調べます。

インストールは `CorrettoDistribution` クラスの `downloadTool` メソッドで行っているようです。
大まかに次のことをやっています。

1. ダウンロード URL からファイルをダウンロード ([ref](https://github.com/actions/setup-java/blob/67fbd726daaf08212a7b021c1c4d117f94a81dd3/src/distributions/corretto/installer.ts#L32))
2. ダウンロードした tar.gz を展開 ([ref](https://github.com/actions/setup-java/blob/67fbd726daaf08212a7b021c1c4d117f94a81dd3/src/distributions/corretto/installer.ts#L36-L39))
3. バージョン番号の修正 ([ref](https://github.com/actions/setup-java/blob/cd89f46ac9d01407894225f350157564c9c7cee2/src/distributions/base-installer.ts#L84-L97))
4. キャッシュディレクトリに配置 ([ref](https://github.com/actions/setup-java/blob/67fbd726daaf08212a7b021c1c4d117f94a81dd3/src/distributions/corretto/installer.ts#L41-L50))
5. `.complete` ファイルを配置 ([ref](https://github.com/actions/toolkit/blob/f003268b3250d192cf66f306694b34a278011d9b/packages/tool-cache/src/tool-cache.ts#L441-L442))


3\. について、前節で説明した `findPackageForDownload` メソッドからフルのバージョン番号（`21.0.4+7.1`）を得ましたが、このままでは `+` 記号があるためディレクトリ名として使えません。したがって、`+` を `-` に置換しています。ややこしいですね。

5\. について、「[キャッシュディレクトリを調べる](#%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%82%92%E8%AA%BF%E3%81%B9%E3%82%8B)」にもあったように、`.complete` ファイルを配置することで JDK がインストール済みと判断されるため、`.complete` ファイルの配置が必要です。
`.complete` の中身についてですが、どうやら中身は空で良いようです。

https://github.com/actions/toolkit/blob/f003268b3250d192cf66f306694b34a278011d9b/packages/tool-cache/src/tool-cache.ts#L686-L687

~~なお、我々は最初 .complete ファイルの存在に気づいておらず、ちゃんと展開した tar.gz の中身を置いたのになぜダウンロードが走るのかと頭を抱えました。~~

# setup-java のキャッシュの仕組みを再現する

とうとう本題です。setup-java のキャッシュの仕組みを再現し、あらかじめ Corretto をインストールすることで setup-java が Corretto をダウンロードしないようにしましょう。

setup-java の Corretto キャッシュの仕組みを調べてわかったことをざっくりまとめると次のようになります。

- `RUNNER_TOOL_CACHE` 環境変数で指定されているディレクトリに JDK はインストールされる
  - `$RUNNER_TOOL_CACHE/Java_<ディストリビューション>_jdk/<バージョン>/<アーキテクチャ>` に JDK が配置される
- Corretto のダウンロード URL、フルのバージョン番号は https://corretto.github.io/corretto-downloads/latest_links/indexmap_with_checksum.json から取得できる
  - バージョン番号はダウンロード URL から取得できるが、`21.0.4.7.1` のような形式から `21.0.4-7.1` のような形式に変換してディレクトリを用意する必要がある
- インストール済であることを示すために、`$RUNNER_TOOL_CACHE/Java_<ディストリビューション>_jdk/<バージョン>` 配下に `<アーキテクチャ>.complete` というファイルを配置する必要がある

そしてこれらの情報を踏まえて、次のスクリプトを作成しました。

:::message
本項目のスクリプトは、わかりやすいように、また、まっさらな EC2 の Ubuntu で実行できるように本記事用に作ったものです。実際に社内で利用しているコードとは異なります（実際には複数バージョンをインストールできるようにしたり、`RUNNER_TOOL_CACHE` ディレクトリを別で用意してたりする）。
:::

```sh:Corretto インストールスクリプト
#!/usr/bin/env bash

set -euxo pipefail

# インストールする Corretto のバージョン
INSTALL_MAJOR_VERSION=21

# RUNNER_TOOL_CACHE に当たるディレクトリ
TOOL_CACHE_DIR=/home/ssm-user/actions-runner/_work/_tool  # 環境によって異なることに注意。今回は `/home/ssm-user/actions-runner` 配下でセットアップしたためこのパスとなっている

# ダウンロード情報の取得
CORRETTO_DOWNLOADS=/tmp/corretto_downloads.json
curl -fsSL -o $CORRETTO_DOWNLOADS --retry 3 https://corretto.github.io/corretto-downloads/latest_links/indexmap_with_checksum.json

# ダウンロードURLを取得
JAVA_RESOURCE=$(jq ".linux.x64.jdk.\"${INSTALL_MAJOR_VERSION}\".\"tar.gz\"" ${CORRETTO_DOWNLOADS})
DOWNLOAD_URL_SUFFIX=$(echo ${JAVA_RESOURCE} | jq -r '.resource')

# actions/setup-javaのキャッシュディレクトリと同じ名前になるような置換処理
# Javaのバージョンとしては"+"区切りが正しいがディレクトリとして不正なので"-"に置換している
VERSION=$(echo ${DOWNLOAD_URL_SUFFIX} | awk -F '/' '{print $4}' | sed 's/\./-/3')

# インストール先ディレクトリの作成
JAVA_PATH=${TOOL_CACHE_DIR}/Java_Corretto_jdk/${VERSION}/x64
mkdir -p ${JAVA_PATH}

# ダウンロード
FILENAME=${DOWNLOAD_URL_SUFFIX##*/}
curl -fsSL -o "/tmp/${FILENAME}" --retry 3 "https://corretto.aws${DOWNLOAD_URL_SUFFIX}"

# チェックサムの確認
CHECKSUM_SHA256=$(echo ${JAVA_RESOURCE} | jq -r '.checksum_sha256')
echo "${CHECKSUM_SHA256}  /tmp/${FILENAME}" | shasum -a 256 -c

# インストール
# $RUNNER_TOOL_CACHE/Java_Corretto_jdk/17.0.8-7.1/x64 の下に bin/ などが配置されるように展開する
tar xzf /tmp/${FILENAME} --strip-components 1 -C ${JAVA_PATH}
# インストール済であることを示すためのファイルを配置
touch ${JAVA_PATH}.complete

# 後始末
rm /tmp/${FILENAME}
rm ${CORRETTO_DOWNLOADS}
```

# 動作確認

では実際に動作確認しましょう。

動作確認の流れは次になります。

1. まっさらな EC2 インスタンスを立ち上げる
2. jq のインストール
3. セルフホストランナーをセットアップする
4. Corretto インストールスクリプトを動かして Corretto をインストールする
5. ランナーを起動する
6. GitHub Actions で setup-java を実行する

**1. まっさらな EC2 インスタンスを立ち上げる**

今回は Ubuntu 22.04 (`ami-0162fe8bfebb6ea16`)の EC2 インスタンスを立ち上げました。

**2. jq のインストール**

デフォルトでは jq がインストールされていないのでインストールします。

```
~/actions-runner$ jq --version
jq-1.6
```

しました。

**3. セルフホストランナーをセットアップする**

![](/images/cache-corretto-on-self-hosted-gha/setup-runner.png)
*いつもの*

今回は手動でセットアップを流す。

```
/var/snap/amazon-ssm-agent/7993$ cd

~$ mkdir actions-runner && cd actions-runner

~/actions-runner$ curl -o actions-runner-linux-x64-2.319.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.319.0/actions-runner-linux-x64-2.319.0.tar.gz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100  186M  100  186M    0     0  89.1M      0  0:00:02  0:00:02 --:--:--  122M

~/actions-runner$ echo "52b8f9c5abb1a47cc506185a1a20ecea19daf0d94bbf4ddde7e617e7be109b14  actions-runner-linux-x64-2.319.0.tar.gz" | shasum -a 256 -c
actions-runner-linux-x64-2.319.0.tar.gz: OK

~/actions-runner$ tar xzf ./actions-runner-linux-x64-2.319.0.tar.gz

~/actions-runner$ ./config.sh --name corretto-cache --runnergroup Default --labels corretto-cache --work _work --ephemeral --url ***/github-actions-playground --token ***

--------------------------------------------------------------------------------
|        ____ _ _   _   _       _          _        _   _                      |
|       / ___(_) |_| | | |_   _| |__      / \   ___| |_(_) ___  _ __  ___      |
|      | |  _| | __| |_| | | | | '_ \    / _ \ / __| __| |/ _ \| '_ \/ __|     |
|      | |_| | | |_|  _  | |_| | |_) |  / ___ \ (__| |_| | (_) | | | \__ \     |
|       \____|_|\__|_| |_|\__,_|_.__/  /_/   \_\___|\__|_|\___/|_| |_|___/     |
|                                                                              |
|                       Self-hosted runner registration                        |
|                                                                              |
--------------------------------------------------------------------------------

# Authentication


√ Connected to GitHub

# Runner Registration


√ Runner successfully added
√ Runner connection is good

# Runner settings


√ Settings Saved.

~/actions-runner$
```

**4. Corretto インストールスクリプトを動かして Corretto をインストールする**

先ほど書いた Corretto インストールスクリプトを動かします。

```
~/actions-runner$ vim setup-corretto.sh

~/actions-runner$ chmod +x setup-corretto.sh

~/actions-runner$ ./setup-corretto.sh
+ INSTALL_MAJOR_VERSION=21
+ TOOL_CACHE_DIR=/home/ssm-user/actions-runner/_work/_tool
+ CORRETTO_DOWNLOADS=/tmp/corretto_downloads.json
+ curl -fsSL -o /tmp/corretto_downloads.json --retry 3 https://corretto.github.io/corretto-downloads/latest_links/indexmap_with_checksum.json
++ jq '.linux.x64.jdk."21"."tar.gz"' /tmp/corretto_downloads.json
+ JAVA_RESOURCE='{
  "checksum": "3f0a55a891b72d567d0e7220777b969a",
  "checksum_sha256": "ee88014fe758f93180f34cfca2158de4e1834472136296521998f52e146afb3c",
  "resource": "/downloads/resources/21.0.4.7.1/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz"
}'
++ echo '{' '"checksum":' '"3f0a55a891b72d567d0e7220777b969a",' '"checksum_sha256":' '"ee88014fe758f93180f34cfca2158de4e1834472136296521998f52e146afb3c",' '"resource":' '"/downloads/resources/21.0.4.7.1/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz"' '}'
++ jq -r .resource
+ DOWNLOAD_URL_SUFFIX=/downloads/resources/21.0.4.7.1/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz
++ echo /downloads/resources/21.0.4.7.1/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz
++ awk -F / '{print $4}'
++ sed 's/\./-/3'
+ VERSION=21.0.4-7.1
+ JAVA_PATH=/home/ssm-user/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/x64
+ mkdir -p /home/ssm-user/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/x64
+ FILENAME=amazon-corretto-21.0.4.7.1-linux-x64.tar.gz
+ curl -fsSL -o /tmp/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz --retry 3 https://corretto.aws/downloads/resources/21.0.4.7.1/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz
++ echo '{' '"checksum":' '"3f0a55a891b72d567d0e7220777b969a",' '"checksum_sha256":' '"ee88014fe758f93180f34cfca2158de4e1834472136296521998f52e146afb3c",' '"resource":' '"/downloads/resources/21.0.4.7.1/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz"' '}'
++ jq -r .checksum_sha256
+ CHECKSUM_SHA256=ee88014fe758f93180f34cfca2158de4e1834472136296521998f52e146afb3c
+ echo 'ee88014fe758f93180f34cfca2158de4e1834472136296521998f52e146afb3c  /tmp/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz'
+ shasum -a 256 -c
/tmp/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz: OK
+ tar xzf /tmp/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz --strip-components 1 -C /home/ssm-user/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/x64
+ touch /home/ssm-user/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/x64.complete
+ rm /tmp/amazon-corretto-21.0.4.7.1-linux-x64.tar.gz
+ rm /tmp/corretto_downloads.json
```

やったか！？

```
/actions-runner$ ls ~/actions-runner/_work/_tool/ ~/actions-runner/_work/_tool/Java_Corretto_jdk/ ~/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/ ~/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/x64
/home/ssm-user/actions-runner/_work/_tool/:
Java_Corretto_jdk

/home/ssm-user/actions-runner/_work/_tool/Java_Corretto_jdk/:
21.0.4-7.1

/home/ssm-user/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/:
x64  x64.complete

/home/ssm-user/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/x64:
ADDITIONAL_LICENSE_INFO  ASSEMBLY_EXCEPTION  LICENSE  README.md  bin  commitId.txt  conf  include  jmods  legal  lib  man  release  version.txt
```

ディレクトリ構造は想定通り。

**5. ランナーを起動する**

```
~/actions-runner$ ./run.sh
```

**6. GitHub Actions で setup-java を実行する**

次のような GitHub Actions ワークフローを流します。

```yaml:動作確認ワークフロー
runs-on: [self-hosted, corretto-cache]

steps:
  - uses: actions/setup-java@v4
    with:
      distribution: 'corretto'
      java-version: '17'

  - run: java --version      

  - uses: actions/setup-java@v4
    with:
      distribution: 'corretto'
      java-version: '21'

  - run: java --version     
```

比較できるようにキャッシュ済みの Corretto 21 とキャッシュされていない Corretto 17 を setup-java でインストールしてみます。

```
Run actions/setup-java@v4
  with:
    distribution: corretto
    java-version: 17
    java-package: jdk
    check-latest: false
    server-id: github
    server-username: GITHUB_ACTOR
    server-password: GITHUB_TOKEN
    overwrite-settings: true
    job-status: success
    token: ***
Installed distributions
  Trying to resolve the latest version from remote
Print information about available versions
  Retrieving available versions for Coretto took: 81.543ms
Resolved latest version as 17.0.12+7.1
Trying to download...
Downloading Java 17.0.12+7.1 (Corretto) from https://corretto.aws/downloads/resources/17.0.12.7.1/amazon-corretto-17.0.12.7.1-linux-x64.tar.gz ...
Extracting Java archive...
/usr/bin/tar xz -v --warning=no-unknown-keyword --overwrite -C /home/ssm-user/actions-runner/_work/_temp/64177bce-c48b-4f4c-ab43-bd39ebd4e66d -f /home/ssm-user/actions-runner/_work/_temp/be07c810-3657-4266-8a28-e8eb27f16050
<展開のログ>
Java 17.0.12+7.1 was downloaded
Setting Java 17.0.12+7.1 as the default
Creating toolchains.xml for JDK version 17 from corretto
Overwriting existing file /home/ssm-user/.m2/toolchains.xml
Java configuration:
  Distribution: corretto
  Version: 17.0.12+7.1
  Path: /home/ssm-user/actions-runner/_work/_tool/Java_Corretto_jdk/17.0.12-7.1/x64

Run java --version
openjdk 17.0.12 2024-07-16 LTS
OpenJDK Runtime Environment Corretto-17.0.12.7.1 (build 17.0.12+7-LTS)
OpenJDK 64-Bit Server VM Corretto-17.0.12.7.1 (build 17.0.12+7-LTS, mixed mode, sharing)
```

`Downloading Java 17.0.12+7.1 ...` がログに出たように、今回キャッシュしていない Corretto 17 はダウンロードが走りました。想定通りです。
ちなみにインストールには 15 秒ほどかかりました。

```
Run actions/setup-java@v4
  
Installed distributions
  Resolved Java 21.0.4+7.1 from tool-cache
  Setting Java 21.0.4+7.1 as the default
  Creating toolchains.xml for JDK version 21 from corretto
  Overwriting existing file /home/ssm-user/.m2/toolchains.xml
  Java configuration:
    Distribution: corretto
    Version: 21.0.4+7.1
    Path: /home/ssm-user/actions-runner/_work/_tool/Java_Corretto_jdk/21.0.4-7.1/x64
Creating settings.xml with server-id: github
Overwriting existing file /home/ssm-user/.m2/settings.xml

Run java --version

openjdk 21.0.4 2024-07-16 LTS
OpenJDK Runtime Environment Corretto-21.0.4.7.1 (build 21.0.4+7-LTS)
OpenJDK 64-Bit Server VM Corretto-21.0.4.7.1 (build 21.0.4+7-LTS, mixed mode, sharing)
```


`Resolved Java 21.0.4+7.1 from tool-cache` がログに出たように、キャッシュ済みの Corretto 21 はダウンロードが走りませんでした！！
ちなみにインストールには 1 秒もかかりませんでした！

やりましたね！

:::message
***お気づきいただけただろうか...***

> Print information about available versions
  Retrieving available versions for **Coretto** took: 81.543ms
Resolved latest version as 17.0.12+7.1


上記実行ログの Corretto 17 をダウンロードする部分で、実は `Coretto` と typo してるんですよね。これは僕が写経をミスったとかそういうのではなく、setup-java の問題です。
コントリビューションチャンスか！？と思いましたが、すでに修正されていました。-> [Fix typos on Corretto (#665) by johnshajiang · Pull Request #666 · actions/setup-java](https://github.com/actions/setup-java/pull/666)

2 週間前に修正されたようで、すでに main ブランチに入っていますがリリースはされていないようですね。そのうちリリースされるでしょう。

ちなみにこの typo は僕の記事を読んだ社内の方が発見してくれました。こんなの普通気づかないって 😇
:::

# やってみて

冒頭でも説明した通り、今回の内容は[以前発表したスライド](https://speakerdeck.com/defaultcf/seruhuhosutorannatointanetutotonojian-nozhuan-song-liang-woxue-jian-siteiruhua)における、Amazon Corretto のキャッシュについて詳しく説明したものでした。

実際に今回の方法を取ったのはもう 1 年ほど前になるのですが、我々の目論見通り、転送量上位から `corretto.aws` がいなくなり、転送料金削減につながりました。

![](/images/cache-corretto-on-self-hosted-gha/decrement-corretto.png)
*https://speakerdeck.com/defaultcf/seruhuhosutorannatointanetutotonojian-nozhuan-song-liang-woxue-jian-siteiruhua?slide=24*

今回は setup-java における Amazon Corretto をキャッシュしましたが、今回の知見をもとにその他の setup-* 系アクションの事前のキャッシュにも適用できると考えます。

とはいえ、発表スライドにもあるように、どの通信にお金がかかっているかを把握し、優先度をつけて対応することが大事です。まずは計測してみましょう。
もし今後 setup-node や setup-python などのアクションを使った際の転送量が上位に来てまあまあな額になっていたら今回の方法はまた使えそうですね。

:::message
なお、今回触れませんでしたが、setup-java をランナー経由ではなくローカルで動かすことでキャッシュする方法もあると思います。

当時の記憶はかすかで、記録にも残ってなかったのでなぜそれをやらなかったかはもはやわからないのですが、改めて今考えると、次の懸念はありそうだなと思います。

- ランナー内でのみ有効な GitHub Actions 独自の環境変数に依存している場合それらを全て再現する必要がある
- Node.js プロジェクトであることから多くの依存関係を持っており、upstream の依存関係の更新への追従が大変そう
- AMI 作成のたびに setup-java を動かすための環境構築が必要となる

これらの懸念と天秤にかけた時に依存を持たず数十行で書けるシェルスクリプトの方がメンテナンスコストが低いと判断したのではないかと考えます。

もちろん setup-java をそのまま使うメリットもあり、setup-java の内部仕様が変わった場合の追従が楽にできると思います。今回の setup-java を再現する方法だと、setup-java の仕様が変わっても我々はすぐに気づくことができないです。とはいえキャッシュが利用できなくてもセルフホストランナー環境の利用者に害はなく、定期的に転送量上位を計測することでもし仕様変更があっても気づけると考えます。

**でも実際やってみると案外簡単かもしれませんね。誰かぜひやってみてください！！！**
:::

# おわりに
今回は GitHub Actions の setup-java における Amazon Corretto のキャッシュを再現し、ランナーを起動する前にキャッシュすることでダウンロードをスキップする方法を紹介しました。
これにより、我々のセルフホストランナー環境における転送量、転送料金の削減が実現できました。

なかなか GitHub Actions、setup-java の表に出づらい知識が求められるため、当時はコードリーディングと試行錯誤に時間をかけていました。当時関わった人みんな大変だったと言ってた思い出です。

**これを読んでくれた皆さんも、GitHub Actions 関連のソースコードを読んでみて深淵に近づきましょう。**

さて、実はこの記事は [CYBOZU SUMMER BLOG FES '24](https://cybozu.github.io/summer-blog-fes-2024/) (生産性向上セイサンシャインビーチ Stage) DAY 6 の記事でした。明日は [@miyajan](https://zenn.dev/miyajan) さんの記事が飛び出ることでしょう。お楽しみに！
