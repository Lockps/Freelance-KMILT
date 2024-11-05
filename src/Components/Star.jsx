import React, { useState } from 'react';
import './Star.css';
import { FaStar } from 'react-icons/fa';

const Star = ({ onRatingChange }) => {
    const [rating, setRating] = useState(null);

    const handleClick = (newRating) => {
        setRating(newRating);
        onRatingChange(newRating); 
    };

    return (
        <div className='Star-Container'>
            {[...Array(5)].map((_, index) => {
                const CurrentRating = index + 1;
                return (
                    <label key={CurrentRating}>
                        <input
                            className='Star-input'
                            type='radio'
                            name='rating'
                            value={CurrentRating}
                            onClick={() => handleClick(CurrentRating)}
                        />
                        <FaStar
                            className='Star'
                            color={CurrentRating <= rating ? "gold" : "gray"}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default Star;
