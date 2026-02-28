# 記事執筆プラン: GitHub Actions 非圧縮アーティファクト

## 基本情報

| 項目 | 値 |
|------|-----|
| プラットフォーム | Zenn |
| 記事タイプ | tech |
| パブリケーション | cybozu_ept |
| 想定読者 | GitHub Actions でアーティファクトを活用している開発者 |
| ファイルパス | `articles/use-no-archive-actions-artifact.md` |
| ボリューム | コンパクト（2000 字前後） |

## frontmatter

```yaml
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
```

## 記事構成

### 1. 導入（3-4 行）
- 何が変わったか一言で
- Changelog リンク

### 2. 設定方法
- `upload-artifact@v7` + `archive: false`
- `download-artifact@v8` の対応
- 変更前 → 変更後の yaml 例（diff 形式で簡潔に）

### 3. ハマりどころ（記事の核）
- `name` パラメータが無視される
- `download-artifact` の `name` を拡張子付きに合わせる必要
- 単一ファイルのみ対応
- Releases からの引用

### 4. 実際に試してみた（スクリーンショット 2 枚）
- アーティファクト一覧の見た目
- JSON をブラウザで直接閲覧

### 5. 既存ワークフローへの移行（チェックリスト）
- `archive: false` が使える条件
- 使えない場合もバージョン更新は推奨

### 6. おまけ：AI に移行プロンプトを作らせた
- プロンプト全文（`<details>` 折りたたみ）
- Discussion リンク

## 執筆時の注意事項

- `GitHub Actions` 表記統一
- 半角全角間スペース
- インラインコード前後スペース
- 「以下の」→「次の」
- 画像は `images/use-no-archive-actions-artifact/` に配置
