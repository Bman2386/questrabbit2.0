import React from "react";
import {Link} from "react-router-dom";
import { categoryShow, adventurerShow, dateShow } from '../../utils/show';

export function QuestShow({quests, moveToEdit, moveToCancel}){
    if (quests.length > 0) {
        return (
            <div className='show-quests' id='background'>
                <div className='h1' id='background'>Your Quests</div>
                {quests.map(quest =>
                    <div key={quest.id} className='quest-name'>
                        <div className='links2'>
                            <div className='p'> Quest Name:</div>
                            <div className='orders4'>
                                {quest.questName}
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Details:</div>
                            <div className='orders4'>
                                "{quest.details}"
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Start Time:</div>
                            <div>
                                <div className='orders4'>{dateShow(quest.startTime)}</div>
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Category: </div>
                            <div className='orders4'>
                                {categoryShow(quest.categoryId)}
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Adventurer:</div>
                            <div className='orders4'>
                                {adventurerShow(quest.adventurerId)}
                            </div>
                        </div>
                        <div className='links2' id='center'>
                            <button
                                className="btn-1"
                                value={quest.id}
                                onClick={(e) => moveToEdit(e.target.value)}
                            >Edit Quest</button>
                            <button
                                to={`/delete/${quest.id}`}
                                className="btn-1"
                                value={quest.id}
                                onClick={e => moveToCancel(e.target.value)}
                            >Cancel Quest</button>
                        </div>
                    </div>
                )}
            </div>
        )};
    return ( //if no active quests, encourage user to create one
        <div className="quest-name">
            <h1 className='h1' id='center'>Have something else on your to-do list?</h1>
            <p className='p'>Book your next Quest or manage future to-dos  with Quest Rabbit</p>
            <Link to="/quest" className='button-submit' id='center'>Check It Off Your List</Link>
        </div>
    );
}