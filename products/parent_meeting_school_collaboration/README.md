# 保護者面談・校内連携テンプレート集 公開運用メモ

このメモは、公開HP repo内で確認できる最小限の運用記録です。
下書きPDF、検証画像、内部チェック表、未公開メモはこのrepoに入れません。

## 商品概要

- 商品名: 特別支援学級担任のための 保護者面談・校内連携テンプレート集
- 短縮表示: 保護者面談・校内連携テンプレート集
- 対象: 初めて特別支援学級を担任する先生、常勤講師、若手教員、初任者を支える校内担当者
- 形式: PDF 19ページ / A4縦 / 白黒印刷対応 / 書き込み式
- 価格: 480円（税込）
- 公開LP: https://manabinomorikyouikuken.github.io/manabinomori-website/tokushi/parent_meeting_school_collaboration.html
- 無料サンプルPDF: `parent_meeting_school_collaboration_sample.pdf`
- 決済リンク: https://buy.stripe.com/4gMdR871u5vH7qM9LX8Vi0c

## 公開ファイル

このフォルダで公開してよいファイル:

- `README.md`
- `parent_meeting_school_collaboration_sample.pdf`

このフォルダに置かないファイル:

- 販売用の本体PDF
- PDF下書き
- 校正途中のMarkdown
- 検証用スクリーンショット
- Stripe管理画面の内部情報
- 購入者情報、問い合わせ内容、個人情報

販売用の本体PDFは、購入後に案内するファイルとして扱い、GitHub Pagesの公開フォルダには置きません。

## 公開ページの正本

公開状態を変更するときは、次のファイルを同時に確認します。

- LP: `tokushi/parent_meeting_school_collaboration.html`
- トップページ教材欄: `index.html`
- 特定商取引法に基づく表記: `legal.html`
- プライバシーポリシー: `privacy.html`
- サイトマップ: `sitemap.xml`
- 計測補助: `assets/analytics-events.js`

価格、納品方法、返金・キャンセル方針を変更する場合は、LP、トップページ、特商法表記、Stripe、JSON-LDを同時に更新します。

## 最終確認

確認日: 2026-06-12

確認済み:

- 公開LPはHTTP 200。
- トップページに新商品カード、購入ボタン、詳細リンク、無料サンプルPDFリンクがある。
- LPとトップページの購入ボタンはStripe決済リンクへ接続済み。
- Stripe決済画面は購入せずに目視確認済み。
  - 事業者: 合同会社まなびの森教育研究所
  - 商品名: 保護者面談・校内連携テンプレート集
  - 価格: 480円
- 特商法表記に商品価格、支払方法、引渡時期、返品・キャンセル方針がある。
- 無料サンプルPDFはHTTP 200 / `application/pdf`。
- LP、トップページ教材欄、特商法表記はスマホ幅390pxで横スクロールなし。
- `sitemap.xml` に公開LPを掲載済み。

## 内部証跡

詳細な販売前チェック、下書きPDF、検証画像は、ローカル親ワークスペースの
`draft_exports/parent_meeting_sale_check_20260612/` に保存します。
この内部証跡フォルダは、公開HP repoには入れません。
