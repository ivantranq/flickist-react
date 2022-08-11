import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <figure className="logo__wrapper">
          <img src={logo} alt="" className="logo__img" />
        </figure>
      </div>
      <div className="navbar__links">
        <Button
          className="navbar__link navbar__link"
          startIcon={<SearchIcon />}
          onClick={() => navigate("/search/-")}
        >
          Search
        </Button>

        <Button className="navbar__link">Login</Button>

        <Button variant="contained" className="navbar__link--signup">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
