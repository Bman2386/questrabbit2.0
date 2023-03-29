import React from "react";

export function MonthDays({date, changeDate, startTime}){

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

    const days = tally();
    const today = new Date();
    
    const current = (day) => {
        if (day === today.getDate() && (date.getMonth() === today.getMonth())
         && (date.getFullYear() === today.getFullYear())) return 'today';
        if (typeof day === 'string') return 'prev-month';
         return "";
    };
    return(
        <div className="days">
            {days.map((day, idx)=> 
                <button
                    className={current(day)}
                    id={current(day)}
                    key={idx}
                    value={startTime}
                    onClick={() => changeDate(day, 'day')}>{day}</button>
            )}
        </div>
    )};