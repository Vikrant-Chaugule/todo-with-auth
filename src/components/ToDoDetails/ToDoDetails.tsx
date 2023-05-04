import { useContext } from "react";
import { ToDoContext } from "../../context/ToDoContext";
import "./ToDoDetails.css";

export const ToDoDetails = ({ todo = {} }) => {
  const { selectedTodo } = useContext(ToDoContext);

  return (
    <div className="todo-details-container">
      <h1>Todo Details</h1>
      <div>
        {selectedTodo.id ? (
          <div>
            <h2>{selectedTodo.title}</h2>
          </div>
        ) : (
          <span>Click task title to see the details or add subtask</span>
        )}
      </div>
    </div>
  );
};
