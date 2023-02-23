import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import {PartOne} from './partOne';
import {PartTwo} from './partTwo';
import {PartThree} from './partThree';

function CreateQuest(){
    const currentUser = useSelector(state => state.session.user ? state.session.user : '');
    const [questName, setQuestName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [adventurerId, setAdventurerId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [details, setDetails] = useState('');
    const [step, setStep] = useState(1);
    const [review, setReview] =useState(false);
    const [checked, setChecked] = useState('');

    if (!currentUser) return <Redirect to='/intermediary'/>;

        switch (step) {
            case 2:
                return <PartTwo 
                    step={step}
                    setStep={setStep}
                    adventurerId={adventurerId}
                    setAdventurerId={setAdventurerId}
                    review={review}
                    setReview={setReview}
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