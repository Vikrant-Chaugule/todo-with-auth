import { useContext, useState } from "react";
import { ToDoItem, ToDoItemProps } from "../ToDoItem/ToDoItem";
import "./ToDoList.css";
import { ToDoContext } from "../../context/ToDoContext";
import { v4 as uuidv4 } from "uuid";

export const ToDoList = () => {
  const [toDoTitle, setToDoTitle] = useState("");
  const { toDos, setToDos } = useContext(ToDoContext);

  const onClickAdd = () => {
    const tasks = [...toDos];
    tasks.push({
      id: uuidv4(),
      title: toDoTitle,
      hasChildren: false,
      isCompleted: false,
    });
    setToDos(tasks);
    setToDoTitle("");
  };

  const onChangeToDoTitle = (e: React.FormEvent<HTMLInputElement>) =>
    setToDoTitle(e.currentTarget.value);

  const onHitEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onClickAdd();
    }
  };

  return (
    <div className="todo-list-container">
      <h1>My Todo</h1>
      <div className="add-todo-container">
        <input
          placeholder="Add Tasks to My Todo"
          value={toDoTitle}
          onChange={onChangeToDoTitle}
          onKeyUp={onHitEnter}
        />
      </div>
      <div className="list-container">
        {toDos.length ? (
          toDos?.map((todo: ToDoItemProps, index) => (
            <ToDoItem key={index} {...todo} />
          ))
        ) : (
          <span>Add your Tasks</span>
        )}
      </div>
    </div>
  );
};
