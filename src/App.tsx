import { useState, type FormEvent } from "react";
import CompletedTodos from "./components/CompletedTodos";

export type todoType = {
  id: number;
  completed: boolean;
  todo: string;
};

function App() {
  const [allTodos, setTodos] = useState<todoType[]>([]);

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newTodo = formData.get("newTodo");

    const id: number = Math.random() * 100;
    const todo: todoType = {
      id: Math.floor(id),
      completed: false,
      todo: newTodo as string,
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
    console.log(allTodos);
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => id !== todo.id));
  }

  return (
    <div className="sm:w-[90vw] md:w-[50vw] flex flex-col gap-4 p-4 rounded-4xl bg-amber-50/30">
      <h1 className="text-white text-3xl">Todo List</h1>
      <form className="flex gap-4" onSubmit={addTodo}>
        <input
          className="text-xl w-full bg-white rounded-xl p-4 text-slate-900 focus:outline-none"
          type="text"
          name="newTodo"
          id="newTodo"
          placeholder="new todo"
        />
        <button type="submit">Add</button>
      </form>
      <CompletedTodos
        onDelete={deleteTodo}
        completedTodos={allTodos.filter((todo) => !todo.completed)}
      />
    </div>
  );
}

export default App;
