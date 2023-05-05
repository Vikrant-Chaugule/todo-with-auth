import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signup/SignUp";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ToDoContextProvider } from "./context/ToDoContext";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <ToDoContextProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </ToDoContextProvider>
    </AuthContextProvider>
  );
}

export default App;
