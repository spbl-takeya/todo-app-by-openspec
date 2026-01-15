# Todo App

シンプルなTodoアプリケーション。Next.js + TypeScript + Tailwind CSS で構築。

## 機能

- Todo作成（タイトル必須、説明オプション）
- Todo一覧表示
- 完了/未完了の切り替え
- Todo編集
- Todo削除
- フィルター（すべて/未完了/完了済み）
- データ永続化（localStorage）

## 技術スタック

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

http://localhost:3000 でアクセス可能。

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run start` | プロダクションサーバー起動 |
| `npm run lint` | ESLint実行 |

## ディレクトリ構成

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css      # グローバルCSS
│   ├── layout.tsx       # ルートレイアウト
│   └── page.tsx         # メインページ
├── components/          # Reactコンポーネント
│   ├── TodoForm.tsx     # 作成フォーム
│   ├── TodoFilter.tsx   # フィルターボタン
│   ├── TodoItem.tsx     # 個別アイテム
│   └── TodoList.tsx     # リスト表示
├── hooks/               # カスタムフック
│   └── useTodos.ts      # Todo状態管理
└── types/               # 型定義
    └── todo.ts
```
