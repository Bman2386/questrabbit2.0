import React,{useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchReview} from '../../../store/review';
import { Rating } from "./rating";

export function AllReviews({ selected }) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews ? Object.values(state.reviews) : []); 
    const isFetched = useRef(false);

    if (!selected) return '';

    if (!isFetched.current) {
        dispatch(fetchReview(selected.id));
        isFetched.current = true
    };

    if (reviews.length > 0 && selected) {
        return (
            <div className='reviews'>Reviews:
                {reviews.map(rev =>
                    <div key={rev.id} className='quest-name'>
                        <div className='p'>{`${rev.username}`}</div>
                        <div className='rating-container'><Rating rating={rev.rating}/></div>
                        <div className='p'>"{`${rev.body}`}"</div>
                    </div>)}
            </div>);
    };
    return <div className='quest-name'>No Reviews Yet</div>;
};