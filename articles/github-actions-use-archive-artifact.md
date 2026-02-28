---
title: GitHub Actionsのアーティファクトがzip化不要に。既存ジョブ移行のポイントとハマりどころ
emoji: 📦
type: tech
topics:
  - GitHubActions
  - GitHub
published: true
published_at: 2026-03-02 10:00
---

こんにちは。[@korosuke613](https://korosuke613.dev) です。

2026/02/26、GitHub Actions の `actions/upload-artifact` で、zip 化せずにアーティファクトをアップロードできるようになりました。

https://github.blog/changelog/2026-02-26-github-actions-now-supports-uploading-and-downloading-non-zipped-artifacts/

さっそく既存ジョブ対応しようとしたところ、一筋縄でいかないパターンがあったので、移行のポイントとハマりどころをまとめました。また、おまけとして複数リポジトリに横展開するための AI プロンプトも末尾に載せています。

# TL;DR

- `actions/upload-artifact@v7` で `archive: false` を指定すると zip 化せずにアップロードでき、ブラウザで直接閲覧も可能になった
- ただし `name` パラメータが無視されファイル名がアーティファクト名になるため、`download-artifact` 側の `name` も合わせる必要がある[^name-note]
- `archive: false` は単一ファイルのみ対応。デフォルトは従来通り zip 圧縮なので後方互換性あり

[^name-note]: `download-artifact` で `name` を指定せず全件ダウンロードする運用の場合は影響ありません。

# 何が変わったか

従来、GitHub Actions のアーティファクトはアップロード時に必ず zip 圧縮されていました。そのため、ブラウザからダウンロードすると zip を展開する手間があり、JSON 1 つ取得するだけでも解凍が必要でした。

今回の変更で、`actions/upload-artifact@v7` に `archive: false` を指定すると、ファイルをそのままアップロードできるようになりました。さらに、非圧縮でアップロードした HTML、画像、JSON、Markdown はブラウザ内で直接閲覧できます。

なお、`archive` パラメータのデフォルトは `true`（従来通り zip 圧縮）なので、後方互換性は維持されています[^compat]。既存のワークフローは `v7` / `v8` にバージョンを上げるだけでそのまま動きます。

[^compat]: [upload-artifact v7.0.0](https://github.com/actions/upload-artifact/releases/tag/v7.0.0)、[download-artifact v8.0.0](https://github.com/actions/download-artifact/releases/tag/v8.0.0) のリリースノート参照。`archive` パラメータは明示的なオプトインが必要な設計です。

# 移行判断

`archive: false` を使うには前提条件があります。また、条件を満たしていても恩恵の大小があります。恩恵が薄い場合は対応しなくても良いでしょう。

**必須条件:**
- `path` に指定するファイルが **1 つだけ**であること[^failed_msg]

次のようなケースでは使えません。

```yaml
# ❌ 複数ファイル
path: |
  file1.json
  file2.json

# ❌ ディレクトリ
path: dist/

# ❌ ワイルドカード（複数マッチの可能性があるため）
path: output/*.json
```

[^failed_msg]: `archive: false` を指定して複数ファイルをアップロードしようとすると、次のようなエラーが出ます。> When 'archive' is set to false, only a single file can be uploaded. Found 3 files to upload.

**恩恵が大きいケース:**
- ブラウザで直接閲覧したいファイル（HTML、画像、JSON、Markdown など）
- 既に圧縮済みのファイル（jar、tar.gz 等）を二重圧縮したくない
- ダウンロード後に zip を解凍する手間を省きたい

**恩恵が薄いケース:**
- 別ジョブからプログラム的にダウンロードするだけで、ブラウザ閲覧も解凍の手間も気にならない
- 大きなテキストファイルなど zip 圧縮でサイズが大幅に減る恩恵がある

# 設定方法

まとめると次の通りです。

- `actions/upload-artifact@v7` 以上を使う
  - `archive: false` を付与
  - `name` パラメータは無視されるようになるので混乱を生まないように削除するのを推奨
- `actions/download-artifact@v8` 以上を使う
  - `name` パラメータを upload-artifact でアップロードするファイル名（拡張子あり）に合わせる

具体的な変更前後の例です。

```yaml
# 変更前
- uses: actions/upload-artifact@v4
  with:
    name: my-artifact
    path: /tmp/summary.json

（中略）

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

（中略）

- uses: actions/download-artifact@v8
  with:
    name: summary.json  # ファイル名（拡張子含む）を指定
    path: /tmp/
```

## ハマりどころ - `name` パラメータの挙動変化

ここが一番の落とし穴です。

`archive: false` を設定すると、**`name` パラメータが無視されます**。代わりに、アップロードしたファイルの実際のファイル名（拡張子含む）がアーティファクト名になります。

つまり、`name: my-artifact` と指定しても、`path: /tmp/summary.json` をアップロードした場合、アーティファクト名は `summary.json` になります。

この仕様は Changelog には記載されていませんが、[upload-artifact の Releases](https://github.com/actions/upload-artifact/releases/tag/v7.0.0) にはしっかり書いてあります。~~ちゃんと読んでから対応しろという話ですね。~~

> Adds support for uploading single files directly (unzipped). Callers can set the new archive parameter to false to skip zipping the file during upload. Right now, we only support single files. The action will fail if the glob passed resolves to multiple files. **The name parameter is also ignored with this setting. Instead, the name of the artifact will be the name of the uploaded file.**

そのため、`download-artifact` 側の `name` もファイル名（拡張子含む）に合わせる必要があります。雑に `archive: false` を足すだけだと後続の `download-artifact` が失敗します。

気をつけましょう（適当に対応してやらかした目）。
また、環境変数でファイル名を一元管理することで upload と download で名前がずれる事故を防ぐのも良いでしょう。

```yaml
env:
  ARTIFACT_NAME: my-artifact.json

jobs:
  build:
    steps:
      ...

      - name: Rename file to artifact name
        run: mv /tmp/summary.json /tmp/${{ env.ARTIFACT_NAME }}

      - uses: actions/upload-artifact@v7
        with:
          path: /tmp/${{ env.ARTIFACT_NAME }}
          archive: false

  deploy:
    needs: build
    steps:
      - uses: actions/download-artifact@v8
        with:
          name: ${{ env.ARTIFACT_NAME }}
          path: /tmp/
      
      ...
```

# 実際に試してみた

実際に `archive: false` を設定した場合のアーティファクト一覧はこんな感じになります。

![アーティファクト一覧](/images/use-no-archive-actions-artifact/artifacts.png)
*`changelog-data` は従来の zip。`summary-github.json` が非圧縮アーティファクト*

非圧縮アーティファクトをクリックすると、ダウンロードではなくブラウザで直接閲覧できます。JSON や HTML、画像、Markdown が対象です。

![JSON をブラウザで直接閲覧](/images/use-no-archive-actions-artifact/json-preview.png)
*JSON がブラウザ内でそのまま表示される。実際便利*

# おまけ：AI に移行プロンプトを作らせた

複数リポジトリに横展開するために、AI（Claude）に移行判断と改修を任せるプロンプトを作りました。対応要否の判断から改修まで一気通貫で頼めます。自己責任で使うか、参考にしてみてください。

:::details 作らせた移行プロンプト

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

```yaml
# 変更前
- name: Upload summary
  uses: actions/upload-artifact@v6
  with:
    name: my-artifact
    path: /tmp/summaries/github.json  # 1ファイルのみ

# 変更後（v7以上にアップグレード + archive: false を追加）
# 環境変数でアーティファクト名を一元管理し、upload/download の不一致を防ぐ
env:
  ARTIFACT_NAME: my-artifact.json

steps:
  - name: Rename file to match artifact name
    run: mv /tmp/summaries/github.json /tmp/summaries/${{ env.ARTIFACT_NAME }}

  - name: Upload summary
    uses: actions/upload-artifact@v7
    with: # 非アーカイブ時は name パラメータが無視されるので書かないようにする
      path: /tmp/summaries/${{ env.ARTIFACT_NAME }}
      archive: false
```

#### actions/download-artifact の更新（`archive: false` 対象）
`archive: false` でアップロードしたアーティファクトをダウンロードするには v8 以上が必要です。

```yaml
# 変更前
- uses: actions/download-artifact@v7

# 変更後（v8以上にアップグレード）
- uses: actions/download-artifact@v8
  with:
    name: ${{ env.ARTIFACT_NAME }}  # ← upload 側と同じ環境変数を参照
    path: /tmp/summaries/
```

> **⚠️ 重要な注意点**: `archive: false` を設定すると、アーティファクトの識別子は `name:` パラメーターの値ではなく、**アップロードしたファイルの実際のファイル名（拡張子を含む）** になります。環境変数でファイル名を一元管理することで、upload と download の名前不一致を防げます。


### Step 3: バージョンのみ更新（`archive: false` 対象外のアーティファクト）

`archive: false` が使用できない場合（複数ファイル・ディレクトリ等）でも、
セキュリティ修正・機能改善のため **全ての** `upload-artifact` と `download-artifact` のバージョンを更新してください。

```yaml
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
```

### Step 4: 変更サマリーの出力

変更した場合は次を報告してください:
- 変更したファイル一覧
- 変更前後のバージョン（`archive: false` 対象・非対象を区別して記載）
- `archive: false` を適用した箇所と適用しなかった箇所の理由

変更しない場合も理由を明記してください。
````

:::

このプロンプトをベースに移行した PR がこちらです。

https://github.com/korosuke613/mynewshq/pull/233

試行錯誤の過程は [Discussion](https://github.com/korosuke613/mynewshq/discussions/219#discussioncomment-15954107) に残しています。
