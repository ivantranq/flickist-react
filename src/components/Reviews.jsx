import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import Review from "./ui/review";

const Reviews = ({ movieTitle }) => {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log(movieTitle);
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
    getReviewsByMovieTitle(movieTitle);
    console.log(reviews);
  }, []);

  async function createReview(title, description, rating, text) {
    const review = {
      title: title,
      description: description,
      rating: rating,
      text: text,
    };
    await addDoc(collection(db, "reviews", review));
  }

  async function getReviewsByMovieTitle(movieTitle) {
    const reviewsCollectionTitleRef = await query(
      collection(db, "reviews"),
      where("title", "==", movieTitle)
    );
    const data = await getDocs(reviewsCollectionTitleRef);
    const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setReviews(response);
  }

  return (
    <div className="reviews">
      <div className="create-review">
        <div className="create-review__logged-out"></div>
        <form className="new-review">
          <label htmlFor="">Rating</label>
          <input type="number" min={0} max={5} className="rating-review" />
          <label htmlFor="">Your Review</label>
          <input type="text" className="title-review" placeholder="Write a headline for your review here"/>
          <textarea
            name=""
            id=""
            cols="30"
            rows="3"
            className="description-review"
            placeholder="Write your review here"
          ></textarea>
        </form>
      </div>
      {reviews.length > 0 ? (
        <div className="reviews-section">
          {reviews.map((review) => (
            <Review reviewObject={review} />
          ))}
        </div>
      ) : (
        <div>
          <h2 className="no-reviews">No reviews available</h2>
        </div>
      )}
    </div>
  );
};

export default Reviews;
