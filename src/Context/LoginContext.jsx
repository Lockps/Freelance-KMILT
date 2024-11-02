import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
