import { createContext, useContext, useReducer, useState } from "react";

export const TodoItemsContext = createContext([]);

import React from "react";

const todoItemReducer = (currentTodoItems, action) => {
  let NewItem = currentTodoItems;
  if (action.type === "ADD_ITEM") {
    NewItem = [
      { todoName: action.payload.itemName, todoDate: action.payload.itemDate },
      ...currentTodoItems,
    ];
  } else if (action.type === "DELETE_ITEM") {
    NewItem = currentTodoItems.filter(
      (items) => items.todoName !== action.payload.itemName
    );
  }
  return NewItem;
};

const TodoItemContextProvider = ({ children }) => {
  const [todo, dispatchtodo] = useReducer(todoItemReducer, []);

  const onItemAdd = (itemName, itemDate) => {
    const newItemAction = {
      type: "ADD_ITEM",
      payload: {
        itemName,
        itemDate,
      },
    };
    dispatchtodo(newItemAction);
  };

  const onItemDelete = (itemName) => {
    const deleteItemAction = {
      type: "DELETE_ITEM",
      payload: {
        itemName: itemName,
      },
    };
    dispatchtodo(deleteItemAction);
  };

  return (
    <TodoItemsContext.Provider
      value={{
        todo,
        onItemAdd,
        onItemDelete,
      }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
};

export default TodoItemContextProvider;
