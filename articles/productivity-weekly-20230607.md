---
title: "Productivity Weekly (2023-06-07号)"
emoji: "🚉"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230607"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-06-07 単独号です。

今回が第 115 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## Security enhancements to required approvals on pull requests | GitHub Changelog
https://github.blog/changelog/2023-06-06-security-enhancements-to-required-approvals-on-pull-requests/

GitHub のプルリクのブランチ保護や承認に関するセキュリティが強まるらしい。
現在展開中とのこと

ローカルで作成され保護されたブランチにプッシュされたマージコミットは、その内容がシステムで作成されたマージと異なる場合、却下されます。
古くなったレビューを却下するブランチ保護は、レビュー後にマージベースが変更されるたびに、承認を却下するようになりました。
プルリクエストの承認は、それが提出されたプルリクエストに対してのみカウントされるようになりました。

## GitHub Actions - Just-in-time self-hosted runners | GitHub Changelog
https://github.blog/changelog/2023-06-02-github-actions-just-in-time-self-hosted-runners/

ephemeral との違いがよくわかってないけどなんか来た。
あーもしかして常駐 VM でジョブ発生時に使い捨てランナー立ててくれるってことなのかな
それはそれでおもろそう。

https://twitter.com/Kesin11/status/1665335604366962688

## View repository pushes on the new activity view | GitHub Changelog
https://github.blog/changelog/2023-05-31-view-repository-pushes-on-the-new-activity-view/

リポジトリ上でどのようなアクティビティがあったか、簡単に確認できるようになりました。リポジトリへの push もここで確認することができます。
GitHub 上のリポジトリのトップページに、「Activity」というリンクからアクセスできます。

ただ、git clone や Download Zip といったユーザーのイベントはここに記録されないため、なにかインシデントが発生した時の証跡として使えるわけではなさそうです。少し残念です。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# know-how 🎓

## コンテナのセルフホストランナーの中でコンテナを使えるようにするrunner-container-hooks
https://zenn.dev/kesin11/articles/20230514_container_hooks

今までコンテナ上で動かしているセルフホストランナーでは、GitHub Actions のコンテナ機能を使用することができませんでしたが、新しく登場した Runner Container Hooks を使うことで使えるようになったとのことです。

最初に、メジャーな方法であるセルフホストランナーをコンテナ上で動かし、そこからさらにコンテナを使う方法(コンテナの中でコンテナを動かしている)についてを説明されています。
しかし GitHub Actions のコンテナ機能である `jobs.<job_id>.container` や `jobs.<job_id>.services` 、`jobs.<job_id>.steps[*].uses` は使えませんでした。

それが Runner Container Hooks の登場で、これらの機能が使えるようになりました。その使い方が具体的に書かれています。

セルフホストランナーをコンテナで動かしている方は必見です。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## AWS CLI を使いこなそう ! ~ 2 種類の補完機能 / aws sso / yaml-stream の紹介 - 変化を求めるデベロッパーを応援するウェブマガジン | AWS
https://aws.amazon.com/jp/builders-flash/202306/handle-aws-cli/?awsf.filter-name=*all

AWS CLI の Tips が3つ紹介されています。

まずは補完機能についてです。シェルの complete 機能を使って、Tab キーを押すとサブコマンドやオプションを補完できます。

参考: [コマンド補完 - AWS Command Line Interface](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-completion.html)

また自動プロンプトという機能もあって、先述した complete 機能よりリッチな UI でコマンドを組み立てることができます。こちらは私は初めて知りました...
初期状態では無効化されているので、`aws --cli-auto-prompt` というようにオプションを渡すか、設定ファイルに `cli_auto_prompt = on` と書くことで使用できるようになります。

参考: [AWS CLI でコマンドの入力プロンプトを表示する - AWS Command Line Interface](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-usage-parameters-prompting.html)


次に AWS IAM Identity Center を使った AWS CLI での SSO についてです。

設定さえできれば、`aws sso login --profile $PROFILE_NAME` でログインできます。

参考: [AWS IAM Identity Center (successor to AWS Single Sign-On) の自動認証更新によるトークンプロバイダーの設定 - AWS Command Line Interface](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/sso-configure-profile-token.html)

なお、現在生産性向上チームでは [assam コマンド](https://github.com/cybozu/assam) を使って、CLI 環境での SSO ログインを実現しています。

参考: [AWS + Azure ADによるSingle Sign-Onと複数AWSアカウント切り替えのしくみ作り - Cybozu Inside Out | サイボウズエンジニアのブログ](https://blog.cybozu.io/entry/2019/10/18/080000)

これを、AWS CLI 標準の機能で実現できるようになったら、楽になりますね。
上手く使えないか、探求を進めていきます。


*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
  - [オフライン「リハビリ」勉強会をやってみたらだいぶ良かった！ - BASEプロダクトチームブログ](https://devblog.thebase.in/entry/2023/06/07/110000)
    - 生産性向上チームもイベントのハイブリッド開催にシフトしていこうとしてますし，ぶっつけ本番よりもこういうリハビリ挟んだ方がいいかも？
- **tool 🔨**
  - [Notion Projects](https://www.notion.so/product/projects)
    - Notion に Timeline の View がついて、プロジェクト管理ツールとしてより機能が増えた印象
    - GitHub Project にも date を書ける場所が増えてたし、最近プロジェクト管理ツールがアツい

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
