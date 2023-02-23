import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuestRabbit from '../../images/QuestRabbit.jpg';

function PartThree({step, setStep,startTime, setStartTime, questName, 
    setQuestName, adventurerId, categoryId, details}){
        const [mini, setMini] = useState(1);

    const questDate = () => {
        if (mini === 1) {
            return (
                <div className="cal-container">
                    <p className="orders3">Select a date/time to start your quest</p>
                    <div className="calendar">
                        <div className="month">
                            <button onClick={() => subCurrentMonth()}><i className="fa fa-angle-left"></i></button>
                            <div className="date">
                                <h1>{month}</h1>
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
                            {days}
                        </div>
                    </div>
                </div>
            );
        } else if (mini === 2) {
            return (
                <div className='quest-name'>
                    <i className='fas fa-pen' id='pencil' onClick={() => setMini(3)}></i>
                    <div className='selected'>
                        <select onChange={event => handleHour(event)} value={startTime} className='select'>
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
                    <button id='center' onClick={() => pageHandle('continue')}>Continue</button>
                </div>
            );
        };
        return (
                <div className='quest-name'>
                    <i className='fas fa-pen' id='pencil' onClick={() => pageHandle('edit', 4)}></i>
                    <div className='orders2'>{`${startTime}`}</div>
                </div>
            );
    };

    return (
        <div className="quest-container">
            <div className='top-bar'>
                <Link to='/' >
                    <img src={QuestRabbit} className="logo2" />
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