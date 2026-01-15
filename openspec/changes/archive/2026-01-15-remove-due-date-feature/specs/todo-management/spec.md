## MODIFIED Requirements

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

## REMOVED Requirements

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
