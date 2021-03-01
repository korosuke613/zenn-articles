---
title: "published: trueを自動化することで Zenn への記事投稿フローを改善した話"
emoji: "💪"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["Zenn", "生産性向上"]
published: false
---

僕は Zenn の記事を GitHub で管理しています。今回、記事のメタデータを更新する GitHub Action を作ってデプロイフローを改善したのでそれを紹介します。

# TL;DR

- 対象
  - Zenn の記事を GitHub で管理している
  - 記事の公開前に Zenn 上で記事の確認をしている
- 内容
  - Zenn のメタデータを自動更新してプルリクを作ってくれる GitHub Action を作ったよ
  - 手動で `published: true` をする手間が省けるよ

# 背景

Zenn の記事は GitHub で管理できます。連携設定をしたのち、main ブランチ[^main]の `articles` 下にメタデータの埋め込まれた Markdown ファイルを置くことで Zenn にその記事がデプロイされます。記事を GitHub で管理したいと思っている自分にとってとてもありがたい機能です。

[^main]: mainブランチと書きましたが、任意のブランチを設定できます。

Zenn 記事のマークダウンでは以下のようなメタデータを設定する必要があります。

```markdown:hoge.md
---
title: "Productivity Weekly (20xx-xx-xx号)"
emoji: ""
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。
...
```

このメタデータには `published` というパラメータがあります。`published: false`にすることで記事を下書き状態にでき、逆に `published: true` にすることで記事を公開できます。

僕は `published: false` の状態で main ブランチに記事を加え、 Zenn 上で表示などを確認し、問題がなければ `published: true` の変更を加えて記事を公開するといった流れで記事を投稿しています。

詳しい記事投稿フローは以下の通りです。
1. 新しくブランチを作る
2. 記事を書く
3. 記事を push する
4. GitHub Actions による校正チェックを確認する
   1. pass -> 5. に進む
   2. failed -> 記事を修正し、3 に戻る
5. main ブランチにマージする
6. Zenn 上で以下を確認する
   - `topics`、`emoji` が正しく表示されているか
   - その他表示に問題がないか
7. 記事のメタデータを `published: true` 変更する
8. main ブランチにコミットする
9. 記事が公開される

この方法だと、記事の公開前に手動で `published: true` に変更して... コミットして...とする必要があり、**とてもめんどい**です（7. 8. の部分ですね）。

したがって、`published`パラメータを変更する部分を自動化しようと考えました。

# published: true のプルリクエストを作ってくれる Action を作りました
`published`パラメータ変更の自動化にあたって、`published: true`の変更が入ったプルリクエストを自動生成し、ボタンを押すだけで公開できるのが僕にとって一番楽だと考えました。

どうやってそれを実現するかを考え、GitHub Actions を使うことにしました。理由は GITHUB_TOKEN という環境変数を利用することで、プルリクエストを自動生成するために必要な権限を簡単にワークフローに付与できるからです[^github]。

また、他の人でも簡単に利用できるよう、専用の Action を作ることにしました。（正直 Action を作ったことがないので作ってみたいという理由もだいぶ大きかったです。）

[^github]: 他の CI だと Personal Access Token(PAT)を発行する必要があります。PAT はリポジトリ単位で権限を付与できないため、強い権限を持ってしまいます。対して GITHUB_TOKEN ならワークフローを実行してるリポジトリに対する書き込み権限しか持たないため、比較的安全です。

## 作った Action の使用例
実際に作った Action が以下のものです。TypeScript で実装しました。
https://github.com/korosuke613/zenn-metadata-updater-action

プルリクエストがマージされた時に `published: true`のプルリクエストを作成してほしいので、main ブランチへのプルリクエストが closed となった時にワークフローが動作するようにします。

```yaml:.github/workflows/example-published-true.yml
name: Create published=true pull request
on:
  pull_request:
    branches:
      - main
    types: [closed]

jobs:
  create-pr:
    runs-on: ubuntu-latest
    if: github.event.pull_request.merged == true
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 2 # Because if `fetch-depth >= 2` is not set, unchanged files will be updated.
      - uses: korosuke613/zenn-metadata-updater-action@v1
        with:
          published: true
          force-push: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

このワークフローを main ブランチに置いておくことで、マージされたプルリクエストに Zenn の記事が含まれている場合に[以下のようなプルリクエスト](https://github.com/korosuke613/zenn-metadata-updater-action/pull/21/files)を作成してくれるようになります。

![](https://storage.googleapis.com/zenn-user-upload/sncdi638wr5mqzscuhpcp24w1hd9)


これにより、先ほど挙げた記事投稿フローがちょっとだけ楽になりました。

1. 新しくブランチを作る
2. 記事を書く
3. 記事を push する
4. GitHub Actions による校正チェックを確認する
   1. pass -> 5. に進む
   2. failed -> 記事を修正し、3 に戻る
5. main ブランチにマージする
6. **記事のメタデータを `published: true` に変更するプルリクエストが作られる**
7. Zenn 上で以下を確認する
   - `topics`、`emoji` が正しく表示されているか
   - その他表示に問題がないか
8. **プルリクエストをマージする**
9. 記事が公開される

これでとうとう**ポチポチするだけで記事を公開できますね！**

## 実装
実装の話です。Action の作り方自体はググればたくさん出てくるので省略します。

今回作ったアクションでは大まかに次のことを行います。

1. 変更された Markdown のファイルパス一覧を取得する
2. 抽出した Markdown ごとにメタデータを更新する
3. 更新した Markdown ごとにプルリクエスト作成をする

:::message alert
この記事に直接書いてあるコードは記事用に修正したコードです。そのため例外処理などは省いています。しっかりとしたテストなどを行っていないため、もしかしたら動かないコードがあるかもしれません。
:::

### 1. 変更された Markdown のファイルパス一覧を取得する

#### 変更されたファイルのファイルパス一覧を取得する
まずは変更されたファイルのファイルパス一覧を取得します。git のコミットログを利用することにしました。

以下のコマンドを叩くことで、指定したコミットで変更されたファイルのファイルパス一覧を取得できます。また、`<コミットのハッシュ値>`を省略するか `.` を指定すると最新のコミットが対象になります。

```sh
❯ git log -m -1 --name-only --pretty=format: <コミットのハッシュ値>
.textlintrc
articles/create-zenn-metadata-updater-action.md
README.md
```

マージコミットのハッシュ値を指定することで、任意のプルリクエストで変更されたファイルのファイルパス一覧を取得できるということになります。

以下のようなコードで実現できます。

```ts
import { exec } from "@actions/exec";

async function getChangedFiles(githubSha: string): Promise<string[]> {
  let changedFiles: string[] = [];
  const options = {
    listeners: {
      stdout: (data: Buffer) => {
        changedFiles = data.toString().split("\n");
      },
      stderr: (data: Buffer) => {
        throw new Error(data.toString());
      },
    },
  };
  await exec(
    "git",
    ["log", "-m", "-1", "--name-only", "--pretty=format:", githubSha],
    options
  );
  return changedFiles.filter((path) => path !== ""); // 最後の改行が空文字で含まれてしまうため、それを除去する
}
```

:::message
[@actions/exec](https://github.com/actions/toolkit/tree/master/packages/exec) は node から任意の CLI コマンドを実行したい時に使える便利パッケージです。`listeners`を設定することで標準出力や標準エラー出力を取得できます。
:::

#### Markdown のみ抽出する
取得したファイル一覧を取得したら、Markdown だけを抽出します。
以下のようなコードで実現できます。
```ts
function getMarkdowns(changedFiles: string[]): string[] {
  return changedFiles.filter((filePath) => filePath.endsWith(".md"));
}
```

### 2. 抽出した Markdown ごとにメタデータを更新する
`1.` で抽出した Markdown ごとに以下の流れでメタデータを更新します。

1. Markdown のメタデータを取得
2. Zenn の記事であるかどうかを確認
3. （Zenn の記事であれば）メタデータを更新

一連の処理は[こちら](https://github.com/korosuke613/zenn-metadata-updater/blob/ee7229adb429beab300bb73c877229fce3cb5a51/src/Updater.ts)で行っています。

#### Markdown のメタデータを取得
前述したように、Zenn の記事は Markdown の先頭に以下のようなメタデータを持っています。

```md
---
title: "Productivity Weekly (20xx-xx-xx号)"
emoji: ""
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---
```

[Markdown のメタデータ記法はいくつかある](https://stackoverflow.com/questions/44215896/markdown-metadata-format)ようですが、Zenn の記事では [YAML Front Matter](https://jekyllrb.com/docs/front-matter/) と言う記法でメタデータを設定します[^metadata]。

[yaml-front-matter](https://www.npmjs.com/package/yaml-front-matter) と言う npm パッケージを利用することで Markdown 中の YAML Front Matter を object で取得できます。

[^metadata]: もしかしたら他の記法も使えるかもしれませんが試してないのでわかりません。

以下のようなコードで実現できます。
```ts
import { readFileSync } from "fs";
import { loadFront } from "yaml-front-matter";

function getMetadata(markdownPath: string): ReturnType<typeof loadFront>{
  const markdown = readFileSync(markdownPath);
  return loadFront(markdown);
}
```

#### Zenn の記事であるかどうかを確認
取得したメタデータが `title` 、`emoji`、`type`、`topics`、`published`のパラメータを持つ場合は Zenn の記事だと判断し、メタデータの更新します。しかし、どれか 1 つでもパラメータを持ってない場合はその他の Markdown だと判断し、メタデータの更新は行いません。

以下のようなコードで実現できます。
```ts
function isZennArticleMetadata(metadata: ReturnType<typeof loadFront>): boolean {
  if (
    metadata.title === undefined ||
    metadata.emoji === undefined ||
    metadata.type === undefined ||
    metadata.topics === undefined ||
    metadata.published === undefined
  ) {
    return false;
  }

  return true;
}
```

#### メタデータを更新してファイル保存
メタデータを object で取得し、`published: true`にして、YAML Front Matter 形式の文字列に変換します。
元のファイルのメタデータ部分を変換した文字列で置き換えてファイルを保存します。

以下のようなコードで実現できます。
```ts
import { readFileSync, writeFileSync } from "fs";
import { loadFront } from "yaml-front-matter";
import { dump } from "js-yaml";

function saveUpdatedZennArticle(markdownPath: string, updateKey: string, updateValue: string){
  const markdown = readFileSync(markdownPath);
  const metadata = loadFront(markdown);
  metadata[updateKey] = updateValue;
  delete metadata.__content; // loadFront() が返す object に含まれる __content を削除する

  const metadataByYaml = dump(metadata) // metadata の object を YAML 形式の string にする
  const regex = /(---)[\S\s\w\W]*?(---)/;
  const replacedMarkdown = markdown.replace(   
    // 元の Markdown の `---` で囲まれた YAML を更新したメタデータで置き換える
    regex,
    `$1\n${metadataByYaml}$2`
  ); 

  writeFileSync(markdownPath, replacedMarkdown); // ファイルを上書き保存
}
```


### 3. 更新した Markdown ごとにプルリクエスト作成をする
`2.`で Markdown を更新したので、ブランチ作成、コミット、push、プルリクエスト作成を行います。

以下のような流れで行います。

1. ブランチ作成、コミット、push
2. プルリクエスト作成

#### ブランチ作成、コミット、push
ブランチの作成、コミット、push を行います。

ブランチ名は `zenn-metadata-updater/<ファイルパス>` という風にしました。また、`git commit`時に `user.name`と `user.email` が設定されている必要があるので、`-c`オプションを使ってこの処理の中でだけ bot の名前と email を設定しています。

以下のようなコードで実現できます。

```ts
import { exec } from "@actions/exec";
import { debug } from "@actions/core";

async function execByThrowError(commandLine: string, args?: string[]) {
  let result = "";

  const options = {
    listeners: {
      stdout: (data: Buffer) => {
        result += data.toString();
      },
      stderr: (data: Buffer) => {
        // git はコマンドが成功してもログに標準エラー出力を使うので、ここで throw はしない
        result += data.toString(); 
      },
    },
  };
  
  const exitCode = await exec(commandLine, args, options);
  debug(result);
  if (exitCode !== 0) {
    throw new Error(result);
  }
}

async function pushChange(
  filePath: string,
  originalBranchSha: string,
  isForcePush: boolean
) {
  const branchName = `zenn-metadata-updater/${filePath}`;

  let forceFlag: "" | "-f" = "";
  if (isForcePush) {
    forceFlag = "-f";
  }

  await execByThrowError("git", ["switch", "-c", branchName]);
  await execByThrowError("git", ["add", filePath]);
  await execByThrowError("git", [
    "-c",
    "user.email='41898282+github-actions[bot]@users.noreply.github.com'",
    "-c",
    "user.name='github-actions[bot]'",
    "commit",
    "-m",
    `chore: update metadata ${filePath} by zenn-metadata-updater`,
  ]);
  await execByThrowError("git", ["push", forceFlag, "origin", branchName]);
  await execByThrowError("git", ["checkout", originalBranchSha]);

  return branchName;
}
```

:::message
`user.email='41898282+github-actions[bot]@users.noreply.github.com'` を設定すると GitHub 上で bot ユーザが行ったコミットのように表示されます。([参考](https://github.community/t/github-actions-bot-email-address/17204/6))
:::

#### プルリクエスト作成
先ほど push したブランチのプルリクエストを作成します。[@actions/github](https://github.com/actions/toolkit/tree/main/packages/github) パッケージを利用することで、簡単に認証済みの GitHub API クライアントを使うことができます。

プルリクエストの作成には write 権限を付与したトークンが必要なので、ワークフローから Action を呼び出す際に `${{ GITHUB_TOKEN }}`を渡してもらう必要があります[^github-token]。ワークフローから渡されるパラメータの取得には [@actions/core](https://github.com/actions/toolkit/tree/main/packages/core) パッケージの `getInput()` を利用します。

[^github-token]: `action.yml`でパラメータを設定します。その方法は割愛します。実際の設定は[こちら](https://github.com/korosuke613/zenn-metadata-updater-action/blob/0177065873cb4acb1434f21b720fdadba13efbdb/action.yml)を参照してください。

以下のようなコードで実現できます。

```ts
import { getInput, info } from "@actions/core";
import { context, getOctokit } from "@actions/github";

export async function createPullRequest(
  filePath: string,
) {
  const githubToken = getInput("github-token"); // ユーザから渡される GITHUB_TOKEN を取得する
  const octokit = getOctokit(githubToken);
  const workflowBranch = process.env.GITHUB_HEAD_REF
  const branchName = `zenn-metadata-updater/${filePath}`;

  try {
    await octokit.pulls.create({
      ...context.repo,
      title: `chore: update metadata ${filePath} by zenn-metadata-updater`,
      head: branchName,
      base: workflowBranch,
    });
  } catch (e) {
    const errorMessage: string = e.errors[0].message;
    if (
      errorMessage.startsWith !== undefined &&
      errorMessage.startsWith("A pull request already exists for")
    ) {
      // プルリクエストがすでに存在していればプルリクエストの作成は行わない。
      info(`skip because ${errorMessage}`);
      return;
    }
    throw e;
  }
}
```


## つまづきポイント

### 思ったより Action の作成に時間がかかった
Action を初めて作ったのでノウハウがなかったり、変更されたファイル一覧を取得する方法を模索するところから始まったりと、色々な場面でつまづきました。その結果 `publish: true` にするだけの Action の作成にえらい時間がかかってしまいました。もっと早く終わるだろうとたかを括っていました。

「自動化をすることで節約できるリソース」と「開発、保守、運用にかかるコスト」を天秤にかけた時、「開発、保守、運用にかかるコスト」の方が重い場合は基本的に自動化しない方がいいという考えを僕は持っています。

**果たして今回、「自動化をすることで節約できるリソース」>「開発、保守、運用にかかるコスト」となったかどうかは正直怪しいです**。

でもまあ**作りたいから作ったわけだし、色々と勉強になったので良いんです**。

### git の仕様に苦しめられた
git の仕様に大変苦しめられました。

#### 標準エラー出力の件
git のコマンドを叩くために `@actios/exec` パッケージの `exec()` を使いました。`exec()`では標準出力、標準エラー出力をキャプチャできます。標準エラー出力が吐かれたら内容を throw するように設定していました。

`git switch -c hoge` でプログラムが終了してしまったため、エラー内容を見たところ、`Switched to a new branch 'hoge'`というメッセージがエラーとなっていました。この文章は正しくブランチを作れた時にでるメッセージなのでもちろんエラーではありません。

最初はエラーメッセージをよく読まずにブランチの作成に失敗したもんだと思ってしまったため、色々と迷走してしまいました。途中で問題ない出力がエラーとなっていることに気づき調べたところ、以下の記事を見つけました。うーん。

> git pushなどの出力は標準エラー(stderr)であることを最近知りました。（中略）端的に言うと、「プログラムの実行結果の出力ではなく、実行の過程での出力だから」といった感じかと思います。
https://www.imokuri123.com/blog/2016/01/git-push-output-is-stderr/

どうやら git は実行結果の出力でない場合は標準エラー出力にログを吐くようです。~~エラーじゃないじゃんと思ったのですが、~~ しょうがないのでしっかりと ExitCode を見てエラーかどうかを判断するようにしました。（`exec()`の返り値が ExitCode となります。）

git の仕様で混乱したのはありましたが、**コマンドが失敗したかどうかを判断する際はしっかりと ExitCode をみないといけないな**という勉強にもなりました。

#### コミットログがまとめられてると変更したファイル一覧を取得できない件
「[変更されたファイルのファイルパス一覧を取得する](#変更されたファイルのファイルパス一覧を取得する)」ではコミットログを利用することでそのコミットにおいて変更されたファイル一覧を取得できることを書きました。

ただ、これはコミットログひとつしかない場合は機能しません。例えば、`git clone --depth=1 hoge/hoge`という風に clone すると、変更されたファイル一覧を取得するのではなく、git で管理している全てのファイルを取得することになります。

git の実装はさっぱり知らないのですが、**おそらく指定したコミットが持つ tree オブジェクトとその親コミット(parent)が持つ tree オブジェクトを比較して、変更されたファイル一覧を計算しているのではないでしょうか。**(commit オブジェクト自体はどのファイルが変更されたなんて情報を持ってないので)

実際に親コミットの tree と子コミットの tree を比較すると、以下のような流れで変更されたファイル(blob オブジェクト)を取得できます。

:::details 長いから省略！
```sh:子コミット(HEAD)のtreeを確認
❯ git cat-file -p HEAD
tree 6d4904fcfd9cb7c885dea6f603409b4cb019b4ab
...
```

```sh:親コミット(HEAD^)のtreeを確認
❯ git cat-file -p HEAD^
tree 42e8c5f669dc5a2fe0716f25023d0fb02e87ef5b
...
```

```sh:それぞれのtreeを比較
❯ diff <(git cat-file -p 6d49) <(git cat-file -p 42e8)
17c17
< 040000 tree 4ac8dda34811bdf1ccb8c6ac84881522ef415220	src
---
> 040000 tree 5b238d0c5deea25cafc85734f4a6476c0a394f28	src
```

```sh:差異のあったtreeをさらに比較
❯ diff <(git cat-file -p 4ac8) <(git cat-file -p 5b23)
2c2
< 100644 blob e9209bd61b37f1a143a6d8134773f2e4b69133e5	functions.ts
---
> 100644 blob 019a914d3a2bed0808efbc24e6a882eb8d037bbb	functions.ts
```

この例では functions.ts が最新のコミットで変更されたファイルであることがわかります。
:::

したがって、変更されたファイルを知りたい場合は、そのコミットログの親コミットが必要なのだと考えます。

`depth=1`で clone しなければいいじゃんという話なのですが、僕が作ったのは GitHub Actions 上で動くことを想定しているので、[actions/checkout](https://github.com/actions/checkout)を無視できません[^checkout]。actions/checkout はデフォルトだと `depth=1` でリポジトリを clone するため、zenn-metadata-updater-action を使う場合は `depth=2` 以上で clone してもらわないといけません。

そのため、[.github/workflows/example-published-true.yml](#作った-Action-の使用例)では `fetch-depth: 2` の設定を入れるように書きました。どうしようか悩んだ挙句の苦肉の策でした。

[^checkout]: GitHub Actions を使うほとんどの人は actions/checkout を使って clone しているのではないでしょうか？

### TypeScript をコンパイルし忘れてコードの変更が反映されてないことに気づきづらい
GitHub Action を node で動かす場合、JavaScript のコードをコミットする必要があります。そのため、TypeScript でコードを書いた場合、コンパイルしてからコミットする必要があります[^ts]。

単純な話ですが、コンパイルし忘れたため、ts のコードを修正してコミット & push しても GitHub Actions 上で結果が変わらないなんてことがとてもたくさん起きました。色々調べた挙句コンパイルし忘れた〜となるため、作っていてとても大変でした。

結局、防止策はいくつかあった[^tsc]のですが、間違いなく気づけるように[以下のような jobs](https://github.com/korosuke613/zenn-metadata-updater-action/blob/b72df966ffd0baf330c77fb40c9aa861eefc1447/.github/workflows/test.yml#L6) を CI で走らせるようにしました。

```yml:.github/workflows/test.yml
  build-package: 
    runs-on: ubuntu-latest
    steps:
      （中略）
      - run: npm run build-package # 実際にビルドするコマンド
      - name: Check that the build file has been committed.
        run: | # git statusして変更されたファイルがあれば失敗させる
          if [ -z "$(git status --porcelain)" ]; then
            echo "OK, workspace is clean"
          else
            echo "Failed, workspace is not clean"
            exit 1
          fi
```

これでコンパイルせずに push してもすぐに気づけるようになりました。

[^tsc]: watchオプション的なやつで常にコンパイルするなど。
[^ts]: ちなみに今回僕は Action を作るための土台の用意に[actions/typescript-action](https://github.com/actions/typescript-action)というテンプレートリポジトリを使いました。そこらへんの面倒な設定が最初から用意されているため TypeScript で Action を作る際にとても便利です。

# おわりに
初めての GitHub Action 作成だったのですが、色々と勉強になってよかったです。

僕は毎週、[Productivity Weekly](https://zenn.dev/topics/productivityweekly) という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」のまとめ的なやつを Zenn に投稿しています。今回のアクションで投稿フローが改善され、間違いなく楽になります。**生産性アゲアゲ** 💪 💪 です。

そんな僕が所属するサイボウズ生産性向上チームは、今回の記事のような（社内エンジニアの）**開発者の生産性を向上させるためのお仕事**をしています。気になった方は以下の記事をご覧ください！！！！！！

https://blog.cybozu.io/entry/2020/08/31/080000