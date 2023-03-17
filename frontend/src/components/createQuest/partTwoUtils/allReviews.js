import React from "react";
import { Rating } from "./rating";

export function AllReviews({ reviews, selected }) {
    const filteredReviews = [];
    if (reviews.length > 0 && selected) {
        reviews.forEach(rev => {
            if (rev.adventurerId === selected.id) filteredReviews.push(rev);
        });
    };
    if (filteredReviews.length > 0 && selected) {
        return (
            <div className='reviews'>Reviews:
                {filteredReviews.map(rev =>
                    <div key={rev.id} className='quest-name'>
                        <div className='p'>{`${rev.username}`}</div>
                        <div className='rating-container'><Rating rating={rev.rating}/></div>
                        <div className='p'>"{`${rev.body}`}"</div>
                    </div>)}
            </div>);
    };
    return <div className='quest-name'>No Reviews Yet</div>;
};