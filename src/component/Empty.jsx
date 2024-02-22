import React, { useContext } from "react";
import { TodoItemsContext } from "../store/TaskStore";

const Empty = () => {
  const { todo } = useContext(TodoItemsContext);

  return (
    todo.length === 0 && (
      <h3 className="text-center mt-5">No Task has been added yet!</h3>
    )
  );
};

export default Empty;
