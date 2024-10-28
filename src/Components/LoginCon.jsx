import React from "react";
import "./LoginCon.css";
import { IoPerson } from "react-icons/io5";
import LoginForm from "./LoginForm";

const LoginCon = () => {
  return (
    <div className="LoginCon-Container">
      <div className="LoginCon-Border">
        <div className="LoginCon-Acc">
          <IoPerson />
          Account
        </div>
        <div className="LoginCon-Form">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginCon;
