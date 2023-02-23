import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import QuestRabbit from '../../images/QuestRabbit.jpg';
import pencil from '../../images/pencil.png';

function PartOne({step, setStep, questName, setQuestName, details, setDetails, categoryId, setCategoryId}){
        const [mini, setMini] = useState(0);
        const data = useSelector(state => state.temp ? state.temp : '');

    //     if (data && parseInt(data) === NaN) setCategoryId(data);
    //     if (data && parseInt(data) !== NaN) setDetails(data);
    // console.log(data)
    const questStart = () => {
        if (mini === 0) {
            return (
                <div className="quest-name">
                    <label htmlFor="quest_name" className="label">
                        Quest Name
                    </label>
                    <input
                        type="text"
                        value={questName}
                        onChange={e => setQuestName(e.target.value)}
                        className="input"
                    >
                    </input>
                    {questName === '' ? '' : <button
                        id='center'
                        onClick={() => setMini(1)}>Continue</button>}

                </div>
            );
        } else {
            return (
                <div className='quest-name'>
                    <img className='pencil' src={pencil} id='pencil' onClick={() => setMini(0)} />
                    <div className='label'>Name of your Quest:</div>
                    <div className='orders2'>{`${questName}`}</div>
                </div>
            );
        };

    };

    const catShow = () => {
        switch (categoryId) {
            case '1':
                return 'Fetch';
            case '2':
                return 'Craft';
            case '3':
                return 'Escort';
            case '4':
                return 'Slay';
            default:
                break;
        };
    };

    const questCategory = () => {
        if (mini === 1) {
            return (
                <div className="quest-name">
                    <label htmlFor="Category" className="label">Category of your Quest:</label>
                    <div className='radio-container'>
                        <label className='radio'>
                            Fetch
                            <input type="radio"
                                className='radio'
                                value={1}
                                name='Fetch'
                                checked={categoryId === '1'}
                                onChange={()=>setCategoryId('1')} />
                        </label>
                        <label className='radio'>
                            Craft
                            <input type="radio"
                                className='radio'
                                value={2}
                                name='Craft'
                                checked={categoryId === '2'}
                                onChange={()=> setCategoryId('2')} />
                        </label>
                        <label className='radio'>
                            Escort
                            <input type="radio"
                                className='radio'
                                value={3}
                                name='Escort'
                                checked={categoryId === '3'}
                                onChange={() => setCategoryId('3')} />
                        </label>
                        <label className='radio'>
                            Slay
                            <input type="radio"
                                className='radio'
                                value={4}
                                name='Slay'
                                checked={categoryId === '4'}
                                onChange={() => setCategoryId('4')} />
                        </label>

                    </div>
                    {categoryId === '' ? '' : <button
                        id='center'
                        onClick={() => setMini(2)}>Continue</button>}
                </div>
            );
        } else if (mini > 1) {
            return (
                <div className='quest-name'>
                    <img className='pencil' src={pencil} id='pencil' onClick={() => setMini(1)} />
                    <div className='label'>Category of your Quest:</div>
                    <div className='orders2'>{`${catShow()}`}</div>
                </div>
            );
        } else {
            return (
                <div className='quest-name'>
                    <div className='label'>Category Select</div>
                    <div className='orders2'>{categoryId ? `${catShow()}` : ''}</div>
                </div>
            );
        };
    };

    const questDetails = () => {
        if (mini === 2) {
            return (
                <div className="quest-name">
                    <label htmlFor="details" className="label">Details:</label>
                    <div className='text'>
                        <p className="p">Start the conversation by telling your adventurer details about your quest.
                            Be sure to specify things like magic being required to complete the quest.
                        </p>
                    </div>

                    <textarea
                        value={details}
                        className="textarea"
                        onChange={e => setDetails(e.target.value)}
                    />
                    {details === '' ? '' : <button
                        id='center'
                        onClick={() => setMini(3)}>Continue</button>}
                </div>
            );
        } else if (mini > 2) {
            return (
                <div className='quest-name'>
                    <img className='pencil' src={pencil} id='pencil' onClick={() => setMini(2)} />
                    <div className='label'>Details about your quest:</div>
                    <div className='orders2'>{`${details}`}</div>
                </div>
            );
        } else {
            return (
                <div className='quest-name'>
                    <div className='label'>Quest Details:</div>
                    <div className='orders2'>{details ? `${details}` : ''}</div>
                </div>
            );
        };
    }
        return(
            <div className="quest-container">
                <div className='top-bar'>
                    <Link to='/' >
                        <img src={QuestRabbit} className="logo2" />
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
                    {questStart()}
                    {questCategory()}
                    {questDetails()}
                    <br />
                    {mini > 2 ? <button onClick={() => setStep(2)}>Next</button> : ''}
                </div>

            </div>
        );
};

export default PartOne;