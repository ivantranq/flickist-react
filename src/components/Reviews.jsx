import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Reviews = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
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

  return (
    <div className="reviews-section">
      <h2>Reviews Here</h2>
    </div>
  );
};

export default Reviews;
