"use client";

import { useCallback, useEffect, useState } from "react";

// A single todo item, as stored/returned by the API
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type UseTodoReturn = {
  data: Todo[];
  loading: boolean;
  addTodo: (text: string) => Promise<void>;
  editTodo: (id: string, text: string) => Promise<void>;
  toggleComplete: (id: string, completed: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
};

/**
 * Centralizes all todo API interaction (fetch calls to /api/todos and
 * /api/todos/[id]) so components can stay free of fetch logic.
 */
export function useTodo(): UseTodoReturn {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Re-fetch the full todo list from the API and replace local state with it
  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/todos");
      const todos: Todo[] = await response.json();
      setData(todos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all todos once on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Create a new todo on the server, then append the server's copy to local state
  const addTodo = useCallback(async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTodo: Todo = await response.json();
      setData((prev) => [...prev, newTodo]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update a todo's text on the server, then merge the server's copy into local state
  const editTodo = useCallback(async (id: string, text: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const updatedTodo: Todo = await response.json();
      setData((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update a todo's completed status on the server, then merge the server's copy into local state
  const toggleComplete = useCallback(async (id: string, completed: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      const updatedTodo: Todo = await response.json();
      setData((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a todo on the server, then remove it from local state
  const deleteTodo = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
      setData((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, addTodo, editTodo, toggleComplete, deleteTodo, refetch };
}
