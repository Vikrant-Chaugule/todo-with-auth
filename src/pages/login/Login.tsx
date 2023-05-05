import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

export const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuthUser, login } = useContext<AuthContextProps>(AuthContext);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.currentTarget;
    if (name === "userName") setUserName(value);
    else if (name === "password") setPassword(value);
  };

  const onClickLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = loginUser(userName, password);
    if (user instanceof Error) {
      setError(user.message);
    } else {
      login();
      setAuthUser(user);
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome!</h1>
      <h2>Log in to your account</h2>
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
      <button onClick={onClickLogin} disabled={!(userName && password)}>
        Login
      </button>
      {error ? <span className="error-msg">{error}</span> : null}
      <Link className="sign-up-link" to="/signup">
        Don't have an account?
        <span style={{ textDecoration: "underline" }}> Sign Up</span>
      </Link>
    </div>
  );
};
