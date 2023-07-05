import React from "react";
import { categoryShow } from "../../../utils/show";
import { adventurerShow } from "../../../utils/show";
import { dateShow } from "../../../utils/show";

export function YourQuest({quest, setMini}){
    return (
        <div className='quest-form'>
             <button style={{marginTop: '1rem'}} className='back-button' onClick={()=>setCancel(false)}>Back</button>
             <div className='width2'>
                <div className='hero-container'>
                    <div className='h1'>Your Quest</div>
                    <hr className='hr' />
                    <p className='p'>Quest Name: {`${quest.questName}`}</p>
                    <p className='p'>Details: {`${quest.details}`}</p>
                    <p className='p'>Category: {categoryShow(quest.categoryId)}</p>
                    <p className='p'>Start Time: {`${dateShow(quest.startTime)}`}</p>
                    <p className='p'>Adventurer: {`${adventurerShow(quest.adventurerId)}`}</p>
                    <button onClick={() => setMini(2)} id='margin'>Cancel Quest</button>
                </div>
            </div>
        </div>
           
        );
}