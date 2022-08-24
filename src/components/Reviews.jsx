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

  return reviews.length > 0 ? (
    <div className="reviews-section">
      <div className="create-review"></div>
      {reviews.map((review) => (
        <Review reviewObject={review} />
      ))}
    </div>
  ) : (
    <div>
      <h2 className="no-reviews">No reviews available</h2>
    </div>
  );
};

export default Reviews;
