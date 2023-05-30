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
    const [adv, setAdv] = useState([]); // we use this array to sort without losing original adventurers
    const [isChecked, setIsChecked] = useState(false);
    const [selected, setSelected] = useState('');
    const [examine, setExamine] = useState(false);

    const isAdvFetched = useRef(false); 

    if (adventurers.length) isAdvFetched.current = true;

    useEffect(() => {
        if (isAdvFetched.current === false ) {
            dispatch(fetchAdventurers());
            isAdvFetched.current = true;
        };
    }, [dispatch]);

    if (adventurers.length < 1 ) return <Loading />;

    const filterElite = (value)=> {
        if (value){ // if true filter adventurers to elite only
            const temp = [];
            adventurers.forEach(ad => {
                if (ad.elite) temp.push(ad);
            });
            setAdv(temp);
            setIsChecked(true);
        } else {
            setAdv([...adventurers]);// if false reset adv to all adventurers
            setIsChecked(false);
        };
    };

    const selectAdv=(input)=> {
        const adventurer = adventurers.filter(ad => ad.id === parseInt(input));
        setSelected(...adventurer);
        setExamine(true);
    };

    const moveToNextStep = (id) => {
        setAdventurerId(id);
        setStep(3);
    };
    if (adv.length === 0) setAdv([...adventurers]);

    return(
        <div className="quest-container">
            <TopBar step={step} />
            <hr />
            <div className='back'>
                <button value={1} onClick={e=> setStep(e.target.value)}>Back</button>
                <SortBy 
                adventurers={adventurers}
                examine={examine}
                setAdv={setAdv}
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
                        adv={adv}
                        selectAdv={selectAdv}
                        selected={selected}
                        moveToNextStep={moveToNextStep}
                    />
                </div>
            </div>
        </div>
    );
};

export default PartTwo;