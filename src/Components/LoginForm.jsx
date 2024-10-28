import React from "react";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div className="LoginForm-Container">
      <div className="LoginForm-Field">
        <div className="LoginForm-Username">
          <div className="LoginForm-Users">Username</div>
          <input type="text" className="LoginForm-UserForm" />
        </div>
        <div className="LoginForm-pwd">
          <div className="LoginForm-Pass">Password</div>
          <input type="text" className="LoginForm-pwdForm" />
        </div>
      </div>
      <div className="LoginForm-Button">
        <button className="LoginForm-Button1">LOG IN</button>
      </div>
    </div>
  );
};

export default LoginForm;
