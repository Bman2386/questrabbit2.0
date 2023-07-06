import React from "react";
import hercules from '../../../images/hercules.jpg';
import isaac_newton from '../../../images/isaac_newton.jpg';
import goblin_slayer from '../../../images/goblin_slayer.jpg';

// returns an image of adventurer avatar
// will need to refactor at scale
export function Hero({name}){
    const adventurers = {
        'Hercules': hercules,
        'Goblin Slayer': goblin_slayer,
        'Isaac Newton': isaac_newton
    };
    if (!adventurers[name]) return <div className='error'>Error with name</div>;
    return <img src={adventurers[name]}  alt='hero' className='adv-img' />;
    // if (name === 'Hercules') return <img src={hercules} alt='hero' className='adv-img' />;
    // if (name === 'Goblin Slayer') return <img src={goblin_slayer} alt='hero' className='adv-img' />;
    // if (name === 'Isaac Newton') return <img src={isaac_newton} alt='hero' className='adv-img' />;
    // return <div className='error'>Error with name</div>;
};