import React from "react";

export function MonthDays({currentDate, changeDate, startTime}){

    //last day of current month
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    // day of week for 1st day in month
    const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    // last day of previous month
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    // last day of week 
    const lastDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();
    
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

    const days = tally();
    const today = new Date();

    const current = (day) => {
        const currentDay = new Date(currentDate).setDate(day);
        if (day === today.getDate() && (currentDate.getMonth() === today.getMonth())
         && (currentDate.getFullYear() === today.getFullYear())) return 'today';
        if (typeof day === 'string' || currentDay < today) return 'prev-month';
         return "";
    };

    const sendDateToChangeDate=(day)=> {
        // Early return if day is not in current month
        if (typeof day === 'string' ) return;
        changeDate(day, 'day');
    };

    return(
        <div className="days">
            {days.map((day, idx)=> 
                <button
                    className={current(day)}
                    id={current(day)}
                    key={idx}
                    value={startTime}
                    onClick={() => sendDateToChangeDate(day)}>{day}</button>
            )}
        </div>
    )};