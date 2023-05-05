import { createContext, useState } from "react";

export type AuthContextProps = {
  authUser: any;
  setAuthUser: any;
  login: any;
};

export const AuthContext = createContext<any>({
  authUser: {},
  setAuthUser: () => {},
});

export const AuthContextProvider = ({ children }: any) => {
  const [authUser, setAuthUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
  });

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
