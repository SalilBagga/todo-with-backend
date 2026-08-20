import { Todo } from "../../types";
import TodoItem from "../todo-item";

interface TodoListProps {
  todos: Todo[];
  editTodo: (id: string, text: string) => Promise<void>;
  toggleComplete: (id: string, completed: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export default function TodoList({ todos, editTodo, toggleComplete, deleteTodo }: TodoListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editTodo={editTodo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
