import React from "react";
import { useDispatch } from "react-redux";
import { updateQuest } from "../../../store/quest";

export function WarnUser({changeToEdit, setMini, quest}){
    const dispatch = useDispatch();
    
    const submit = () => {
        const updatedQuest = {
            id: quest.id,
            completed: true
        };
        dispatch(updateQuest(updatedQuest));
        setMini(3);
    };
    return (
            <div className='quest-form'>
                <div className='quest-name'>
                    <div className='red'>
                        By clicking Confirm you are cancelling your Quest.
                    </div>
                    <div className='red'>
                        Are you sure you want to cancel your Quest?
                    </div>
                    <div id='center'>
                        <div className='orders'>
                            If you just need to change the start-time you can edit
                            that <button onClick={()=> changeToEdit()} className='btn-6'>here.</button>
                        </div>
                    </div>
                    <div className='red' >(This can't be undone)</div>
                    <div id='center'>
                        <button id='margin' className='btn-5' onClick={() => setMini(1)}>Cancel</button>
                        <button id='margin' className='btn-6' onClick={() => submit()}>Confirm</button>
                    </div>
                </div>
            </div>
        );
}