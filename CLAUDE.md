# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## リポジトリ概要

Zenn（技術ブログプラットフォーム）の記事管理リポジトリ。主力コンテンツは「Productivity Weekly」（開発者の生産性向上に関する週次連載記事、サイボウズ生産性向上チーム発）。

## コマンド

### プレビュー
```bash
pnpm run start  # zenn preview (port 8808)
```

### textlint（記事の日本語校正）
```bash
pnpm exec textlint ./articles/<記事ファイル名>.md           # 単一記事の校正
pnpm exec textlint ./articles/productivity-weekly-*.md      # PW記事一括校正
```

### Deno ツール（tools/ 配下）

Deno 実行時は必ず `DENO_NO_PACKAGE_JSON=1` を設定すること（Deno が package.json を認識して deno.lock を汚すのを防ぐ）。`.envrc` でも設定済み。

```bash
# テスト
DENO_NO_PACKAGE_JSON=1 deno test --allow-env=LOG_LEVEL --allow-read=tools tools/

# 単一テスト
DENO_NO_PACKAGE_JSON=1 deno test --allow-env=LOG_LEVEL --allow-read=tools tools/tests/Git.test.ts

# フォーマットチェック
DENO_NO_PACKAGE_JSON=1 deno fmt --ext=ts --check ./tools

# リントチェック
DENO_NO_PACKAGE_JSON=1 deno lint ./tools

# カバレッジ付きテスト
DENO_NO_PACKAGE_JSON=1 deno test --allow-env=LOG_LEVEL --allow-read=tools --coverage=cov_profile tools/
deno coverage cov_profile --lcov --output=cov_profile.lcov
```

### Productivity Weekly 新規記事生成
```bash
# 単独号
./generate-productivity-weekly-from-template.sh <西暦> <月> <日>

# 隔週号（合併号）
./generate-productivity-weekly-from-template.sh <西暦> <月> <日> <前回の西暦> <前回の月> <前回の日>
```
gomplate が必要。ブランチ作成・コミットまで自動実行される。

### TOC 生成
```bash
./create-toc.sh <記事パス>
```

## アーキテクチャ

### 二重ランタイム構成
- **Node.js 20.x** (`package.json`): textlint（日本語校正）、zenn-cli（プレビュー）
- **Deno v1.x** (`tools/`): カスタムツール群（TOC生成、AIレビュー、絵文字重複チェック等）
- 両者が共存するため `DENO_NO_PACKAGE_JSON=1` が必須

### ディレクトリ構成
- `articles/` — Zenn 記事（Markdown + YAML frontmatter）
- `articles/template/` — Productivity Weekly テンプレート（gomplate形式）
- `books/` — Zenn 本
- `images/` — 記事用画像
- `hatena/` — はてなブログ用記事
- `slides/` — スライド
- `tools/` — Deno 製カスタムツール群
  - `tools/libs/` — ライブラリ（AiReviewer, Category, Git, Toc, ReviewDogJsonLine, lib）
  - `tools/tests/` — テスト
  - `tools/deps.ts` / `tools/deps_dev.ts` — Deno 依存管理

### 記事 frontmatter 形式
```yaml
---
title: "記事タイトル"
emoji: "🐹"           # 1記事1絵文字（重複不可、CIでチェック）
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false       # true にすると公開
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/..."}
---
```

### CI/CD（GitHub Actions）
- **ci-zenn.yaml**: PR時に textlint（変更された .md のみ）、絵文字重複チェック、メタデータ検証
- **ci-deno.yaml**: `tools/**/*.ts` 変更時に Deno の fmt/lint/test 実行、Codecov へカバレッジ送信
- **ai-review.yaml**: PR コメントで `/ai-review` を打つとAIレビュー実行
- **ci-actions.yaml**: GitHub Actions ワークフローの検証
- **ci-renovate.yaml**: Renovate 設定の検証

### textlint ルール（.textlintrc）
- `preset-ja-technical-writing`: 日本語技術文書向け（一部ルール緩和済み）
- `preset-ja-spacing`: 半角全角間スペース（`space: always`）、インラインコード前後スペース
- `@proofdict/proofdict`: 表記揺れ検知
- `prh`: カスタム表記ルール（`prh.yml`: GitHub, GitHub Actions, Node.js, JetBrains 等の表記統一）
- `textlint-filter-rule-comments`: コメントによるルール無効化

### 表記ルール（prh.yml）
記事執筆時は以下の表記に統一すること:
- `GitHub`（`Github`, `gitHub` は不可）
- `GitHub Actions`
- `Node.js`（`nodejs`, `node.js` は不可）
- `JetBrains`（`Jetbrains` は不可）
- `Four Keys`
- `Findy Team+`
