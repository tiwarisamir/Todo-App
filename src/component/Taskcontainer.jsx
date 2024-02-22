import React from "react";
import Addtask from "./Addtask";
import Task from "./Task";
import Todocontainer from "./Todocontainer";
import Empty from "./empty";
import TodoItemContextProvider from "../store/TaskStore";

const Taskcontainer = () => {
  return (
    <>
      <TodoItemContextProvider>
        <Todocontainer>
          <Addtask />
          <Empty />
          <Task />
        </Todocontainer>
      </TodoItemContextProvider>
    </>
  );
};

export default Taskcontainer;
