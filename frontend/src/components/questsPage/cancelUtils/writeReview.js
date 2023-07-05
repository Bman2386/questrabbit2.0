import React from "react";
import { useDispatch } from "react-redux";
import { adventurerShow } from "../../../utils/show";
import { createReview } from "../../../store/review";
import { updateAdventurer } from "../../../store/adventurer";
import Star from "../star";

export function WarnUser({quest,reviews, setBody,body, currentUser, rating, setRating, setCancel}){
    const dispatch = useDispatch();

    const submitReview = ()=> {
        const review = {
            rating: rating,
            body: body,
            user_id: currentUser.id,
            adventurer_id: quest.adventurerId,
            username: currentUser.username
        };
        dispatch(createReview(review));
        const newStats = reStatAdv();
        dispatch(updateAdventurer(newStats));
        setCancel(false);
    };

    const reStatAdv = () => {
        const totalReviews = reviews.length + 1;
        let scoreTotal = parseInt(rating);
        for (const r in reviews){
            scoreTotal += parseInt(reviews[r].rating);
        };
        const avgRating = Math.round(scoreTotal/totalReviews)
        return {id: quest.adventurerId, avg_rating: avgRating, total_ratings: totalReviews }

    };

     return(
            <div className='quest-form'>
                <button style={{marginTop: '1rem'}} className='back-button' onClick={()=>setCancel(false)}>Back</button>
                <div className='cancel-form'>
                <label className='h1'>Review for: {`${adventurerShow(quest.adventurerId) }`}</label>
                <div className='quest-name'>
                    <div className='orders' id='margin'>Rating:</div>
                    <div className='inputs'>
                        {[1,2,3,4,5].map((value)=> (
                                <Star
                                key={value}
                                filled={value <= rating}
                                setRating={setRating}
                                value={value}
                            />
                        ))}
                    </div>
                    <div className='inputs'>{`${rating}`} Stars</div>
                </div>
                <div className='div'>
                    <textarea
                        value={body}
                        className='textarea3'
                        placeholder={`${adventurerShow(quest.adventurerId)} did a great job at...`}
                        onChange={e=> setBody(e.target.value)} />
                </div>
                {rating && body ?
                <button onClick={() => submitReview()} id="margin" className='btn-4' style={{color: 'white'}}>Submit Review</button>:
                ''}
                
            </div>

            </div>
           
        );
}