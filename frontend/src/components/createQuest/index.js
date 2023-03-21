import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import PartOne from './partOne';
import PartTwo from './partTwo';
import PartThree from './partThree';

function CreateQuest(){
    const currentUser = useSelector(state => state.session.user ? state.session.user : '');
    const data = useSelector(state => state.temp ? state.temp : '');
    const [questName, setQuestName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [adventurerId, setAdventurerId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [details, setDetails] = useState('');
    const [step, setStep] = useState(1);
    const [checked, setChecked] = useState('');

    useEffect(()=> {
    if (data && data.categoryId) setCategoryId(data.categoryId);
    if (data && data.nameOfQuest) setQuestName(data.nameOfQuest);
    },[data]);

    if (!currentUser) return <Redirect to='/intermediary'/>;

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