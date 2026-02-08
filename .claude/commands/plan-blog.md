---
description: ブログ記事の執筆プランを作成する。「ブログを書きたい」「記事の執筆計画」「記事プランを作って」で起動。
allowed-tools: AskUserQuestion, Read, Glob, Grep
---

<!-- textlint-disable -->

# ブログ記事執筆プランナー

ユーザーにインタビューを行い、このリポジトリのブログ記事の執筆プランを作成するスキル。
**ファイルの作成や編集は行わない。プランのテキスト出力のみを行う。**

## インタビューフェーズ

以下の順番で `AskUserQuestion` を使ってユーザーにヒアリングを行う。
各質問は前の回答に依存するため、**必ず順番に1問ずつ聞くこと**。

### 質問1: プラットフォーム

AskUserQuestion で以下を聞く:
- question: 「どのプラットフォーム向けの記事を書きますか？」
- options:
  - **Zenn 記事** — `articles/` ディレクトリに配置される技術記事・アイデア記事
  - **はてなブログ** — `hatena/` ディレクトリに配置されるブログ記事

### 質問2: 記事タイプ（Zenn の場合のみ）

**Zenn を選択した場合**、AskUserQuestion で以下を聞く:
- question: 「どのタイプの記事を書きますか？」
- options:
  - **tech（技術記事）** — ハウツー、設計解説、実装紹介、ツール紹介など
  - **idea（アイデア・ポエム）** — ニュース、感想、振り返り、エッセイなど
  - **Productivity Weekly（週次連載）** — 毎週の開発者生産性向上ネタまとめ

**はてなブログの場合**はこの質問をスキップする。

### 質問3: テーマ・トピック

AskUserQuestion で以下を聞く:
- question: 「どのようなテーマ・トピックについて書きますか？具体的に教えてください。（例：GitHub Actions のキャッシュ戦略、Claude Code の組織導入、CI/CD の改善事例など）」
- 自由入力を受け付ける（options は「具体的なテーマがある」「まだ漠然としている」の2択にして、後者の場合は深掘り質問を追加する）

### 質問4: パブリケーション（Zenn かつ PW 以外の場合のみ）

**Zenn で Productivity Weekly 以外を選択した場合**、AskUserQuestion で以下を聞く:
- question: 「パブリケーションに所属する記事ですか？」
- options:
  - **cybozu_ept** — サイボウズ 生産性向上チームのパブリケーション
  - **個人記事** — パブリケーションなし

**Productivity Weekly の場合**: 自動的に `cybozu_ept` とする（質問しない）。
**はてなブログの場合**: この質問をスキップする。

### 質問5: 想定読者

AskUserQuestion で以下を聞く:
- question: 「想定する読者は誰ですか？」
- options:
  - **社内エンジニア** — サイボウズ社内の開発者向け
  - **特定技術の利用者** — 特定の技術やツールを使っている開発者向け
  - **幅広い開発者** — 技術レベルを問わない一般的な開発者向け
- 自由入力も受け付ける（「その他」で具体的に記述可能）

### 質問6: 参考資料

AskUserQuestion で以下を聞く:
- question: 「参考にしたい記事、URL、資料はありますか？他リポジトリのファイルは ~/ghq 配下のパスで指定できます。」
- options:
  - **参考資料あり** — URL やファイルパスを記述してもらう
  - **なし** — 参考資料なし

「参考資料あり」を選択した場合、追加で自由入力を促す。

### 質問7: PW 日付情報（Productivity Weekly の場合のみ）

**Productivity Weekly を選択した場合のみ**、AskUserQuestion で以下を聞く:
- question: 「Productivity Weekly の対象日付を教えてください。」
- options:
  - **単独号** — YYYY MM DD 形式で1つの日付を指定
  - **合併号（隔週）** — 今回の YYYY MM DD と前回の YYYY MM DD を指定

選択後、具体的な日付の入力を促す。

## リサーチフェーズ

インタビュー完了後、以下のリサーチを自動で行う。

### 1. 類似記事の検索

ユーザーが挙げたテーマのキーワードで既存記事を検索する:
- `Grep` で `articles/` 内のマークダウンファイルを検索
- `Grep` で `hatena/` 内のマークダウンファイルを検索
- 関連する記事が見つかった場合、frontmatter と最初の数十行を Read して構成パターンを確認

### 2. 同タイプ記事の構成分析

同じ `type` の記事を 1-2 本 Read して、見出し構成のパターンを把握する。

**tech 記事の典型構成**（実際の記事分析に基づく）:
1. イベント/シリーズ告知（`:::message` ブロック、該当する場合）
2. 導入（自己紹介 + 何の記事か + なぜ書いたか）
3. 想定読者（箇条書き）
4. 背景/モチベーション
5. 本論（複数セクション、コードブロック・画像含む）
6. まとめ/あとがき

**idea 記事の典型構成**:
1. 導入
2. 本論（自由度高、セクション分割）
3. あとがき/感想

**Productivity Weekly**: テンプレートで固定構成（news / know-how / tool / read more / あとがき）

### 3. 絵文字の重複チェック（Zenn 記事の場合）

CI で絵文字の重複がチェックされるため、提案する絵文字が既存記事と重複していないか確認する:
- `Grep` で `articles/` 配下の全ファイルから `emoji:` 行を検索
- 提案する絵文字が既に使われている場合は代替の絵文字を提案する

### 4. textlint / prh ルールの確認

`.textlintrc` と `prh.yml` を Read して、執筆時の注意事項を収集する。

主な注意事項:
- 半角文字と全角文字の間に半角スペースを入れる
- インラインコードの前後に半角スペースを入れる
- 読点（。）で文を終える
- `<!-- textlint-disable -->` / `<!-- textlint-enable -->` で一時的に無効化可能

表記ルール（`prh.yml`）:
- GitHub（Github, gitHub は不可）
- GitHub Actions
- Node.js（nodejs, node.js は不可）
- JetBrains（Jetbrains は不可）
- Four Keys
- Findy Team+

### 5. PW 固有のリサーチ（Productivity Weekly の場合のみ）

- `articles/template/productivity-weekly-template.md.tmpl` を Read してテンプレート構成を確認
- `articles/template/productivity-weekly-count.txt` を Read して現在の回数を確認
- 最新の PW 記事を `Glob` で特定し、Read して最新の構成・フォーマットを確認

## 出力フェーズ

リサーチ結果を踏まえて、以下のフォーマットで執筆プランを出力する。
**出力は全て日本語で行う。ファイルの作成は行わない。**

```markdown
# 📝 記事執筆プラン

## 基本情報

| 項目 | 値 |
|------|-----|
| プラットフォーム | Zenn / はてなブログ |
| 記事タイプ | tech / idea / Productivity Weekly |
| パブリケーション | cybozu_ept / なし |
| 想定読者 | （インタビュー結果） |
| ファイルパス | （提案するファイルパス） |

## 提案 frontmatter

（プラットフォーム・タイプに応じた frontmatter を YAML コードブロックで出力）

## 提案する記事構成

（見出しレベルと各セクションの簡潔な説明を箇条書きで出力）
（リサーチで見つけた類似記事の構成パターンも参考にする）

## 参考になる既存記事

（リサーチで見つかった関連記事をリストアップ）
（各記事のファイルパスと、なぜ参考になるかの簡潔な説明）

## 執筆時の注意事項

（textlint ルール、prh 表記ルール、絵文字重複チェック結果をまとめる）

## 次のステップ

1. ファイルを作成する
   - tech / idea 記事: `articles/<スラッグ>.md` を作成し frontmatter と骨格を配置
   - Productivity Weekly: `./generate-productivity-weekly-from-template.sh YYYY MM DD` を実行
   - はてなブログ: `hatena/<ファイル名>.md` を作成
2. 各セクションの本文を執筆
3. textlint でチェック: `npx textlint ./articles/<ファイル名>.md`
4. プレビューで確認: `npm run start`（port 8808）
5. PR を作成してレビューを受ける
```

### frontmatter テンプレート

**Zenn tech / idea 記事:**
```yaml
---
title: "記事タイトル"
emoji: "（重複チェック済みの絵文字）"
type: tech  # or idea
topics: ["topic1", "topic2"]  # 最大5つ
published: false
publication_name: "cybozu_ept"  # パブリケーション所属の場合のみ
---
```

**Productivity Weekly:**
- frontmatter は `generate-productivity-weekly-from-template.sh` で自動生成される
- ファイル名は `productivity-weekly-YYYYMMDD.md` 形式

**はてなブログ:**
```yaml
---
title: 記事タイトル
url: https://korosuke613.hatenablog.com/entry/YYYY/MM/DD/slug
---
```

### ファイル命名規則

- **Zenn tech / idea**: `articles/<英語ケバブケース>.md`（例: `cache-corretto-on-self-hosted-gha.md`）
- **Zenn PW**: `articles/productivity-weekly-YYYYMMDD.md`（スクリプトで自動生成）
- **はてなブログ**: `hatena/<日本語 or 英語>.md`（例: `lima-on-docker.md`）
