---
title: "Productivity Weekly (2023-09-27号)"
emoji: "🏥"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230927"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-09-27 単独号です。

今回が第 126 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)

:::

# news 📺

## OrbStack 1.0: Fast, light, easy way to run Docker containers and Linux
https://orbstack.dev/blog/orbstack-1.0

OrbStack 1.0 リリース。とうとう商用利用は有償に。

> The app is free for personal, non-commercial use. A Pro or Enterprise license is required for freelance, business, and other commercial use, but you can start with a 14-day trial.

https://x.com/shitimi_613/status/1704891867593339194

## partial checkout (--filter) オプション追加 - Release v4.1.0 · actions/checkout
https://github.com/actions/checkout/releases/tag/v4.1.0

actions/checkout に partial clone (`git clone --filter`) のオプションが追加されました。partial clone を設定すると大規模なリポジトリにおいて clone や fetch を高速化できるケースがあります。

partial clone 自体の説明は GitHub 公式の解説記事（[英語](https://github.blog/2020-12-21-get-up-to-speed-with-partial-clone-and-shallow-clone/)、[日本語](https://github.blog/jp/2021-01-13-get-up-to-speed-with-partial-clone-and-shallow-clone/)）が詳しいです。
ちなみに [v3.5.3](https://github.com/actions/checkout/releases/tag/v3.5.3) でリリースされた sparse checkout と partial clone との違いなどについてはこちらの記事も図解入りで分かりやすいのでおすすめです。

https://swet.dena.com/entry/2021/07/12/120000

最近は git 自体に大規模リポジトリをうまく扱うための機能が色々追加されているのですが、sparse checkout や partial clone など主要なものは actions/checkout からでもかなり使えるようになってきました。基本的には actions/checkout のデフォルトの挙動は CI 向きになっているため新しいオプションの指定は必ずしも必要ありませんが、大規模なリポジトリを扱っている場合には一度調べてみると良いかもしれません。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub Actions: Transitioning from Node 16 to Node 20 - The GitHub Blog 
https://github.blog/changelog/2023-09-22-github-actions-transitioning-from-node-16-to-node-20/

[actions/runner の方では既にリリース済み](https://github.com/actions/runner/releases/tag/v2.308.0)でしたが、JavaScript の action を実行するための Node.js のバージョンが 16 から 2024 年春を目処に 20 へ移行されることが正式にアナウンスされました。
action 作者の方は Node.js 16 から 20 へのアップデート対応をしていきましょう。

_アップデートの際には公式の各種 actions のように major バージョンを上げてリリースしてもらえると今しばらく Node.js 16 を使わざるを得ない GHES ユーザーは助かります_

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub Actions - Force cancel workflows - The GitHub Blog 
https://github.blog/changelog/2023-09-21-github-actions-force-cancel-workflows/

GitHub Actions のワークフローを force-cancel するための API が追加されました。REST API ドキュメントは[こちら](https://docs.github.com/ja/rest/actions/workflow-runs?apiVersion=2022-11-28#force-cancel-a-workflow-run)です。
これまで、ワークフローをキャンセルしても応答がないことがありました。その場合、他のワークフローの実行がブロックされてしまうという問題がありましたが、この API を使うことで強制的にキャンセルすることができるようになりました。

> Customers should still only use force-cancel if the workflow fails to respond to POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel.

と書かれているので、最終手段として使う API といった感じです。

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*


## Passkeys are generally available - The GitHub Blog 
https://github.blog/2023-09-21-passkeys-are-generally-available/

GitHub.com で Passkeys が GA になり、のすべてのユーザーが Passkeys 認証を行えるようになりました。
7月のパブリックベータから2ヶ月ほどで GA になったので、早いですね。
以前 GitHub が宣言していた [securing all contributors with 2FA by the end of 2023](https://github.blog/2022-05-04-software-security-starts-with-the-developer-securing-developer-accounts-with-2fa/) に精力的に取り組んでいることが伺えます。

Linux や Firefox のような、まだPasskeysに完全対応していないプラットフォームでも使えるように、クロスデバイスの登録が可能になっています。
また、既存のセキュリティキーを Passkeys にアップグレードするオプションも提供されているため導入も簡単です。

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*

## Amazon Corretto 21 is now generally available
https://aws.amazon.com/jp/about-aws/whats-new/2023/09/amazon-corretto-21-generally-available/

AWS が提供する OpenJDK21 ディストリビューションである Amazon Corretto 21 が GA になりました。
Amazon Corretto 21 は LTS であり、Linux、Windows、macOSで利用可能とのことです。

OpenJDK21 は パターンマッチングや仮想スレッドが正式に導入されたことや、main メソッドに `public static void` を書かなくてもよいプレビュー機能が追加されたことで話題でしたが、早速 Amazon Corretto が対応してくれているのは嬉しいですね。

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*

## GitHub Copilot Chat beta now available for all individuals - The GitHub Blog
https://github.blog/2023-09-20-github-copilot-chat-beta-now-available-for-all-individuals/

Visual Studio と VS Code のすべての GitHub Copilot 個人ユーザー向けに GitHub Copilot Chat のベータ版がリリースされました。
これまで、エディタ内に ChatGPT のプロンプトを組み込んだりするサードパーティ製の拡張機能などがありましたが、公式の GitHub Copilot Chat リリースにより、より簡単に AI の恩恵を受けることができるようなったと思います。
プロンプトでのやりとりだけでなく、直接ファイル内のコードを選択して、AI とやりとりできるのでとても便利そうです。

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*

# know-how 🎓

## RenovateでGitHub成果物のチェックサムを更新する - プログラムモグモグ 
https://itchyny.hatenablog.com/entry/2023/09/22/140000

Renovate の regexManager を活用してシェルスクリプトや Dockerfile 中で curl でダウンロードしてくるツールのバージョンの更新に加えてチェックサムの値も自動で更新する方法が紹介されてます。



# tool 🔨

## 組織でのはてなブログ運営をGitHub上で行うためのテンプレートリポジトリ「HatenaBlog Workflows Boilerplate」を公開しました - はてなブログ開発ブログ 
https://staff.hatenablog.com/entry/2023/09/21/182000

GitHub 上ではてなブログの下書きやレビューをするために必要な GitHub Actions などの一式が揃っているようです。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
