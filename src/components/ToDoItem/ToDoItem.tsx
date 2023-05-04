import { CSSProperties, useContext, useState } from "react";
import { ToDoContext } from "../../context/ToDoContext";
import "./ToDoItem.css";

export type ToDoItemProps = {
  id: string;
  title: string;
  hasChildren: boolean;
  isCompleted: boolean;
};

export const ToDoItem = ({
  id,
  title,
  isCompleted,
  hasChildren,
}: ToDoItemProps) => {
  const { toDos, setToDos, setSelectedTodo } = useContext(ToDoContext);

  const onChangeCheckbox = () => {
    const updatedToDos = [...toDos];
    const index = updatedToDos.findIndex((toDo) => toDo.id === id);
    updatedToDos[index] = {
      ...updatedToDos[index],
      isCompleted: !updatedToDos[index]?.isCompleted,
    };
    setToDos(updatedToDos);
  };

  const titleStyle = isCompleted ? "title-with-strike-through " : "title";

  return (
    <div className="todo-item-container">
      <div className="title-container">
        <input
          type="checkbox"
          onChange={onChangeCheckbox}
          checked={isCompleted}
          value={id}
        />
        <div
          className={titleStyle}
          onClick={() =>
            setSelectedTodo({
              id,
              title,
              isCompleted,
              hasChildren,
            })
          }
        >
          {title}
        </div>
      </div>
      <button>...</button>
    </div>
  );
};
