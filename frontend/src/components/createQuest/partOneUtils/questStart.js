import React from "react";
import pencil from '../../../images/pencil.png';

export function QuestStart({mini, setQuestName, questName, setMini}){
    // if user is just starting form, mini is 0, and render this form, otherwise render line 26 
    if (mini === 0) {
        return (
            <div className="quest-name">
                <label htmlFor="quest_name" className="label">
                    Quest Name
                </label>
                <input
                    type="text"
                    value={questName}
                    onChange={e => setQuestName(e.target.value)}
                    className="input"
                >
                </input>
                {questName !== '' && <button id='center' onClick={() => setMini(1)}>Continue</button>}
            </div>
        );
    }; 
    return (
            <div className='quest-name'>
                <img className='pencil'alt='pencil' src={pencil} id='pencil' onClick={() => setMini(0)} />
                <div className='label'>Name of your Quest:</div>
                <div className='orders2'>{`${questName}`}</div>
            </div>
        );
};