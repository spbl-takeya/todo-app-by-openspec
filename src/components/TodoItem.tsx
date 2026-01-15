"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string, dueDate?: Date | null) => void;
  onDelete: (id: string) => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" });
}

function toDateInputValue(date?: Date): string {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

function isOverdue(date?: Date, completed?: boolean): boolean {
  if (!date || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");
  const [editDueDate, setEditDueDate] = useState(toDateInputValue(todo.dueDate));
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    setError(null);
    if (!editTitle.trim()) {
      setError("タイトルは必須です");
      return;
    }
    try {
      const dueDateValue = editDueDate ? new Date(editDueDate) : null;
      onUpdate(todo.id, editTitle, editDescription || undefined, dueDateValue);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setEditDueDate(toDateInputValue(todo.dueDate));
    setError(null);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-white rounded-lg shadow space-y-3">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="説明（任意）"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div>
          <label className="block text-sm text-gray-600 mb-1">期限</label>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            保存
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            キャンセル
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 bg-white rounded-lg shadow ${todo.completed ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 w-5 h-5 cursor-pointer"
        />
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`mt-1 text-sm ${todo.completed ? "text-gray-400" : "text-gray-600"}`}>
              {todo.description}
            </p>
          )}
          {todo.dueDate && (
            <p className={`mt-1 text-xs ${
              isOverdue(todo.dueDate, todo.completed)
                ? "text-red-500 font-medium"
                : todo.completed
                ? "text-gray-400"
                : "text-gray-500"
            }`}>
              期限: {formatDate(todo.dueDate)}
              {isOverdue(todo.dueDate, todo.completed) && " (期限切れ)"}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded transition-colors"
          >
            編集
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-2 py-1 text-sm text-red-500 hover:bg-red-50 rounded transition-colors"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
