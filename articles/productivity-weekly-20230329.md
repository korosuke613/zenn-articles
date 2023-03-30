---
title: "Productivity Weekly (2023-03-29号)"
emoji: ""
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230329"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-03-29 単独号です。

今回が第 110 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Introducing GitHub Copilot X
https://github.com/features/preview/copilot-x

GitHub Copilot X：AI を搭載した開発者体験 - GitHub ブログ
https://github.blog/jp/2023-03-23-github-copilot-x-the-ai-powered-developer-experience/

GitHub Copilot Chat を使って ChatGPT のような体験をエディターで
Copilot for Pull Requests
ドキュメントについて AI が生成した回答を入手する
Copilot for CLI(command line interface)

https://twitter.com/yuhattor/status/1640344136787034113

> GitHub Copilot 👉 プロダクト
> GitHub Copilot for Business / Individual 👉 提供形態
> GitHub Copilot X 👉 ビジョン 

## GitHub Actions: Visual Studio Code Extension is now in public beta | GitHub Changelog
https://github.blog/changelog/2023-03-28-github-actions-visual-studio-code-extension-is-now-in-public-beta/

VSCode の GitHub Actions 拡張機能がパブリックベータになったよ

- 構文の validation
- auto complete
- ワークフロー履歴
- ジョブのログ表示
- ワークフロー再実行

などができる。

詳しくはブログ読むのがいい

Announcing the GitHub Actions extension for VS Code | The GitHub Blog
https://github.blog/2023-03-28-announcing-the-github-actions-extension-for-vs-code/

VSCode の GitHub Actions 拡張機能触ってみたツイート
https://twitter.com/Shitimi_613/status/1640895043178491905

## We're no longer sunsetting the Free Team plan | Docker
https://www.docker.com/blog/no-longer-sunsetting-the-free-team-plan/

Docker 社、3/14 に Free Team プランの廃止をアナウンスしてたんですけど、3/25 に撤回しました。
3/14 以降に有料プランにアップグレードしてた場合は 30 日分の返金が自動でされるとのこと。

## AWSに最適化された「Amazon Linux 2023」正式リリース。カーネルライブパッチなど新機能、今後は5年間無償サポート、2年ごとにメジャーバージョンアップ － Publickey
https://www.publickey1.jp/blog/23/awsamazon_linux_202352.html

カーネルライブパッチが利用可能になったり、SELinux の permissive がデフォルトで有効化されていたりするそうです。

# know-how 🎓

## GitHub SponsorsではPayPalを使った支払いはできなくなったので、クレジットカードに切り替える必要があります | Web Scratch
https://efcl.info/2023/03/21/github-sponsors-paypal/

GitHub Sponsors で PayPal が利用できなくなったので、クレジットカードに切り替える必要がある話。
人によっては月 $4,000 も収入が減ってるなど、影響はでかいようです。

## Bit-for-bit reproducible builds with Dockerfile | by Akihiro Suda | nttlabs | Mar, 2023 | Medium
https://medium.com/nttlabs/bit-for-bit-reproducible-builds-with-dockerfile-7cc2b9faed9f

buildkit を使った、ビット単位で再現可能な Docker イメージビルド方法の解説。
SOURCE_DATE_EPOCH でタイムスタンプを、repro-get でパッケージバージョンを再現可能にしています。

## モノレポでの GitHub Actions CI の泥臭い高速化
https://zenn.dev/ascend/articles/github-actions-on-push-history

## ソフトウェアエンジニアリングサバイバルガイド: 廃墟を直す、廃墟を出る、廃墟を壊す、あるいは廃墟に暮らす、廃墟に死す - Google Slides
https://docs.google.com/presentation/d/1hDY2pb-nYVSLr0HrtQ4EVyrDU4QGgwp4-VRG-Rf26DA/edit

廃墟＝「動いているけどメンテできない、されてないもの」との付き合い方についての発表スライド。

# tool 🔨

## GitHub Actions: The setup-go Action now enables caching by default | GitHub Changelog
https://github.blog/changelog/2023-03-24-github-actions-the-setup-go-action-now-enables-caching-by-default/

actions/setup-go アクション、v4 からは cache パラメータを指定しなくてもデフォルトでキャッシュが有効になるとのことです。
actions/setup-* アクションのキャッシュ挙動を統一してほしい。。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [We updated our RSA SSH host key | The GitHub Blog](https://github.blog/2023-03-23-we-updated-our-rsa-ssh-host-key/)
    - GitHub のホスト認証用の RSA SSH 秘密鍵が GitHub の公開リポジトリで短時間公開されていたことが判明したため、3/24 にリプレースされた話。
    - github.com に SSH アクセスしてエラーになる場合は .ssh/known_hosts の更新が必要。
    - [GitHub から fetch/pull できなくなった場合の対処（2023/03/24 秘密鍵公開）- Qiita](https://qiita.com/ktateish/items/c986891e429469c7105c)
      - 今回問題になってるのはホスト認証用の鍵で、クライアント側の鍵の暗号方式は関係ないよという話。
  - [iOS/iPadOS 16.4リリース 〜ホーム画面に追加したWebアプリ（PWA）からの通知が可能に。またUnicode 15.0の絵文字も追加される | gihyo.jp](https://gihyo.jp/article/2023/03/ios16.4-release)
    - とうとう iOS にも PWA からの push 通知が来たよ
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
