import React, { useEffect, useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isUserEmpty } from "./Helpers";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
      })
      .catch((error) => {
        console.log(error);
        alert("User does not exist, please register an account.");
      });

    navigate("/");
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    const email = event.target[0].value;
    const password = event.target[1].value;

    login(email, password);
  }

  return isUserEmpty(user) ? (
    <div id="login">
      <div className="login__container">
        <h1 className="login__heading">Login</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-input__label">
            Email
          </label>
          <input
            type="email"
            placeholder="E.g. example@email.com"
            className="login-input"
            required
          />
          <label htmlFor="password" className="login-input__label">
            Password
          </label>
          <input
            type="password"
            className="login-input"
            placeholder="Enter Password"
            required
          />
          <Button className="login-button" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Login;
