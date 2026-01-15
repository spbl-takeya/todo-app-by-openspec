"use client";

import { useState, useCallback, useEffect } from "react";
import { Todo, FilterType } from "@/types/todo";

const STORAGE_KEY = "todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // ローカルストレージから読み込み
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setTodos(
        parsed.map((todo: Todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }))
      );
    }
    setIsLoaded(true);
  }, []);

  // ローカルストレージに保存
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // Todo作成
  const addTodo = useCallback((title: string, description?: string, dueDate?: Date) => {
    if (!title.trim()) {
      throw new Error("タイトルは必須です");
    }
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description?.trim() || undefined,
      completed: false,
      createdAt: new Date(),
      dueDate,
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  // 完了状態の切り替え
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Todo編集
  const updateTodo = useCallback(
    (id: string, title: string, description?: string, dueDate?: Date | null) => {
      if (!title.trim()) {
        throw new Error("タイトルは必須です");
      }
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                title: title.trim(),
                description: description?.trim() || undefined,
                dueDate: dueDate === null ? undefined : dueDate ?? todo.dueDate,
              }
            : todo
        )
      );
    },
    []
  );

  // Todo削除
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // フィルター適用
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    isLoaded,
  };
}
