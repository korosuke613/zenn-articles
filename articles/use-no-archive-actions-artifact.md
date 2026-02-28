---
title: "GitHub Actions のアーティファクトが zip 不要に。移行時の落とし穴と対処法"
emoji: "📦"
type: tech
topics:
  - GitHubActions
  - GitHub
published: false
publication_name: cybozu_ept
---

こんにちは。サイボウズ株式会社、[生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場（[@korosuke613](https://korosuke613.dev)）です。

GitHub Actions の `actions/upload-artifact` で、zip 化せずにアーティファクトをアップロードできるようになりました。便利な新機能ですが、移行時にハマりやすいポイントがあったので共有します。

https://github.blog/changelog/2026-02-26-github-actions-now-supports-uploading-and-downloading-non-zipped-artifacts/

# TL;DR

- `actions/upload-artifact@v7` で `archive: false` を指定すると zip 化せずにアップロードでき、ブラウザで直接閲覧も可能になった
- ただし `name` パラメータが無視されファイル名がアーティファクト名になるため、`download-artifact` 側の `name` も合わせる必要がある
- `archive: false` は単一ファイルのみ対応。デフォルトは従来通り zip 圧縮なので後方互換性あり

# 何が変わったか

従来、GitHub Actions のアーティファクトはアップロード時に必ず zip 圧縮されていました。そのため、ブラウザからダウンロードすると zip を展開する手間があり、JSON 1 つ取得するだけでも解凍が必要でした。

今回の変更で、`actions/upload-artifact@v7` に `archive: false` を指定すると、ファイルをそのままアップロードできるようになりました。さらに、非圧縮でアップロードした HTML、画像、JSON、Markdown はブラウザ内で直接閲覧できます。

なお、`archive` パラメータのデフォルトは `true`（従来通り zip 圧縮）なので、後方互換性は維持されています。既存のワークフローは `v7` / `v8` にバージョンを上げるだけでそのまま動きます。

# 移行判断

`archive: false` を使うには前提条件があります。また、条件を満たしていても恩恵の大小があります。

**前提条件（必須）:**
- `path` に指定するファイルが **1 つだけ**であること

次のようなケースでは使えません。

```yaml
# ❌ 複数ファイル
path: |
  file1.json
  file2.json

# ❌ ディレクトリ
path: dist/

# ❌ ワイルドカード（複数マッチの可能性）
path: output/*.json
```

**恩恵が大きいケース:**
- ブラウザで直接閲覧したいファイル（HTML、画像、JSON、Markdown など）
- 既に圧縮済みのファイル（jar、tar.gz 等）を二重圧縮したくない
- ダウンロード後に zip を解凍する手間を省きたい

**恩恵が薄いケース:**
- 別ジョブからプログラム的にダウンロードするだけで、ブラウザ閲覧も解凍の手間も気にならない
- 大きなテキストファイルなど zip 圧縮でサイズが大幅に減る恩恵がある

**`archive: false` を使わない場合でも**、バージョンだけ `upload-artifact@v7` / `download-artifact@v8` に更新するのがおすすめです。

# 設定方法

まとめると次の通りです。

- `actions/upload-artifact@v7` 以上を使う
  - `archive: false` を付与
  - `name` パラメータは無視されるようになるので削除するのが推奨
- `actions/download-artifact@v8` 以上を使う
  - `name` パラメータを upload-artifact でアップロードするファイル名（拡張子あり）に変える

具体的な変更前後の例です。

```yaml
# 変更前
- uses: actions/upload-artifact@v4
  with:
    name: my-artifact
    path: /tmp/summary.json

- uses: actions/download-artifact@v4
  with:
    name: my-artifact
```

```yaml
# 変更後
- uses: actions/upload-artifact@v7
  with:
    path: /tmp/summary.json
    archive: false

- uses: actions/download-artifact@v8
  with:
    name: summary.json  # ファイル名（拡張子含む）を指定
    path: /tmp/
```

## ハマりどころ - `name` パラメータの挙動変化

ここが一番の落とし穴です。

`archive: false` を設定すると、**`name` パラメータが無視されます**。代わりに、アップロードしたファイルの実際のファイル名（拡張子含む）がアーティファクト名になります。

つまり、`name: my-artifact` と指定しても、`path: /tmp/summary.json` をアップロードした場合、アーティファクト名は `summary.json` になります。

この仕様は Changelog には記載されていませんが、[upload-artifact の Releases](https://github.com/actions/upload-artifact/releases) にはしっかり書いてあります。~~ちゃんと読んでから対応しろという話ですね。~~

> Adds support for uploading single files directly (unzipped). Callers can set the new archive parameter to false to skip zipping the file during upload. Right now, we only support single files. The action will fail if the glob passed resolves to multiple files. **The name parameter is also ignored with this setting. Instead, the name of the artifact will be the name of the uploaded file.**

そのため、`download-artifact` 側の `name` もファイル名（拡張子含む）に合わせる必要があります。雑に `archive: false` を足すだけだと後続の `download-artifact` が失敗します。

アーティファクト名を制御したい場合は、アップロード前に `mv` でファイルをリネームするのが確実です。

```yaml
- name: Rename file
  run: mv /tmp/summary.json /tmp/my-artifact.json

- uses: actions/upload-artifact@v7
  with:
    path: /tmp/my-artifact.json
    archive: false
```

# 実際に試してみた

アーティファクト一覧はこんな感じになります。

![アーティファクト一覧](/images/use-no-archive-actions-artifact/artifacts.png)
*`changelog-data` は従来の zip。`summary-github.json` が非圧縮アーティファクト*

非圧縮アーティファクトをクリックすると、ダウンロードではなくブラウザで直接閲覧できます。JSON や HTML、画像、Markdown が対象です。

![JSON をブラウザで直接閲覧](/images/use-no-archive-actions-artifact/json-preview.png)
*JSON がブラウザ内でそのまま表示される。実際便利*

# おまけ：AI に移行プロンプトを作らせた

複数リポジトリに横展開するために、AI（Claude）に移行判断と改修を任せるプロンプトを作りました。対応要否の判断から改修まで一気通貫で頼めます。

````markdown
# GitHub Actions 非圧縮アーティファクト対応の検討と改修依頼

## 背景

GitHub Actionsで非圧縮アーティファクトのアップロード・ダウンロードがサポートされました。
- `actions/upload-artifact` v7以上で `archive: false` を設定可能
- `actions/download-artifact` v8以上が対応

## タスク

このリポジトリの `.github/workflows/` ディレクトリ内のワークフローファイルを調査し、
非圧縮アーティファクト対応が有効かつ効果的かを評価してください。

### Step 1: 対応要否チェック

次を確認し、**対応すべきかどうかを判断してください**:

1. **アーティファクトの使用有無**
   - `actions/upload-artifact` を使用しているワークフローが存在するか？
   - 存在しない場合は「対応不要」と報告して終了

2. **`archive: false` が使用可能かの確認**（アーティファクトが存在する場合）

> **重要**: `archive: false` は次の条件を**すべて満たす場合のみ**使用できます

- [ ] `path` に指定するファイルが **1つのみ** か？
  → 複数ファイル・ディレクトリ・ワイルドカード（複数マッチの可能性あり）は **使用不可**
- [ ] `path` にワイルドカードが含まれる場合、マッチするファイルが **常に1つのみ** と保証できるか？
  → 保証できない場合は **使用不可**

上記を満たさない場合は「対応不要（制約あり）」として扱いますが、**バージョンのみ更新します**（後述のStep 3参照）。

3. **効果があるかの評価**（上記制約を満たす場合のみ）
   - [ ] アップロードするファイルが **すでに圧縮済み**（zip, tar.gz, jar等）か？→ 非圧縮の恩恵が高い
   - [ ] アーティファクトをブラウザで **直接閲覧したい** ファイルか（HTML, 画像, Markdown等）？→ 非圧縮の恩恵が高い
   - [ ] ダウンロード後に **解凍作業が不要になる** ことが嬉しいか？→ 非圧縮の恩恵がある
   - [ ] アーティファクトは別ジョブで **プログラムからダウンロード** するだけか？→ 恩恵は低いかもしれない

4. **判定**
   次のいずれかを出力してください:
   - ❌ **対応不要（制約あり）**: 複数ファイルをアップロードしている、またはワイルドカードで複数ファイルがマッチする可能性があり `archive: false` が使用不可（バージョン更新のみ実施）
   - ✅ **対応推奨**: 1ファイルのみ、かつ〇〇の理由で非圧縮化による効果が見込める
   - ⚠️ **対応任意**: 1ファイルのみだが効果は限定的
   - ❌ **対応不要**: アーティファクトを使用していない、または非圧縮化の恩恵がない

### Step 2: 改修（Step 1で「対応推奨」または「対応任意」の場合のみ）

次の変更を行ってください:

#### actions/upload-artifact の更新（`archive: false` 対象）

yaml
# 変更前
- name: Upload summary
  uses: actions/upload-artifact@v4  # または v3, v5, v6
  with:
    name: my-artifact
    path: /tmp/summaries/github.json  # 1ファイルのみ

# 変更後（v7以上にアップグレード + archive: false を追加）
- name: Rename file to match artifact name  # ← ファイルをリネームするステップを追加
  run: mv /tmp/summaries/github.json /tmp/summaries/my-artifact.json

- name: Upload summary
  uses: actions/upload-artifact@v7
  with: # 非アーカイブ時は name パラメータが無視されるので書かないようにする
    path: /tmp/summaries/my-artifact.json  # ← リネーム後のパスを指定
    archive: false


#### actions/download-artifact の更新（`archive: false` 対象）
`archive: false` でアップロードしたアーティファクトをダウンロードするには v8 以上が必要です。

yaml
# 変更前
- uses: actions/download-artifact@v4  # または v3

# 変更後（v8以上にアップグレード）
# download-artifact も拡張子を含むファイル名に合わせる
- uses: actions/download-artifact@v8
  with:
    name: my-artifact.json  # ← upload 時の name（拡張子含む）と一致させる
    path: /tmp/summaries/


> **⚠️ 重要な注意点**: `archive: false` を設定すると、アーティファクトの識別子は `name:` パラメーターの値ではなく、**アップロードしたファイルの実際のファイル名（拡張子を含む）** になります。
>
> 例: `name: summary-github`、`path: /tmp/summaries/summary-github.json` に `archive: false` を設定すると、アーティファクト識別子は `summary-github.json` になります（`summary-github` ではない）。
>
> **対処法**:
> 1. アップロード前に `mv` でファイルをリネーム
> 2. `name:` パラメーターに**拡張子を含む**ファイル名を指定（例: `my-artifact.json`）
> 3. ダウンロード側の `name:` も同じ値（拡張子含む）に合わせる


### Step 3: バージョンのみ更新（`archive: false` 対象外のアーティファクト）

`archive: false` が使用できない場合（複数ファイル・ディレクトリ等）でも、
セキュリティ修正・機能改善のため **全ての** `upload-artifact` と `download-artifact` のバージョンを更新してください。

yaml
# upload-artifact: v7以上に更新（archive: false は付けない）
- uses: actions/upload-artifact@v7
  with:
    name: my-multi-file-artifact
    path: |
      data/file1.json
      data/file2.json
    # archive: false は付けない（複数ファイルのため）

# download-artifact: v8以上に更新
- uses: actions/download-artifact@v8
  with:
    name: my-multi-file-artifact
    path: data/


### Step 4: 変更サマリーの出力

変更した場合は次を報告してください:
- 変更したファイル一覧
- 変更前後のバージョン（`archive: false` 対象・非対象を区別して記載）
- `archive: false` を適用した箇所と適用しなかった箇所の理由

変更しない場合も理由を明記してください。
````

実際にこのプロンプトで移行した PR がこちらです。

https://github.com/korosuke613/mynewshq/pull/233

試行錯誤の過程は [Discussion](https://github.com/korosuke613/mynewshq/discussions/219#discussioncomment-15954107) に残しています。
