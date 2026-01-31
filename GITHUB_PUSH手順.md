# GitHub へ初めてプッシュする手順

## 前提
- まだ何も push していない状態から、このプロジェクトを GitHub に上げる手順です。
- GitHub のアカウントがあること、Git がインストールされていることを前提にしています。

---

## 1. リポジトリを初期化（ローカル）

プロジェクトフォルダで以下を実行します。

```powershell
cd c:\Users\user\SRM
git init
```

※ すでに実行済みの場合はスキップしてください。

---

## 2. ファイルをステージングしてコミット

```powershell
git add .
git commit -m "Initial commit: SRM project"
```

`.gitignore` により `node_modules` や `.next` などは自動的に除外されます。

---

## 3. GitHub で新しいリポジトリを作成

1. [GitHub](https://github.com) にログイン
2. 右上の **+** → **New repository**
3. 設定例:
   - **Repository name**: `SRM`（任意の名前でOK）
   - **Description**: 任意
   - **Public** を選択
   - **「Add a README file」などはチェックしない**（ローカルに既にコードがあるため）
4. **Create repository** をクリック

---

## 4. リモートを追加してプッシュ

GitHub でリポジトリを作成すると、URL が表示されます。  
例: `https://github.com/あなたのユーザー名/SRM.git`

以下を実行します（**URL は自分のリポジトリのURLに置き換えてください**）。

```powershell
git remote add origin https://github.com/あなたのユーザー名/SRM.git
git branch -M main
git push -u origin main
```

- 初回 `git push` で GitHub のログイン（またはトークン入力）を求められたら、画面の指示に従ってください。
- ブランチ名が `main` でない場合は、`git branch -M main` の代わりに自分のブランチ名を使ってください。

---

## まとめ（コマンド一覧）

```powershell
cd c:\Users\user\SRM
git init
git add .
git commit -m "Initial commit: SRM project"
git remote add origin https://github.com/あなたのユーザー名/SRM.git
git branch -M main
git push -u origin main
```

※ `https://github.com/あなたのユーザー名/SRM.git` は、GitHub で作成したリポジトリのURLに置き換えてください。

---

## トラブルシュート

- **「Permission denied」や「Authentication failed」**
  - GitHub ではパスワードの代わりに **Personal Access Token (PAT)** が必要です。
  - GitHub → Settings → Developer settings → Personal access tokens でトークンを作成し、パスワードの代わりに入力してください。

- **「failed to push some refs」でリジェクトされる**
  - GitHub で README などを追加してしまった場合:  
    `git pull origin main --rebase` を実行してから、再度 `git push -u origin main` を試してください。
