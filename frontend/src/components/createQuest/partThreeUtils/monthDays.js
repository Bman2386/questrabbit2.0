import React from "react";

export function MonthDays({currentDate, changeDate, startTime}){

    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
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