import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {createQuest} from '../../store/quest';
import {clearData} from '../../store/temp';
import { TopBar } from './topBar';
import {QuestDate} from './partThreeUtils/questDate';
import { ReviewQuest } from './partThreeUtils/reviewQuest';

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
                <ReviewQuest 
                mini={mini}
                questName={questName}
                categoryId={categoryId}
                startTime={startTime}
                adventurerId={adventurerId}
                details={details}
                submit={submit}
                />
            </div>
        </div>
)};

export default PartThree;