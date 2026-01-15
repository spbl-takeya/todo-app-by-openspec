# todo-management Specification

## Purpose
TBD - created by archiving change add-core-todo-features. Update Purpose after archive.
## Requirements
### Requirement: Todo作成
システムはユーザーがタイトル付きの新しいTodo項目を作成できるようにしなければならない（SHALL）。

#### Scenario: タイトルのみでTodoを作成
- **WHEN** ユーザーがタイトルを入力する
- **THEN** 指定されたタイトルで新しいTodo項目が作成される
- **AND** Todoはデフォルトで未完了としてマークされる

#### Scenario: タイトルと説明でTodoを作成
- **WHEN** ユーザーがタイトルと説明を入力する
- **THEN** 両方のフィールドが設定された新しいTodo項目が作成される

#### Scenario: 空のタイトルを拒否
- **WHEN** ユーザーがタイトルなしでTodoを作成しようとする
- **THEN** 作成は失敗しバリデーションエラーが表示される

#### Scenario: 期限付きでTodoを作成
- **WHEN** ユーザーがタイトルと期限を入力する
- **THEN** 期限が設定された新しいTodo項目が作成される

### Requirement: Todo一覧表示
システムはすべてのTodo項目をリスト形式で表示しなければならない（SHALL）。

#### Scenario: 全Todoを表示
- **WHEN** ユーザーがTodoリストを表示する
- **THEN** すべてのTodo項目が表示される
- **AND** 各項目はタイトルと完了状態を表示する

#### Scenario: 空のリスト
- **WHEN** Todoが存在しない
- **THEN** 空状態のメッセージが表示される

### Requirement: 完了状態の切り替え
システムはユーザーがTodo項目の完了状態を切り替えられるようにしなければならない（SHALL）。

#### Scenario: Todoを完了としてマーク
- **WHEN** ユーザーが未完了のTodoを完了としてマークする
- **THEN** Todoの状態が完了に変更される
- **AND** 完了状態を示す視覚的な表示がされる

#### Scenario: Todoを未完了としてマーク
- **WHEN** ユーザーが完了済みのTodoを未完了としてマークする
- **THEN** Todoの状態が未完了に変更される

### Requirement: Todo編集
システムはユーザーが既存のTodo項目を編集できるようにしなければならない（SHALL）。

#### Scenario: タイトルを編集
- **WHEN** ユーザーが既存Todoのタイトルを変更する
- **THEN** Todoが新しいタイトルで更新される

#### Scenario: 説明を編集
- **WHEN** ユーザーが既存Todoの説明を変更する
- **THEN** Todoが新しい説明で更新される

#### Scenario: 編集時に空のタイトルを拒否
- **WHEN** ユーザーが空のタイトルでTodoを保存しようとする
- **THEN** 編集は失敗しバリデーションエラーが表示される

#### Scenario: 期限を編集
- **WHEN** ユーザーが既存Todoの期限を変更する
- **THEN** Todoが新しい期限で更新される

#### Scenario: 期限を削除
- **WHEN** ユーザーが既存Todoの期限をクリアする
- **THEN** Todoから期限が削除される

### Requirement: Todo削除
システムはユーザーがTodo項目を削除できるようにしなければならない（SHALL）。

#### Scenario: 単一のTodoを削除
- **WHEN** ユーザーがTodo項目を削除する
- **THEN** Todoがリストから削除される
- **AND** Todoは取得できなくなる

### Requirement: Todoフィルター
システムはユーザーが完了状態でTodo項目をフィルターできるようにしなければならない（SHALL）。

#### Scenario: 全Todoを表示
- **WHEN** ユーザーが「すべて」フィルターを選択する
- **THEN** 完了と未完了の両方のTodoが表示される

#### Scenario: 未完了Todoのみ表示
- **WHEN** ユーザーが「未完了」フィルターを選択する
- **THEN** 未完了のTodoのみが表示される

#### Scenario: 完了済みTodoのみ表示
- **WHEN** ユーザーが「完了済み」フィルターを選択する
- **THEN** 完了済みのTodoのみが表示される

### Requirement: 期限表示
システムは期限が設定されたTodoの期限を表示しなければならない（SHALL）。

#### Scenario: 期限を表示
- **WHEN** Todoに期限が設定されている
- **THEN** 期限日が表示される

#### Scenario: 期限切れを強調表示
- **WHEN** Todoの期限が過ぎている
- **AND** Todoが未完了である
- **THEN** 期限切れであることが視覚的に強調される

#### Scenario: 期限なしの場合
- **WHEN** Todoに期限が設定されていない
- **THEN** 期限は表示されない

