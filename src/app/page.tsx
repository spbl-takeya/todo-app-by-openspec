"use client";

import { useTodos } from "@/hooks/useTodos";
import { TodoForm } from "@/components/TodoForm";
import { TodoFilter } from "@/components/TodoFilter";
import { TodoList } from "@/components/TodoList";

export default function Home() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    isLoaded,
  } = useTodos();

  if (!isLoaded) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <div className="text-center py-8 text-gray-500">読み込み中...</div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Todo App
      </h1>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <TodoForm onSubmit={addTodo} />
        </div>

        <div className="flex justify-center">
          <TodoFilter filter={filter} onFilterChange={setFilter} />
        </div>

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </div>
    </main>
  );
}
