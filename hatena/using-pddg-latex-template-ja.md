pddg/latex-template-ja: 日本語論文を書くための自動ビルド・校正機能付きテンプレートリポジトリ
https://github.com/pddg/latex-template-ja

Clone して確かめる。

vscode で開く。

![](/images/using-pddg-latex-template-ja/open_vs_code.png)

`Reopen in Container` しようとしたけどできなかった。
どうやら devcontainer はサポートしてないらしい。

LaTeX Workshop をインストール。

![](/images/using-pddg-latex-template-ja/install_latex_workshop.png)

`.vscode/settings.json` を見てみた。

```json
    "latex-workshop.docker.enabled": true,
    "latex-workshop.docker.image.latex": "pddg/latex:3.0.0",
```

え、LaTeX Workshop って docker イメージ使えたんだ。
これはいいね。

tex ファイルを編集してみる。
![](/images/using-pddg-latex-template-ja/docker_pull_when_build.png)

自動でビルドが走って `docker pull` し始めた！

そして生まれる PDF。

![](/images/using-pddg-latex-template-ja/generated_pdf.png)

便利すぎる。これでいいじゃん。

生成した PDF に対象ユーザや使い方、FAQ などが載っている。

tex から pdf への synctex ジャンプもできる。（`cmd` + `option` + `j`）

pdf から tex への synctex ジャンプもできる。（`cmd` 押しながらクリック）

説明書の pdf はリリースから手に入る。

![](/images/using-pddg-latex-template-ja/release.png)

