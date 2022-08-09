import React from "react";
import "./Home.css";
import LostOnline from "../assets/LostOnline.svg";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  return (
    <div className="home">
      <figure className="home__img--wrapper">
        <img src={LostOnline} alt="" className="home__img" />
      </figure>
      <h1>Find a movie, any movie.</h1>
      <p>
        Find information about your favourite movie using Australia's fastest
        open movie database.
      </p>
      <form className="home__movie-form">
        <input type="text" placeholder="Search movies..." />
        <Button type="submit" variant="contained" className="movie-form__btn">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
};

export default Home;
