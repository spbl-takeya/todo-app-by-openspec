"use client";

import { FilterType } from "@/types/todo";

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "active", label: "未完了" },
  { value: "completed", label: "完了済み" },
];

export function TodoFilter({ filter, onFilterChange }: TodoFilterProps) {
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === f.value
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
