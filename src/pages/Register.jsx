import React from "react";
import "./Register.css";
import { Button } from "@mui/material";

const Register = () => {
  function handleSubmit(event) {
    event.preventDefault();
    for (let i = 0; i < 4; i++) {
      console.log(event.target[i].value);
    }
  }
  return (
    <div id="register-page">
      <div className="register-page__container">
        <h2>Register your account</h2>
        <form className="register__form" onSubmit={handleSubmit}>
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
          />
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            required
            type="password"
            className="form__input"
            placeholder="Enter your password again..."
            name="password-confirm"
          />
          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
