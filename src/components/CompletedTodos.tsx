import { type todoType } from "../App";

type completedTodosPropsType = {
  todos: todoType[];
  onDelete: (id: number) => void;
  onCompleted: (id: number) => void;
};

export default function ShowTodos({
  todos,
  onDelete,
  onCompleted,
}: completedTodosPropsType) {
  return (
    <>
      {!todos && <p className="text-md text-amber-50">No todo added yet</p>}
      <ul className="flex flex-col gap-2">
        {todos &&
          todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "!bg-pink-500" : ""}>
              <input
                type="checkbox"
                id="checkbox"
                checked={todo.completed}
                onChange={() => onCompleted(todo.id)}
              />
              <p
                className={
                  todo.completed
                    ? "text-md text-white w-full"
                    : "text-md text-slate-900 w-full"
                }
              >
                {todo.todo}
              </p>
              <button
                className="!bg-transparent"
                onClick={() => onDelete(todo.id)}
              >
                x
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
