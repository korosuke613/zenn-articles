# ファクトチェックスキル定義プラン

## Context

Raspberry Pi PXE + iSCSI 記事のファクトチェックで使用した3フェーズ・ニンジャクラン方式（偵察→並列検証→修正）が有効だったため、再利用可能なスキルとして定義する。`/factcheck <記事パス>` で呼び出せるようにする。

## 作成ファイル

### `.claude/commands/factcheck.md`

プロジェクトローカルのスラッシュコマンドとして定義。

#### frontmatter

```yaml
---
description: 技術記事のファクトチェックを実施する。「ファクトチェックして」「記事の事実確認」で起動。
allowed-tools: Read, Glob, Grep, Edit, Write, Bash(pnpm exec textlint:*), Bash(git diff:*), Bash(git status:*), WebSearch, WebFetch, Agent, AskUserQuestion, TaskCreate, TaskUpdate, TaskList, TaskGet, TeamCreate, TeamDelete, SendMessage
---
```

- `Agent`, `TeamCreate`, `TeamDelete`, `SendMessage`, `TaskCreate/Update/List/Get` を許可してニンジャクラン運用を可能にする
- `WebSearch`, `WebFetch` でファクトチェック検索を許可
- `Edit`, `Write` で記事修正を許可
- `Bash` は textlint と git のみ許可

#### 本文構成

1. **入力**: `$ARGUMENTS` で記事ファイルパスを受け取る（例: `articles/raspberry-pi-pxe-iscsi-boot.md`）
2. **フェーズ1: 偵察（シャドウアイ）** — 記事を精査し、ファクトチェック対象リストを `plans/<date>-factcheck-suspects.md` に書き出す
3. **フェーズ2: 並列検証（ヴェリファイア部隊）** — 対象リストを分割し、複数ニンジャで並列に Web 検索・公式ドキュメント検証。各自の結果を `plans/<date>-factcheck-results-<name>.md` に書き出す
4. **フェーズ3: 修正（インクブレード）** — 検証結果に基づき記事を修正、ソース URL を脚注として追加
5. **完了**: textlint チェック、ユーザーレビュー待ち、イクサの記録保存、クラン解散

#### 重要な設計ポイント

- ファイル競合防止: 各ニンジャの出力ファイルを分離（`-alpha`, `-bravo`, `-charlie`）
- フェーズ依存: フェーズ1完了後にフェーズ2、フェーズ2全完了後にフェーズ3
- CLAUDE.md のクラン運用ルール（解散前ログ保存、反復報告禁止）を組み込み
- 検証対象の件数に応じてヴェリファイア部隊の人数を動的に決定（6件以下: 2人、7件以上: 3人）
- ニンジャクランの世界観を維持した口調・語彙

## 検証方法

1. 作成後、別の記事（例: 既存の Productivity Weekly 記事）に対して `/factcheck articles/<記事>.md` を実行
2. 3フェーズが順序通りに実行されることを確認
3. plans/ 配下に成果物が正しく出力されることを確認
4. textlint がクリーン通過することを確認
