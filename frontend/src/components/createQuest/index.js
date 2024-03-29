import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import PartOne from './partOne';
import PartTwo from './partTwo';
import PartThree from './partThree';
import  './questForm.css';

// this is used to create quests and is the parent component of Parts 1 - 3
function CreateQuest(){
    const currentUser = useSelector(state => state.session.user ?? '');
    const data = useSelector(state => state.temp ?? '');
    const [questName, setQuestName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [adventurerId, setAdventurerId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [details, setDetails] = useState('');
    const [step, setStep] = useState(1);
    const [checked, setChecked] = useState('');

    useEffect(()=> { // this is used on initial load to set categoryId & questName on start if they exis in redux state
    if (data && data.categoryId) setCategoryId(data.categoryId);
    if (data && data.nameOfQuest) setQuestName(data.nameOfQuest);
    },[data]);

    //if user is not logged in, have them signup/login and go back to creating a quest
    if (!currentUser) return <Redirect to='/intermediary'/>;

    // use the 'step' state to determine which part of the form to render
        switch (step) {
            case 2:
                return <PartTwo 
                    step={step}
                    setStep={setStep}
                    adventurerId={adventurerId}
                    setAdventurerId={setAdventurerId}
                    checked={checked}
                    setChecked={setChecked}
                />;
            case 3:
                return <PartThree
                    step={step}
                    setStep={setStep}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    questName={questName}
                    adventurerId={adventurerId}
                    categoryId={categoryId}
                    details={details}
                    creatorId={currentUser.id}
                />;
            default:
                return <PartOne 
                    step={step}
                    setStep={setStep}
                    questName={questName}
                    setQuestName={setQuestName}
                    details={details}
                    setDetails={setDetails}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                />;
    };
};

export default CreateQuest;