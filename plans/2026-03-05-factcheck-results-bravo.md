# ファクトチェック結果: bravo

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
検証日: 2026-03-05
担当: bravo

## 検証結果

### 7. iSCSI 標準ポート 3260
- **判定**: 正確
- **記事中の記述**: 「iSCSI ポート（標準: 3260）」
- **検証結果**: IANA により TCP ポート 3260 が iSCSI Target サービスに公式に割り当てられている。RFC 7143（iSCSI プロトコルの統合版 RFC）でも 3260 が標準ポートとして規定されている。
- **ソース**: [RFC 7143 - Internet Small Computer System Interface (iSCSI) Protocol (Consolidated)](https://datatracker.ietf.org/doc/html/rfc7143), [Port 3260 - WhatPortIs](https://whatportis.com/ports/3260_iscsi-target)

### 8. Raspberry Pi firmware issue #934（dhcp-reply-delay バグ）
- **判定**: 要確認
- **記事中の記述**: 「dhcp-reply-delay=2 は PXE クライアントのファームウェアバグを回避するため」、リンク: https://github.com/raspberrypi/firmware/issues/934
- **検証結果**: URL は有効。issue #934 は実在し、PXE ブート時の DHCP 応答タイミング問題について議論されている。`dhcp-reply-delay=2` が回避策として推奨されている点も正確。ただし、issue のタイトルは「PXE Problems with RPi3」であり、主に **Raspberry Pi 3** に関する問題として報告されている。記事は Raspberry Pi 4B を対象としているため、Pi 4B の EEPROM ブートローダーでも同じ問題が発生するかは issue からは直接確認できない。Pi 4B でも dhcp-reply-delay が有効であること自体は筆者の実体験に基づくと思われるが、issue #934 を Pi 4B のバグの根拠として引用するのはやや不正確な可能性がある。
- **ソース**: [PXE Problems with RPi3 - Issue #934](https://github.com/raspberrypi/firmware/issues/934)
- **修正案**: 「Raspberry Pi の PXE クライアントのファームウェアバグを回避するために必要です」の注釈に、issue #934 は主に Pi 3 に関する報告であることを補足するか、Pi 4B でも同様の挙動が確認された旨を明記するとよい。

### 9. auto_initramfs=1 の config.txt オプション
- **判定**: 正確
- **記事中の記述**: 「auto_initramfs=1 を指定することで、TFTP ディレクトリ内の initramfs を自動的にロード」「kernel8.img → initramfs8」
- **検証結果**: Raspberry Pi 公式ドキュメントにより確認。`auto_initramfs=1` を設定すると、ファームウェアがカーネルファイル名に対応する initramfs を自動検索する。命名規則は「カーネルファイル名の `kernel` プレフィックスを `initramfs` に置換し、`.img` 等の拡張子を除去」であり、`kernel8.img` → `initramfs8` は正確。なお、Pi 4 / 400 / CM4 ではデフォルトで `auto_initramfs=1` が有効。
- **ソース**: [Raspberry Pi Documentation - config.txt](https://www.raspberrypi.com/documentation/computers/config_txt.html), [raspberrypi/documentation - boot.adoc](https://github.com/raspberrypi/documentation/blob/master/documentation/asciidoc/computers/config_txt/boot.adoc)

### 10. Bookworm 以降はデフォルトの pi ユーザーが存在しない
- **判定**: 不正確
- **記事中の記述**: 「Bookworm 以降はデフォルトの pi ユーザーが存在しないため、手動で作成する」
- **検証結果**: デフォルトの `pi` ユーザーが削除されたのは **Bookworm（2023年10月リリース）からではなく、Bullseye の 2022年4月アップデート** からである。Raspberry Pi 公式ブログ「An update to Raspberry Pi OS Bullseye」（2022年4月4日付）で、セキュリティ強化のためデフォルトユーザーを廃止し、初回起動時のセットアップウィザードでユーザー作成を必須とする変更が発表された。したがって、Bookworm に限定した記述は不正確であり、正しくは「Bullseye の 2022年4月アップデート以降」である。ただし、Bookworm でもデフォルト pi ユーザーが存在しないことは事実であるため、「Bookworm ではデフォルトの pi ユーザーが存在しない」という事実自体は正しい。
- **ソース**: [An update to Raspberry Pi OS Bullseye - Raspberry Pi](https://www.raspberrypi.com/news/raspberry-pi-bullseye-update-april-2022/), [Raspberry Pi OS Loses Default 'Pi' User for Security - Tom's Hardware](https://www.tomshardware.com/news/raspberry-pi-default-username-removed)
- **修正案**: 「Bookworm 以降は」を「Bullseye（2022年4月アップデート）以降は」に変更する。または、記事の文脈（Bookworm を使用している前提）を考慮して「Raspberry Pi OS では（2022年4月の Bullseye アップデート以降）デフォルトの pi ユーザーが存在しないため」のように補足する。

### 11. /etc/iscsi/iscsi.initramfs フラグファイル
- **判定**: 正確
- **記事中の記述**: 「このファイルが存在すると、initramfs 起動時に cmdline の iSCSI パラメータを読み取って自動接続する。中身は空でよい（フラグファイル）」
- **検証結果**: open-iscsi の debian/README.Debian により確認。「Support for this is controlled by the existence of the /etc/iscsi/iscsi.initramfs file」と明記されており、ファイルの存在自体が iSCSI ブートサポートを制御するフラグとして機能する。`touch /etc/iscsi/iscsi.initramfs` で空ファイルを作成し、iSCSI パラメータはカーネルコマンドラインで渡す方式は正式にサポートされている。なお、記事の説明は簡略化されているが正確。正確には、このファイルの存在により initramfs 生成時に iSCSI ツール（iscsistart 等）が initramfs に組み込まれ、起動時に cmdline パラメータを読み取って iSCSI 接続を行う。
- **ソース**: [open-iscsi debian/README.Debian (vishvananda fork)](https://github.com/vishvananda/open-iscsi/blob/master/debian/README.Debian), [Debian sources - README.Debian](https://sources.debian.org/src/open-iscsi/2.0.874-7.1/debian/README.Debian/)
- **備考**: 記事中のリンク `https://github.com/open-iscsi/open-iscsi/blob/master/debian/README.Debian` は 404 を返す。open-iscsi の公式リポジトリでは debian/ ディレクトリが存在しないか移動している可能性がある。Debian のソースパッケージ（sources.debian.org）へのリンクに差し替えるか、リンクを削除することを推奨する。

### 12. UMass FAST'04 論文リンク
- **判定**: 要確認（タイトル不正確）
- **記事中の記述**: `https://lass.cs.umass.edu/papers/pdf/FAST04.pdf`、タイトル「A Comparison of NFS and iSCSI for IP-Networked Storage (UMass FAST'04)」
- **検証結果**: URL は有効。PDF にアクセス可能。ただし、論文の正式タイトルは **「A Performance Comparison of NFS and iSCSI for IP-Networked Storage」** であり、記事中のタイトルには「Performance」が欠落している。また、論文は USENIX FAST '04（3rd USENIX Conference on File and Storage Technologies, 2004年3月）で発表されたもので、著者は Peter Radkov, Li Yin, Pawan Goyal, Prasenjit Sarkar, Prashant Shenoy。「UMass FAST'04」は USENIX FAST '04 と UMass（著者所属）を組み合わせた非公式な表記。
- **ソース**: [A Performance Comparison of NFS and iSCSI for IP-Networked Storage (PDF)](https://lass.cs.umass.edu/papers/pdf/FAST04.pdf), [USENIX FAST '04 論文ページ](https://www.usenix.org/conference/fast-04/performance-comparison-nfs-and-iscsi-ip-networked-storage)
- **修正案**: タイトルを「A Performance Comparison of NFS and iSCSI for IP-Networked Storage」に修正する。

## サマリー
- 正確: 3 件（#7, #9, #11）
- 不正確: 1 件（#10: pi ユーザー削除時期）
- 要確認: 2 件（#8: issue #934 の Pi 4B への適用性、#12: 論文タイトルの「Performance」欠落）
