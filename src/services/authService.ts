import { users } from "../db/database";
import { v4 as uuidv4 } from "uuid";

export const loginUser = (userName: string, password: string) => {
  const user = users.find(
    (usr) => usr.userName === userName && usr.password === password
  );
  if (!user) return new Error("No account found!");
  return user;
};

export const signUpUser = (userName: string, password: string) => {
  const user = users.find((usr) => usr.userName === userName);
  if (!!user) return new Error("User name already exists!");
  const newUser = {
    userId: uuidv4(),
    userName,
    password,
  };
  users.push(newUser);
  return newUser;
};

export const logoutUser = (userName: string) => {};
