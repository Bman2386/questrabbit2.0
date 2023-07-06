import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from '../../store/review';
import {WarnUser} from './cancelUtils/warnUser';
import {WriteReview} from './cancelUtils/writeReview';
import {YourQuest} from './cancelUtils/yourQuest';

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
            dispatch(fetchReviews(quest.adventurerId));
            isReviewsFetched.current = true;
        };
    },[dispatch, quest.adventurerId]);

    const changeToEdit = ()=> {
        setEdit(true);
        setCancel(false);
    };

        switch (mini) {
            case 1:
                return <YourQuest 
                quest={quest}
                setMini={setMini}
                setCancel={setCancel}
                />
            case 2: 
                return <WarnUser 
                changeToEdit={changeToEdit}
                setMini={setMini}
                quest={quest}
                setCancel={setCancel}
                />
            case 3: 
                return <WriteReview 
                quest={quest}
                reviews={reviews}
                setBody={setBody}
                body={body}
                currentUser={currentUser}
                rating={rating}
                setRating={setRating}
                setCancel={setCancel}
                />
            default:
                return <div>error, something went wrong</div>;
        };
};
export default CancelQuest;