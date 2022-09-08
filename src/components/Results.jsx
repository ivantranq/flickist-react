import React, { useState, useEffect } from "react";
import ResultItem from "./resultItem";
import Popup from "../components/Popup";

const Results = ({ isLoading, searchResults, input }) => {
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [popupImdbId, setPopupImdbId] = useState("");

  useEffect(() => {
    const body = document.querySelector("body");
    console.log(body);
    if (popupTrigger) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [popupTrigger]);

  return (
    <>
      {!isLoading ? (
        <>
          <div className="results">
            <div className="results--container">
              {input !== "-" &&
                searchResults.map(({ Title, Poster, Type, Year, imdbID }) => (
                  <ResultItem
                    key={imdbID}
                    Title={Title}
                    Poster={Poster}
                    Type={Type}
                    Year={Year}
                    imdbID={imdbID}
                    setPopupTrigger={setPopupTrigger}
                    setPopupImdbId={setPopupImdbId}
                  />
                ))}
            </div>
            <Popup
              trigger={popupTrigger}
              setTrigger={setPopupTrigger}
              imdbId={popupImdbId}
            ></Popup>
          </div>
        </>
      ) : (
        <>
          <div className="results--skeleton">
            {new Array(6).fill(0).map((_, index) => (
              <>
                <div className="result-item--skeleton" key={index}>
                  <div className="result__img--skeleton"></div>
                  <div className="result__title--skeleton"></div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Results;
