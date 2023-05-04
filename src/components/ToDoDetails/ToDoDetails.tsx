import { useContext } from "react";
import { ToDoContext } from "../../context/ToDoContext";
import "./ToDoDetails.css";

export const ToDoDetails = () => {
  const { selectedTodo } = useContext(ToDoContext);

  const { id, title, isCompleted, children } = selectedTodo;

  const titleStyle = isCompleted ? "title-with-strike-through " : "title";

  console.log(selectedTodo);

  return (
    <div className="todo-details-container">
      <h1>Todo Details</h1>
      <div>
        {id ? (
          <div>
            <h2 className={titleStyle}>{title}</h2>
            <ul>
              {children?.length
                ? children.map((ele) => {
                    const subtaskTitleStyle = ele.isCompleted
                      ? "title-with-strike-through "
                      : "title";

                    return (
                      <li className={subtaskTitleStyle} key={ele.id}>
                        {ele.title}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        ) : (
          <span>Click task title to see the details</span>
        )}
      </div>
    </div>
  );
};
