# ファクトチェック結果: Bravo

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
検証日: 2026-03-11
担当: Bravo

## 検証結果

### 3. strm/dnsmasq Docker イメージの存在
- **判定**: 正確
- **記事中の記述**: `image: strm/dnsmasq:latest`
- **検証結果**: Docker Hub に存在を確認。500万回以上のプル実績あり。Alpine Linux 3.11 ベースの dnsmasq イメージ。最終更新は約6年前だが、利用には問題ない。`latest` タグも存在する。
- **ソース**: [strm/dnsmasq - Docker Hub](https://hub.docker.com/r/strm/dnsmasq)

### 4. erichough/nfs-server:2.2.1 Docker イメージの存在
- **判定**: 正確
- **記事中の記述**: `image: erichough/nfs-server:2.2.1`
- **検証結果**: Docker Hub に存在を確認。タグ `2.2.1` のレイヤー詳細ページも確認済み。ehough/docker-nfs-server GitHub リポジトリで開発されている軽量・柔軟な NFS サーバーコンテナ。
- **ソース**: [erichough/nfs-server:2.2.1 - Docker Hub](https://hub.docker.com/layers/erichough/nfs-server/2.2.1/images/sha256-1efd4ece380c5ba27479417585224ef857006daa46ab84560a28c1224bc71e9e)

### 7. Pi 3 ファームウェアバグ GitHub Issue #934
- **判定**: 要確認（部分的に正確）
- **記事中の記述**: 「Pi 3 の既知バグ https://github.com/raspberrypi/firmware/issues/934」「この遅延がないとブートループに陥る場合があります」
- **検証結果**: Issue #934 は実在し、タイトルは「PXE Problems with RPi3」（state: CLOSED）。内容は Pi 3 の PXE ブート時に DHCPDISCOVER 送信が約1時間遅延する問題と DHCPOFFER が受理されない問題を報告している。Issue 内で `dhcp-reply-delay` オプションの使用が言及されている。ただし、Issue の主な問題はネットワークスイッチが Pi からの最初のパケットを無視することであり、「ブートループ」という用語は Issue 本文では使われていない。記事では「Pi 4B でもこの設定がないとブートループに陥った」と筆者自身の経験として記述しているため、Issue の内容との直接的な一致ではなく筆者の応用的な知見として理解すべき。
- **ソース**: [PXE Problems with RPi3 - GitHub Issue #934](https://github.com/raspberrypi/firmware/issues/934)
- **修正案**: 厳密には Issue #934 は「ブートループ」ではなく「PXE ブートの遅延・失敗」に関するもの。記事の書き方（「Pi 3 の既知バグ ... だが、Pi 4B でもこの設定がないとブートループに陥ったため入れている」）は、Issue をバグの参照として引用しつつ筆者独自の経験を述べており、文脈としては許容範囲だが、Issue #934 自体が「ブートループ」を報告しているわけではない点は留意。

### 8. open-iscsi initramfs パラメータの大文字・小文字
- **判定**: 正確
- **記事中の記述**: 「open-iscsi の initramfs スクリプトは本来小文字のパラメータ名（`iscsi_initiator` 等）をパースします」
- **検証結果**: open-iscsi の `extra/initramfs.local-top` スクリプトの `parse_iscsi_ops()` 関数を確認。カーネルコマンドラインからは小文字のパラメータ名（`iscsi_initiator=*`, `iscsi_target_name=*`, `iscsi_target_ip=*`, `iscsi_target_port=*` 等）をパースし、それをシェル変数の大文字（`ISCSI_INITIATOR` 等）に代入する実装。記事の記述は正確。
- **ソース**: [open-iscsi initramfs.local-top (vishvananda fork)](https://github.com/vishvananda/open-iscsi/blob/master/extra/initramfs.local-top)
- **備考**: 記事の cmdline.txt サンプルでは大文字（`ISCSI_INITIATOR=...`）で書かれている。記事中に「環境によっては小文字でないと認識されない場合があります」との注記があるが、**本来は小文字が正しい**ため、サンプルコード自体を小文字にすることも検討に値する。大文字で動作するのはディストリビューション固有のパッチや別の initramfs フック（例: Debian/Ubuntu のパッケージ版）が大文字もサポートしている可能性がある。

### 9. iSCSI 標準ポート 3260
- **判定**: 正確
- **記事中の記述**: 「iSCSI ポート（標準: 3260）」
- **検証結果**: IANA Service Name and Transport Protocol Port Number Registry で iSCSI に TCP ポート 3260 が割り当てられている。RFC 3720（iSCSI プロトコル仕様）および RFC 3721（iSCSI Naming and Discovery）で規定。ポート 860 も iSCSI システムポートとして IANA 登録されているが、デフォルトとして使用してはならず、3260 が唯一許可されたデフォルトポート。
- **ソース**: [IANA Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=iscsi)

## サマリー
- 正確: 4 件（#3, #4, #8, #9）
- 不正確: 0 件
- 要確認: 1 件（#7 - Issue の内容と記事の「ブートループ」表現の微妙な差異）
