---
title: Copilot in GitHub SupportがGA！GitHubの仕様に関するわからないことをすばやく解決できやすくなったよ
emoji: 🙋
type: idea
topics:
  - github
  - githubcopilot
published: true
published_at: 2024-02-26 10:00
---

2024 年 2 月 9 日、GitHub Support において、GitHub 公式ドキュメントを学習した GitHub Copilot とやりとりできるようになりました[^beta]。

実際に触ってみたところ **GitHub の仕様に関する調べごとを行う際にとても便利**そうだったため、具体例や気づいたことと一緒に紹介します。

https://github.blog/2024-02-09-copilot-in-github-support-is-now-available/

[^beta]: それまでは一部の GitHub Enterprise ユーザがクローズドで使えたようです。今回一般提供が始まったことで、GitHub Free ユーザも触れるようになりました。

# そもそもなんなのか
発表されたブログ記事には次のことが書かれています。

> Copilot in GitHub Support is trained on the official GitHub documentation and offers a responsive conversational experience to deliver reliable advice on a wide range of GitHub-related topics.

*（意訳） Copilot in GitHub Support は、GitHub の公式ドキュメントに基づいてトレーニングされており、GitHub 関連の幅広いトピックについて信頼できるアドバイスを応答性の高い会話体験として提供します。*

とのことです。ざっくり言うと **GitHub の公式ドキュメントを学習した ChatGPT なり GitHub Copilot Chat のようなものが、サポートサイトで使えるようになった**ということですね。

# 何が嬉しいか

公式ブログにはこう書かれています。

> Copilot in GitHub Support reduces the need to manually search for the right context across different pages in the official GitHub documentation. The assistant efficiently distills relevant information from multiple GitHub documents at once into a concise, tailored response—significantly reducing the time required to research a topic and often removing the need for a traditional round-trip response from our Support team.

*（ほとんど DeepL 翻訳結果そのまま） Copilot in GitHub Support は、GitHub 公式ドキュメントのさまざまなページから適切なコンテキストを手作業で検索する必要性を軽減します。このアシスタントは、一度に複数の GitHub ドキュメントから関連する情報を効率的に抽出し、簡潔でカスタマイズされた応答を返します。これにより、調査に必要な時間が大幅に短縮され、多くの場合、サポート チームからの従来の往復応答が不要になります。*

要は、次の嬉しさがあるわけですね。

- GitHub 公式ドキュメントを手作業で検索する必要性が減る
- サポートチームとのやり取りを待つ必要がなくなる
- 上記により調査に必要な時間が大幅に短縮される

**GitHub 公式ドキュメントは膨大で、目的の事柄を探すのが正直大変です。**

また、自分で調べてわからなかったらサポートに問い合わせれば良いのですが、**これまでは GitHub のサポートチームが全てを回答していたため、どうしてもやり取りに時間がかかってしまっていました**。さらに**サポートとのやり取りは基本的[^plan]に英語**でなければならないため、英語が苦手な方はハードルが高いということもあります。

もちろん相手は生成 AI なので、**必ずしも正しい答えが得られるとは限らないことに注意**です。

[^plan]: プラン次第では日本語でのサポート対応をしてもらえるよ。

# 機能紹介
:::message
使い方は[公式ブログ記事](https://github.blog/2024-02-09-copilot-in-github-support-is-now-available/)と[公式ドキュメント](https://docs.github.com/en/support/learning-about-github-support/about-copilot-in-github-support)を参照ください。
ここではざっくりとした機能を紹介します。
:::

Copilot in GitHub Support にサポートを求める場合は、チケット作成画面で「Chat with Copilot in GitHub Support」を選びましょう（デフォルト選択）。Copilot in GitHub Support からの回答に対してその場でさらに質問できます。

回答には都度、「どのドキュメントを参考にしたか」がリンクで出力されます。Copilot が誤った情報を書いてないか確認するためにも一次ソースを確認するのが良いです。

最終的に問題が解決したら万々歳。
もしも解決しなかった場合はそのままサポートチケットを発行できます。

良い応答・悪い応答には適宜サムズアップ👍、サムズダウン👎をポチッとしましょう。

利用する際は公式ドキュメントもちゃんと読みましょう。公式ドキュメントには Copilot in GitHub Support の仕組みや制限事項、ベストプラクティスとユースケース、フィードバックの共有についてが書かれています。

https://docs.github.com/en/support/learning-about-github-support/about-copilot-in-github-support

## 免責事項

なお、利用画面には免責事項が表示されます。

> **Disclaimer: Copilot in GitHub Support**
> Please note that 'Copilot in GitHub Support' is an AI engine, not a human. For the most effective support, we recommend communicating in English. If you prefer assistance from a human, please click the button below the chat to submit your ticket. While we strive to keep Copilot in GitHub Support current, there may be occasions when the official documentation is updated before these changes are reflected in Copilot in GitHub Support. We advise visiting the provided links to ensure you have the most accurate and up-to-date information.

要約すると、次のことが書かれています。

- 人間じゃないから注意してね
- 最も効果的なサポートを受けるためには英語がおすすめ
- Copilot in GitHub Support は常に最新の情報だとは限らないので、提供されている公式ドキュメントのリンクも参照してね


# 実際に試してみる

さっそく試してみました。

僕は以前、GitHub Actions の Variables を GitHub Actions 上で更新する際に、権限がよくわからず四苦八苦したので、それについて聞いてみましょう。

### 最初の質問

![](/images/copilot-in-github-support/chat.png)
*質問・回答1*

**質問1**
> GitHub Actions の variables を `${{ secrets.GITHUB_TOKEN }}` の権限を使って更新することはできますか？

**回答1**
> GitHub Actions の variables を更新するためには、REST API `を使用する必要があります。しかし、GITHUB_TOKEN` を使用して variables を更新することはできません。これは、`GITHUB_TOKEN` が限定的な権限しか持っていないためです。
>
> variables を更新するためには、`admin:org` スコープを持つアクセストークンが必要です。このトークンは、GitHub Apps または個人のアクセストークンを介して取得できます。
>
> 以下に、REST API を使用して organization variable を更新する例を示します：
>
> ```
> curl \
>   -X PATCH \
>   -H "Accept: application/vnd.github+json" \
>   -H "Authorization: Bearer <YOUR-TOKEN>" \
>   https://api.github.com/orgs/ORG/actions/variables/VARIABLE_NAME \
>   -d '{
>     "value": "NEW_VALUE"
>   }'
> ```
>
> この例では、`<YOUR-TOKEN>` を `admin:org` スコープを持つアクセストークンに、`ORG` を組織の名前に、`VARIABLE_NAME` を更新したい変数の名前に、`NEW_VALUE` を新しい値に置き換えてください。
>
> なお、この操作を行う前に、必要な権限を持つアクセストークンを安全に管理することを確認してください。

正しいですね！`GITHUB_TOKEN` では variables は更新できません。

curl による API 実行例が書かれているのも親切で良いですね。

:::message
ただ、`X-GitHub-Api-Version` ヘッダを指定していないため、将来的にこのコマンド例は使えなくなる可能性がありますね（現状、省略すると既定で `2022-11-28` バージョンが適用される）。
:::

### さらに質問

しかし、僕は実は repository variables の更新をしたかったことを思い出しました。そのままさらに質問しましょう。


![](/images/copilot-in-github-support/chat2.png)
*質問・回答2*

**質問2**
> repository variables の場合はどうですか？

**回答2**
> リポジトリの variables を更新する場合も、`GITHUB_TOKEN` ではなく、`repo` スコープを持つアクセストークンが必要です。これは、`GITHUB_TOKEN` が限定的な権限しか持っていないためです。
>
> 以下に、REST API を使用してリポジトリのvariableを更新する例を示します：
>
> ```
> curl \
>   -X PATCH \
>   -H "Accept: application/vnd.github+json" \
>   -H "Authorization: Bearer <YOUR-TOKEN>" \
>   https://api.github.com/repos/OWNER/REPO/actions/variables/VARIABLE_NAME \
>   -d '{
>     "value": "NEW_VALUE"
>   }'
> ```
>
> この例では、`<YOUR-TOKEN>` を `repo` スコープを持つアクセストークンに、`OWNER` をリポジトリの所有者の名前に、`REPO` をリポジトリの名前に、`VARIABLE_NAME` を更新したい変数の名前に、`NEW_VALUE` を新しい値に置き換えてください。
>
> なお、この操作を行う前に、必要な権限を持つアクセストークンを安全に管理することを確認してください。

やはり正しい回答ですね！リポジトリの場合はスコープが変わるのです。

<!-- textlint-disable ja-technical-writing/ja-no-successive-word -->

### さらにさらに質問

<!-- textlint-enable ja-technical-writing/ja-no-successive-word -->

しかし出てくる回答は API トークンの利用を前提としています。時代は GitHub Apps です（諸説あり）。GitHub Apps の場合はどうすればいいのかさらに聞きましょう。



![](/images/copilot-in-github-support/chat3.png)
*質問・回答3*

**質問3**
> アクセストークンではなく、GitHub Appsを利用する場合はどうなりますか？

**回答3**
> GitHub Apps を使用してリポジトリの variables を更新する場合、その App は `actions_variables:write` のリポジトリ権限を持っている必要があります。
>
> 以下に、REST APIを使用してリポジトリのvariableを更新する例を示します：
>
> ```
> curl \
>   -X PATCH \
>   -H "Accept: application/vnd.github+json" \
>   -H "Authorization: Bearer <APP-TOKEN>" \
>   https://api.github.com/repos/OWNER/REPO/actions/variables/VARIABLE_NAME \
>   -d '{
>     "value": "NEW_VALUE"
>   }'
> ```
>
> この例では、`<APP-TOKEN>` をGitHub Appのインストールアクセストークンに、`OWNER` をリポジトリの所有者の名前に、`REPO` をリポジトリの名前に、`VARIABLE_NAME` を更新したい変数の名前に、`NEW_VALUE` を新しい値に置き換えてください。
>
> この操作を行う前に、GitHub App が必要な権限を持っていることを確認してください。

すばらしいです！GitHub Apps の場合は `actions_variables:write` の権限が必要なのはその通りです。

**GitHub Actions の権限周りはなかなか調べるのが面倒なので、Copilot in GitHub Support で気軽に素早く答えがわかるのは嬉しいですね。**

ただ、今回触ってみて使用感に関してはいくつか気になった点はあったので、次に挙げておきます。

- ページを移動すると内容が見られなくなってしまう
  - Submit a Ticket をクリックするまでチケットは発行されないため
    - チケット一覧にも残らない
  - 良い回答が得られたらスクショ等で保存しておこう
- チャット中は変換確定時のエンターキー押下でチャットが送信されてしまう
  - 日本語でチャットする際は質問内容を別途書いてから貼り付けるなどをした方が良さそう
- 「My problem is solved!」をクリックすると紙吹雪が舞うよ。解決したら押していこう

特にページを移動すると内容が見られなくなってしまうのは落とし穴感が強いです。使う際は覚えておきましょう。

# 所感
触ってみての感想ですが、やはりドキュメントを探さずとも答えに辿り着けるのは嬉しいですね。
正直**ここまで良い感じの答えを出してくれるとは思ってなかったため驚きました**。

もちろん回答を鵜呑みにはできないため、間違ったことを言ってないかどうかはしっかりと確認する必要がありますが、ドキュメントへのリンクが貼られるため、確認は比較的容易です。
僕は英語が苦手なので、まずは Copilot in GitHub Support で聞いてみて、ドキュメントを見て、それでもわからなかったらサポートチケットを発行するという使い方をしていきたいです。

ちなみに、**他の AI アシスタントにも同じ質問をしてみましたが、まともな回答をしたのは Copilot in GitHub Support のみ**でした。（詳しくは後述の[おまけ](#おまけ%3A-他の-ai-アシスタントにも聞いてみる)を参照ください。）
やはり GitHub Docs を学習しているのは大きいですね。
GitHub に関する質問では積極的に Copilot in GitHub Support を使っていきたいですね。

**Copilot in GitHub Support、なかなか便利な機能です。人に質問するよりハードルは低いし、日本語で質問できるのでどんどん使っていきたいですね。**

# おまけ: 他の AI アシスタントにも聞いてみる

はい。本当に Copilot in GitHub Support に優位性はあるのか？ということで、他の AI アシスタントにも同じ質問をしてみました。

## ChatGPT 3.5 の回答
**質問1**
> GitHub Actions の variables を `${ secrets.GITHUB_TOKEN }` の権限を使って更新することはできますか？

**回答1**
> GitHub Actionsの `${{ secrets.GITHUB_TOKEN }}` は、特定のリポジトリへのアクセス権を提供するトークンですが、変数を更新するためにそのトークンを使用することは一般的にはサポートされていません。
> 
> `${{ secrets.GITHUB_TOKEN }}` は通常、ワークフロー内で実行されるジョブに関連付けられており、そのジョブ内でのGitHubリポジトリへのアクセスに使用されます。しかし、変数の更新はワークフローの制御フローの外部で発生する可能性があり、セキュリティ上の理由から `${{ secrets.GITHUB_TOKEN }}` を使用して変数を更新することは許可されていない場合があります。
> 
> 変数の更新を行う場合は、代わりにPersonal Access Token（PAT）を使用するか、必要な権限を持つサービスアカウントのトークンを利用することがあります。ただし、これには慎重に管理された権限とセキュリティ対策が必要です。
> 
> 詳細な要件に基づいて具体的なケースに対するアドバイスを提供するには、もう少し具体的な情報が必要です。

ChatGPT に課金していないので ChatGPT 3.5 での回答となります。

回答は概ね正しいと思われるのですが、ソースは不明です。また、Copilot in GitHub Support にはあった、その他の実現方法までは教えてくれませんでした。
せっかくなので聞いてみましょう。

**質問2**
> ではどのように GitHub Actions の variables を API で更新できますか？

**回答2**
> GitHub Actions の変数を API 経由で更新するためには、GitHub REST API を使用する必要があります。変数の更新にはリポジトリのシークレットを管理するための権限が必要です。以下は、変数を更新するための一般的な手順です。
> 
> 1. Personal Access Token（PAT）の作成:
>    - GitHub アカウントで PAT を作成します。このトークンには必要な権限が必要です。最低限、`repo` スコープが必要ですが、変数の管理に関連する権限も確認してください。
> 
> 2. REST API を使用して変数を更新:
>    - `secrets` API を使用して変数を更新します。以下は、変数を作成または更新するための例です。
> 
> ```bash
> REPO_OWNER=your_username
> REPO_NAME=your_repository
> SECRET_NAME=your_secret_name
> PAT=your_personal_access_token
> 
> # Create or update a secret
> curl -X PUT \
>   -H "Authorization: token $PAT" \
>   -H "Accept: application/vnd.github.v3+json" \
>   https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/secrets/$SECRET_NAME \
>   -d '{"encrypted_value":"your_encrypted_value","key_id":"your_key_id"}'
> ```
> 
> このコマンドでは、`$REPO_OWNER`、`$REPO_NAME`、`$SECRET_NAME`、および `$PAT` を自分のリポジトリとアカウントの情報に適切に置き換える必要があります。`encrypted_value` と `key_id` は、変数の暗号化値とそのキーの ID に置き換える必要があります。
> 
> なお、GitHub Actions の変数はセキュリティ上の理由から暗号化されています。そのため、新しい値を設定する場合には、GitHub の API を使用して変数の暗号化を行う必要があります。それを行わないと、変数の値は正しく機能しない可能性があります。

うーむ。残念ながら variables を secrets と判断してしまったようです。

再度聞いてみましょう。

**質問3**
> その方法は secrets の更新方法です。variables の更新方法を教えてください

**回答3**
> GitHub Actions における変数（variables）は、通常ワークフロー内で動的に設定され、その後に使用されますが、変数そのものを API を使って直接更新する方法は提供されていません。
> 
> GitHub Actions の変数は、ジョブの実行中に動的に設定されるものであり、ワークフローの中でのみ有効です。API を使用して直接変数を更新することはサポートされておらず、そのような用途のための API エンドポイントも存在しません。
> 
> 変数の更新を行いたい場合は、その変数が定義されているジョブやスクリプト内で、通常のプログラミングの手法で更新する必要があります。ワークフローが実行される際に変数が設定され、その後のステップやジョブでその変数を利用する形が一般的です。

だいぶ的外れなことを言われています。GitHub Actions の variables を知らなそうですね。

:::details スクリーンショット
![](/images/copilot-in-github-support/chatgpt_1.png)

![](/images/copilot-in-github-support/chatgpt_2.png)

![](/images/copilot-in-github-support/chatgpt_3.png)
:::

## Microsoft Copilot の回答

**質問**
> GitHub Actions の variables を `${ secrets.GITHUB_TOKEN }` の権限を使って更新することはできますか？

**回答**
> GitHub Actions では、シークレットを使用して組織、リポジトリ、またはリポジトリ環境に機密情報を格納できます. シークレットは、ワークフロー内で利用できる変数であり、GitHub Actions でシークレットを読み取ることができるのは、ワークフローに明示的に含めた場合のみです. 
>
> `secrets.GITHUB_TOKEN` は、GitHub Actions ワークフロー内で自動的に提供されるトークンであり、リポジトリのアクセス権限を持ちます。このトークンを使用すると、ワークフロー内でリポジトリに対する操作（例：コードのビルド、テスト、デプロイ）を行うことができます。ただし、一部の操作ではパーミッションエラーが発生することがあります.
>
> 具体的には、`secrets.GITHUB_TOKEN` を使用してリポジトリの変数を更新することはできますが、一部の操作では制限があることに注意してください。詳細な操作については、アクションの README ファイルを確認してください。
>
> 簡潔に言えば、`secrets.GITHUB_TOKEN` を使用してリポジトリの変数を更新することは可能ですが、パーミッションの制限に注意してください。.

ChatGPT 3.5 と同じく secrets と判断されてしまいました。その後さらに質問を重ねましたが残念ながら的を得た回答は得られませんでした。

:::details スクリーンショット
![](/images/copilot-in-github-support/ms_copilot.png)
:::


## Gemini の回答

**質問**
> GitHub Actions の variables を `${ secrets.GITHUB_TOKEN }` の権限を使って更新することはできますか？

**回答**

> はい、GitHub Actions の variables を `${ secrets.GITHUB_TOKEN }` の権限を使って更新することは**可能です**。ただし、いくつかの注意事項があります。
> 
> **方法**
> 
> 1. **リポジトリ設定でシークレットとして GITHUB_TOKEN を設定する**
> 
>    - リポジトリの設定に移動します。
>    - 左側のメニューから **セキュリティ** > **シークレットと変数** を選択します。
>    - **新しいシークレット** をクリックします。
>    - **名前** に `GITHUB_TOKEN` と入力します。
>    - **値** に、GitHub Personal Access Token (PAT) を入力します。
>    - **アクセス許可** で、`actions` ワークフローにのみアクセス権を与えるように設定します。
>    - **保存** をクリックします。
> 
> 2. **ワークフローファイルで変数を設定する**
> 
>    - ワークフローファイル (`.github/workflows/*.yml`) を編集します。
>    - ジョブのステップで、`env` キーを使用して変数を設定します。
>    - 変数の値には、`${ secrets.GITHUB_TOKEN }` を使用します。
> 
> ```
> jobs:
>   build:
>     runs-on: ubuntu-latest
>     steps:
>     - name: Checkout code
>       uses: actions/checkout@v2
> 
>     - name: Install dependencies
>       run: npm install
> 
>     - name: Build and test
>       run: npm run build && npm test
> 
>     - name: Deploy to GitHub Pages
>       uses: actions/deploy-pages@v1
>       with:
>         github_token: ${{ secrets.GITHUB_TOKEN }}
> ```
> 
> **注意事項**
> 
> * `${ secrets.GITHUB_TOKEN }` は、ワークフローファイル内でのみ使用できます。
> * `${ secrets.GITHUB_TOKEN }` は、プレーンテキストとして出力されないように注意してください。
> * `${ secrets.GITHUB_TOKEN }` を使用するワークフローは、`actions` ワークフローにのみアクセス権を与えるように設定する必要があります。
> * `${ secrets.GITHUB_TOKEN }` を使用する際は、セキュリティリスクを考慮する必要があります。
> 
> **参考資料**
> 
> * GitHub Actions のセキュリティ強化: [https://docs.github.com/ja/actions/security-guides/security-hardening-for-github-actions](https://docs.github.com/ja/actions/security-guides/security-hardening-for-github-actions)
> * 自動トークン認証: [https://docs.github.com/ja/actions/security-guides/automatic-token-authentication](https://docs.github.com/ja/actions/security-guides/automatic-token-authentication)
> * GitHub Actions でのシークレットの使用: [https://docs.github.com/ja/actions/security-guides/using-secrets-in-github-actions](https://docs.github.com/ja/actions/security-guides/using-secrets-in-github-actions)

こちらも secrets と判断してしまいました。やはり variables の存在を知らなさそうです。

:::details スクリーンショット
![](/images/copilot-in-github-support/gemini_1.png)

![](/images/copilot-in-github-support/gemini_2.png)
:::
