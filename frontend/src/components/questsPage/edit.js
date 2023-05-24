import React, { useState } from 'react';
import { useDispatch} from "react-redux";
import {  updateQuest } from '../../store/quest';
import { categoryShow, adventurerShow, dateShow } from '../../utils/show';

function EditQuest({currentUser, quest, setEdit}){

    const dispatch = useDispatch();
    const [questName, setQuestName] = useState('');
    const [details, setDetails] = useState('');
    const [startTime, setStartTime] = useState('');
    const [error, setError] = useState('');
    
    if (!questName || !details || !startTime){
        setQuestName(quest.questName);
        setDetails(quest.details);
        setStartTime(quest.startTime);
    };
   

    const checkValidDate=(time = startTime)=> {
            if (new Date(time) < new Date()){
                setError('Invalid startTime, the quest cannot start in the past');
                return true
            };
            if (new Date(time) >= new Date()){
                setError('');
            };
            return false;
    };
        
    const submit = () => {
        if (checkValidDate()) return // return early if there is an error instead of updateing quest
        const time = new Date(startTime);
        const updatedQuest = {
            id: quest.id,
            quest_name: questName,
            category_id: quest.categoryId,
            details: details,
            creator_id: currentUser.id,
            start_time: time,
            completed: 'false',
            adventurer_id: quest.adventurerId,
        };
        
        dispatch(updateQuest(updatedQuest));
        setEdit(false);
    };
    
    const changeDateButton = (time)=> {
        setStartTime(time);
        checkValidDate(time);
    };

    return(
        <div className='quest-form'>
            <button 
            className='back-button'
            onClick={()=> setEdit(false)}>Back</button>
            <div className='edit-quest-container'>
                <h1 className='h1'>Edit Quest</h1>
                <hr className='hr' />
                <div className='edit-user'>
                    <div className='label'>Quest Name:</div>
                    <input type="text"
                        value={questName}
                        onChange={e => setQuestName(e.target.value)}
                        className='input2' />
                </div>
                <div className='edit-user'>
                    <div className='label'>Details:</div>
                    <textarea
                        value={details}
                        onChange={e => setDetails(e.target.value)}
                        className='textarea2' />
                </div>
                <div className='label-container'>
                    <input className='label' type='datetime-local' value={startTime} onChange={e => changeDateButton(e.target.value)}></input>
                </div>
                <div className='p' id='center'>{dateShow(startTime)}</div>
                <div className='error'>{error}</div>
                <p className='p' id='center'>Quest Category: {categoryShow(quest.categoryId)}</p>
                <p className='p' id='center'>Adventurer: {adventurerShow(quest.adventurerId)}</p>
                <div id='center' className='links2'>
                    { (questName && details && startTime) ? <button className='btn-1' onClick={() => submit()}>Submit</button>: ''}
                    <button className='cancel-btn' onClick={()=> setEdit(false)}>Cancel</button>
                </div>
                <span className='margin-bottom'></span>
            </div>
        </div>   
    );
};

export default EditQuest;