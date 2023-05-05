import { createContext, useContext, useState } from "react";

export type AuthContextProps = {
  token: string;
  setToken: any;
  authUser: any;
  setAuthUser: any;
};

export const AuthContext = createContext<AuthContextProps>({
  token: "",
  setToken: () => {},
  authUser: {},
  setAuthUser: () => {},
});

export const AuthContextProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>("");
  const [authUser, setAuthUser] = useState({});

  return (
    <AuthContext.Provider value={{ token, setToken, authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
