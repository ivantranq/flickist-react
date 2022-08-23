import React, { useEffect, useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Button } from "@mui/material";

const Login = () => {
  const [user, setUser] = useState({});
  cosnt[(isLoggedIn, setIsLoggedIn)] = useState(
    localStorage.getItem("authenticated") || false
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        setUser(user);
        localStorage.setItem("authenticated", true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div id="login">
      <div className="login__container">
        <h1 className="login__heading">Login</h1>
        <form className="login__form" onSubmit={login}>
          <label htmlFor="email" className="login-input__label">
            Email
          </label>
          <input
            type="email"
            placeholder="e.g. example@email.com"
            className="login-input"
            required
          />
          <label htmlFor="password" className="login-input__label">
            Password
          </label>
          <input type="password" className="login-input" required />
          <Button className="login-button">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
