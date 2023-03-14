import React from "react";
import star from '../../images/star.png';
import emptyStar from '../../images/emptyStar.png';
function Star({filled, setRating, value}) {
    if (filled){
       return(
           <button className='hidden-button' onClick={() => setRating(value)}>
           <img src={star} className='star' alt='filled star'/>
           </button>
    )};
    return(
        <button className='hidden-button' onClick={() => setRating(value)}>
        <img src={emptyStar} className='star'alt='empty star'/>
        </button>
    );
};

export default Star;