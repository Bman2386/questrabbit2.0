import React,{useState} from 'react';
import { QuestStart } from './partOneUtils/questStart';
import { QuestCategory } from './partOneUtils/questCategory';
import { QuestDetails } from './partOneUtils/questDetails';
import { TopBar } from './topBar';

// the 1st part of creating a quest
function PartOne({ step, setStep, questName, setQuestName, details, setDetails, categoryId, setCategoryId}){
    // create a 'mini' state within Part One that determines how much to render to user 
    // as the user completes the form, more steps are shown
    const [mini, setMini] = useState(0);
        
        return(
            <div className="quest-container">
                <TopBar step={step}/>
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