import React from "react";

// adds an icon if adventurer is elite
export function IsElite({elite}){
    if (elite) {
        return (
            <div className='p'>
               <div className='award'>
                    <i className='fas fa-award' id='blue'></i>
                    <div id='blue'>Elite Adventurer</div>
                </div>  
            </div>
        );
    };
    return '';
};