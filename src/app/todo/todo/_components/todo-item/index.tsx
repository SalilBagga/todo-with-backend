"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const commitEdit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      cancelEditing();
      return;
    }

    onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get("todoText") as string;
    commitEdit(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      cancelEditing();
    }
  };

  return (
    <li className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
        className="h-4 w-4 shrink-0 cursor-pointer accent-gray-900"
      />

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
          <input
            type="text"
            name="todoText"
            defaultValue={todo.text}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Edit todo text"
            className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
          <button
            type="submit"
            className="rounded-md bg-gray-900 px-3 py-1 text-sm text-white hover:bg-gray-800"
          >
            Update
          </button>
        </form>
      ) : (
        <span
          className={`flex-1 truncate text-sm ${
            todo.completed ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {todo.text}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          onClick={startEditing}
          aria-label="Edit todo"
          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          Edit
        </button>
      )}

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
        className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
      >
        Delete
      </button>
    </li>
  );
}