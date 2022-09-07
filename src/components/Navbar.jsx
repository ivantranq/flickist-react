import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { isUserEmpty } from "../pages/Helpers";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
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

  function logout() {
    signOut(auth);
    setUser({});
    alert("Logging out will take you back to homepage");
    navigate("/");
  }

  function showMenu() {
    const navbarLinksEl = document.getElementsByClassName("navbar__links")[0];
    console.log(navbarLinksEl);
    navbarLinksEl.classList.toggle("navbar__links--show");
  }

  return (
    <div className="navbar">
      <div className="navbar__logo" onClick={() => navigate("/")}>
        <figure className="logo__wrapper">
          <img src={logo} alt="" className="logo__img" />
        </figure>
      </div>

      <Button className="burger-menu" onClick={() => showMenu()}>
        <MenuIcon></MenuIcon>
      </Button>

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
