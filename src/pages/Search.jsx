import React, { useState, useEffect } from "react";
import "./Search.css";
import SearchBar from "../components/searchBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Results from "../components/Results";
import Void from "../assets/Void.svg";

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([0]);
  const [noResults, setNoResults] = useState(false);
  const { input } = useParams();
  console.log("Search.jsx input -> ", input);

  async function fetchSearchResults() {
    setNoResults(false);
    setIsLoading(true);
    const { data } = await axios.get(
      `https://www.omdbapi.com/?s=${input}&apikey=cbedd0e4`
    );
    // console.log(data);
    if (data.Response === "False") {
      setSearchResults([]);
      setNoResults(true);
      return;
    }
    setSearchResults(data.Search.slice(0, 6));
    setIsLoading(false);
  }

  useEffect(() => {
    console.log("useEffect before, ", isLoading, searchResults.length);
    fetchSearchResults();
    console.log("useEffect after, ", isLoading, searchResults.length);
  }, [input]);

  // console.log(isLoading);

  function filterMovies(filterType) {
    // console.log(filterType);
    if (filterType === "A_TO_Z") {
      setSearchResults(
        searchResults.slice().sort((a, b) => a.Title.localeCompare(b.Title))
      );
    } else if (filterType === "Z_TO_A") {
      setSearchResults(
        searchResults.slice().sort((a, b) => b.Title.localeCompare(a.Title))
      );
    } else if (filterType === "YEAR_HIGH_TO_LOW") {
      setSearchResults(searchResults.slice().sort((a, b) => b.Year - a.Year));
    } else if (filterType === "YEAR_LOW_TO_HIGH") {
      setSearchResults(searchResults.slice().sort((a, b) => a.Year - b.Year));
    }
  }

  return (
    <div className="search">
      <SearchBar />
      <hr />
      <div className="search__header">
        <h2 className="results__title">Search results for "{input}"</h2>
        <select
          id="filter"
          className="results__filter"
          defaultValue="DEFAULT"
          onChange={(event) => filterMovies(event.target.value)}
        >
          <option value="DEFAULT" disabled>
            Sort
          </option>
          <option value="A_TO_Z">Alphabetical, A - Z</option>
          <option value="Z_TO_A">Alphabetical, Z - A</option>
          <option value="YEAR_HIGH_TO_LOW">Latest Release</option>
          <option value="YEAR_LOW_TO_HIGH">Earliest Release</option>
        </select>
      </div>
      {!noResults ? (
        <Results
          isLoading={isLoading}
          searchResults={searchResults}
          input={input}
        />
      ) : (
        <div className="no-results">
          <figure className="no-results__img--wrapper">
            <img src={Void} alt="" className="no-results__img" />
          </figure>
          <h1 className="no-results__title">
            Sorry, there were no results found for "{input}"
          </h1>
        </div>
      )}
      {/* Movie result */}
    </div>
  );
};

export default Search;
