import React from "react";
import "./resultItem.css";
import { useNavigate } from "react-router-dom";
import NA from "./NA";

const ResultItem = ({ Title, Poster, Type, Year, imdbID }) => {
  const navigate = useNavigate();

  return (
    <div className="result-item" onClick={() => navigate(`/${imdbID}`)}>
      <figure className="result__img--wrapper">
        <img
          src={Poster !== "N/A" ? Poster : NA}
          alt=""
          className="result__img"
        />
      </figure>
      <div className="result__description">
        <h3 className="result__title">{`${Title} (${Year})`}</h3>
      </div>
    </div>
  );
};

export default ResultItem;
