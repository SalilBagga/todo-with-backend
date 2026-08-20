"use client";

import { useTodo } from "@/hooks/useTodo";
import AddTodoForm from "./todo/_components/add-todo-form";
import TodoList from "./todo/_components/todo-list";

export default function TodoPage() {
  const { data, loading, addTodo, editTodo, toggleComplete, deleteTodo } = useTodo();

  // Only show the full loading message before we have any todos to display yet —
  // once data has loaded, in-flight mutations shouldn't blank out the list.
  const isInitialLoading = loading && data.length === 0;

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold text-gray-900">Todo List</h1>

      <AddTodoForm onAdd={addTodo} loading={loading} />

      {isInitialLoading ? (
        <p className="rounded-md border border-dashed border-gray-300 px-3 py-6 text-center text-sm text-gray-500">
          Loading todos...
        </p>
      ) : data.length === 0 ? (
        <p className="rounded-md border border-dashed border-gray-300 px-3 py-6 text-center text-sm text-gray-500">
          No todos yet. Add one above to get started.
        </p>
      ) : (
        <TodoList
          todos={data}
          editTodo={editTodo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      )}
    </main>
  );
}
