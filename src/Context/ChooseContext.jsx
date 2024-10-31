import React, { createContext, useState } from "react";

export const ChooseContext = createContext();

export const ChooseProvider = ({ children }) => {
  const [choose, setChoose] = useState("HOME");

  return (
    <ChooseContext.Provider value={{ choose, setChoose }}>
      {children}
    </ChooseContext.Provider>
  );
};
