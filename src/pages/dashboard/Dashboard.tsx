import { useContext, useEffect } from "react";
import { ToDoDetails } from "../../components/ToDoDetails/ToDoDetails";
import { ToDoList } from "../../components/ToDoList/ToDoList";
import { UserInfo } from "../../components/UserInfo/UserInfo";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "" || !token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="dashboard-page">
      <UserInfo />
      <ToDoList />
      <ToDoDetails />
    </div>
  );
};
