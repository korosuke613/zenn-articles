# ファクトチェック・クラン イクサの記録

対象記事: `articles/raspberry-pi-pxe-iscsi-boot.md`
実施日: 2026-03-05

## クラン編成
- グランドマスター: メインエージェント（偵察・修正担当）
- alpha: ヴェリファイア（検証項目 1-6 担当）
- bravo: ヴェリファイア（検証項目 7-12 担当）
- charlie: ヴェリファイア（検証項目 13-18 担当）

## 各隊員の行動サマリー

### alpha
- **担当タスク**: 項目 1-6（Pi boot 仕様、Docker イメージ）
- **主要な調査結果**: 5 件正確、1 件要確認。Docker Compose `version: "3.8"` が obsolete であることを発見。`strm/dnsmasq:latest` の最終更新が約 6 年前であることも報告。
- **発生した問題と対処**: なし

### bravo
- **担当タスク**: 項目 7-12（iSCSI 仕様、config.txt、initramfs）
- **主要な調査結果**: 3 件正確、1 件不正確、2 件要確認。pi ユーザー削除時期が「Bookworm 以降」ではなく「Bullseye 2022 年 4 月アップデート以降」であることを発見。firmware issue #934 が主に Pi 3 の報告であること、論文タイトルに「Performance」が欠落していること、open-iscsi の README.Debian リンクが 404 であることを報告。
- **発生した問題と対処**: なし

### charlie
- **担当タスク**: 項目 13-18（URL 有効性、MAC プレフィックス、PoE）
- **主要な調査結果**: 全 6 件正確。Red Hat リンク、BitBanged リンクともに有効。dc:a6:32 が Raspberry Pi Trading Ltd の正規 OUI であること、ip= カーネルパラメータ形式が Linux Kernel Documentation と一致することを確認。
- **発生した問題と対処**: なし

## 検証結果サマリー
- チェック対象総数: 18 件
- 正確: 14 件
- 不正確（修正済み）: 1 件
- 要確認（ユーザー判断済み）: 3 件

## 修正内容
1. `version: "3.8"` 行を削除（Docker Compose v2 以降 obsolete）
2. dhcp-reply-delay の説明をコード内コメント＋本文補足に変更（Pi 3 のバグだが Pi 4B でも発生した旨を明記）
3. 「Bookworm 以降」→「Bullseye（2022 年 4 月アップデート）以降」に修正
4. open-iscsi の 404 リンクを Debian sources のリンクに差し替え
5. CPU 使用率の行・脚注・論文参照をまるごと削除（ユーザー判断）
