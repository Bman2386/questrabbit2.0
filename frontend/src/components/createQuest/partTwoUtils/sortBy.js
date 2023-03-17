import React from "react";

export function SortBy({adventurers, examine, setAdv, setIsChecked}){

    const cloneOfAdventurers = [...adventurers];

    const sortHelper = (type, arr=cloneOfAdventurers)=> {
        const first = arr[0];
        if (arr.length < 2) return arr;
        const func = (x,y) => {
            if (x>y) return -1;
            return 1;
        };
        let left = arr.slice(1).filter(el => func(el[type], first[type]) === -1);
        let right = arr.slice(1).filter(el => func(el[type], first[type]) !== -1);
        left = sortHelper(type, left);
        right = sortHelper(type, right);

        return left.concat([first]).concat(right);
    };

    const sortAdv = (sortType)=> {
        const sortTypes = {
            reviews: 'totalRatings',
            high: 'avgRating',
            recommended: 'id' 
        };
        const sorted = sortHelper(sortTypes[`${sortType}`]);
        setAdv(sorted);
        setIsChecked(false);
    };
    if (!examine) {
            return (
                <div className='sorting'>
                    <div className='sort'>Sort By:</div>
                    <select onChange={(e) => sortAdv(e.target.value)}>
                        <option value="">-</option>
                        <option value='recommended'>Best Value</option>
                        <option value="reviews">Most Reviewed</option>
                        <option value="high">Highest Rating</option>
                    </select>
                </div>
            );
        };
        return '';
};