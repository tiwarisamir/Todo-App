import React, { useContext } from "react";
import { TodoItemsContext } from "../store/TaskStore";

const Task = () => {
  const { todo, onItemDelete } = useContext(TodoItemsContext);

  return (
    <>
      {todo.map((item, i) => (
        <div
          className="flex gap-5 justify-between mt-5 p-2 border-b border-black-100"
          key={i}
        >
          <div className="text-left min-w-[199px]">{item.todoName}</div>
          <div className="text-left min-w-[161px]">{item.todoDate}</div>
          <button
            className="bg-red-400 text-white p-2 rounded min-w-[80px]"
            onClick={() => onItemDelete(item.todoName)}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Task;
