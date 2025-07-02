import { useState, type FormEvent } from "react";
import { motion, spring } from "motion/react";

import ShowTodos from "./components/ShowTodos";

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
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => id !== todo.id));
  }

  function completeTodo(id: number) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const unCompleted: todoType[] = allTodos.filter((todo) => !todo.completed);
  const completed: todoType[] = allTodos.filter((todo) => todo.completed);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, type: spring }}
      className="mt-8 sm:w-[90vw] md:w-[70vw] lg:w-[60vw] flex flex-col gap-4 p-4 rounded-4xl bg-amber-50/30"
    >
      <h1 className="text-white text-3xl">Todo List</h1>
      <form className="mb-8 flex gap-4" onSubmit={addTodo}>
        <input
          required
          className="text-xl w-full bg-white rounded-xl p-4 text-slate-900 focus:outline-none"
          type="text"
          name="newTodo"
          id="newTodo"
          placeholder="new todo"
        />
        <motion.button
          variants={{ hover: { scale: 1.1 }, tap: { scale: 0.9 } }}
          whileHover="hover"
          whileTap="tap"
          type="submit"
        >
          Add
        </motion.button>
      </form>
      <h2 className="text-lg text-amber-50">Todos</h2>
      {!unCompleted.length && (
        <p className="text-sm text-amber-50">No todo added yet</p>
      )}
      <ShowTodos
        onDelete={deleteTodo}
        onCompleted={completeTodo}
        todos={unCompleted}
      />
      <h2 className="text-lg text-amber-50 mt-8">Completed</h2>
      <ShowTodos
        onDelete={deleteTodo}
        onCompleted={completeTodo}
        todos={completed}
      />
    </motion.div>
  );
}

export default App;
