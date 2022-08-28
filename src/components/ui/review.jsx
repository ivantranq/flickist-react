import React from "react";
import "./review.css";
import { Avatar } from "@mui/material";

const Review = ({ reviewObject }) => {
  return (
    <div className="review">
      <Avatar>{reviewObject.username[0]}</Avatar>
      <div className="review-info__container">
        <div className="review-rating">
          {reviewObject.rating}
          <span className="out-of-five"> / 5</span>
        </div>
        <h3 className="review-title">{reviewObject.description}</h3>
        <h5 className="review-username">{reviewObject.username}</h5>
        <div className="review-text">{reviewObject.text}</div>
      </div>
    </div>
  );
};

export default Review;
