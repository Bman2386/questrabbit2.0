import React from "react";
import star from '../../../images/star.png';

export function Rating({rating = 1}){
    let starRating = Number(rating);
    const starsCountArray = [];
    for (let i = starRating; i > 0; i--) starsCountArray.push(i);
    return (
        <div className='rating'>
            {starsCountArray.map((index) => <img src={star} alt='star' className='star' key={index} />)}
        </div>
    );
};