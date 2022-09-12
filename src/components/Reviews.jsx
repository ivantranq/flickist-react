import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import Review from "./ui/review";
import { Button } from "@mui/material";
import { isUserEmpty } from "../pages/Helpers";
import { Link } from "react-router-dom";

const Reviews = ({ movieTitle }) => {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log(movieTitle);
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
      } else {
        // window.location.reload(false);
      }
    });
    getReviewsByMovieTitle(movieTitle);
    console.log(reviews);
  }, []);

  async function createReview(title, description, rating, text) {
    console.log("createReview Accessed");
    const username = user.displayName
      ? user.displayName
      : user.email.split("@")[0];
    console.log(username);
    const review = {
      title: title,
      description: description,
      rating: rating,
      text: text,
      username: username,
    };
    await addDoc(collection(db, "reviews"), review);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    const rating = event.target[0].value;
    const headline = event.target[1].value;
    const text = event.target[2].value;

    await createReview(movieTitle, headline, rating, text);
    window.location.reload();
  }

  async function getReviewsByMovieTitle(movieTitle) {
    const reviewsCollectionTitleRef = query(
      collection(db, "reviews"),
      where("title", "==", movieTitle)
    );
    const data = await getDocs(reviewsCollectionTitleRef);
    const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setReviews(response);
  }

  return (
    <div className="reviews">
      <h2 className="reviews--heading">Reviews</h2>
      {isUserEmpty(user) ? (
        <div className="create-review__logged-out">
          <h2>
            <Link to="/register">Sign up</Link> to leave a review!
          </h2>
        </div>
      ) : (
        <div className="create-review">
          <form className="new-review" onSubmit={handleSubmit}>
            <span>
              <label htmlFor="new-review__rating" className="rating-label">
                Rating
              </label>
              <input
                type="number"
                min={0}
                max={5}
                className="rating-review"
                id="new-review__rating"
                placeholder="5"
                required
              />
            </span>

            <label htmlFor="headline">Your Review</label>
            <input
              type="text"
              className="title-review"
              placeholder="Write a headline for your review here"
              id="headline"
              required
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="3"
              className="description-review"
              placeholder="Write your review here"
              required
            ></textarea>
            <Button type="submit">Submit Review</Button>
          </form>
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="reviews-section">
          {reviews.map((review) => (
            <Review reviewObject={review} key={review.id} />
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
