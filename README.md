# ホシのキッチン - 洋食レストランウェブサイト

オーナーシェフ星翔が手がける洋食レストラン「ホシのキッチン」のオフィシャルウェブサイトです。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: CSS Modules

## 機能

- ホームページ（店舗紹介、お知らせ、おすすめメニュー）
- メニューページ（カテゴリ別メニュー一覧）
- 店長と女将の言葉ページ

## セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

### ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm start
```

## プロジェクト構成

```
├── app/
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # ホームページ
│   ├── globals.css         # グローバルスタイル
│   ├── menu/
│   │   └── page.tsx        # メニューページ
│   └── message/
│       └── page.tsx        # 店長と女将の言葉ページ
├── components/
│   ├── Header.tsx          # ヘッダーコンポーネント
│   └── Footer.tsx          # フッターコンポーネント
└── public/                 # 静的ファイル（画像など）
```

## カスタマイズ

- 画像を追加する場合は `public/images/` ディレクトリに配置してください
- メニュー情報は `app/menu/page.tsx` の `menuCategories` を編集してください
- スタイリングは各ページの `.module.css` ファイルを編集してください

## ライセンス

© 2024 ホシのキッチン. All rights reserved.

