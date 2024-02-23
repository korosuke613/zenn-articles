---
title: "＜ここにタイトルを入力＞｜Productivity Weekly (2024-02-14号)"
emoji: "😍"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: 
  publish_link: "https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240214"
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-02-14 単独号です。

今回が第 142 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Deprecation notice: v1 and v2 of the artifact actions - The GitHub Blog
https://github.blog/changelog/2024-02-13-deprecation-notice-v1-and-v2-of-the-artifact-actions/

GitHub Actions の `actions/upload-artifact` および `actions/download-artifact` の v1 と v2 が 2024/06/30 に Deprecate となることが発表されました。
v4 では[パフォーマンスが大幅に向上](https://github.blog/changelog/2023-12-14-github-actions-artifacts-v4-is-now-generally-available/)しているので、これを機にアップグレードを検討してみてはいかがでしょうか。

なお、GitHub Enterprise Server では該当せず、対応は不要だそうです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Copilot in GitHub Support is now available! - The GitHub Blog
https://github.blog/2024-02-09-copilot-in-github-support-is-now-available/


## Dockerの設定を大きく省力化する「Docker Init」コマンドが正式リリース。DockerfileやCompose設定ファイルなど自動生成 － Publickey
https://www.publickey1.jp/blog/24/dockerdocker_initdockerfilecompose.html

# know-how 🎓

## GitHubのMerge Queueとは何か？それと、認識しておきたいこと - Mitsuyuki.Shiiba
https://bufferings.hatenablog.com/entry/2024/02/10/173552

## Testing HashiCorp Terraform
https://www.hashicorp.com/blog/testing-hashicorp-terraform

## デプロイ頻度やリードタイムの正確な計測にこだわらなくていい（前提はあるが） - mtx2s’s blog
https://mtx2s.hatenablog.com/entry/2024/02/12/210309

スクラムのようなイテレーティブな開発プロセスにおける、デプロイ頻度やリードタイムの計測と活用についての考察記事です。

結論としては、実測値を使うまでもなく、チームの誰もが知っているデプロイ頻度とリードタイム(ここでは、イテレーティブであるという前提を置いているので 1 スプリントなど)を用いれば十分と述べています。
そもそも改善したい対象はメトリクスではなくフローであるということを具体例や図を用いて立ち返っており非常に分かりやすかったです。
さらに、フローを改善する戦略として、「フローを速くする」ことと「フローの数を増やす」という 2 つの具体的なアプローチまで紹介してくれていて、実践的で非常に参考になりました。

Four Keys のような指標の計測に基づいて何かをする際は、メトリクスを良くすることを目的としてしまうミスが起こりがちです。定期的にこの記事を読み返して、改善の目的を見失わないようにしたいですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

