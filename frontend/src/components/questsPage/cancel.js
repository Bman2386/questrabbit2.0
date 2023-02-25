import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateQuest } from '../../store/quest';
import {createReview} from '../../store/review';
import star from '../../images/star.png'

function CancelQuest({currentUser, quest, edit, setEdit, cancel, setCancel}){
    const dispatch = useDispatch();
    const [mini, setMini] = useState(1);
    const [rating, setRating] = useState(1);
    const [body, setBody] = useState('');

    const categoryShow = (categoryId) => {
        if (categoryId === 1) return 'Fetch';
        if (categoryId === 2) return 'Craft';
        if (categoryId === 3) return 'Escort';
        if (categoryId === 4) return 'Slay';
    };
    const advName = (id)=> {
        if (id === 2) return 'Hercules';
        if (id === 3) return 'Goblin Slayer';
        if (id === 4) return 'Isaac Newton';
    }
    const dateDisplay = (time) => {
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Firday",
            "Saturday"
        ]
        const months = [
            "January",
            "Febuary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const fullDate = new Date(time);
        const weekDay = days[fullDate.getDay()];
        const hour = () => {
            const hours = fullDate.getHours();
            if (hours > 12) {
                return (hours - 12)
            } else {
                return hours
            }
        }
        const min = () => {
            const questMinutes = fullDate.getMinutes()
            if (questMinutes === 0) {
                return '00'
            } else {
                return questMinutes;
            }
        };
        const month = months[fullDate.getMonth()];
        const monthDay = fullDate.getDate();
        const year = fullDate.getFullYear();
        const amPm = () => {
            if (fullDate.getHours() > 11) {
                return 'pm'
            } else {
                return 'am'
            }
        }
        return `${weekDay} ${month} ${monthDay} ${year} ${hour()}:${min()}${amPm()}`;
    }
    const yourQuest = ()=> {
        return (
            <div className='width2'>
                <div className='hero-container'>
                    <div className='h1'>Your Quest</div>
                    <hr className='hr' />
                    <p className='p'>Quest Name: {`${quest.questName}`}</p>
                    <p className='p'>Details: {`${quest.details}`}</p>
                    <p className='p'>Category: {categoryShow(quest.categoryId)}</p>
                    <p className='p'>Start Time: {`${dateDisplay(quest.startTime)}`}</p>
                    <p className='p'>Adventurer: {`${advName(quest.adventurerId)}`}</p>
                    <button onClick={() => setMini(2)} id='margin'>Cancel Quest</button>
                </div>
            </div>
        );
    };
    const submit = () => {
        debugger
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
    const submitReview = ()=> {
        const review = {
            rating: rating,
            body: body,
            user_id: currentUser.id,
            adventurer_id: quest.adventurerId,
            username: currentUser.username
        };
        dispatch(createReview(review));
    };
    const writeReview = ()=> {
        return(
            <div className='cancel-form'>
                <label className='h1'>Review for: {`${advName(quest.adventurerId) }`}</label>
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
                        placeholder={`${advName(quest.adventurerId)} did a great job at...`}
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
        return <div>error, something went wrong</div>
    };
    return(
        <div>{pageSetter()}</div>
    );
};
export default CancelQuest;