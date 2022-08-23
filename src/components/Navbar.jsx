import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { isUserEmpty } from "../pages/Helpers";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function logout() {
    signOut(auth);
    setisLoggedIn(false);
    setUser({});
  }

  return (
    <div className="navbar">
      <div className="navbar__logo" onClick={() => navigate("/")}>
        <figure className="logo__wrapper">
          <img src={logo} alt="" className="logo__img" />
        </figure>
      </div>
      {isUserEmpty(user) ? (
        <div className="navbar__links">
          <Button className="navbar__link" onClick={() => navigate("/login")}>
            Login
          </Button>

          <Button
            variant="contained"
            className="navbar__link--signup"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      ) : (
        <div className="navbar__links">
          <Button className="navbar__link" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
