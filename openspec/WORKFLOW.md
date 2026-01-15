# OpenSpec ワークフロー

## archiveの実行タイミング

### 背景

`openspec archive` コマンドは、実装完了した変更提案を `changes/` から `changes/archive/` に移動し、`specs/` に仕様を反映する。

実行タイミングには以下の選択肢がある:

1. **マージ後に別コミット** - 従来の推奨方式
2. **PRにarchiveを含める** - CI/CD環境での推奨方式

### 問題点

マージ時にデプロイが自動実行される環境では、archiveを別コミットにすると:

- PRマージ → デプロイ1回目
- archiveコミット → デプロイ2回目

と、2回デプロイが走ってしまう。

### 推奨: PRにarchiveを含める

```
feature/xxx ブランチ:
├── 1. プロポーザルコミット
├── 2. 実装コミット
└── 3. archiveコミット ← マージ前に実行
```

**メリット:**
- デプロイが1回で済む
- PRがリジェクトされれば実装もarchiveも両方破棄される
- 仕様と実装の整合性が保たれる

**手順:**
1. プロポーザル作成・コミット
2. 実装・コミット
3. `openspec archive <change-id> --yes` 実行
4. archiveをコミット
5. PRをプッシュ・マージ

### 代替案

**CI/CDでopenspec/を除外する場合:**

```yaml
# GitHub Actions
on:
  push:
    paths-ignore:
      - 'openspec/**'
      - '**.md'
```

この場合はマージ後にmainブランチでarchiveしても2回デプロイされない。

### このプロジェクトでの運用

本プロジェクトでは「PRにarchiveを含める」方式を採用する。
