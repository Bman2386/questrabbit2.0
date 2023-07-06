import React,{useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchReviews} from '../../../store/review';
import { Rating } from "./rating";

// All Reviews displays all reviews for an adventurer
//selected is the adventurer the user has selected
export function AllReviews({ selected }) {
    const dispatch = useDispatch();
    // reviews grabs all the reviews from the redux state if they exist
    const reviews = useSelector(state => Object.values(state.reviews) ?? []); 
    //isFetched is a boolean ref that we use to check if reviews have been fetched
    // this is done to prevent additional fetches being sent to the backend
    const isFetched = useRef(false);
    // this useEffect is inteded only used when this page loads
    
    useEffect(()=> {
       // modern react does call useEffect 2x, so I added an if statement to check if the reviews have been fetched 
        if (!isFetched.current) {
            dispatch(fetchReviews(selected.id));
            // setting isFetched to true will happen before the reviews finish fetching
            isFetched.current = true;
        };
    }, [dispatch, selected.id])
    
    // if the adventurer has reviews display them
    if (reviews.length > 0 && selected) {
        return (
            <div className='reviews'>
                <div className="h2">Reviews:</div>
                {reviews.map(review =>
                    <div key={review.id} className='quest-name' id='review'>
                        <div className='p'>{`${review.username}`}</div>
                        <div className='rating-container'><Rating rating={review.rating}/></div>
                        <div className='p'>"{`${review.body}`}"</div>
                    </div>)}
            </div>);
    };
    // this case will only show when no reviews exist for selected adventurer
    // this case will also happen while waiting for reviews to be fetched from backend
    return <div className='quest-name'>No Reviews Yet</div>;
};