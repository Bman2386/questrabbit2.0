import React from "react";
import { Link } from "react-router-dom";
import { categoryShow, adventurerShow, dateShow } from '../../../utils/show';

export function ReviewQuest({mini, questName, categoryId, details, startTime, adventurerId, submit}){
    if (mini === 3) {
        return (
            <div className='quest-name'>
                <ul className="quest-details">
                    <li className="label">Your Quest</li>
                    <li className="orders">Quest Name: {questName}</li>
                    <li className="orders">Category: {categoryShow(categoryId)}</li>
                    <li className="orders">Details: {details}</li>
                    <li className="orders">Start Time: {dateShow(startTime)}</li>
                    <li className="orders">Adventurer: {adventurerShow(adventurerId)}</li>
                </ul>
                <Link to='/' className='button-submit' onClick={() => submit()}>Submit</Link>
            </div>
        )};
    return '';
};