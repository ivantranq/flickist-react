import React from "react";
import ResultItem from "./resultItem";

const Results = ({ isLoading, searchResults, input }) => {
  return (
    <>
      {!isLoading ? (
        <>
          <div className="results">
            {input !== "-" &&
              searchResults.map(({ Title, Poster, Type, Year, imdbID }) => (
                <ResultItem
                  key={imdbID}
                  Title={Title}
                  Poster={Poster}
                  Type={Type}
                  Year={Year}
                  imdbID={imdbID}
                />
              ))}
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
