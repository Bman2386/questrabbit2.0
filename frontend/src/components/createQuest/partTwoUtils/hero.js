import React from "react";
import hercules from '../../../images/hercules.jpg';
import isaac_newton from '../../../images/isaac_newton.jpg';
import goblin_slayer from '../../../images/goblin_slayer.jpg';

export function Hero({name}){
    if (name === 'Hercules') return <img src={hercules} alt='hero' className='adv-img' />;
    if (name === 'Goblin Slayer') return <img src={goblin_slayer} alt='hero' className='adv-img' />;
    if (name === 'Isaac Newton') return <img src={isaac_newton} alt='hero' className='adv-img' />;
    return <div className='error'>Error with name</div>;
};