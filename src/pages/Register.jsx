import React, { useState } from "react";
import "./Register.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    for (let i = 0; i < 4; i++) {
      console.log(event.target[i].value);
    }
    if (passwordsMatching()) {
      register(
        event.target[0].value,
        event.target[1].value,
        event.target[2].value
      );
      // navigate("/login");
    }
  }

  function register(name, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        user["displayName"] = name;
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="register-page__container">
        <h2>Register your account</h2>
        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="username">Name</label>
          <input
            required
            type="text"
            className="form__input"
            placeholder="Enter your name..."
            name="username"
          />
          <label htmlFor="email">Email address</label>
          <input
            required
            type="email"
            className="form__input"
            placeholder="Enter your email address..."
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            className="form__input"
            placeholder="Enter your password..."
            id="password"
            name="password"
          />
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            required
            type="password"
            className="form__input"
            placeholder="Enter your password again..."
            id="password-confirm"
            name="password-confirm"
            onChange={() => passwordsMatching()}
          />
          <Button type="submit" className="register-button">
            Register
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
