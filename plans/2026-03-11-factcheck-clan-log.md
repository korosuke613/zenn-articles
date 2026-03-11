# ファクトチェック・クラン イクサの記録

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
実施日: 2026-03-11

## クラン編成
- グランドマスター: メインエージェント（偵察・集約・修正担当）
- Alpha: ヴェリファイア（検証項目 1, 2, 5, 6, 10 担当 — Raspberry Pi 公式仕様）
- Bravo: ヴェリファイア（検証項目 3, 4, 7, 8, 9 担当 — Docker イメージ・プロトコル仕様）
- Charlie: ヴェリファイア（検証項目 11, 12, 13 担当 — URL 有効性・ハードウェア仕様）

## 各隊員の行動サマリー

### Alpha
- **担当タスク**: BOOT_ORDER hex 値、Pi 4B EEPROM bootcode.bin、Bullseye pi ユーザー削除、auto_initramfs 命名規則、ip= カーネルパラメータ
- **主要な調査結果**: 全 5 項目「正確」。Raspberry Pi 公式ドキュメントおよび Linux カーネルドキュメントとの整合性を確認
- **発生した問題と対処**: なし

### Bravo
- **担当タスク**: strm/dnsmasq イメージ、erichough/nfs-server:2.2.1、firmware Issue #934、open-iscsi パラメータケース、iSCSI ポート 3260
- **主要な調査結果**: 4 項目「正確」、1 項目「要確認」。Issue #934 は実在するが「ブートループ」という表現は Issue 内に存在しない。open-iscsi の initramfs スクリプトは小文字パラメータをパースする実装を確認
- **発生した問題と対処**: なし

### Charlie
- **担当タスク**: 記事内 URL 7 件の有効性確認、Pi 4B PoE 非対応、micro USB Type-B の表現
- **主要な調査結果**: 9 項目「正確」、2 項目「要確認」。X (Twitter) URL は JavaScript 必須のため自動検証不可。micro USB Type-B は厳密には micro USB 3.0 Type-B と物理的に異なるコネクタ
- **発生した問題と対処**: なし

## 検証結果サマリー
- チェック対象総数: 13 件
- 正確: 10 件
- 不正確（修正済み）: 0 件
- 要確認（ユーザー判断）: 3 件
  - Issue #934 の表現 → 修正案 A を採用し修正済み
  - X URL → ユーザーが手動確認し問題なし
  - micro USB Type-B → micro USB 3.0 Type-B に修正済み

## 修正内容
1. dnsmasq.conf コメント: 「Pi 3 の既知バグ ... だが、」→「Pi 3 の既知の PXE ブート問題 ... への回避策。」
2. micro USB Type-B → micro USB 3.0 Type-B（記事内 4 箇所）
