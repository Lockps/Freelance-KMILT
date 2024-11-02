import React, { useContext, useState } from "react";
import "./Login.css";
import Navbar from "../Components/Navbar";
import { IoPerson } from "react-icons/io5";
import { LoginContext } from "../Context/LoginContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLogin } = useContext(LoginContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      console.log(res);

      const body = await res.json();
      console.log(body);

      if (body.message === "User found") {
        console.log("Login successful for:", body.user.username);
        setLogin(true);
      } else {
        alert("Wrong Username or password, try again!");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="Login-Container">
      <Navbar />
      <div className="LoginCon-Container">
        <div className="LoginCon-Border">
          <div className="LoginCon-Acc">
            <IoPerson />
            Account
          </div>
          <div className="LoginCon-Form">
            <form className="LoginForm-Container">
              <div className="LoginForm-Field">
                <div className="LoginForm-Username">
                  <div className="LoginForm-Users">Username</div>
                  <input
                    type="text"
                    className="LoginForm-UserForm"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="LoginForm-pwd">
                  <div className="LoginForm-Pass">Password</div>
                  <input
                    type="password"
                    className="LoginForm-pwdForm"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              <div className="LoginForm-Button">
                <button
                  className="LoginForm-Button1"
                  type="submit"
                  onClick={handleLogin}
                >
                  LOG IN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
