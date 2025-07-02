import { type todoType } from "../App";
import { AnimatePresence, motion, spring } from "motion/react";

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
      <motion.ul className="flex flex-col gap-2">
        <AnimatePresence>
          {todos &&
            todos.map((todo) => (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, type: spring }}
                exit={{ opacity: 0, y: 50 }}
                layout
                key={todo.id}
                className={todo.completed ? "!bg-pink-500/70" : ""}
              >
                <motion.input
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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
                <motion.button
                  variants={{ hover: { scale: 1.1 }, tap: { scale: 0.9 } }}
                  whileHover="hover"
                  whileTap="tap"
                  className="!bg-transparent"
                  onClick={() => onDelete(todo.id)}
                >
                  x
                </motion.button>
              </motion.li>
            ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
