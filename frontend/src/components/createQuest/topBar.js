import React from "react";
import { Link } from 'react-router-dom';

export function TopBar({step}){
    const isCurrentStep = (currentN) => {
        if (step === currentN) return 'currentN';
        return 'grey-out';
    };
    const isCurrentBar2=(currentN)=> {
        if (step === currentN) return 'current';
        return 'line';
    };

    return(
        <div className='top-bar'>
            <Link to='/' className="btn-logo">
                questrabbit
            </Link>
            <div className='bars'>
                <ul className='bar1'>
                    <li className={isCurrentStep(1)}>1</li>
                    <div className='lineN'></div>
                    <li className={isCurrentStep(2)}>2</li>
                    <div className='lineN'></div>
                    <li className={isCurrentStep(3)}>3</li>
                </ul>
                <ul className='bar2'>
                    <li className={isCurrentBar2(1)}>Describe your Quest</li>
                    <li className={isCurrentBar2(2)}>Browse Adventurers</li>
                    <li className={isCurrentBar2(3)}>Choose date {'&'} Time</li>
                </ul>
            </div>
        </div>
    )};