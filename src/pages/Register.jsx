import React from "react";
import "./Register.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  function handleSubmit(event) {
    event.preventDefault();
    for (let i = 0; i < 4; i++) {
      console.log(event.target[i].value);
    }
  }

  function passwordsMatching() {
    if (
      document.getElementById("password").value ==
      document.getElementById("password-confirm").value
    ) {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerHTML = "matching";
    } else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTML = "not matching";
    }
  }
  return (
    <div id="register-page">
      <div className="register-page__container">
        <h2>Register your account</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__form--label-input">
            <label htmlFor="username">Name</label>
            <input
              required
              type="text"
              className="form__input"
              placeholder="Enter your name..."
              name="username"
            />
          </div>
          <div className="register__form--label-input">
            <label htmlFor="email">Email address</label>
            <input
              required
              type="email"
              className="form__input"
              placeholder="Enter your email address..."
              name="email"
            />
          </div>
          <div className="register__form--label-input">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              className="form__input"
              placeholder="Enter your password..."
              id="password"
              name="password"
              onChange={passwordsMatching()}
            />
          </div>
          <div className="register__form--label-input">
            <label htmlFor="password-confirm">Confirm Password</label>
            <input
              required
              type="password"
              className="form__input"
              placeholder="Enter your password again..."
              id="password-confirm"
              name="password-confirm"
              onChange={passwordsMatching()}
            />
            <span id="message"></span>
          </div>
          <Button type="submit">Register</Button>
        </form>
        <p className="sign-in">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
