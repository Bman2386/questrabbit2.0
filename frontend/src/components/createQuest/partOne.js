import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import QuestRabbit from '../../images/QuestRabbit.jpg';
import { QuestStart } from './partOneUtils/questStart';
import { QuestCategory } from './partOneUtils/questCategory';
import { QuestDetails } from './partOneUtils/questDetails';

function PartOne({ setStep, questName, setQuestName, details, setDetails, categoryId, setCategoryId}){
    const [mini, setMini] = useState(0);
        
        return(
            <div className="quest-container">
                <div className='top-bar'>
                    <Link to='/' >
                        <img src={QuestRabbit}alt='logo' className="logo2" />
                    </Link>
                    <div className='bars'>
                        <ul className='bar1'>
                            <li className='currentN'>1</li>
                            <div className='lineN'></div>
                            <li className='grey-out'>2</li>
                            <div className='lineN'></div>
                            <li className='grey-out'>3</li>
                        </ul>
                        <ul className='bar2'>
                            <li className='current'>Describe your Quest</li>
                            <li className='line'>Browse Adventurers</li>
                            <li className='line'>Choose date {'&'} Time</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="quest-form">
                    <QuestStart 
                        mini={mini}
                        setMini={setMini}
                        questName={questName}
                        setQuestName={setQuestName}
                    />
                    <QuestCategory 
                        mini={mini}
                        setMini={setMini}
                        categoryId={categoryId}
                        setCategoryId={setCategoryId}
                    />
                    <QuestDetails 
                        mini={mini}
                        setMini={setMini}
                        details={details}
                        setDetails={setDetails}
                        />
                    <br />
                    {mini > 2 ? <button onClick={() => setStep(2)}>Next</button> : ''}
                </div>
            </div>
        );
};

export default PartOne;