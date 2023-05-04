import { ToDoDetails } from "../../components/ToDoDetails/ToDoDetails";
import { ToDoList } from "../../components/ToDoList/ToDoList";
import { UserInfo } from "../../components/UserInfo/UserInfo";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <UserInfo />
      <ToDoList />
      <ToDoDetails />
    </div>
  );
};
