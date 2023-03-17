import React from "react";
import { AllReviews } from "./allReviews";
import {Hero} from './hero';
import { Rating } from "./rating";
import { IsElite } from "./isElite";

export function List({ examine, setSelected, setExamine, adv, selectAdv, reviews, selected, moveToNextStep }) { 

    const closeReviews = () => {
        setSelected('');
        setExamine(false);
    };   
    
    if (examine) return (
        <div className='adv-info'>
            Adventurer info:
            <div className='hero-box'>
                <div><Hero name={selected.username}/></div>
                <div className='p' id='margin'>{`${selected.username}`}</div>
                <IsElite elite={selected.elite}/>
                <div className='p' id='margin'>{`${selected.pitch}`}</div>
                <button value={selected.id} className="select2" style={{ marginRight: '.5rem' }} onClick={e => moveToNextStep(e.target.value)}>Select and Continue</button>
                <button onClick={() => closeReviews()}>Close Reviews</button>
            </div>    
        <AllReviews reviews={reviews} selected={selected}/>
        </div>
    );
    return(
        <div className="heros-container">
         {adv.map(ad =>
         <div className="hero-container" key={ad.id}>
                <div className='top-hero'>
                    <Hero name={ad.username}/>
                    <div className='hero-details'>
                        <p className="hero-name">{ad.username}</p>
                        <IsElite elite={ad.elite}/>
                        <div className="rating-container">Rating: <Rating rating={ad.avgRating}/></div>
                        <p className="p">Total Reviews: {ad.totalRatings}</p>
                        <hr />
                        <p className="p">How I can Help:</p>
                        <p className="p">{ad.pitch}</p>
                    </div>
                </div>
                <button value={ad.id} onClick={e => selectAdv(e.target.value)}>See Reviews</button>
                <button value={ad.id} className="select2" onClick={e => moveToNextStep(e.target.value)}>Select and Continue</button>
            </div>)}   
        </div>
    )};