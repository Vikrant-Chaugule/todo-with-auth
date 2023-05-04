import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "userName") setUserName(value);
    else if (name === "password") setPassword(value);
  };

  const onClickLogin = () => {
    console.log(userName, password);
    navigate("/");
  };

  return (
    <div className="login-container">
      <input
        name="userName"
        type="text"
        placeholder="Username"
        value={userName}
        onChange={onChangeInput}
      />
      <input
        name="password"
        value={password}
        onChange={onChangeInput}
        type="password"
        placeholder="Password"
      />
      <button onClick={onClickLogin}>Login</button>
      <Link className="sign-up-link" to="/signup">
        Not Registered? Sign Up here
      </Link>
    </div>
  );
};
