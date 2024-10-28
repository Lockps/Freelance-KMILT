import React from "react";
import "./Login.css";
import Navbar from "../Components/Navbar";
import LoginCon from "../Components/LoginCon";

const Login = () => {
  return (
    <div className="Login-Container">
      <Navbar />
      <LoginCon />
    </div>
  );
};

export default Login;
