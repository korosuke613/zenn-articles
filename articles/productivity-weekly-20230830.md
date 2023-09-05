---
title: "Productivity Weekly (2023-08-30号, 2023-08-23号)"
emoji: "🚚"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230830"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-08-30, 2023-08-23 合併号です。

今回が第 123 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## Repository Actions Runners List - The GitHub Blog
https://github.blog/changelog/2023-08-21-repository-actions-runners-list/

`repo:write` の権限を持っているリポジトリにおいて、上部タブの Actions -> Runners ページからそのリポジトリで使用可能なランナー確認することが可能になりました。今まで利用可能なランナー確認するためには、リポジトリか Organization の Settings -> Actions -> Runners のページを見る必要があったため、必然的にリポジトリか Organization の admin 権限が必要でした。

特にセルフホストランナーを利用する場合はワークフローの yaml に利用するセルフホストランナーを指定するラベルを事前に知っておく必要があるのですが、admin 権限を持たないユーザーは GitHub 上でそのラベルを確認できないのが少々面倒でした。今回のアップデートにより admin 権限がないユーザーでもランナーの状態とラベルを確認することが可能になったため、セルフホストランナーの管理者に問い合わせたり社内のドキュメントを調べるなど、GitHub 以外の手段で確認する手間が省けるようになるはずです。

*本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)*

## Secret scanning detects secrets in issues for free public repositories - The GitHub Blog
https://github.blog/changelog/2023-08-16-secret-scanning-detects-secrets-in-issues-for-free-public-repositories/

元々リポジトリの git の歴史内にシークレットが含まれていないかを調べる secret scanning が issue にも適用範囲が広がった。対象は public リポジトリのみ。

## Announcing Python in Excel
https://techcommunity.microsoft.com/t5/excel-blog/announcing-python-in-excel-combining-the-power-of-python-and-the/ba-p/3893439

Excel の中で Python コードが書けるようになりました。
現在はベータチャンネルのみの提供。
Python コードは Microsoft クラウド上の隔離されたコンテナ内で実行されるとのことなので、クライアントサイド実行による脆弱性はなさそう。

## Terraform ephemeral workspaces public beta now available
https://www.hashicorp.com/blog/terraform-ephemeral-workspaces-public-beta-now-available

Terraform cloud にて ephemeral workspaces とやらがパブリックベータ。
TTL を設定して ephemeral な環境を作成できるらしい。

## Google Cloud のマネージド Terraform、 Infrastructure Manager 登場！
https://zenn.dev/cloud_ace/articles/introduce-infra-manager

Google Cloud において、マネージドな Terraform 実行基盤 Infrastructure Manager の一般提供が始まっていました[^next]。
内部的には Cloud Build が使われているようです。

上記記事では、特徴、利用可能リージョン、料金、実行方法などがわかりやすく書かれています。
制約事項や著者が気になったことも載っており、利用前で落とし穴に気づけそうです。

[最近 HashiCorp は製品ライセンスに BUSL を採用することを発表しました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230816#hashicorp-adopts-business-source-license)。ざっくり言うと、もし競合製品の提供に利用する場合は制限がかかるライセンスです。僕の見解では Infrastructure Manager は Terraform Cloud の競合になりうるので利用に制限がかかりそうなのですが、当事者間で何かしらの取り決めをしているのかもしれません。
実際 HashiCorp のブログ記事で Infrastructure Manager が紹介されているため、権利的にはクリアとなっているのでしょう。安心ですね。

- [HashiCorp at Google Cloud Next: Seamless infrastructure deployment and management](https://www.hashicorp.com/blog/hashicorp-at-google-cloud-next-seamless-infrastructure-deployment-and-management)

僕は今回初めて Infrastructure Manager を知りました。一般提供される前はどんな状態だったのでしょうね。

もちろん Cloud Build を使えば同じことはできましたが、マネージドサービスとなって Cloud Build の知識がそこまで無くても使えるようになったことやワークフローを管理しなくて良くなるのは良いです。
今後 Google Cloud を Terraform 管理する場合の CD パイプラインの選択肢として検討したいですね。~~AWS も作ってくれ~~

:::message
余談ですが、Weekly では [Google Cloud の Config Connector](https://cloud.google.com/config-connector/docs/overview) の話題が出てきました。
Config Connector は Google Cloud リソースを k8s のリソースとして扱って管理できるようにするサービスです。

Terraform に歩み寄ってきたのが意外という意見が出てきました。

さらに余談ですが、Google Cloud CLI には既存のリソースを Terraform ファイルにエクスポートする機能があります。気になる方はこちらもご覧ください。

- [Google Cloud CLI で既存のリソースを Terraform ファイルにエクスポートするのを試す](https://zenn.dev/korosuke613/scraps/f91dedf3890a65)
:::

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

[^next]: Google Cloud Next '23 のタイミングっぽい。

## Upgrade with an Enterprise Account - The GitHub Blog
https://github.blog/changelog/2023-08-22-upgrade-with-an-enterprise-account/

github で　enterprise account が順次ロールアウト。enterprise account って何？

An enterprise account is coming to all Enterprise customers - The GitHub Blog
https://github.blog/2022-12-01-an-enterprise-account-is-coming-to-all-enterprise-customers/

Bring your enterprise together with enterprise accounts for all - The GitHub Blog
https://github.blog/2023-04-05-bring-your-enterprise-together-with-enterprise-accounts-for-all/

## Amazon Detective でセキュリティ調査を改善するために視覚化を強化
https://aws.amazon.com/jp/about-aws/whats-new/2023/08/amazon-detective-visualizations-security-investigations/

視覚化系がまた増えて便利になった話。

## Google Cloud Domains、生き残るっぽい。レジストラは Squarespace Domains になるけど。

https://twitter.com/Shitimi_613/status/1696458677614731327

（自分のツイートで恐縮ですが）

これまで何度か Google Domains が Squarespace に売却される話をしてきました[^domains_1][^domains_2]。

[^domains_1]: [Squarespace への Google Domains のドメイン登録の譲渡について - Google Domains ヘルプ](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230628#squarespace-%E3%81%B8%E3%81%AE-google-domains-%E3%81%AE%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E7%99%BB%E9%8C%B2%E3%81%AE%E8%AD%B2%E6%B8%A1%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6---google-domains-%E3%83%98%E3%83%AB%E3%83%97)
[^domains_2]: [Shhh… 🤫 @Cloudflare Registrar just quietly rolled out support for the following TLDs:](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230802#shhh%E2%80%A6-%F0%9F%A4%AB-%40cloudflare-registrar-just-quietly-rolled-out-support-for-the-following-tlds%3A)

Google Domains が終了することで、Google Domains に依存している Google Cloud Domains も終了するとされていました。

しかし、最近ヘルプページの「What does this mean for Cloud Domains customers?」の項目が更新され、Cloud Domains は Google Domains の Squarespace への売却後も継続して提供されることが明記されました。

> Cloud Domains will continue to be available before and after the closing of the transaction. Google will continue to offer customer support and will be responsible for billing your account. Cloud Domains UI, API and gcloud CLI will continue to be supported.
> 
> (DeepL Pro による翻訳) クラウド ドメインは、取引の完了前も完了後も引き続きご利用いただけます。Googleは、引き続きカスタマーサポートを提供し、お客様のアカウントの請求に責任を負います。Cloud DomainsのUI、API、gcloud CLIは引き続きサポートされます。
>
> *現在のヘルプページ: https://support.google.com/domains/answer/13689670?hl=en*

少なくとも 7/2 時点では明言されていませんでした。

> We are anticipating that the migrations of domains and data (registrant, WHOIS info, and in some cases DNS delegation) to Squarespace will take place in 2024. You can continue to use Cloud Domains until your domain is migrated. We will work with Squarespace to make the migration as seamless as possible.
> 
> (DeepL Pro による翻訳) ドメインとデータ（登録者、WHOIS情報、場合によってはDNS委任）のSquarespaceへの移行は2024年に行われる予定です。ドメインが移行されるまで、Cloud Domainsを引き続きご利用いただけます。Squarespaceと協力し、可能な限りシームレスな移行を実現します。
>
> 7/2 時点のヘルプページ: https://web.archive.org/web/20230702090734/https://support.google.com/domains/answer/13689670

ただ、あくまで Cloud Domains はドメイン管理、販売のためのサービスが続くだけで、レジストラは Squarespace になります。
（もともと Cloud Domains で販売していたドメインもレジストラは Google Domains であったため（という認識）、そこが変わるだけとも言えそうです。）

Cloud Domains の利点の 1 つは Google Cloud 利用者にとってドメイン管理を Google Cloud と同じアカウントで行えることでしたが、これは今後も継続されるようです。
Google Cloud の顧客からいろいろフィードバックが来たのかは知りませんが、Google を経由して支払いも可能であるようなので、Cloudflare などの他のサービスに移行したい理由は減ったかもしれません。

:::message
ちなみに僕はすでに Cloudflare へ .dev ドメインを移管しました。Cloud Domains 続くなら移管しなくてよかったんだけどなー...
いまさら戻れと言ってももう遅い（追放系なろう）
:::

:::details 付録: 7/2 時点と 9/3 時点での「What does this mean for Cloud Domains customers?」の差分。

```diff txt:7/2 時点と 9/3 時点での「What does this mean for Cloud Domains customers?」の差分
--- 0702.txt	2023-09-03 17:48:35
+++ 0903.txt	2023-09-03 17:49:08
@@ -1,6 +1,11 @@
 What does this mean for Cloud Domains customers?

-Google Cloud Domains had a strong dependency on Google Domains, so customers using Cloud Domains will be migrated to Squarespace. Google Cloud will issue a product MSA (Mandatory Service Announcement) to all impacted customers with more details about what to expect during the migration period.
+We wanted to assure you that we will continue to provide and support Cloud Domains. Since Google Domains is the underlying domains registrar for Cloud Domains, there are some important changes that will need to be made.

-We are anticipating that the migrations of domains and data (registrant, WHOIS info, and in some cases DNS delegation) to Squarespace will take place in 2024. You can continue to use Cloud Domains until your domain is migrated. We will work with Squarespace to make the migration as seamless as possible.
+Upon closing of the Squarespace-Google Domains transaction, Squarespace Domains will become the registrar for your domains managed by Cloud Domains. Squarespace Domains is an independent domain registrar service provided by Squarespace. Your domain registrations will be migrated to Squarespace Domains after a transition period which we anticipate will be no sooner than January 2024. We will work with Squarespace to make the migration as seamless as possible.

+In connection with this migration, the information associated with your domain registrations including domain configuration, WHOIS data (which includes customer contact info, and DNS delegation) will be migrated to Squarespace Domains. Once migrated, this data will be governed by Squarespace’s Privacy Policy, and the Squarespace Terms of Service will apply to your registrations. No Google Cloud Customer Data is transferred or exchanged with Squarespace.
+
+Cloud Domains will continue to be available before and after the closing of the transaction. Google will continue to offer customer support and will be responsible for billing your account. Cloud Domains UI, API and gcloud CLI will continue to be supported.
+
+On August 15, 2023, Google Cloud sent an MSA to our Cloud Domains customers with details on what to expect during the migration period.
```

:::

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Fig has joined AWS!
https://fig.io/blog/post/fig-joins-aws

[結構前に紹介した Fig というターミナルの補完を強化するツール](https://zenn.dev/korosuke613/articles/productivity-weekly-20211124#fig-%7C-%F0%9F%8E%89-launching-fig)が AWS に買収されました。

Fig は macOS 向けのターミナルアプリ上でコマンドを打つ際に自動補完を IDE チックにしてくれるツールです。Team plan や Enterprise plan で収益化を計っていましたが、基本的な機能は無料で使うことができていました。

今回の AWS による買収で、有料の Fig Team 相当機能が現在無料で提供されています（今後も無料かは不明）。

例えばちょっと前に自然言語から Bash のコマンドを生成する [`fig ai`](https://fig.io/user-manual/ai) 機能が有料ユーザ向けにベータリリースされましたが、こちらも無料ユーザでも使えるようになっています。

個人的にはとてもお世話になっているツールで、コマンド補完に関して何度かコントリビューションもしてきました。AWS がバックに付くことで、さらなる機能強化やサービスの安定化が期待できそうです。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## OpenAI、企業向け「ChatGPT Enterprise」提供開始　高速GPT-4でプライバシーも安全

https://www.itmedia.co.jp/news/articles/2308/29/news095.html

## GPT-3.5 Turbo fine-tuning and API updates
https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates

GPT-3.5 Turbo のファインチューニングが可能になり、ユーザー側でモデルをカスタマイズできるようになったよ。
GPT-4 のファインチューニングは今秋対応予定とのこと。
ファインチューニング API に送受信されるデータは OpenAI や他組織のモデルをトレーニングするために使われることはない。
トレーニングにはお金がかかるし、トレーニング後のモデルの利用による入出力でかかる料金はベースモデルの数倍になるっぽい。

## ［速報］Google Cloudの開発や問題解決をAIが支援してくれる「Duet AI in Google Cloud」がVSCodeなどで利用可能に。Google Cloud Next '23 － Publickey
https://www.publickey1.jp/blog/23/google_cloudaiduet_ai_in_google_cloudvscodegoogle_cloud_next_23.html

# know-how 🎓

## AWSコスト削減とリソース管理 | 外道父の匠
https://blog.father.gedow.net/2023/08/24/aws-cost-saving/

長文記事ですが、昔から AWS のインフラ周りを取り組まれていた方が AWS で節約するためのテクニックを公開してくれているので勉強になりました。

## iOS開発におけるGitHub Actions self-hosted runnerを利用したオンプレ CI/CD のすゝめ | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/43705/

サイバーエージェントでは以前からオートスケール可能なセルフホストランナーを特定のプラットフォームに依存せず構築可能な [myshoes](https://github.com/whywaita/myshoes) という OSS を開発しており、従来はプライベートクラウドと LXD の組み合わせで GitHub Actions のジョブごとに毎回クリーンな環境のランナーを提供されていました。

今回、自社 DC に新たに M2 Mac Mini を追加し、myshoes で管理することで Linux 同様に macOS のセルフホストランナーも提供可能になったようです。さらに macOS でも VM を活用することで毎回クリーンな環境のランナーを提供できるようです。

後半は実際にこの macOS のセルフホストランナーを活用して従来の CI サービスから乗り換えた事例の紹介で、最終的にはビルド時間の平均が従来の約 1/3 に短縮されるという大きな効果があったそうです。

最近では OSS、あるいは内製でオートスケール可能な Linux のセルフホストランナーを提供する事例は増えてきていますが、macOS のセルフホストランナーを同様に提供している事例はほとんど無いので驚きました。自分の知る限りでは他には MIXI も同様の取り組みをされてるぐらいだと思います（[スライド](https://speakerdeck.com/bbqallstars/cd-conference-2023-by-cloudnative-days-qian-ye-ji)、[動画](https://youtu.be/2Y2PpCUu9os?si=k8UH2XF5HDsYCJx_)）。macOS の CI 基盤を独自運用する場合には両社の事例はかなり参考になると思います。


*本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)*


## ZOZO TECH BLOGを支える技術 #2 執筆をサポートするCI/CD - ZOZO TECH BLOG
https://techblog.zozo.com/entry/techblog-writing-support-by-ci-cd

はてなブログへの投稿に CI/CD を適用し、textlint による文章構成、プレビュー用環境への自動デプロイ、本番公開を自動化している事例。公開自体はhttps://github.com/x-motemen/blogsync という CLI ツール利用している。

## GitHub Copilot Patterns & Exercises 🤖をリリースしました！🎉
https://twitter.com/yuhattor/status/1692005132362494191

## 「Datadog入れてみたらAWSの料金が爆発した話」@ゆるSRE勉強会 #1 - Speaker Deck 
https://speakerdeck.com/rynsuke/datadogru-retemitaraawsnoliao-jin-gabao-fa-sitahua-at-yurusremian-qiang-hui-number-1

やっぱどこも NAT ゲートウェイに悩まされるのだなぁ、と思った。

# tool 🔨

## dnakov/little-rat: 🐀 Small chrome extension to monitor (and optionally block) other extensions' network calls
https://github.com/dnakov/little-rat

chrome extension モニタできるのかー、というのが気になっている。
ソース見てから試してみたい。

## OrbStack で k8s クラスタを簡単に作れるように
https://twitter.com/OrbStack/status/1696431454434062745

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
