---
title: "Productivity Weekly (2023-09-20号)"
emoji: "🐟"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230920"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-09-20 単独号です。

今回が第 125 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## Introducing auto-triage rules for Dependabot - The GitHub Blog
https://github.blog/2023-09-14-introducing-auto-triage-rules-for-dependabot/

public リポジトリで Dependabot の脆弱性アラートを出す条件を独自にコントロール可能にする機能が追加された。記事の例を見ると修正パッチが来るまではアラートとして出さない、みたいなルールが可能っぽい。

## Increased Concurrency Limit for GitHub-Hosted Runners - The GitHub Blog 
https://github.blog/changelog/2023-09-18-increased-concurrency-limit-for-github-hosted-runners/

4-64vCPU のランナーのジョブ並列数の上限が 250 -> 1000 まで引き上げ可能になった。なぜか 4-64vCPU という表現をされているけど Larger runner のことを指してるはず。

## Amazon EC2 now supports Block Public Access for Amazon Machine Images
https://aws.amazon.com/jp/about-aws/whats-new/2023/09/amazon-ec2-block-public-access-machine-images/

リージョン単位ごとに、パブリックな AMI 作成をブロックできる機能が出た。これで事故が防げるぞ。
利用には有効化が必要。

## New – Amazon EC2 M2 Pro Mac Instances Built on Apple Silicon M2 Pro Mac Mini Computers | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/new-amazon-ec2-m2-pro-mac-instances-built-on-apple-silicon-m2-pro-mac-mini-computers/

Amazon EC2 インスタンスに M2 Pro Mac がきたよ ( Mac Mini )

## Windows Subsystem for Linux（WSL）に新機能。使用メモリや仮想ディスクの自動縮退、LAN経由でWSLへ直接アクセス可能など － Publickey
https://www.publickey1.jp/blog/23/windows_subsystem_for_linuxwsllanwsl.html


## Oracle Releases Java 21 and Extends Support Roadmap
https://www.oracle.com/apac/news/announcement/ocw-oracle-releases-java-21-2023-09-19/

https://www.publickey1.jp/blog/23/java_21void_mainzgc.html
https://qiita.com/taichikanaya_1989/items/ec671ebbbb16f2315992

11, 17 と続き java21 が LTS で出た。やはり仮想スレッドの正式リリースが気になるか。

# know-how 🎓

## お財布に優しいCI改善小ネタ集 - メドピア開発者ブログ https://tech.medpeer.co.jp/entry/2023-kakari-ci-performance-tuning

各種ツールのキャッシュを活用したり、並列度などを調整することでコスト追加なしで CI 時間を半減させたという記事。キャッシュを活用するのは正攻法なので個人的には好感。

キャッシュは webpack, rubocop, eslint, jest が紹介されてます。

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 20代通して学んだ30代のキャリア戦略、向井氏が語る選択肢の増やし方とは？ |CodeZine（コードジン）
https://codezine.jp/article/detail/18285

今週のおまけです。

