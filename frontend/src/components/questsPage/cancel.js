import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateQuest } from '../../store/quest';
import {createReview, fetchReview} from '../../store/review';
import {updateAdventurer} from '../../store/adventurer';
import { categoryShow, adventurerShow, dateShow } from '../../utils/show';
import Star from './star';

function CancelQuest({currentUser, quest, setEdit, setCancel}){
    const dispatch = useDispatch();
    const reviews = useSelector(state=> Object.values(state.reviews) ?? []);
    const [mini, setMini] = useState(1);
    const [rating, setRating] = useState(1);
    const [body, setBody] = useState('');

    const isReviewsFetched = useRef(false);
    if (reviews.length > 0) isReviewsFetched.current = true;
    
    useEffect(()=> {
        if (isReviewsFetched.current === false) {
            dispatch(fetchReview(quest.adventurerId));
            isReviewsFetched.current = true;
        };
    },[dispatch, quest.adventurerId]);

    const yourQuest = ()=> {
        return (
            <div className='width2'>
                <div className='hero-container'>
                    <div className='h1'>Your Quest</div>
                    <hr className='hr' />
                    <p className='p'>Quest Name: {`${quest.questName}`}</p>
                    <p className='p'>Details: {`${quest.details}`}</p>
                    <p className='p'>Category: {categoryShow(quest.categoryId)}</p>
                    <p className='p'>Start Time: {`${dateShow(quest.startTime)}`}</p>
                    <p className='p'>Adventurer: {`${adventurerShow(quest.adventurerId)}`}</p>
                    <button onClick={() => setMini(2)} id='margin'>Cancel Quest</button>
                </div>
            </div>
        );
    };
    const submit = () => {
        const updatedQuest = {
            id: quest.id,
            completed: true
        };
        dispatch(updateQuest(updatedQuest));
        setMini(3);
    };

    const changeToEdit = ()=> {
        setEdit(true);
        setCancel(false);
    };

    const warnUser = () => {
        return (
            <div className='quest-form'>
                <div className='quest-name'>
                    <div className='red'>
                        By clicking Confirm you are cancelling your Quest.
                    </div>
                    <div className='red'>
                        Are you sure you want to cancel your Quest?
                    </div>
                    <div id='center'>
                        <div className='orders'>
                            If you just need to change the start-time you can edit
                            that <button onClick={()=> changeToEdit()} className='btn-6'>here.</button>
                        </div>
                    </div>
                    <div className='red' >(This can't be undone)</div>
                    <div id='center'>
                        <button id='margin' className='btn-5' onClick={() => setMini(1)}>Cancel</button>
                        <button id='margin' className='btn-6' onClick={() => submit()}>Confirm</button>
                    </div>
                </div>
            </div>
        );
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
    
    const writeReview = ()=> {
        return(
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
        );
    };

    const pageSetter = ()=> {
        if (mini === 1) return yourQuest();
        if (mini === 2) return warnUser();
        if (mini === 3) return writeReview();
        return <div>error, something went wrong</div>;
    };
    return(
        <div className='quest-form'>
            <button style={{marginTop: '1rem'}} className='back-button' onClick={()=>setCancel(false)}>Back</button>
            {pageSetter()}
        </div>
    );
};
export default CancelQuest;