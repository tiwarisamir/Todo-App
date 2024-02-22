import React, { useContext, useRef } from "react";
import { TodoItemsContext } from "../store/TaskStore";

const Addtask = () => {
  const taskName = useRef();
  const taskDate = useRef();

  const { onItemAdd } = useContext(TodoItemsContext);

  const handelAdd = (evt) => {
    evt.preventDefault();
    onItemAdd(taskName.current.value, taskDate.current.value);
    taskName.current.value = "";
    taskDate.current.value = "";
  };

  return (
    <form className="flex  gap-5 justify-evenly" onSubmit={handelAdd}>
      <input
        type="text"
        ref={taskName}
        placeholder="Enter the task here"
        className=" p-2  border border-black rounded"
      />
      <input
        type="date"
        ref={taskDate}
        className="w-full p-2 border border-black rounded "
      />
      <button className=" bg-zinc-700 text-white p-2 rounded min-w-[80px]">
        Add
      </button>
    </form>
  );
};

export default Addtask;
