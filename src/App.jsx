import React from "react";
import "./App.css";
import Login from "./Page/Login";
import HomeSelect from "./Page/HomeSelect";
import { ChooseProvider } from "./Context/ChooseContext";

const App = () => {
  return (
    <ChooseProvider>
      <div>
        {/* <Login /> */}
        <HomeSelect />
      </div>
    </ChooseProvider>
  );
};

export default App;
