# 投資分析ダッシュボード

日本株の財務データを自動取得して、投資判断に必要な4つの指標を分析できるWebアプリケーションです。

## デモ

本番環境: https://nextjs-dashboard-olive-delta-49.vercel.app

## 主な機能

### 企業データ自動取得
- 証券コード（4桁）を入力するだけで財務データを自動取得
- Yahoo Finance APIを利用したリアルタイムデータ
- データソースと決算期を明示

### 4つの投資分析指標

1. **成長性分析**
   - PSR（株価売上高倍率）
   - 設備投資比率
   - 売上高成長率（4年間）

2. **収益性分析**
   - ROE（自己資本利益率）
   - ROA（総資産利益率）
   - 営業利益率

3. **安全性分析**
   - 流動比率
   - 自己資本比率

4. **割安性分析**
   - PER（株価収益率）
   - PBR（株価純資産倍率）
   - 配当利回り

### その他の機能
- ダークモード対応
- レスポンシブデザイン（PC・タブレット・スマホ対応）
- 外部参考サイトへのクイックリンク（会社四季報、株探、Yahoo!ファイナンス）

## 技術スタック

- **フレームワーク**: Next.js 15.5.9
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **API**: Yahoo Finance API（yahoo-finance2）
- **ホスティング**: Vercel
- **バージョン管理**: Git + GitHub

## ローカル開発

### 必要な環境

- Node.js 18.17 以上
- npm または pnpm

### セットアップ

1. リポジトリをクローン

```bash
git clone https://github.com/tamaden55/financial-dashboard-nextjs.git
cd financial-dashboard-nextjs
```

2. 依存関係をインストール

```bash
npm install
```

3. 開発サーバーを起動

```bash
npm run dev
```

4. ブラウザで開く

http://localhost:3000 にアクセス

## 使い方

1. 証券コード（4桁）を入力
   - 例：7203（トヨタ自動車）、9008（京王電鉄）
2. 「データ取得」ボタンをクリック
3. 各分析指標が自動で計算・表示されます

## ファイル構造

```
financial-dashboard-nextjs/
├── app/
│   ├── api/
│   │   └── edinet/[code]/
│   │       └── route.ts          # Yahoo Finance API連携
│   ├── components/
│   │   ├── company-search.tsx    # 企業検索コンポーネント
│   │   ├── growth-calculator.tsx # 成長性分析
│   │   ├── profitability-calculator.tsx # 収益性分析
│   │   ├── safety-calculator.tsx # 安全性分析
│   │   ├── valuation-calculator.tsx # 割安性分析
│   │   ├── input-field.tsx       # 入力フィールド
│   │   └── result-display.tsx    # 結果表示
│   ├── contexts/
│   │   └── financial-data-context.tsx # 財務データ状態管理
│   ├── utils/
│   │   └── financial.ts          # 財務計算ユーティリティ
│   ├── layout.tsx                # ルートレイアウト
│   └── page.tsx                  # メインページ
├── public/                       # 静的ファイル
└── README.md                     # このファイル
```

## データについて

### データソース
- Yahoo Finance API（非公式）
- 2024年11月以降、財務諸表データの一部が制限されています
- 一部のデータは推定値を使用しています

### データの精度
- 株価データ：リアルタイム（20分遅延）
- 財務データ：最新の決算期データ
- 減価償却費：EBITDA - 営業利益から推定
- 4年前売上高：利用可能な最古の年次データ

### 注意事項
- 投資判断は自己責任で行ってください
- データの正確性を保証するものではありません
- 重要な判断の際は、公式の財務諸表を確認してください

## デプロイ

このプロジェクトは Vercel にデプロイされています。

`main` ブランチへの push で自動的に本番環境が更新されます。

### 手動デプロイ（初回のみ）

1. GitHub にプッシュ

```bash
git add .
git commit -m "コミットメッセージ"
git push origin main
```

2. Vercel でプロジェクトをインポート

https://vercel.com/new からリポジトリを選択してデプロイ

## 学習リソース

- [Next.js ドキュメント](https://nextjs.org/docs) - Next.js の機能と API
- [Next.js チュートリアル](https://nextjs.org/learn) - インタラクティブな学習コース
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs) - スタイリングの参考
- [yahoo-finance2 ドキュメント](https://github.com/gadicc/yahoo-finance2) - Yahoo Finance API ライブラリ

## 今後の改善予定

- [ ] より正確な財務データの取得（J-Quants API等の検討）
- [ ] チャート表示機能
- [ ] 複数企業の比較機能
- [ ] データのエクスポート機能

## ライセンス

MIT
