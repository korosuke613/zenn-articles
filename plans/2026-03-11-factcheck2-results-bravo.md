# ファクトチェック結果: Bravo（第2回）

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
検証日: 2026-03-11
担当: Bravo

## 検証結果

### 4. Zenn のアンカーリンク形式
- **判定**: 要確認
- **記事中の記述**: `[セットアップ（NAS）](#セットアップ（nas）)`（437行目）
- **検証結果**: Zenn は markdown-it-anchor を使用しており、見出しの ID 生成ルールは次の通り: (1) 英字は大文字→小文字変換、(2) 全角文字（日本語・全角記号含む）は URL エンコードされる。ただし、Zenn の実装では「全角文字はエンコードせずとも機能する」ことが確認されている（参考記事による検証結果）。つまり `#セットアップ（nas）` というリンクは、ブラウザ側の URL デコード処理により実際に機能する可能性が高い。`NAS` → `nas` の小文字変換は正しい。厳密にはアンカー ID は `%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%EF%BC%88nas%EF%BC%89` のような URL エンコード形式だが、Zenn ではデコード済みの日本語でもリンクが機能する。実際に zenn-cli プレビューで動作確認するのが最も確実。
- **ソース**: [Zenn での Markdown ページ内リンクの書き方](https://zenn.dev/k_kuroguro/articles/759fefb5b07667)
- **修正案**: 動作確認で問題なければ修正不要。万全を期すなら zenn-cli プレビューでリンクの動作を確認すること。

### 5. fstab の NFS マウントオプション vers=3
- **判定**: 正確
- **記事中の記述**: `nfs defaults,vers=3,proto=tcp,_netdev 0 2`
- **検証結果**: nfs(5) の man page によると、`vers=` は `nfsvers=` の代替オプションであり、互換性のために提供されている。両者は機能的に同一である。`vers=3` は NFS バージョン 3 を指定する正しい書式である。man page 原文: "This option is an alternative to the nfsvers option. It is included for compatibility with other operating systems." `vers=4.1` のような指定も有効と記載されている。
- **ソース**: [nfs(5) - Linux manual page](https://man7.org/linux/man-pages/man5/nfs.5.html)

### 6. journald の SystemMaxUse パラメータ名
- **判定**: 正確
- **記事中の記述**: 「`journald` の `SystemMaxUse` でログサイズを制限しておくことを推奨します」
- **検証結果**: journald.conf(5) の man page にて `SystemMaxUse=` パラメータの存在と用途が確認できた。このパラメータはジャーナルファイルが永続ストレージ（通常 `/var/log/journal`）上で使用できる最大ディスク容量を制御する。man page 原文: "SystemMaxUse= and RuntimeMaxUse= control how much disk space the journal may use up at most." デフォルト値はファイルシステムサイズの 10%（上限 4GB）。記事中の「ログサイズを制限」という説明は正確。
- **ソース**: [journald.conf(5) - Linux manual page](https://www.man7.org/linux/man-pages/man5/journald.conf.5.html)

## サマリー
- 正確: 2 件（#5 vers=3, #6 SystemMaxUse）
- 不正確: 0 件
- 要確認: 1 件（#4 Zenn アンカーリンク — 機能する可能性が高いが、zenn-cli での実機確認を推奨）
