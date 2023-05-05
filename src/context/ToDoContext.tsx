import { createContext, useState } from "react";
import { ToDoItemProps } from "../components/ToDoItem/ToDoItem";

//TODO: replace function types

type ToDoContextType = {
  toDos: ToDoItemProps[];
  setToDos: any;
  selectedTodo: ToDoItemProps;
  setSelectedTodo: any;
};

export const ToDoContext = createContext<ToDoContextType>({
  toDos: [],
  setToDos: () => {},
  selectedTodo: {
    id: "",
    title: "",
    isCompleted: false,
    children: [],
  },
  setSelectedTodo: () => {},
});

export const ToDoContextProvider = ({ children }: any) => {
  const [toDos, setToDos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState({
    id: "",
    title: "",
    isCompleted: false,
    children: [],
  });

  return (
    <ToDoContext.Provider
      value={{ toDos, setToDos, selectedTodo, setSelectedTodo }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
