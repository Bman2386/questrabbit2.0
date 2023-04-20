import React from "react";
import { categoryShow } from "../../../utils/show";
import pencil from '../../../images/pencil.png';

// this is the second step in the 1st page of form, setting the category of work
export function QuestCategory({mini, setMini, categoryId, setCategoryId}){
    //mini is the state used in the parent component of the form, determining how much info we display to user
    if (mini === 1) {
        return (
            <div className="quest-name">
                <label htmlFor="Category" className="label">Category of your Quest:</label>
                <div className='radio-container'>
                    {[1,2,3,4].map(num=> 
                        <label className="radio" key={num}>
                            {categoryShow(num)} 
                         <input 
                        type='radio'
                        className="radio"
                        value={num}
                        name={categoryShow(num)}
                        checked={categoryId === `${num}`}
                        onChange={()=> setCategoryId(`${num}`)}
                        />   
                        </label>
                        
                    )}
                </div>
                {categoryId === '' ? '' : <button
                    id='center'
                    onClick={() => setMini(2)}>Continue</button>}
            </div>
        );
    }; 
    if (mini > 1) {
        return (
            <div className='quest-name'>
                <img className='pencil' alt='pencil' src={pencil} id='pencil' onClick={() => setMini(1)} />
                <div className='label'>Category of your Quest:</div>
                <div className='orders2'>{`${categoryShow(categoryId)}`}</div>
            </div>
        );
    };
    return (
        <div className='quest-name'>
            <div className='label'>Category Select</div>
            <div className='orders2'>{categoryId ? `${categoryShow(categoryId)}` : ''}</div>
        </div>
        );
};