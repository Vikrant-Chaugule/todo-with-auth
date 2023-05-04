import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { SignUp } from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
