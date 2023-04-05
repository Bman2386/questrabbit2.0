import React from "react";
import {dateShow} from '../../../utils/show';
import {MonthDays} from './monthDays';

export function QuestDate({mini, setMini, startTime, currentDate, setCurrentDate, setStartTime }){
    
    const oldDate= new Date(currentDate);
    const today = new Date();
    
    const changeMonth = (type)=> {
        const nextMonth = oldDate.getMonth() + type;
        oldDate.setMonth(nextMonth);
        const nextDate = new Date(oldDate);
        setCurrentDate(nextDate);
    };
    
    // check day to ensure not in past before setting it in state
    const earlyReturnCheck = (tempDate)=> {
        const currentHour = today.getHours();
        const addHour = new Date(tempDate).setHours(currentHour + 1); // adding an hour so that users will be able to select today
        return addHour < today;
    };

    const changeDate = (e, type) => {
        const temp1 = new Date(currentDate).setDate(e);
        if (earlyReturnCheck(temp1)) return;
        const date1 = new Date(startTime);
        
        switch (type) {
            case 'day':
                const startDate = new Date(temp1);
                setStartTime(startDate);
                setMini(2);
                return;
            case 'hour':
                date1.setHours(e.target.value);
                setStartTime(date1)
                return;
            case 'minute':
                date1.setMinutes(e.target.value);
                setStartTime(date1);
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

    const monthDisplay = () => {
        const month = currentDate.getMonth();
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
    if (mini === 1) {
        return (
            <div className="cal-container">
                <p className="orders3">Select a date/time to start your quest</p>
                <div className="calendar">
                    <div className="month">
                        <button onClick={() => changeMonth(-1)}><i className="fa fa-angle-left"></i></button>
                        <div className="date">
                            <h1>{monthDisplay()}</h1>
                            <p>{dateShow(today)}</p>
                        </div>
                        <button onClick={() => changeMonth(1)}><i className="fa fa-angle-right"></i></button>
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
                    <MonthDays 
                    currentDate={currentDate}
                    changeDate={changeDate}
                    startTime={startTime}
                    />
                </div>
            </div>
        )};
    if (mini === 2){
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
                <div className='orders2'>{dateShow(startTime)}</div>
                <button id='center' onClick={() => setMini(3)}>Continue</button>
            </div>
        )};

    return(
        <div className='quest-name'>
            <i className='fas fa-pen' id='pencil' onClick={() => setMini(2)}></i>
            <div className='orders2'>{dateShow(startTime)}</div>
        </div>
    )};