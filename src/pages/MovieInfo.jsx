import React, { useState, useEffect } from "react";
import "./MovieInfo.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NA from "../components/NA";

const MovieInfo = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function fetchMovieInfo() {
    setIsLoading(true);
    const { data } =
      await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=cbedd0e4&plot=full
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
    console.log(tabs);
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
  }

  return (
    <div className="movie-info">
      <div className="movie-info__header">
        <ArrowBackIcon onClick={() => navigate(-1)} />
        <h2>Back to Search</h2>
      </div>
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
            <h2 className="movie-info__title">{`${movieInfo.Title} (${movieInfo.Year})`}</h2>
            <h4 className="movie-info__director">{`Directed by ${movieInfo.Director}`}</h4>
            <div className="movie-info__stats">
              <div className="movie-info__stats--descriptors">
                <h5>Genres - {movieInfo.Genre}</h5>
                <h5>Release Date - {movieInfo.Released}</h5>
                <h5>Runtime - {movieInfo.Runtime}</h5>
                <h5>Countries - {movieInfo.Country}</h5>
                <h5>Rated - {movieInfo.Rated}</h5>
              </div>
              <div className="movie-info__stats--ratings">
                {movieInfo.Ratings.map((rating) => (
                  <h5>{`${rating.Source} - ${rating.Value}`}</h5>
                ))}
              </div>
            </div>
            <div className="movie-info__tabs">
              <button
                className="movie-info__tab"
                onClick={() => handleClick("overview")}
                autoFocus
              >
                Overview
              </button>
              <button
                className="movie-info__tab"
                onClick={() => handleClick("reviews")}
              >
                Reviews
              </button>
            </div>
            <div
              className="movie-info__description movie-info__description--overview"
              id="overview"
            >
              <p>{movieInfo.Plot}</p>
              <br />
              <p>Featuring - {movieInfo.Actors}</p>
              <br />
              <p>Awards - {movieInfo.Awards} </p>
            </div>
            <div
              className="movie-info__description movie-info__description--reviews"
              id="reviews"
            >
              <h2>Reviews Here</h2>
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
