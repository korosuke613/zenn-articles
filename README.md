# Zenn Contents for korosuke613

* [📘 How to use](https://zenn.dev/zenn/articles/zenn-cli-guide)
* [📘 Markdown guide](https://zenn.dev/zenn/articles/markdown-guide)

Preview
```
npm run start
```

## Productivity Weekly
### 新しく記事を書く

#### 単独号の場合
```
./generate-productivity-weekly-template.sh <西暦> <月> <日>
```

#### 隔週号の場合
```
./generate-productivity-weekly-template.sh <西暦> <月> <日> <前回の西暦> <前回の月> <前回の日>
```

タイトル等には `<西暦>`、`<月>`、`<日>` が入ります。

### 記事公開
1. 作成されたプルリクエストをマージ（[例](https://github.com/korosuke613/zenn-articles/pull/199)）
2. zenn.dev のダッシュボード (https://zenn.dev/dashboard) で内容確認
3. `published: true` にするプルリクエストをマージ（[例](https://github.com/korosuke613/zenn-articles/pull/200)）

#### ツイート本文例   
```
今週号です。夏かってくらい暑いですね #cybozu_productivity_weekly
<記事URL>
```

### ツール
[![codecov](https://codecov.io/gh/korosuke613/zenn-articles/branch/main/graph/badge.svg?token=K61PD2KM9C)](https://codecov.io/gh/korosuke613/zenn-articles)

- [./tools](./tools)

## Contributing

1. fork してください
2. 記事を編集したときは `npx textlint <マークダウンへのパス>` を実行してください。落ちたら修正してください
   - 例: `npx textlint ./articles/productivity-weekly-20231018.md`
3. プルリクエストを送ってください
