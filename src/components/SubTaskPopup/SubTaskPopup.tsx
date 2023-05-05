import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./SubTaskPopup.css";

type SubTaskPopupProps = {
  parentId: string;
  onAddSubTask: (id: string, title: string) => void;
  showPopup: boolean;
  closePopup: () => void;
};

export const SubTaskPopup = ({
  parentId,
  onAddSubTask,
  showPopup,
  closePopup,
}: SubTaskPopupProps) => {
  const [subTask, setSubTask] = useState<string>("");

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSubTask(e.currentTarget.value);
  };

  const onHitEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && subTask) {
      onAddSubTask(parentId, subTask);
      setSubTask("");
      closePopup();
    }
  };

  const onClosePopup = () => {
    setSubTask("");
    closePopup();
  };

  return (
    <Popup
      modal
      open={showPopup}
      closeOnDocumentClick
      onClose={onClosePopup}
      position="bottom left"
    >
      <div className="popup-container">
        <h3>Add Sub Task</h3>
        <input
          placeholder="Add Subtask"
          value={subTask}
          onChange={onChangeInput}
          onKeyUp={onHitEnter}
        />
      </div>
    </Popup>
  );
};
