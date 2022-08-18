import React from 'react';
import './Reviews.css'
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Reviews = () => {
    async function createReview(title, description, rating, text) {
        const review = {
            title: title,
            description: description,
            rating: rating,
            text: text
        }

        await addDoc(collection(dv, "reviews", review));
    }
    return (
        <div className='reviews-section'>
            <h2>Reviews Here</h2>
        </div>
    );
}

export default Reviews;
