import React, { useContext, useEffect } from "react";
import "./App.css";
import Login from "./Page/Login";
import HomeSelect from "./Page/HomeSelect";
import { ChooseProvider } from "./Context/ChooseContext";
import { LoginContext } from "./Context/LoginContext";

const App = () => {
  const { isLogin } = useContext(LoginContext);

  if (!isLogin) {
    return <Login />;
  }

  return (
    <ChooseProvider>
      <div>
        <HomeSelect />
      </div>
    </ChooseProvider>
  );
};

export default App;
