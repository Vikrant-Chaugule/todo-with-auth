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
      children: [],
      isCompleted: false,
    });
    setToDos(tasks);
    setToDoTitle("");
  };

  const onChangeToDoTitle = (e: React.FormEvent<HTMLInputElement>) =>
    setToDoTitle(e.currentTarget.value);

  const onHitEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && toDoTitle) {
      onClickAdd();
    }
  };

  return (
    <div className="todo-list-container">
      <h1>My Todo</h1>
      <div className="add-todo-container">
        <input
          placeholder="Add tasks"
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
          <NoToDoTasks />
        )}
      </div>
    </div>
  );
};

const NoToDoTasks = () => {
  return (
    <div style={{ width: "300px", textAlign: "center", margin: "25% auto" }}>
      <h1>Looks like you don't have any tasks pending right now.</h1>
      <h1> Good work!!</h1>
    </div>
  );
};
