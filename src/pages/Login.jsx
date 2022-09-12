import React, { useEffect, useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isUserEmpty } from "./Helpers";
import BackgroundImg from "./assets/home__bg-img.jpg";
import RefreshIcon from "@mui/icons-material/Refresh";

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

  async function login(email, password) {
    const spinLoading = document.querySelector(".login-button--loading");
    const loginText = document.querySelector(".login-button--text");
    console.log(spinLoading);
    console.log(loginText);
    loginText.style.visibility = "hidden";
    spinLoading.style.visibility = "visible";

    await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        setUser(user);
        handleLogin("found");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        console.log("error user", user);
        handleLogin("not found");
        // alert("User does not exist, please register an account.");
      });
    spinLoading.style.visibility = "hidden";
    loginText.style.visibility = "visible";
  }

  function handleLogin(str) {
    const errorBox = document.querySelector(".error-box");
    console.log(errorBox);

    if (str === "not found") {
      errorBox.style.display = "block";
    } else if (str === "found") {
      if (errorBox.style.display === "block") {
        errorBox.style.display = "none";
      }
    }
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
      <figure className="background__img--wrapper">
        <img src={BackgroundImg} alt="" className="background__img" />
      </figure>
      <div className="login__container">
        <h1 className="login__heading">Sign In</h1>

        <div className="error-box showing">
          <p className="error-text">
            User not found or incorrect email/password.
          </p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            required
          />

          <input
            type="password"
            className="login-input"
            placeholder="Password"
            required
          />
          <Button className="login-button" type="submit">
            <span className="login-button--text">Sign In</span>

            <RefreshIcon className="login-button--loading"></RefreshIcon>
          </Button>
        </form>
        <p className="sign-up__text">
          New to Flickist?{" "}
          <span onClick={() => navigate("/register")}>Sign Up Now</span>
        </p>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Login;
