import { useContext, useState } from "react";
import { ToDoContext } from "../../context/ToDoContext";
import "./ToDoItem.css";
import { SubTaskPopup } from "../SubTaskPopup/SubTaskPopup";
import { v4 as uuidv4 } from "uuid";

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
    // console.log("selectedTodo", selectedTodo);
    setToDos(updatedToDos);

    if (selectedTodo.id === id) {
      setSelectedTodo(updatedToDos[index]);
    }
  };

  const onDeleteToDo = (id: string) => {
    const updatedToDos = toDos?.filter((toDo) => toDo.id !== id);
    // console.log("selectedTodo", selectedTodo);
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
    // console.log("selectedTodo", selectedTodo);
    if (selectedTodo.id === id) {
      setSelectedTodo(updatedToDos[index]);
    }
  };

  const onChangeChildCheckbox = (subTaskId: string) => {
    const updatedToDos = [...toDos];
    const index = updatedToDos.findIndex((toDo) => toDo.id === id);
    updatedToDos[index].children = updatedToDos[index].children.map((ele) => {
      if (ele.id === subTaskId)
        return { ...ele, isCompleted: !ele.isCompleted };
      else return ele;
    });

    setToDos(updatedToDos);
    if (selectedTodo.id === id) {
      setSelectedTodo(updatedToDos[index]);
    }
    // console.log("selectedTodo", selectedTodo);
  };

  const onDeleteChildCheckbox = (subTaskId: string) => {
    const updatedToDos = [...toDos];
    const index = updatedToDos.findIndex((toDo) => toDo.id === id);
    updatedToDos[index].children = updatedToDos[index].children.filter(
      (ele) => ele.id !== subTaskId
    );
    setToDos(updatedToDos);
    // console.log("selectedTodo", selectedTodo);
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
  onChangeCheckbox: any;
  showSubTaskBtn?: boolean;
  isCompleted: boolean;
  id: string;
  title: string;
  children: ToDoItemProps[];
  onDeleteToDo: any;
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
      // setSelectedTodo({
      //   id,
      //   title,
      //   isCompleted,
      //   children,
      // });
    }
  };

  return (
    <div className="todo-item-container">
      <div className="title-container">
        <input
          type="checkbox"
          onChange={() => onChangeCheckbox(id)}
          checked={isCompleted}
          value={id}
        />
        <div className={titleStyle} onClick={onSeeDetails}>
          {title}
        </div>
      </div>
      <div>
        <button onClick={() => onDeleteToDo(id)}>Delete</button>
        {showSubTaskBtn ? (
          <button onClick={() => setShowPopup(true)}>Add Sub Task</button>
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
