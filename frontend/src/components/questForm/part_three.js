import React from 'react'
import { Link } from 'react-router-dom';

const PartThree = props => {
    const {values, changeDate, back, submit, today, monthDays, addCurrentMonth, subCurrentMonth, handleHour, adv, pageHandle, next} = props;
    const logo = window.logo;
    const date = today.date;
    const month = today.month;
    const days = monthDays();
    const { quest_name, category_id, details, start_time, adventurer_id, creator_id } = values

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
        }
    }

    const advShow = (adventurer) => {
        const first = adv[0].id;
        const name = adv[adventurer - first].username;
        return (
        name
        )
    }

    const questDate = () => {
        if (values.mini === 3){
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
            )
        } else if (values.mini === 4) {
            return (
                <div className='quest-name'>
                    <i className='fas fa-pen' id='pencil' onClick={() => pageHandle('edit', 3)}></i>
                    <div className='selected'>
                    <select onChange={event => handleHour(event)} value={values.start_time} className='select'>
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
                       <select onChange={event => changeDate(event, 'minute')} value={values.start_time} className='select'>
                            <option value="">Minute</option>
                            <option value={0}>00</option>
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                            <option value={45}>45</option>
                       </select>
                       <select onChange={event => changeDate(event, 'convert')} value={values.start_time} className='select'>
                            <option value="">am/pm</option>
                            <option value='AM'>AM</option>
                            <option value='PM'>PM</option>
                       </select>
                    </div>
                <div className='orders2'>{`${startTime}`}</div> 
                <button id='center' onClick={() => pageHandle('continue')}>Continue</button>
                </div>
            )
        } else {
            return (
                <div className='quest-name'>
                    <i className='fas fa-pen' id='pencil' onClick={() => pageHandle('edit', 4)}></i>
                    <div className='orders2'>{`${startTime}`}</div> 
                </div>
            )
        }
    }

    const reviewQuest = () => {
        if (values.mini === 5){
            return (
                <div className='quest-name'>
                    <ul className="quest-details">
                        <li className="label">Your Quest</li>
                        <li className="orders">Quest Name: {quest_name}</li>
                        <li className="orders">Category: {categoryShow(category_id)}</li>
                        <li className="orders">Details: {details}</li>
                        <li className="orders">Start Time: {`${startTime}`}</li>
                        <li className="orders">Adventurer: {advShow(adventurer_id)}</li>
                    </ul>
               {creator_id ? 
               <Link to='/' className='button-submit' onClick={() => submit()}>Submit</Link> :
                next()}
            </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    const dateDisplay = () => {
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
        const fullDate = new Date(start_time);
        const weekDay = days[fullDate.getDay()];
        const hour = () => {
            const hours = fullDate.getHours();
           if ( hours > 12){
               return (hours - 12)
           } else if (hours === 0){
                return (hours + 12)
           } else {
               return hours
           }
        } 
        const min = () => {
           const questMinutes = fullDate.getMinutes()
           if ( questMinutes === 0 ){
               return '00'
           } else {
               return questMinutes;
           } 
        } ;
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
        return `${weekDay} ${month} ${monthDay} ${year} ${hour()}:${min()}${amPm()}`

    }
    const startTime = dateDisplay();

    return (
        <div className="quest-container">
             <div className='top-bar'>
                <Link to='/' >
                    <img src={logo} className="logo2"/>
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
            <hr/>
            <div className='back'>
                <button onClick={() => back()}>Back</button><br />
            </div>
            <div className='quest-form'>
                {questDate()}
                {reviewQuest()}
            </div>
            </div>
    )

}

export default PartThree;

