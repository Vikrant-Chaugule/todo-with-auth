import React, { useContext, useState } from "react";
import "../login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../../context/AuthContext";
import { signUpUser } from "../../services/authService";
import { redirect } from "react-router-dom";

type FormErrors = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

export const SignUp: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

  const { login } = useContext<AuthContextProps>(AuthContext);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const validateUserForm = () => {
    let newErrors: FormErrors = {};
    if (userName.length < 6)
      newErrors.username = "User name must be at least 6 character long";
    const regularExpression =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!regularExpression.test(password))
      newErrors.password =
        "Password must contain at least one uppercase,lowercase,special character, digit and must be 8 characters long";

    if (confirmPassword.length < 8)
      newErrors.confirmPassword =
        "Confirm Password must be at least 8 characters long";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.currentTarget;
    if (name === "userName") setUserName(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const onClickLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrors({});

    if (validateUserForm()) {
      const isValid = signUpUser(userName, password);
      if (isValid instanceof Error) {
        setError("User name already exists! Please try a different one.");
      } else {
        login();
        navigate("/login");
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Hey there!</h1>
      <h2>Create your account</h2>
      <input
        name="userName"
        type="text"
        placeholder="Username"
        value={userName}
        onChange={onChangeInput}
      />
      <span className="error-msg">{errors.username}</span>

      <input
        name="password"
        value={password}
        onChange={onChangeInput}
        type="password"
        placeholder="Password"
      />
      <span className="error-msg">{errors.password}</span>

      <input
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChangeInput}
        type="password"
        placeholder="Confirm Password"
      />
      <span className="error-msg">{errors.confirmPassword}</span>

      <button onClick={onClickLogin} disabled={!(userName && password)}>
        Create Account
      </button>
      {error ? <span className="error-msg">{error}</span> : null}
      <Link className="sign-up-link" to="/login">
        Already registered?{" "}
        <span style={{ textDecoration: "underline" }}>Login</span>
      </Link>
    </div>
  );
};
