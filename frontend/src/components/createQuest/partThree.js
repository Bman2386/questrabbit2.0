import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import QuestRabbit from '../../images/QuestRabbit.jpg';
import { fetchAdventurers } from '../../store/adventurer';
import {createQuest} from '../../store/quest';
import {clearData} from '../../store/temp';

function PartThree({step, creatorId, setStep,startTime, setStartTime, questName, adventurerId, categoryId, details}){
    const dispatch = useDispatch();
    const adventurers = useSelector(state => state.adventurers ? Object.values(state.adventurers): []);
    const [mini, setMini] = useState(1);
    const [date, setDate] = useState(new Date());

    useEffect(()=> {
        dispatch(fetchAdventurers)
    }, [dispatch])
 

    if (adventurers.length === 0) return <div>Loading...</div>;

    const subCurrentMonth = () => {
        const date1 = new Date(date);
        const month = date1.getMonth();
        date1.setMonth(month - 1);
        setDate(date1);
    };

    const addCurrentMonth = () => {
        const date1 = new Date(date);
        const month = date1.getMonth();
        date1.setMonth(month + 1);
        setDate(date1);
    };
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const tally = () => {
        const days = [];
        if (firstDayIndex > 1) {
            for (let x = firstDayIndex; x > 0; x--) {
                let num = `${prevLastDay - x + 1}`;
                days.push(num);
            };
        };
        for (let i = 1; i <= lastDay; i++) {
            days.push(i);
        };
        for (let j = 1; j <= nextDays; j++) {
            let num2 = `${j}`;
            days.push(num2);
        };
        return days;
    };

    const changeDate = (e, type) => {
        switch (type) {
            case 'day':
                let temp1 = new Date(date).setDate(e);
                const startDate = new Date(temp1);
                setStartTime(startDate);
                setMini(2);
                return;
            case 'hour':
                let date1 = new Date(startTime);
                date1.setHours(e.target.value);
                setStartTime(date1)
                return;
            case 'minute':
                let date2 = new Date(startTime);
                date2.setMinutes(e.target.value);
                setStartTime(date2);
                return;
            case 'convert':
                let hour = startTime.getHours();
                if (e.target.value === 'AM') {
                    if (hour >= 12) {
                        hour -= 12
                    }
                } else {
                    if (hour <= 12) {
                        hour += 12
                    }
                }
                const temp = startTime.setHours(hour);
                const startHour = new Date(temp)
                setStartTime(startHour);
                return;
            default:
                return;
        };
    };

    const monthDays = () => {
        const days = tally();
        const today = date.getDate();
        const current = function (day) {
            if (day === today) {
                return 'today';
            } else if (typeof day === 'string') {
                return 'prev-month'
            } else {
                return "";
            };
        };
        const month = days.map((day, idx) =>
            <button
                className={current(day)}
                id={current(day)}
                key={idx}
                value={startTime}
                onClick={() => changeDate(day, 'day')}>{day}</button>)
        return month;
    }

    const monthDisplay = ()=> {
        const month = date.getMonth();
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
        return months[month];
    };
    const questDate = () => {
        if (mini === 1) {
            return (
                <div className="cal-container">
                    <p className="orders3">Select a date/time to start your quest</p>
                    <div className="calendar">
                        <div className="month">
                            <button onClick={() => subCurrentMonth()}><i className="fa fa-angle-left"></i></button>
                            <div className="date">
                                <h1>{monthDisplay()}</h1>
                                <p>{`${date}`}</p>
                            </div>
                            <button onClick={() => addCurrentMonth()}><i className="fa fa-angle-right"></i></button>
                        </div>
                        <div className="weekdays">
                            <div>Sun</div>
                            <div>Mon</div>
                            <div>Tues</div>
                            <div>Wed</div>
                            <div>Thur</div>
                            <div>Fri</div>
                            <div>Sat</div>
                        </div>
                        <div className="days">
                            {monthDays()}
                        </div>
                    </div>
                </div>
            );
        } else if (mini === 2) {
            return (
                <div className='quest-name'>
                    <i className='fas fa-pen' id='pencil' onClick={() => setMini(1)}></i>
                    <div className='selected'>
                        <select onChange={event => changeDate(event, 'hour')} value={startTime} className='select'>
                            <option value="">Hour</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                        </select>
                        <select onChange={event => changeDate(event, 'minute')} value={startTime} className='select'>
                            <option value="">Minute</option>
                            <option value={0}>00</option>
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                            <option value={45}>45</option>
                        </select>
                        <select onChange={event => changeDate(event, 'convert')} value={startTime} className='select'>
                            <option value="">am/pm</option>
                            <option value='AM'>AM</option>
                            <option value='PM'>PM</option>
                        </select>
                    </div>
                    <div className='orders2'>{`${startTime}`}</div>
                    <button id='center' onClick={() => setMini(3)}>Continue</button>
                </div>
            );
        };
        return (
                <div className='quest-name'>
                    <i className='fas fa-pen' id='pencil' onClick={() => setMini(2)}></i>
                    <div className='orders2'>{`${startTime}`}</div>
                </div>
            );
    };
    const categoryShow = (category) => {
        switch (category) {
            case '1':
                return 'Fetch';
            case '2':
                return 'Craft';
            case '3':
                return 'Escort';
            case '4':
                return 'Slay';
            default:
                return 'Need to select Category'
        };
    };

    const advShow=(id) => {
        const adv = adventurers.filter(ad => ad.id === parseInt(id));
        return adv[0].username;
    }

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
        dispatch(clearData())
        dispatch(createQuest(quest))
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
                        <li className="orders">Start Time: {`${startTime}`}</li>
                        <li className="orders">Adventurer: {advShow(adventurerId)}</li>
                    </ul>
                        <Link to='/' className='button-submit' onClick={() => submit()}>Submit</Link> 
                </div>
            );
        }; 
            return '';
    };
    return (
        <div className="quest-container">
            <div className='top-bar'>
                <Link to='/' >
                    <img src={QuestRabbit} className="logo2" alt='logo' />
                </Link>
                <div className='bars'>
                    <ul className='bar1'>
                        <li className='grey-out'>1</li>
                        <div className='lineN'></div>
                        <li className='grey-out'>2</li>
                        <div className='lineN'></div>
                        <li className='currentN'>3</li>
                    </ul>
                    <ul className='bar2'>
                        <li className='line'>Describe your Quest</li>
                        <li className='line'>Browse Adventurers</li>
                        <li className='current'>Choose date {'&'} Time</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className='back'>
                <button onClick={() => setStep(2)}>Back</button><br />
            </div>
            <div className='quest-form'>
                {questDate()}
                {reviewQuest()}
            </div>
        </div>
    )
};

export default PartThree;