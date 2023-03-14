import React from "react";
import pencil from '../../../images/pencil.png';

export function QuestDetails({mini, setMini, details, setDetails}){
    if (mini === 2) {
        return (
            <div className="quest-name">
                <label htmlFor="details" className="label">Details:</label>
                <div className='text'>
                    <p className="p">Start the conversation by telling your adventurer details about your quest.
                        Be sure to specify things like magic being required to complete the quest.
                    </p>
                </div>
                <textarea
                    value={details}
                    className="textarea"
                    onChange={e => setDetails(e.target.value)}
                />
                {details === '' ? '' : <button
                    id='center'
                    onClick={() => setMini(3)}>Continue</button>}
            </div>);
    };
    if (mini > 2) {
        return (
            <div className='quest-name'>
                <img className='pencil' alt='pencil' src={pencil} id='pencil' onClick={() => setMini(2)} />
                <div className='label'>Details about your quest:</div>
                <div className='orders2'>{`${details}`}</div>
            </div>);
    };
    return (
        <div className='quest-name'>
            <div className='label'>Quest Details:</div>
            <div className='orders2'>{details ? `${details}` : ''}</div>
        </div>);
}