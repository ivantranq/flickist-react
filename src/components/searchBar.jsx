import React, { useState } from "react";
import "./searchBar.css";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const search = (event) => {
    event.preventDefault();
    console.log("Search -> ", input);

    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: input,
    });
    navigate(`/search/${input}`);
  };

  return (
    <form className="search-form" onSubmit={search}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Search movies..."
        onChange={(event) => setInput(event.target.value)}
        required
      />
      <Button type="submit" variant="contained" className="movie-form__btn">
        <SearchIcon />
      </Button>
    </form>
  );
};

export default SearchBar;
