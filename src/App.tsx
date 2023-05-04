import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { SignUp } from "./components/SignUp";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { useState } from "react";
import { ToDoContext } from "./context/ToDoContext";

function App() {
  const [toDos, setToDos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState({
    id: "",
    title: "",
    isCompleted: false,
    children: [],
  });

  return (
    <ToDoContext.Provider
      value={{ toDos, setToDos, selectedTodo, setSelectedTodo }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </ToDoContext.Provider>
  );
}

export default App;
