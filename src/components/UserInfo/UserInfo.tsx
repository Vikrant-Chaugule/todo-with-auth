import { useContext } from "react";
import "./UserInfo.css";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faCircleCheck,
  faListCheck,
  faBarsProgress,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { ToDoContext } from "../../context/ToDoContext";

export const UserInfo = () => {
  const { authUser, setAuthUser, logout } = useContext(AuthContext);
  const { toDos } = useContext(ToDoContext);

  const navigate = useNavigate();

  const onClickLogout = () => {
    logoutUser();
    logout();
    setAuthUser({});
    navigate("/login");
  };

  const total = toDos?.length;
  const completed = toDos?.filter((ele) => ele.isCompleted === true).length;
  const inProgress = total - completed;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="user-info-container ">
      <h1>Hey, {authUser?.userName}</h1>

      <div>
        <IconWithText
          icon={faListCheck}
          color="rgb(150, 195, 235)"
          label={`Total Tasks: ${total}`}
        />
        {total > 0 ? (
          <>
            <IconWithText
              icon={faCircleCheck}
              color="#25b84c"
              label={`Completed: ${completed}`}
            />
            <IconWithText
              icon={faBarsProgress}
              color="rgb(250, 208, 0)"
              label={`In Progress: ${inProgress}`}
            />
            <IconWithText
              icon={faCheckDouble}
              color="rgb(184, 37, 111)"
              label={`You are ${percentage || 0}% productive`}
            />
          </>
        ) : null}
      </div>

      <div style={{ position: "absolute", bottom: "10px" }}>
        <Popup
          trigger={() => <FontAwesomeIcon icon={faGear} size="2xl" />}
          position="top left"
          closeOnDocumentClick
        >
          <button onClick={onClickLogout}> Logout </button>
        </Popup>
      </div>
    </div>
  );
};

type IconWithTextProps = {
  label: string;
  icon: any;
  color: string;
};

const IconWithText = ({ label, icon, color }: IconWithTextProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon icon={icon} color={color} />
      <span
        style={{ marginLeft: "10px", fontSize: "18px", lineHeight: "30px" }}
      >
        {label}
      </span>
    </div>
  );
};
