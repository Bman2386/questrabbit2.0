import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useDispatch} from "react-redux";
import {  updateQuest } from '../../store/quest';
import { categoryShow, adventurerShow } from '../../utils/show';

function EditQuest({currentUser, quest}){
    const dispatch = useDispatch();
    const [questName, setQuestName] = useState('');
    const [details, setDetails] = useState('');
    const [startTime, setStartTime] = useState('');


    if (!questName || !details || !startTime){
        setQuestName(quest.questName);
        setDetails(quest.details);
        setStartTime(quest.startTime);
    };
   
   function dateShow(){
            const dateDisplay = () => {
                const days = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
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
                const fullDate = new Date(startTime);
                const weekDay = days[fullDate.getDay()];
                const hour = () => {
                    const hours = fullDate.getHours();
                    if (hours > 12) {
                        return (hours - 12);
                    } else {
                        return hours;
                    };
                };
                const min = () => {
                    const questMinutes = fullDate.getMinutes()
                    if (questMinutes === 0) {
                        return '00';
                    } else {
                        return questMinutes;
                    };
                };
                const month = months[fullDate.getMonth()];
                const monthDay = fullDate.getDate();
                const year = fullDate.getFullYear();
                const amPm = () => {
                    if (fullDate.getHours() > 11) {
                        return 'pm';
                    } else {
                        return 'am';
                    };
                };
                return `${weekDay} ${month} ${monthDay} ${year} ${hour()}:${min()}${amPm()}`;
            };
            const startDate = dateDisplay();

            return <div className='p' id='center'>{`${startDate}`}</div>;
    };

    const submit = () => {
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
    };

    return(
        <div className='quest-form'>
            <div className='edit-quest-container'>
                <h1 className='h1'>Edit Quest</h1>
                <hr className='hr' />
                <div className='edit-user'>
                    <div className='p2'>Quest Name:</div>
                    <input type="text"
                        value={questName}
                        onChange={e => setQuestName(e.target.value)}
                        className='input3' />
                </div>
                <div className='edit-user'>
                    <div className='p2'>Details:</div>
                    <textarea
                        value={details}
                        onChange={e => setDetails(e.target.value)}
                        className='textarea2' />
                </div>
                <div className='label-container'>
                    <input className='label' type='datetime-local' value={startTime} onChange={e => setStartTime(e.target.value)}></input>
                </div>
                {dateShow()}
                <p className='p' id='center'>Quest Category: {categoryShow(quest.categoryId)}</p>
                <p className='p' id='center'>Adventurer: {adventurerShow(quest.adventurerId)}</p>
                <div id='center' className='links2'>
                    { questName && details && startTime ? <Link className="btn-4" to="/" onClick={() => submit()}>Submit</Link> :
                    ''}
                    <Link to='/' className='btn-5'>Cancel</Link>
                </div>
                <span className='margin-bottom'></span>
            </div>
        </div>   
    );
};

export default EditQuest;