import { type todoType } from "../App";

type completedTodosPropsType = {
  completedTodos: todoType[];
  onDelete: (id: number) => void;
};

export default function CompletedTodos({
  completedTodos,
  onDelete,
}: completedTodosPropsType) {
  return (
    <ul className="flex flex-col gap-2 mt-8">
      {!completedTodos && (
        <p className="text-md text-amber-50">No todo added yet</p>
      )}
      {completedTodos &&
        completedTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-4 bg-cyan-100 p-2 rounded-2xl"
          >
            <input type="checkbox" id="checkbox" />
            <p className="text-md text-slate-900 w-full">{todo.todo}</p>
            <button
              className="!bg-transparent"
              onClick={() => onDelete(todo.id)}
            >
              x
            </button>
          </li>
        ))}
    </ul>
  );
}
