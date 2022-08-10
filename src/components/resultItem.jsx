import React from "react";
import "./resultItem.css";
import { useNavigate } from "react-router-dom";

const ResultItem = ({ Title, Poster, Type, Year, imdbID }) => {
  const navigate = useNavigate();
  console.log(imdbID)
  return (
    <div className="result-item" onClick={() => navigate(`/${imdbID}`)}>
      <figure className="result__img--wrapper">
        <img src={Poster} alt="" className="result__img" />
      </figure>
      <div className="result__description">
        <h3 className="result__title">{`${Title} (${Year})`}</h3>
      </div>
    </div>
  );
};

export default ResultItem;
