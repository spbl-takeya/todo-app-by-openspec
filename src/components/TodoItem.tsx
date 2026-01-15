"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    setError(null);
    if (!editTitle.trim()) {
      setError("タイトルは必須です");
      return;
    }
    try {
      onUpdate(todo.id, editTitle, editDescription || undefined);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
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
