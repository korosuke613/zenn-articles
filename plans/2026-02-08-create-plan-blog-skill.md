# ブログ執筆プラン作成スキルの新規作成

## Context

このリポジトリで新しいブログ記事を書く際、記事の種類（Zenn tech / idea / Productivity Weekly / はてなブログ）によって frontmatter、構成パターン、命名規則、使用するツールが異なる。
現状はこれらの知識が README.md や各テンプレートに分散しており、新規記事を始める際に毎回確認が必要。

ユーザーにインタビューして最適な執筆プランを自動生成する Claude Code スキル `/plan-blog` を作成し、記事の企画〜着手までのフローを効率化する。

## 作成ファイル

### `.claude/commands/plan-blog.md`（新規作成）

プロジェクト固有のスラッシュコマンドとして配置。ディレクトリ `.claude/commands/` も新規作成が必要。

#### YAML frontmatter

```yaml
---
description: ブログ記事の執筆プランを作成する。「ブログを書きたい」「記事の執筆計画」「記事プランを作って」で起動。
allowed-tools: AskUserQuestion, Read, Glob, Grep
---
```

- `allowed-tools` には書き込み系ツール（Edit, Write, Bash）を含めない。プラン出力のみに徹する
- `AskUserQuestion` でインタビュー、`Read/Glob/Grep` でリサーチ

#### スキル本文の構成

**1. インタビューフェーズ**（AskUserQuestion を使用、条件分岐あり）

| # | 質問 | 条件 | 選択肢 |
|---|------|------|--------|
| 1 | プラットフォーム | 常に | Zenn / はてなブログ |
| 2 | 記事タイプ | Zenn の場合 | tech / idea / Productivity Weekly |
| 3 | テーマ・トピック | 常に | 自由入力 |
| 4 | パブリケーション | Zenn かつ PW 以外 | cybozu_ept / 個人 |
| 5 | 想定読者 | 常に | 自由入力 |
| 6 | 参考資料 | 常に | 自由入力（なし可。他リポジトリの場合 ~/ghq 配下パスも可） |
| 7 | PW 日付 | PW の場合のみ | 自由入力（YYYY MM DD 形式） |

**2. リサーチフェーズ**（Read, Glob, Grep を使用）

- テーマのキーワードで `articles/` `hatena/` 内を Grep → 類似記事を特定
- 同タイプの記事を 1-2 本 Read → 構成パターンを分析
- 絵文字の重複チェック: `articles/` 内の frontmatter `emoji:` 行を Grep
- `.textlintrc` と `prh.yml` を Read → 執筆注意事項をまとめる
- PW の場合: テンプレート `articles/template/productivity-weekly-template.md.tmpl` と回数 `articles/template/productivity-weekly-count.txt` を Read

**3. 出力フェーズ**（テキスト出力のみ、ファイル作成なし）

以下のフォーマットで執筆プランを出力:

```
# 📝 記事執筆プラン

## 基本情報（テーブル形式: プラットフォーム、記事タイプ、パブリケーション、想定読者、ファイルパス）
## 提案 frontmatter（YAML コードブロック）
## 提案する記事構成（見出し階層と各セクションの説明）
## 参考になる既存記事（リサーチで見つかった関連記事リスト）
## 執筆時の注意事項（textlint ルール、prh 表記ルール、絵文字重複チェック結果）
## 次のステップ（ファイル作成 → 執筆 → textlint → プレビュー → PR）
```

### 参照する既存ファイル（変更なし）

| ファイル | 用途 |
|----------|------|
| `articles/template/productivity-weekly-template.md.tmpl` | PW テンプレート構成の確認 |
| `articles/template/productivity-weekly-count.txt` | PW 現在の回数（現在: 178） |
| `.textlintrc` | textlint ルール一覧の出力 |
| `prh.yml` | 表記統一ルールの出力 |
| `generate-productivity-weekly-from-template.sh` | PW の次のステップで案内 |

## 記事構成パターンの知見（スキル内に埋め込む）

### tech 記事の典型構成（実際の記事分析に基づく）
1. イベント/シリーズ告知（:::message ブロック、該当する場合）
2. 導入（自己紹介 + 何の記事か + なぜ書いたか）
3. 想定読者（箇条書き）
4. 背景/モチベーション
5. 本論（複数セクション、コードブロック・画像含む）
6. まとめ/あとがき

### idea 記事の典型構成
1. 導入
2. 本論（自由度高、セクション分割）
3. あとがき/感想

### Productivity Weekly
- `generate-productivity-weekly-from-template.sh` で生成
- 固定セクション: news 📺 / know-how 🎓 / tool 🔨 / read more 🍘 / あとがき

## 検証方法

1. スキルファイル作成後、`/plan-blog` コマンドを実行して起動を確認
2. 各質問が正しく条件分岐されるか確認（Zenn tech, Zenn PW, はてなブログの3パターン）
3. リサーチフェーズで既存記事の検索・絵文字重複チェックが動作するか確認
4. 出力されるプランのフォーマットが正しいか確認
