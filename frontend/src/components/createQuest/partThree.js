import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {createQuest} from '../../store/quest';
import {clearData} from '../../store/temp';
import { categoryShow, adventurerShow, dateShow } from '../../utils/show';
import { TopBar } from './topBar';
import {QuestDate} from './partThreeUtils/questDate';

function PartThree({ step, creatorId, setStep,startTime, setStartTime, questName, adventurerId, categoryId, details}){
    const dispatch = useDispatch();
    const [mini, setMini] = useState(1);
    const [date, setDate] = useState(new Date());

    const submit = () => {
        const quest = {
            quest_name: questName,
            category_id: categoryId,
            details: details,
            adventurer_id: adventurerId,
            start_time: startTime,
            completed: false,
            creator_id: creatorId
        };
        dispatch(clearData());
        dispatch(createQuest(quest));
    }
    const reviewQuest = () => {
        if (mini === 3) {
            return (
                <div className='quest-name'>
                    <ul className="quest-details">
                        <li className="label">Your Quest</li>
                        <li className="orders">Quest Name: {questName}</li>
                        <li className="orders">Category: {categoryShow(categoryId)}</li>
                        <li className="orders">Details: {details}</li>
                        <li className="orders">Start Time: {dateShow(startTime)}</li>
                        <li className="orders">Adventurer: {adventurerShow(adventurerId)}</li>
                    </ul>
                        <Link to='/' className='button-submit' onClick={() => submit()}>Submit</Link> 
                </div>
            );
        }; 
            return '';
    };
    return (
        <div className="quest-container">
            <TopBar step={step}/>
            <hr />
            <div className='back'>
                <button onClick={() => setStep(2)}>Back</button><br />
            </div>
            <div className='quest-form'>
                <QuestDate 
                mini={mini}
                setMini={setMini}
                startTime={startTime}
                date={date}
                setDate={setDate}
                setStartTime={setStartTime}
                />
                {reviewQuest()}
            </div>
        </div>
)};

export default PartThree;