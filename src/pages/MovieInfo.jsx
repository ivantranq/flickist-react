import React, { useState, useEffect } from "react";
import "./MovieInfo.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NA from "../components/NA";
import Reviews from "../components/Reviews";
import imdbLogo from "./assets/imdbLogo.svg";
import metacriticLogo from "./assets/metacritic.png";
import rottenTomatoesLogo from "./assets/rottenTomatoesLogo.png";

const MovieInfo = ({ id }) => {
  // const { id } = useParams();
  // console.log(id);

  const navigate = useNavigate();

  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function fetchMovieInfo() {
    setIsLoading(true);
    const { data } =
      await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=cbedd0e4&plot=full
    `);
    setMovieInfo(data);
    setIsLoading(false);
    console.log("movieInfo.jsx", data);
  }

  // setIsLoading(true);

  useEffect(() => {
    fetchMovieInfo();
  }, []);

  console.log(isLoading);

  function handleClick(tabName) {
    console.log(tabName);
    const tabs = document.getElementsByClassName("movie-info__description");
    const tabButtons = document.getElementsByClassName("movie-info__tab");
    const selected = document.getElementById(`movie-info__tab--${tabName}`);
    console.log(tabs);
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
      if (tabButtons[i].classList.contains("tab-selected")) {
        tabButtons[i].classList.remove("tab-selected");
      }
    }
    selected.classList.toggle("tab-selected");
    document.getElementById(tabName).style.display = "block";

    // Below handles styling of tab buttons.

    console.log("selected ", selected);
  }

  return (
    <div className="movie-info">
      {!isLoading ? (
        <div className="movie-info__body">
          <figure className="poster__img--wrapper">
            <img
              src={movieInfo.Poster !== "N/A" ? movieInfo.Poster : NA}
              alt=""
              className="poster__img"
            />
          </figure>
          <div className="movie-info__description--container">
            <h2 className="movie-info__title">{`${movieInfo.Title}`}</h2>
            <div className="movie-info__stats">
              <div className="movie-info__stats--left">
                <div className="movie-info__quick-stats">
                  <div className="movie-info__stats--ratings">
                    {movieInfo.Ratings.length === 3 && (
                      <>
                        {" "}
                        <div className="movie-info__stats--rating">
                          <figure>
                            <img src={imdbLogo} alt="" />
                          </figure>
                          <h5>{movieInfo.Ratings[0].Value}</h5>
                        </div>
                        <div className="movie-info__stats--rating">
                          <figure>
                            <img src={rottenTomatoesLogo} alt="" />
                          </figure>
                          <h5>{movieInfo.Ratings[1].Value}</h5>
                        </div>
                        <div className="movie-info__stats--rating">
                          <figure>
                            <img src={metacriticLogo} alt="" />
                          </figure>
                          <h5>{movieInfo.Ratings[2].Value}</h5>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="movie-info__year-runtime-rated">
                    <span className="year">{movieInfo.Year}</span>
                    <span className="rated">{movieInfo.Rated}</span>
                    <span className="runtime">{movieInfo.Runtime}</span>
                  </div>
                </div>
                <div
                  className="movie-info__description movie-info__description--overview"
                  id="overview"
                >
                  <p>{movieInfo.Plot}</p>
                </div>
              </div>
              <div className="movie-info__stats--right">
                <p>
                  <span>Cast: </span> {movieInfo.Actors}
                </p>
                <br />
                <p>
                  <span>Genres: </span> {movieInfo.Genre}
                </p>
              </div>
            </div>
            {/* <div className="movie-info__tabs">
              <button
                className="movie-info__tab tab-selected"
                id="movie-info__tab--overview"
                onClick={() => handleClick("overview")}
              >
                Overview
              </button>
              <button
                className="movie-info__tab"
                id="movie-info__tab--reviews"
                onClick={() => handleClick("reviews")}
              >
                Reviews
              </button>
            </div> */}

            <div
              className="movie-info__description movie-info__description--reviews"
              id="reviews"
            >
              <Reviews movieTitle={movieInfo.Title} />
            </div>
          </div>
        </div>
      ) : (
        <div className="movie-info__body--skeleton">
          <figure className="movie-info__img--skeleton"></figure>
          <div className="movie-info__description--skeleton">
            <h2 className="movie__title--skeleton">title</h2>
            <h4 className="movie__directed--skeleton">director</h4>
            <div className="movie__stats--skeleton">stats</div>
            <p className="movie__text--skeleton">text</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieInfo;
