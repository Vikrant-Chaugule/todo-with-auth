import { createContext } from "react";
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
