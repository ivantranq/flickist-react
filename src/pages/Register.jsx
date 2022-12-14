import React from "react";
import "./Register.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import BackgroundImg from "./assets/home__bg-img.jpg";
import RefreshIcon from "@mui/icons-material/Refresh";

const Register = () => {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    for (let i = 0; i < 4; i++) {
      console.log(event.target[i].value);
    }
    if (passwordsMatching()) {
      const name = event.target[0].value;
      const email = event.target[1].value;
      const password = event.target[2].value;

      await register(name, email, password);
      navigate("/");
    }
  }

  async function register(name, email, password) {
    const spinLoading = document.body.querySelector(".register-btn--loading");
    const registerText = document.body.querySelector(".register-btn--text");
    console.log(spinLoading);
    registerText.style.visibility = "hidden";
    spinLoading.style.visibility = "visible";
    await createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        user["displayName"] = name;
      })
      .catch((error) => {
        console.log(error);
      });
    spinLoading.style.visbiility = "hidden";
    registerText.style.visibility = "visible";
  }

  function passwordsMatching() {
    const password = document.getElementById("password");
    const confirm = document.getElementById("password-confirm");
    if (confirm.value === password.value) {
      confirm.setCustomValidity("Passwords Match");
      confirm.reportValidity();
      return true;
    } else {
      confirm.setCustomValidity("Passwords do not match");
      confirm.reportValidity();
      return false;
    }
  }

  return (
    <div id="register-page">
      <figure className="background__img--wrapper">
        <img src={BackgroundImg} alt="" className="background__img" />
      </figure>
      <div className="register-page__container">
        <h2>Get Started</h2>
        <form className="register__form" onSubmit={handleSubmit} noValidate>
          {/* <label htmlFor="username">Name</label> */}
          <input
            required
            type="text"
            className="form__input"
            placeholder="Name"
            name="username"
          />
          {/* <label htmlFor="email">Email address</label> */}
          <input
            required
            type="email"
            className="form__input"
            placeholder="Email"
            name="email"
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            required
            type="password"
            className="form__input"
            placeholder="Password"
            id="password"
            name="password"
          />
          {/* <label htmlFor="password-confirm">Confirm Password</label> */}
          <input
            required
            type="password"
            className="form__input"
            placeholder="Confirm Password"
            id="password-confirm"
            name="password-confirm"
            onChange={() => passwordsMatching()}
          />
          <Button type="submit" className="register-button">
            <span className="register-btn--text">Register</span>
            <RefreshIcon className="register-btn--loading"></RefreshIcon>
          </Button>
        </form>
        <p className="sign-in">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
