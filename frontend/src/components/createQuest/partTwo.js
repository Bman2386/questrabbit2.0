import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {fetchAdventurers} from '../../store/adventurer';
import { TopBar } from './topBar';
import {SortBy} from './partTwoUtils/sortBy';
import { CheckBox } from './partTwoUtils/checkBox';
import {List} from './partTwoUtils/list';
import {Loading} from '../../utils/loading';
function PartTwo({ step, setStep, setAdventurerId}){
    const dispatch = useDispatch();
    const adventurers = useSelector(state => state.adventurers ? Object.values(state.adventurers) : []);
    const [adventurersArray, setAdventurersArray] = useState([]); // we use this array to sort without losing original adventurers
    const [isChecked, setIsChecked] = useState(false);
    const [selected, setSelected] = useState('');
    const [examine, setExamine] = useState(false);

    const isAdventurersFetched = useRef(false); 

    if (adventurers.length > 1) isAdventurersFetched.current = true;

    useEffect(() => {
        if (isAdventurersFetched.current === false ) {
            dispatch(fetchAdventurers());
            isAdventurersFetched.current = true;
        };
    }, [dispatch]);

    if (adventurers.length < 1 ) return <Loading />;

    const filterElite = (value)=> {
        if (value){ // if true filter adventurers to elite only
            const temp = [];
            adventurers.forEach(adventurer => {
                if (adventurer.elite) temp.push(adventurer);
            });
           setAdventurersArray(temp);
            setIsChecked(true);
        } else {
           setAdventurersArray([...adventurers]);// if false reset adv to all adventurers
            setIsChecked(false);
        };
    };

    const selectAdventurer=(input)=> {
        const adventurer = adventurers.filter(adventurer => adventurer.id === parseInt(input));
        setSelected(...adventurer);
        setExamine(true);
    };

    const moveToNextStep = (id) => {
        setAdventurerId(id);
        setStep(3);
    };
    if (adventurersArray.length === 0) setAdventurersArray([...adventurers]);

    return(
        <div className="quest-container">
            <TopBar step={step} />
            <hr />
            <div className='back'>
                <button value={1} onClick={e=> setStep(e.target.value)}>Back</button>
                <SortBy 
                adventurers={adventurers}
                examine={examine}
                setAdventurersArray={setAdventurersArray}
                setIsChecked={setIsChecked}
                />
            </div>
            <div className='quest-form2'>
                <div className='top-form'>
                    <CheckBox 
                    examine={examine}
                    isChecked={isChecked}
                    filterElite={filterElite}
                    />
                    <List
                        examine={examine}
                        setSelected={setSelected}
                        setExamine={setExamine}
                        adventurersArray={adventurersArray}
                        selectAdventurer={selectAdventurer}
                        selected={selected}
                        moveToNextStep={moveToNextStep}
                    />
                </div>
            </div>
        </div>
    );
};

export default PartTwo;