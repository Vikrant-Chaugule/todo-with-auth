import { useContext } from "react";
import "./UserInfo.css";
import { AuthContext } from "../../context/AuthContext";

export const UserInfo = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="user-info-container ">
      <h1>Hey {authUser?.userName}</h1>
      <div>
        <div>Total Tasks: 10</div>
        <div>Completed: 5</div>
        <div>In Progress: 5</div>
        <div>You are 50% productive: 5</div>
      </div>
    </div>
  );
};
