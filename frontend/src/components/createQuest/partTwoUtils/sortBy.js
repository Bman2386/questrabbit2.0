import React from "react";

export function SortBy({adventurers, examine, setAdventurersArray, setIsChecked}){

    const cloneOfAdventurers = [...adventurers];

    const sortHelper = (type, clonedArrayOfAdventurers=cloneOfAdventurers)=> {
        const firstAdventurer = clonedArrayOfAdventurers[0]; //using recursion to sort adventurers by desired stat
        if (clonedArrayOfAdventurers.length < 2) return clonedArrayOfAdventurers;
        const sortFunction = (first,second) => {
            if (first > second) return -1;
            return 1;
        };
        let left = clonedArrayOfAdventurers.slice(1).filter(adventurer => sortFunction(adventurer[type], firstAdventurer[type]) === -1);
        let right = clonedArrayOfAdventurers.slice(1).filter(adventurer => sortFunction(adventurer[type], firstAdventurer[type]) !== -1);
        left = sortHelper(type, left);
        right = sortHelper(type, right);

        return left.concat([firstAdventurer]).concat(right);
    };

    const sortAdventuerers = (sortType)=> {
        const sorted = sortHelper(sortType);
        setAdventurersArray(sorted);
        setIsChecked(false);
    };
    if (!examine) {
            return (
                <div className='sorting'>
                    <div className='sort'>Sort By:</div>
                    <select onChange={(e) => sortAdventuerers(e.target.value)}>
                        <option value="">-</option>
                        <option value='id'>Best Value</option>
                        <option value="totalRatings">Most Reviewed</option>
                        <option value="avgRating">Highest Rating</option>
                    </select>
                </div>
            );
        };
        return '';
};