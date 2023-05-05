import { useContext, useState } from "react";
import { ToDoContext } from "../../context/ToDoContext";
import "./ToDoItem.css";
import { SubTaskPopup } from "../SubTaskPopup/SubTaskPopup";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import { faTrowelBricks } from "@fortawesome/free-solid-svg-icons";

export type ToDoItemProps = {
  id: string;
  title: string;
  children: ToDoItemProps[];
  isCompleted: boolean;
};

export const ToDoItem = ({
  id,
  title,
  isCompleted,
  children,
}: ToDoItemProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { toDos, setToDos, setSelectedTodo, selectedTodo } =
    useContext(ToDoContext);

  const onChangeCheckbox = (taskId: string) => {
    const updatedToDos = [...toDos];
    const index = updatedToDos.findIndex((toDo) => toDo.id === taskId);
    updatedToDos[index] = {
      ...updatedToDos[index],
      isCompleted: !updatedToDos[index]?.isCompleted,
    };

    // if parent task is done then subtasks are also done
    if (updatedToDos[index]?.children?.length) {
      updatedToDos[index].children = updatedToDos[index]?.children?.map(
        (ele) => ({
          ...ele,
          isCompleted: updatedToDos[index]?.isCompleted,
        })
      );
    }
    setToDos(updatedToDos);

    if (selectedTodo.id === id) {
      setSelectedTodo(updatedToDos[index]);
    }
  };

  const onDeleteToDo = (id: string) => {
    const updatedToDos = toDos?.filter((toDo) => toDo.id !== id);
    setToDos(updatedToDos);

    if (selectedTodo.id === id) {
      setSelectedTodo({});
    }
  };

  const onAddSubTask = (id: string, subTask: string) => {
    const updatedToDos = [...toDos];
    const index = updatedToDos.findIndex((toDo) => toDo.id === id);
    updatedToDos[index].children.push({
      id: uuidv4(),
      title: subTask,
      children: [],
      isCompleted: false,
    });
    setToDos(updatedToDos);
    if (selectedTodo.id === id) {
      setSelectedTodo(updatedToDos[index]);
    }
  };

  const onChangeChildCheckbox = (subTaskId: string) => {
    const updatedToDos = [...toDos];
    const index = updatedToDos.findIndex((toDo) => toDo.id === id);
    let allChildrenChecked = true;
    updatedToDos[index].children = updatedToDos[index].children.map((ele) => {
      let child = { ...ele };
      if (ele.id === subTaskId)
        child = { ...ele, isCompleted: !ele.isCompleted };

      if (!child.isCompleted) allChildrenChecked = false;
      return child;
    });

    updatedToDos[index].isCompleted = allChildrenChecked;

    setToDos(updatedToDos);
    if (selectedTodo.id === id) {
      setSelectedTodo(updatedToDos[index]);
    }
  };

  const onDeleteChildCheckbox = (subTaskId: string) => {
    const updatedToDos = [...toDos];
    const index = updatedToDos.findIndex((toDo) => toDo.id === id);
    updatedToDos[index].children = updatedToDos[index].children.filter(
      (ele) => ele.id !== subTaskId
    );
    setToDos(updatedToDos);
    if (selectedTodo.id === id) {
      setSelectedTodo(updatedToDos[index]);
    }
  };

  return (
    <div className="">
      <Item
        onChangeCheckbox={onChangeCheckbox}
        showSubTaskBtn={true}
        isCompleted={isCompleted}
        id={id}
        title={title}
        children={children}
        onDeleteToDo={onDeleteToDo}
        onAddSubTask={onAddSubTask}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
      <div style={{ marginLeft: "40px" }}>
        {children?.length
          ? children.map((child) => {
              return (
                <Item
                  key={child.id}
                  onChangeCheckbox={onChangeChildCheckbox}
                  showSubTaskBtn={false}
                  isCompleted={child.isCompleted}
                  id={child.id}
                  title={child.title}
                  children={child.children}
                  onDeleteToDo={onDeleteChildCheckbox}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

type ItemProps = {
  onChangeCheckbox: (id: string) => void;
  showSubTaskBtn?: boolean;
  isCompleted: boolean;
  id: string;
  title: string;
  children: ToDoItemProps[];
  onDeleteToDo: (id: string) => void;
  onAddSubTask?: any;
  showPopup?: boolean;
  setShowPopup?: any;
};

const Item = ({
  showSubTaskBtn = false,
  onChangeCheckbox,
  isCompleted,
  id,
  title,
  children,
  onDeleteToDo,
  onAddSubTask,
  showPopup,
  setShowPopup,
}: ItemProps) => {
  const { toDos, setSelectedTodo } = useContext(ToDoContext);
  const titleStyle = isCompleted ? "title-with-strike-through " : "title";

  const onSeeDetails = () => {
    if (showSubTaskBtn) {
      const todo = toDos.find((ele) => ele.id === id);
      setSelectedTodo(todo);
    }
  };

  return (
    <div className="todo-item-container">
      <div className="title-container">
        <input
          style={{ borderRadius: "10px" }}
          type="checkbox"
          onChange={() => onChangeCheckbox(id)}
          checked={isCompleted}
          value={id}
        />
        <div className={titleStyle} onClick={onSeeDetails}>
          {title}
          {children.length > 0 ? (
            <span style={{ marginLeft: "10px" }}>
              <FontAwesomeIcon icon={faTrowelBricks} />
            </span>
          ) : null}
        </div>
      </div>
      <div>
        <Popup
          trigger={() => <button className="delete-btn">Delete</button>}
          position="bottom left"
          closeOnDocumentClick
        >
          Are you sure?
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="confirm-delete" onClick={() => onDeleteToDo(id)}>
              Delete
            </button>
          </div>
        </Popup>

        {showSubTaskBtn ? (
          <button
            className="delete-btn"
            style={
              isCompleted ? { background: "grey", cursor: "not-allowed" } : {}
            }
            onClick={() => setShowPopup(true)}
            disabled={isCompleted}
          >
            Add Sub Task
          </button>
        ) : null}
        <SubTaskPopup
          parentId={id}
          onAddSubTask={onAddSubTask}
          showPopup={showPopup || false}
          closePopup={() => setShowPopup(false)}
        />
      </div>
    </div>
  );
};
