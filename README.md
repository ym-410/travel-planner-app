# Travel Planner Web App
## 概要
Travel Planner Web App は、ログイン認証を備えた旅行管理用Webアプリケーションです。  
ユーザーは旅行を作成し、旅行ごとの行程（訪問先・予定・費用・メモ等）を管理できます。

本プロジェクトは、指定技術スタックを用いたフルスタック開発の実践、および要件定義からデプロイまでを自走して行う能力の証明を目的としています。

---

## 主な機能

### 認証
- ログイン必須（better-auth）
- 未ログイン時は保護ページへアクセス不可
- ログアウト可能

### 旅行管理（Trip）
- 旅行作成
- 旅行一覧表示（自分の旅行のみ）
- 旅行詳細表示
- 旅行編集
- 旅行削除

### 行程管理（Plan）
- 行程追加
- 行程編集
- 行程削除
- 旅行ごとの行程一覧表示
- 表示順管理（order）

### 権限制御
- ユーザーは自分のデータのみ操作可能
- API側で所有者チェックを実施
- クライアントから userId を受け取らない設計

---

## 技術スタック

### フロントエンド
- Next.js
### バックエンド
- Hono
### 認証
- better-auth
### データベース
- Turso（SQLite）
### ORM
- Drizzle ORM
### インフラ / デプロイ
- Cloudflare Workers / Pages

### その他

- Git / GitHub によるソース管理
- 環境変数による機密情報管理

---

## データモデル（概要）

### User

- id
- email
- name
- createdAt

### Trip

- id
- userId
- title
- startDate
- endDate
- status（planned / ongoing / finished）
- budget（任意）
- memo（Markdown想定）
- createdAt
- updatedAt

※ status はユーザーが手動で変更する仕様

### Plan

- id
- tripId
- date
- time（任意）
- place
- note
- cost（任意）
- order（整数、同一trip内で昇順表示・重複不可）
- createdAt

---

## API 構成

### Trip API

- POST   /api/trips  
- GET    /api/trips  
- GET    /api/trips/:id  
- PATCH  /api/trips/:id  
- DELETE /api/trips/:id  

### Plan API

- POST   /api/trips/:tripId/plans  
- GET    /api/trips/:tripId/plans  
- PATCH  /api/plans/:id  
- DELETE /api/plans/:id  

### エラーコード

- 400 : バリデーションエラー
- 401 : 未認証
- 403 : 権限なし
- 404 : リソース不存在

---

## セットアップ手順（例）

1. リポジトリをクローン
```bash
git clone <repository-url>
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数を設定

`.env.local` を作成し、以下を設定

- DATABASE_URL
- AUTH_SECRET
- その他必要なキー

4. 開発サーバー起動
```bash
npm run dev
```

---

## デプロイ

Cloudflare Workers / Pages 上にデプロイ可能。  
公開URLからアクセスし、ログイン・CRUD操作が可能な状態を完成とする。

---

## 設計意図

- フルスタック構成（Next.js + Hono）によりAPIとUIを分離
- ORMにDrizzleを採用し、型安全かつSQL制御可能な構成
- Tursoを利用し、軽量かつCloudflare環境と親和性の高いDBを選択
- 認証・権限制御をAPI側で担保し、安全性を確保

---

## 今後の拡張案

- 行程のドラッグ＆ドロップ並び替え
- 旅行共有（閲覧権限付与）
- 費用集計表示
- カレンダー表示
- 地図連携
