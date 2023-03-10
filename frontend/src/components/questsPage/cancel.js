import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateQuest } from '../../store/quest';
import {createReview, fetchReviews} from '../../store/review';
import {updateAdventurer} from '../../store/adventurer';
import { categoryShow, adventurerShow, dateShow } from '../../utils/show';
import star from '../../images/star.png'

function CancelQuest({currentUser, quest, edit, setEdit, cancel, setCancel}){
    const dispatch = useDispatch();
    const reviews = useSelector(state=> state.reviews ? Object.values(state.reviews) : []);
    const [mini, setMini] = useState(1);
    const [rating, setRating] = useState(1);
    const [body, setBody] = useState('');

    useEffect(()=> {
        dispatch(fetchReviews())
    },[dispatch])

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
    }

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

    const showRating = ()=> {
        const num = <img src={star} className='star' />
        const use = Number(rating);
        switch (use) {
            case 1:
                return num;
            case 2:
                return (
                    <div className='rating'>
                        {num}{num}
                    </div>
                );
            case 3:
                return (
                    <div className='rating'>
                        {num}{num}{num}
                    </div>
                );
            case 4:
                return (
                    <div className='rating'>
                        {num}{num}{num}{num}
                    </div>
                );
            case 5:
                return (
                    <div className='rating'>
                        {num}{num}{num}{num}{num}
                    </div>
                );
            default:
                return '0'
        };
    };
    const reStatAdv = () => {
        const currentAdv = reviews.filter(review=> quest.adventurerId === review.adventurerId);
        const totalReviews = currentAdv.length + 1;
        let scoreTotal = parseInt(rating);
        for (const r in currentAdv){
            scoreTotal += parseInt(currentAdv[r].rating);
        };
        const avgRating = Math.round(scoreTotal/totalReviews)
        return {id: quest.adventurerId, avg_rating: avgRating, total_ratings: totalReviews }

    }
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
    };
    const writeReview = ()=> {
        return(
            <div className='cancel-form'>
                <label className='h1'>Review for: {`${adventurerShow(quest.adventurerId) }`}</label>
                <div className='quest-name'>
                    <div className='orders' id='margin'>Rating:</div>
                    <div className='inputs'>
                        <input
                            type="radio"
                            value={1}
                            name="1 Star"
                            checked={rating === "1"}
                            onChange={e=> setRating(e.target.value)} />
                        <input
                            type="radio"
                            value={2}
                            name="2 Stars"
                            checked={rating === "2"}
                            onChange={e=> setRating(e.target.value)} />
                        <input
                            type="radio"
                            value={3}
                            name="3 Stars"
                            checked={rating === "3"}
                            onChange={e=> setRating(e.target.value)} />
                        <input
                            type="radio"
                            value={4}
                            name="4 Stars"
                            checked={rating === "4"}
                            onChange={e=> setRating(e.target.value)} />
                        <input
                            type="radio"
                            value={5}
                            name="5 Stars"
                            checked={rating === "5"}
                            onChange={e=> setRating(e.target.value)} />
                    </div>
                    <div className='inputs'>{showRating()}</div>
                    <div className='inputs'>{`${rating}`} Stars</div>
                </div>
                <div className='div'>
                    <textarea
                        value={body}
                        className='textarea3'
                        placeholder={`${adventurerShow(quest.adventurerId)} did a great job at...`}
                        onChange={e=> setBody(e.target.value)} />
                </div>
                <Link onClick={() => submitReview()} to="/" id="margin" className='btn-4'>Submit Review</Link>
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
        <div>
            <button style={{marginTop: '1rem'}} className='back-button' onClick={()=>setCancel(false)}>Back</button>
            {pageSetter()}
        </div>
    );
};
export default CancelQuest;