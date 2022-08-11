import React, { useState, useEffect } from "react";
import "./Search.css";
// import { Button } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import ResultItem from "../components/resultItem";
// import Response from "../response1";
import SearchBar from "../components/searchBar";
import { useParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { input } = useParams();
  console.log("Search.jsx input -> ", input);

  async function fetchSearchResults() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?s=${input}&apikey=cbedd0e4`
    );
    console.log(data);
    setSearchResults(data.Search.slice(0, 6));
    return data;
  }

  useEffect(() => {
    fetchSearchResults();
  }, [input]);

  function filterMovies(filterType) {
    console.log(filterType);
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
      {/* Movie result */}
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
    </div>
  );
};

export default Search;
