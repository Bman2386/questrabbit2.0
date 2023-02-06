import React from 'react';
import { Link } from 'react-router-dom';

const PartOne = (props) => {
    const {values, handleChange, next, pageHandle} = props;
    const logo = window.logo;
    const pencil = window.pencil;
    
    const questName = () => {
        if (values.mini === 0){
            return (
            <div className="quest-name">
                  <label htmlFor="quest_name" className="label">
                Quest Name
            </label>
            <input 
            type="text"
            value={values.quest_name}
            onChange={handleChange('quest_name')}
            className="input"
            >
            </input>  
            {values.quest_name === '' ? '' : <button 
            id='center' 
            onClick={() => pageHandle('continue')}>Continue</button>}
            
            </div>
        )
        } else {
            return (
                <div className='quest-name'>
                    <img className='pencil' src={pencil} id='pencil' onClick={() => pageHandle('edit', 0)}/>
                    <div className='label'>Name of your Quest:</div>
                    <div className='orders2'>{`${values.quest_name}`}</div> 
                </div>
            )
        }
        
    }

    const catShow = (cat) => {
        switch (cat) {
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
        }
    }

    const questCategory = () => {
        if (values.mini === 1){
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
                    checked={values.category_id === '1'}
                    onChange={handleChange('category_id')}/>
                </label>
                <label className='radio'>
                    Craft
                    <input type="radio"
                    className='radio'
                    value={2}
                    name='Craft'
                    checked={values.category_id === '2'}
                    onChange={handleChange('category_id')}/>
                </label>
                <label className='radio'>
                    Escort
                    <input type="radio"
                    className='radio'
                    value={3}
                    name='Escort'
                    checked={values.category_id === '3'}
                    onChange={handleChange('category_id')}/>
                </label>
                <label className='radio'>
                    Slay
                    <input type="radio"
                    className='radio'
                    value={4}
                    name='Slay'
                    checked={values.category_id === '4'}
                    onChange={handleChange('category_id')}/>
                </label>  
                
                </div>
                 {values.category_id === '' ? '' : <button 
            id='center' 
            onClick={() => pageHandle('continue')}>Continue</button>}
            </div>
            )
        } else if(values.mini > 1){
            return (
                 <div className='quest-name'>
                <img className='pencil' src={pencil} id='pencil' onClick={() => pageHandle('edit', 1)} />
                    <div className='label'>Category of your Quest:</div>
                    <div className='orders2'>{`${catShow(values.category_id)}`}</div> 
                </div>
            )
        } else{
            return (
               <div className='quest-name'>
                <div className='label'>Category Select</div>
                <div className='orders2'>{values.category_id ? `${catShow(values.category_id)}` : ''}</div>
            </div> 
            )   
        }
    }

    const questDetails = () => {
        if (values.mini === 2){
            return (
                <div className="quest-name">
                <label htmlFor="details" className="label">Details:</label>
                <div className='text'>
                    <p className="p">Start the conversation by telling your adventurer details about your quest.
                    Be sure to specify things like magic being required to complete the quest.
                </p>
                </div>
                
                <textarea 
                        value={values.details}
                        className="textarea"
                        onChange={handleChange('details')}
                        />
                {values.details === '' ? '' : <button 
            id='center' 
            onClick={() => pageHandle('continue')}>Continue</button>}
            </div> 
            )
        } else if (values.mini > 2){
            return (
                <div className='quest-name'>
                    <img className='pencil' src={pencil} id='pencil' onClick={() => pageHandle('edit', 2)} />
                    <div className='label'>Details about your quest:</div>
                    <div className='orders2'>{`${values.details}`}</div> 
                </div>
            )
        } else{
            return (
                <div className='quest-name'>
                <div className='label'>Quest Details:</div>
                <div className='orders2'>{values.details ? `${values.details}` : ''}</div>
            </div> 
            )
        }
    }
    return(
        <div className="quest-container">
             <div className='top-bar'>
                <Link to='/' >
                    <img src={logo} className="logo2"/>
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
            <hr/>
            <div className="quest-form">
                {questName()}
                {questCategory()}
                {questDetails()}
           <br />
           {values.mini > 2 ? <button onClick={() => next()}>Next</button> : ''}
            </div>
            
        </div>
    )
}

export default PartOne;