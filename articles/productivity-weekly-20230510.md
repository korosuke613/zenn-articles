---
title: "Productivity Weekly (2023-05-10号)"
emoji: "⛺️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230510"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-05-10 単独号です。

今回が第 112 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
今週号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにします。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。
:::

# news 📺

## More secure private attachments | GitHub Changelog
https://github.blog/changelog/2023-05-09-more-secure-private-attachments/

宮田さんのツイート
https://twitter.com/miyajan/status/1655914766102298629?conversation=none

*本項の執筆者: [@defaultcf](https://twitter.com/defaultcf)*

## GitHub Actions: All Actions will run on Node16 instead of Node12 | GitHub Changelog
https://github.blog/changelog/2023-05-04-github-actions-all-actions-will-run-on-node16-instead-of-node12/

[以前より告知されていた](https://github.blog/changelog/2022-09-22-github-actions-all-actions-will-begin-running-on-node16-instead-of-node12/)通り、GitHub Actions において、5/18 より GitHub Actions で動作する全ての JavaScript アクションは Node.js v16 で動作するようになります。

元々 JavaScript アクションで指定できる Node.js のバージョンは v12 のみでした(`node12`)が、一昨年末から Node.js v16 も指定できるようになりました(`node16`)[^node16][^actions_can]。

5/18 以降は `node12` を指定しても Node.js v16 で動作するようになります。
（もとより Node.js v12 自体は 2022 年 4 月にサポートが終了しています。）

JavaScript アクションを開発している方でまだ `node12` を指定している方は `node16` でも動くようにアクションを更新しましょう。

そういや [Node.js 16 は 2023 年 9 月にサポート終了予定](https://nodejs.org/en/blog/announcements/nodejs16-eol)ですが、まだ `node18` は出ていませんね。

[^node16]: [JavaScript Actionsをnode16で動かすようにする - Kengo's blog](https://zenn.dev/korosuke613/articles/productivity-weekly-20220216#javascript-actions%E3%82%92node16%E3%81%A7%E5%8B%95%E3%81%8B%E3%81%99%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B---kengo's-blog)
[^actions_can]: [Actions can now run in a Node.js 16 runtime | GitHub Changelog](https://zenn.dev/korosuke613/articles/productivity-weekly-20220525#actions-can-now-run-in-a-node.js-16-runtime-%7C-github-changelog)

## Secret scanning's push protection is available on public repositories, for free | GitHub Changelog
https://github.blog/changelog/2023-05-09-secret-scannings-push-protection-is-available-on-public-repositories-for-free/

GitHub の Secret scanning において、push protection がすべてのパブリックリポジトリで利用可能になりました。

push protection は、push しようとしたコミットに GitHub の PAT などのシークレットが含まれていた場合、push を拒否する機能で、[2022 年 4 月にリリースされました](https://github.blog/changelog/2022-04-04-secret-scanning-prevents-secret-leaks-with-protection-on-push/)。

既存の Secret scanning はリモートリポジトリ上のシークレットを検知してくれますが、push protection はリモートリポジトリへの push 前にシークレットを検知してくれるため、漏洩を未然に防止できます。

これまでは GitHub Advanced Security を契約している場合に利用可能でしたが、今回の変更により、すべてのパブリックリポジトリで利用可能になりました。

実際に有効化した上で、シークレットをコミットして push しようとすると、以下のようなエラーが出て push が拒否されます。

※ 今回は GitHub の PAT（削除済み）をコミットしました。`github_pat_hogehogehogehoge...`

```text:GitHub の PAT（削除済み）をコミットして push しようとした場合の例
❯ git push
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 10 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 722 bytes | 722.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
remote: error GH009: Secrets detected! This push failed.
remote:
remote:             GITHUB PUSH PROTECTION (beta)
remote: ——————————————————————————————————————————————————————
remote:  Resolve the following secrets before pushing again.
remote:
remote:  (?) Learn how to resolve a blocked push
remote:  https://docs.github.com/code-security/secret-scanning/pushing-a-branch-blocked-by-push-protection
remote:
remote:
remote: —— GitHub Personal Access Token ——————————————————————
remote:  locations:
remote:    - commit: 1cb6f4aa448dd3938335a681a3929697d93e6f70
remote:      path: articles/productivity-weekly-20230510.md:72
remote:
remote:  (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:  http://github.com/korosuke613/zenn-articles/security/secret-scanning/unblock-secret/hogehoge
remote:
remote:
remote:
To https://github.com/korosuke613/zenn-articles
 ! [remote rejected] pw-20230510 -> pw-20230510 (push declined due to a detected secret)
error: failed to push some refs to 'https://github.com/korosuke613/zenn-articles'
```

push がちゃんと失敗してますね。push protection によるものであることも明記されてて親切です。
また、どのコミットでどのファイルの何行目が何に引っかかったかも教えてくれます。

> To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:  http://github.com/korosuke613/zenn-articles/security/secret-scanning/unblock-secret/hogehoge

さらに、push をバイパスするためのリンクも表示されています。リンクをクリックすると次のような画面が表示されます。

![](/images/productivity-weekly-20230510/push_protection_bypass.png =400x)
*テスト用途や誤検知した時に引っかかった文字列をバイパスして push することもできる*

> - [x] It's used in tests
The secret poses no risk, and if anyone finds it, they cannot do any damage or gain access to sensitive information.
> - [ ] It's a false positive
The detected string is not a real secret.
> - [ ] I'll fix it later
The secret is real, I understand the risk, and I will need to revoke it. This will open a security alert and notify admins of this repository.

テスト用途だから、誤検知だから、後で直すからといった理由を選択し、`Allow me to push this secret` をクリックすることで検知された文字列を含んだまま push が可能になるようです。

![](/images/productivity-weekly-20230510/push_protection_enable_all.png)
*https://github.com/settings/security_analysis から自分がオーナーの全リポジトリに一括設定できる*

push protection、うっかりコミットをだいぶ減らせてくれそうですね。
各リポジトリへ個別設定もできますが、ユーザの設定画面から一括設定＆新規リポジトリに自動設定も可能です。基本的に有効化して損しない機能だと思うので、ぜひ有効化しましょう。

## GraphQL improvements for fine-grained PATs and GitHub Apps | GitHub Changelog
https://github.blog/changelog/2023-04-27-graphql-improvements-for-fine-grained-pats-and-github-apps/

GitHub において fine-grained Personal Access Token および GitHub Apps で GraphQL API が叩けるようになりました。

fine-grained PAT が登場した段階では GitHub の GraphQL API には対応していなかったため、GraphQL API を利用するためには classic PAT の利用が必要でした。

また、GitHub Apps に関しても改良がされており、user-to-server トークン[^user-to-server]を使用する場合、デフォルトでパブリックリソースへの GraphQL での read アクセスが可能になりました[^graphql_for_github_apps]。
REST API に関しては一昨年似たような対応がされています[^rest_api]。

ようやく fine-grained PAT で GraphQL が叩けるようになったなという感じです。使いやすくなりましたね。ただ、いまだに有効期限を必ず設定しないといけない仕様であるため、個人的には fine-grained PAT はまだまだ使わないかなという感じです[^expire]。

[^graphql_for_github_apps]: GitHub Apps から GraphQL を叩くこと自体は結構前から対応されています。[GraphQL API support for GitHub Apps | GitHub Changelog](https://github.blog/changelog/2018-04-30-graphql-supports-gh-apps/)
[^user-to-server]: GitHub Apps の権限を使いつつ、ユーザとして操作したことにする場合の話（だと思います）。https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app
[^rest_api]: [GitHub App user-to-server REST API requests now have read access to public resources | GitHub Changelog](https://github.blog/changelog/2021-08-02-github-app-user-to-server-rest-api-requests-now-have-read-access-to-public-resources/)
[^expire]: 特に中の人を交えた議論もされてなさそう。https://github.com/orgs/community/discussions/36441#discussioncomment-3908900

## Introducing Actions on the Repository view on GitHub Mobile | GitHub Changelog
https://github.blog/changelog/2023-05-09-introducing-actions-on-the-repository-view-on-github-mobile/

GitHub Mobile で GitHub Actions の情報が見られるようになりました。ワークフローの再実行もできます。

リポジトリのトップ画面に Actions への導線が用意されており、そこからワークフロー一覧に飛ぶことができます[^japanese]。

https://twitter.com/Shitimi_613/status/1655958448176259072?conversation=none

色々見たところ、次のようなことが可能でした。
- ワークフロー一覧の表示
- ワークフローラン一覧の表示
- ワークフローランの詳細表示
  - 再実行（失敗したジョブのみ再実行も可能）
- ジョブのログの表示

逆に、次のようなことはできませんでした（確認できてないだけ説も）。
- `workflow_dispatch` の実行
- `$GITHUB_STEP_SUMMARY` の表示

これで外出先でも CI の再実行や落ちた原因を調べやすくなりますね（？）
単純にモバイルでも確認できるのは嬉しいです。

[^japanese]: ちなみに日本語だと「アクションアクション」となぜか 2 回繰り返されています。多分そのうち直ると思います。https://twitter.com/Shitimi_613/status/1655958441784143875

## Terraform Cloud no-code provisioning is now GA with new features
https://www.hashicorp.com/blog/terraform-cloud-no-code-provisioning-is-now-ga-with-new-features

*本項の執筆者: [@defaultcf](https://twitter.com/defaultcf)*

## Slack、さまざまなAIをSlackに統合する「Slack GPT」発表 - Publickey
https://www.publickey1.jp/blog/23/aislackslack_gpt.html

未読スレッドの要約、メールの文面生成などなどができるようになる。

*本項の執筆者: [@defaultcf](https://twitter.com/defaultcf)*

# know-how 🎓

## Technology Radar | An opinionated guide to technology frontiers | Thoughtworks
https://www.thoughtworks.com/radar

半年に一度ほど更新される、Thoughtworks 社の Technology Radar の最新版 Vol.28 が公開。

*本項の執筆者: [@defaultcf](https://twitter.com/defaultcf)*

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [The new code search and code view is now generally available | GitHub Changelog](https://github.blog/changelog/2023-05-08-the-new-code-search-and-code-view-is-now-generally-available/)
    - GitHub の新しい code search が GA になりました
      - 2 月よりパブリックベータとなっていました
    - 僕はよく使っていますが、やっぱり正規表現を使えるのがとても嬉しいです
  - [Codespaces Settings Sync Updates | GitHub Changelog](https://github.blog/changelog/2023-05-04-codespaces-settings-sync-updates/)
    - GitHub Codespaces を VSCode for Web で利用する際に設定の同期を双方向でできるようになりました
      - これまでも設定を変えたら双方向にはできたようですが、それについてはよくわかっていません
    - これまでは VSCode for Web 上ではデフォルトで片方向の設定同期がされるようになっていました
    - これからは Settings Sync を有効にすることで Web 上でも双方向の同期ができるようになります
- **know-how 🎓**
  - [GitHub Actionsにおける設定ミスに起因したGitHubスタッフのアクセストークン漏洩](https://blog.ryotak.net/post/github-actions-staff-access-token/)
    - GitHub Actions のセルフホストランナーを開発している public repo において、E2E テスト時のワークフローの不備で GitHub スタッフのアクセストークンを悪用できたという話です。著者の報告により既に修正済みです
    - もし悪用されていたら大変なことになっていましたね。GitHub Actions の権限には気をつけましょう
      - パブリックリポジトリで PAT を使うなという話でもあると思う

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
