import React, { useEffect } from "react";
import "./Popup.css";
import CloseIcon from "@mui/icons-material/Close";
import MovieInfo from "../pages/MovieInfo";

const Popup = ({ trigger, setTrigger, imdbId }) => {
  useEffect(() => {
    console.log(imdbId);
  }, []);
  return trigger === true ? (
    <div className="popup">
      <div className="popup__container">
        <CloseIcon onClick={() => setTrigger(false)}></CloseIcon>
        <MovieInfo id={imdbId}></MovieInfo>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Popup;
