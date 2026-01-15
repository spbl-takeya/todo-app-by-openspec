# Change: Todo期限設定機能を追加

## Why
ユーザーがタスクの期限を設定・管理できるようにすることで、タスクの優先度付けと時間管理を支援する。

## What Changes
- Todo作成時に期限（日付）を設定できる機能を追加
- Todo編集時に期限を変更できる機能を追加
- 期限が設定されたTodoに期限を表示
- 期限切れのTodoを視覚的に区別できる表示を追加
- 期限でのソート機能を追加（任意）

## Impact
- Affected specs: `todo-management`（既存capabilityを修正）
- Affected code:
  - `src/types/todo.ts` - 型定義に期限フィールド追加
  - `src/hooks/useTodos.ts` - 状態管理の更新
  - `src/components/TodoForm.tsx` - 期限入力フィールド追加
  - `src/components/TodoItem.tsx` - 期限表示・編集追加
