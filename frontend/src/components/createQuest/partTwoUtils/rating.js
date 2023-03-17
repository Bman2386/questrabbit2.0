import React from "react";
import star from '../../../images/star.png';

export function Rating({rating = 1}){
    let num = Number(rating);
    const stars = [];
    for (let i = num; i > 0; i--) stars.push(i);
    return (
        <div className='rating'>
            {stars.map((idx) => <img src={star} alt='star' className='star' key={idx} />)}
        </div>
    );
};