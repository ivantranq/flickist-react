import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();

  function logout() {
    signOut(auth);
  }

  return (
    <div className="navbar">
      <div className="navbar__logo" onClick={() => navigate("/")}>
        <figure className="logo__wrapper">
          <img src={logo} alt="" className="logo__img" />
        </figure>
      </div>
      <div className="navbar__links">
        <Button className="navbar__link">Login</Button>

        <Button
          variant="contained"
          className="navbar__link--signup"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
