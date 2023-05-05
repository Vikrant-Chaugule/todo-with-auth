import { useContext } from "react";
import "./UserInfo.css";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";

export const UserInfo = () => {
  const { authUser, setAuthUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickLogout = () => {
    logout();
    setAuthUser({});
    navigate("/");
  };

  return (
    <div className="user-info-container ">
      <h1>Hey {authUser?.userName}</h1>

      <div>
        <div>Total Tasks: 10</div>
        <IconWithText
          icon={faCircleCheck}
          color="#25b84c"
          label="Completed: 5"
        />
        {/* <div>
          <FontAwesomeIcon icon={faCircleCheck} color="#25b84c" />
          <div>Completed: 5</div>
        </div> */}
        <div>In Progress: 5</div>
        <div>You are 50% productive: 5</div>
      </div>

      <div style={{ position: "absolute", bottom: "0px" }}>
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

const IconWithText = ({ label, icon, color }: any) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon icon={icon} color={color} />
      <span>{label}</span>
    </div>
  );
};
