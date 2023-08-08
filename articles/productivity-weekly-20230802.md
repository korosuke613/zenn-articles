---
title: "Productivity Weekly (2023-08-02号)"
emoji: "👿"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230802"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-08-02 単独号です。

今回が第 120 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)

:::

# news 📺

## 新着情報 – パブリック IPv4 アドレスの利用に対する新しい料金体系を発表 / Amazon VPC IP Address Manager が Public IP Insights の提供を開始 | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/new-aws-public-ipv4-address-charge-public-ip-insights/

AWS において、パブリック IPv4 アドレスの料金体系が変わり、割り当てられているかどうかに関わらず IPv4 アドレスごとに有料となります（2024/02/01 より）。

理由としては、IPv4 アドレスの保全のためで、IPv6 の採用を促すためとのことです。

これまでも、どこにも割り当てられていないパブリック IPv4 アドレスは、1 アドレスあたり $0.005/hour が課金されていました（だいたい月 $3.6）。これからは全てのパブリック IPv4 アドレスが課金対象となります。
月当たりの金額は大したことはありませんが、多くのパブリック IPv4 アドレスを抱えている場合は注意が必要です。

また、Amazon VPC IP Address Manager に Public IP Insights という新機能ができました。パブリック IPv4 アドレスの利用状況を分析できます。案外パブリック IPv4 アドレスを大量に持っているかもしれません。これを機に棚卸ししましょう。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## actions/runner nodejs plan and next steps · actions/runner · Discussion #2704
https://github.com/actions/runner/discussions/2704

GitHub Actions に内蔵されている nodejs のバージョンが 16 で止まっている問題、18 をスキップして 20 に上げる予定らしい。
若干関係する話として octokit が 16 のサポートを切ったことで github-script に影響が出ているという話もあるっぽいですが、真偽のほどはあまりわかっていない。
octokit が fetch を使うようになったらしいので、node18 じゃないと fetch が標準で含まれていないからそのままだと動かなくて node-fetch みたいな互換モジュールが必要みたいなこと？

## Shhh… 🤫 @Cloudflare Registrar just quietly rolled out support for the following TLDs:
https://twitter.com/eastdakota/status/1686513213503127557

Cloudflare のドメイン販売・管理サービスである Cloudflare Registrar が .dev や .app といった TLD[^tld]をサポートするようになりました。

[先日](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230628#squarespace-%E3%81%B8%E3%81%AE-google-domains-%E3%81%AE%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E7%99%BB%E9%8C%B2%E3%81%AE%E8%AD%B2%E6%B8%A1%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6---google-domains-%E3%83%98%E3%83%AB%E3%83%97)、Google のドメイン販売・管理サービスの Google Domains が Squarespace 社に売却されるため、Google Domains および Google Cloud Domains が将来的に使えなくなる話をしました。

サービスは Squarespace 社が引き継ぎますが、さまざまな理由でもっと別のレジストラを使いたいパターンもあったと思います。
多くの TLD はいろんなレジストラで扱えますが、例えば .dev ドメインはかつて Google Domains でしか購入・管理ができませんでした[^dev_dominant]。そのため、.dev ドメインを持っている方は Squarespace 提供のレジストラを使わざるを得ない状況でした（僕もです）。

しかし、今回の Cloudflare Registrar のアップデートにより、.dev ドメインを含むいくつかの TLD を Cloudflare Registrar で購入・管理できるようになりました。
Cloudflare ならヨシ！という方はこれで .dev ドメインなどのドメインを Cloudflare Registrar で扱えるようになります。

:::message
ていうか今回調べてわかったんですけど、いつの間にかムームードメインとかお名前.com とかでも .dev ドメインが購入・管理できるようになってたんすね。知りませんでした。まあ Cloudflare だけ対応ということはないもんな。
:::

僕は [korosuke613.dev](https://korosuke613.dev) というドメインを Google Cloud Domains に持っていたのですが、今回 Cloudflare Registrar にドメインを移管しました。ついでに DNS も Google Cloud DNS から Cloudflare DNS へ移行しました。

- [GoogleドメインからCloudFlareに移管する。 - Qiita](https://qiita.com/napspans/items/3e4030ea54948295c53e)
- [Google DomainsからCloudflareにドメインを移管した - ぷらすのブログ](https://blog.p1ass.com/posts/transfer-domain-to-cloudflare/)

ここら辺のブログ記事を参考にやってみたら簡単にできたので、Cloudflare Registrar 移行を考えている人は参考にしてみてください。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

[^tld]: Top Level Domain の略。ドメインの最後の部分。
[^dev_dominant]: 要出典。昔は Google Domains でしか買えなかったと思うけど、ググってもそれを示す一次的なソースを見つけられなかった...

# know-how 🎓

## 詳解 : Seekable OCI を使用した AWS Fargate におけるコンテナイメージの遅延ロード | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/under-the-hood-lazy-loading-container-images-with-seekable-oci-and-aws-fargate/

記事内にリンクされている前回記事も合わせてみると良い
https://aws.amazon.com/jp/blogs/news/aws-fargate-enables-faster-container-startup-using-seekable-oci/

コンテナを run するときに実際に必要となるファイルやバイナリはイメージのごく一部であることが多いので、最初にイメージ全てを pull せずに必要になったタイミングで遅延 pull すればコンテナの立ち上げが早くできるので、そのためのツールを AWS が作成して Fargate も対応させたという話。

すごい簡単に言うと↑の話なのですが、この手の話は以前から eStargz という技術で containerd 界隈で実装されていて、それだと eStargz 用にイメージを再ビルドしなおす必要があったところを、AWS の Seekable OCI ではインデックスを外付けする形で同様のことが可能になった。加えて、それを動かす側として Fargate が対応しましたということっぽい。

そして記事には直接関係ないですが、最近の nerdctl 1.5.0 のリリースノートにも SOCI 対応が書かれていたのでユーザーの手元でも nerdctl run で試せるのかもしれない
https://github.com/containerd/nerdctl/releases/tag/v1.5.0

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [経済産業省、「ソフトウェア管理に向けたSBOM（Software Bill of Materials）の導入に関する手引」公開。環境構築、SBOM作成、運用管理など解説 － Publickey](https://www.publickey1.jp/blog/23/sbomsoftware_bill_of_materialssbom.html)
    - 日本政府も SBOM に乗り出してきた！機運が高まってきた
- **know-how 🎓**
- **tool 🔨**
  - [8ヶ月で リリース速度が約2倍、プルリクエスト件数122%向上した話](https://zenn.dev/offersmgr/articles/cf9e7282d5f2c8)
    - Offer MGR という Findy Team+とは違うツール
    - [Offers MGR 14 日間無料で試せる「トライアルプラン」を募集開始 - CNET Japan](https://japan.cnet.com/release/30882464/)

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->
