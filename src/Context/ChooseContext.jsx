import React, { createContext, useState } from "react";

export const ChooseContext = createContext();

export const ChooseProvider = ({ children }) => {
  const [choose, setChoose] = useState("Home");

  return (
    <ChooseContext.Provider value={{ choose, setChoose }}>
      {children}
    </ChooseContext.Provider>
  );
};
