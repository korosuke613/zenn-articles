# ファクトチェック・クラン イクサの記録

**日時**: 2026-03-04
**対象記事**: articles/raspberry-pi-pxe-iscsi-boot.md
**クラン名**: factcheck-clan

---

## ニンジャ行動サマリー

### シャドウアイ（偵察ニンジャ）
- **担当タスク**: 記事の技術的主張を精査し、ファクトチェック対象リストを作成
- **実行内容**: 記事全体を精査し、17件のファクトチェック対象を抽出。高優先度5件、中優先度7件、低優先度5件に分類
- **成果物**: plans/factcheck-suspects.md
- **発見事項**: Pi 4B の OTP/EEPROM 混同、bootcode.bin の扱い、chroot 内 uname -r 問題を高優先度として識別

### ヴェリファイア・アルファ（検証ニンジャ・前衛）
- **担当タスク**: 項目 1-6 のファクトチェック検証（OTP・ブートシーケンス・dnsmasq）
- **実行内容**: Web 検索・公式ドキュメントで各項目を検証
- **成果物**: plans/factcheck-results-alpha.md
- **発見事項**:
  - 項目3（最重要）: Pi 4B は OTP ではなく EEPROM でブート順序を制御。`program_usb_boot_mode=1` は Pi 3B 以前の手順
  - 項目6（重要）: Pi 4B は bootcode.bin を TFTP から取得しない。EEPROM に内蔵
  - 項目4: iSCSI vs NFS の CPU 使用率比較が不正確
  - 項目5: dhcp-reply-delay はファームウェアバグ回避策

### ヴェリファイア・ブラヴォ（検証ニンジャ・中衛）
- **担当タスク**: 項目 7-12 のファクトチェック検証（initramfs・cmdline・fstab）
- **実行内容**: Web 検索・公式ドキュメント・man ページで各項目を検証
- **成果物**: plans/factcheck-results-bravo.md
- **発見事項**:
  - 項目7: iscsi.initramfs の説明が古い。現行 open-iscsi ではバイナリは常に組み込まれる
  - 項目10: ISCSI_* パラメータは公式には小文字（iscsi_initiator 等）
  - 項目9, 12: 正確
  - 項目8, 11: 補足推奨

### ヴェリファイア・チャーリー（検証ニンジャ・後衛）
- **担当タスク**: 項目 13-17 のファクトチェック検証（PoE・iSCSI・NFS・uname）
- **実行内容**: Web 検索・公式ドキュメント・IANA ポート割り当てで各項目を検証
- **成果物**: plans/factcheck-results-charlie.md
- **発見事項**:
  - 項目16（高優先度）: chroot 内 uname -r はホスト側のカーネルバージョンを返す重大問題
  - 項目13, 14, 15: 正確
  - 項目17: セキュリティ補足推奨

### インクブレード（修正ニンジャ）
- **担当タスク**: ファクトチェック結果に基づく記事修正
- **実行内容**: 高優先度3件（OTP→EEPROM、ブートシーケンス、uname -r）、中優先度2件（CPU使用率、iscsi.initramfs）を修正。途中で interrupted により中断
- **成果物**: articles/raspberry-pi-pxe-iscsi-boot.md への直接修正
- **発生した問題**: ターン上限で interrupted。グランドマスターが残りの修正（dhcp-reply-delay、auto_initramfs、ISCSI_*注記、no_root_squash）を引き継いで完了

---

## 修正サマリー

| 変更統計 | 値 |
|---|---|
| 追加行数 | 67 |
| 削除行数 | 23 |
| 追加脚注数 | 9 |
| textlint | クリーン通過 |

### 主要修正一覧

1. OTP ビット有効化 → EEPROM BOOT_ORDER 設定に全面書き換え
2. ブートシーケンス図から bootcode.bin 削除、EEPROM + start4.elf 追加
3. update-initramfs の $(uname -r) → ls /lib/modules/ に修正
4. iSCSI vs NFS 比較表の CPU 使用率を「環境依存」に修正
5. iscsi.initramfs の説明を現行 open-iscsi の動作に合わせて修正
6. ISCSI_* パラメータの大文字/小文字に関する注記追加
7. dhcp-reply-delay をファームウェアバグ回避策と説明修正
8. auto_initramfs の命名規則補足追加
9. no_root_squash のセキュリティ注意書き追加
10. 全修正にソース URL 脚注を追加
