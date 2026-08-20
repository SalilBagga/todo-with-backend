import TodoList from "./todo/_components/todo-list";

export default function TodoPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold text-gray-900">Todo List</h1>
      <TodoList />
    </main>
  );
}
