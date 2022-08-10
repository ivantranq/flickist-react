import React, { useState, useEffect } from "react";
import "./MovieInfo.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MovieInfo = () => {
  const { id } = useParams();
  console.log(id);

  const [movieInfo, setMovieInfo] = useState({});

  async function fetchMovieInfo() {
    const { data } =
      await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=cbedd0e4
    `);
    setMovieInfo(data);
    console.log(data);
  }

  useEffect(() => {
    fetchMovieInfo();
  }, []);

  return (
    <div className="movie-info">
      <div className="movie-info__header">
        <ArrowBackIcon />
        <h2>Back to Search</h2>
      </div>
      <div className="movie-info__body">
        <figure className="poster__img--wrapper">
          <img src={movieInfo.Poster} alt="" className="poster__img" />
        </figure>
        <div className="movie-info__description">
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
              {/* {movieInfo.Ratings.map((rating) => (
                <h5>{`${rating.Source} - ${rating.Value}`}</h5>
              ))} */}
            </div>
          </div>
          <div className="movie-info__description--text">
            <p>{movieInfo.Plot}</p>{" "}
            <p>Featuring: {movieInfo.Actors}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
