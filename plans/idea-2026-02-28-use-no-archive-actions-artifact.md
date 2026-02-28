新たな記事のネタとなる情報です。

---

GitHub Actions now supports uploading and downloading non-zipped artifacts - GitHub Changelog
https://github.blog/changelog/2026-02-26-github-actions-now-supports-uploading-and-downloading-non-zipped-artifacts/

GitHub Actions の actions/upload-artifact, actions/download-artifact において、zip 化せずにアップロード、ダウンロードできるようになった。

しかも、非圧縮ファイルをブラウザで見る場合に、単純な HTML や画像やマークダウンはブラウザ内で直接閲覧できるようになった。


設定方法

- actions/upload-artifact@v7 を使用
  - `archive: false` を付与
    - ただし、`path` で指定するファイルが複数になる場合は使えない（複数ファイル・ディレクトリ・ワイルドカード指定の場合）
  - `name` パラメータは無視されるようになるので削除するのが推奨
- actions/download-artifact@v8 を使用
  - `name` パラメータを upload-artifact でアップロードするファイル名（拡張子あり）に変える

注意点として、`archive: false` することで、ファイル名が変わってしまうという問題がある。
`archive: true` 時はファイル名が `<name>.zip` となるが、`archive: false` 時はそのままアップロードするファイル名（拡張子あり）のままとなるため、雑に対応すると後続 download-artifact が失敗しうる。
changelog には書いてないが、Releases にはしっかりと書いてある。
> Adds support for uploading single files directly (unzipped). Callers can set the new archive parameter to false to skip zipping the file during upload. Right now, we only support single files. The action will fail if the glob passed resolves to multiple files. The name parameter is also ignored with this setting. Instead, the name of the artifact will be the name of the uploaded file.

---

実際にアップロードしたらこんな感じ

![](/plans/img/idea-2026-02-28-use-no-archive-actions-artifact_artifacts.png)

わかりにくいけど `changelog-data` は zip。

`summary-github.json` をクリックするとダウンロードされるのではなく別タブで json がそのまま見れる。実際便利！

![](/plans/img/idea-2026-02-28-use-no-archive-actions-artifact_json.png)

https://productionresultssa18.blob.core.windows.net/actions-results/59472fe5-1b66-4aa9-989b-8c69e298f748/workflow-job-run-4a676a3e-6a73-514b-a333-7f49eeb6fc24/artifacts/1961775f51a2cd3d88b1771e056810932a76c832f35959fd2a3dd43023dd1582.json?rscd=inline%3B+filename%3D%22summary-github.json%22&rsct=application%2Fjson&se=2026-02-28T12%3A35%3A17Z&sig=pWgEIuwZt5TXydv07LJJEcYcUB1nR5gr3E78fw5PhGY%3D&ske=2026-02-28T13%3A29%3A22Z&skoid=ca7593d4-ee42-46cd-af88-8b886a2f84eb&sks=b&skt=2026-02-28T09%3A29%3A22Z&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skv=2025-11-05&sp=r&spr=https&sr=b&st=2026-02-28T12%3A25%3A12Z&sv=2025-11-05

---

他リポジトリに適用していくために AI に作らせたプロンプト。

````
# GitHub Actions 非圧縮アーティファクト対応の検討と改修依頼

## 背景

GitHub Actionsで非圧縮アーティファクトのアップロード・ダウンロードがサポートされました。
- `actions/upload-artifact` v7以上で `archive: false` を設定可能
- `actions/download-artifact` v8以上が対応

## タスク

このリポジトリの `.github/workflows/` ディレクトリ内のワークフローファイルを調査し、
非圧縮アーティファクト対応が有効かつ効果的かを評価してください。

### Step 1: 対応要否チェック

以下を確認し、**対応すべきかどうかを判断してください**:

1. **アーティファクトの使用有無**
   - `actions/upload-artifact` を使用しているワークフローが存在するか？
   - 存在しない場合は「対応不要」と報告して終了

2. **`archive: false` が使用可能かの確認**（アーティファクトが存在する場合）

> **重要**: `archive: false` は以下の条件を**すべて満たす場合のみ**使用できます

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
   以下のいずれかを出力してください:
   - ❌ **対応不要（制約あり）**: 複数ファイルをアップロードしている、またはワイルドカードで複数ファイルがマッチする可能性があり `archive: false` が使用不可（バージョン更新のみ実施）
   - ✅ **対応推奨**: 1ファイルのみ、かつ〇〇の理由で非圧縮化による効果が見込める
   - ⚠️ **対応任意**: 1ファイルのみだが効果は限定的
   - ❌ **対応不要**: アーティファクトを使用していない、または非圧縮化の恩恵がない

### Step 2: 改修（Step 1で「対応推奨」または「対応任意」の場合のみ）

以下の変更を行ってください:

#### actions/upload-artifact の更新（`archive: false` 対象）

```yaml
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
```

#### actions/download-artifact の更新（`archive: false` 対象）
`archive: false` でアップロードしたアーティファクトをダウンロードするには v8 以上が必要です。

```yaml
# 変更前
- uses: actions/download-artifact@v4  # または v3

# 変更後（v8以上にアップグレード）
# download-artifact も拡張子を含むファイル名に合わせる
- uses: actions/download-artifact@v8
  with:
    name: my-artifact.json  # ← upload 時の name（拡張子含む）と一致させる
    path: /tmp/summaries/
```

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

変更した場合は以下を報告してください:
- 変更したファイル一覧
- 変更前後のバージョン（`archive: false` 対象・非対象を区別して記載）
- `archive: false` を適用した箇所と適用しなかった箇所の理由

変更しない場合も理由を明記してください。
````

プロンプト作成の試行錯誤
https://github.com/korosuke613/mynewshq/discussions/219#discussioncomment-15954107
