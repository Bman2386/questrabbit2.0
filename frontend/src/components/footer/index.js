import React from 'react';
import linkedin from '../../images/linkedin.jpg';
import GitHub from '../../images/GitHub.png';

function Footer() {
        return (
            <div className="footer">
                <a target="_blank" 
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/brendonbiagi/" 
                    className='a'><img src={linkedin} alt='linkedin logo'className="linked"/>
                </a>
                <a target="_blank" 
                    rel="noreferrer"
                    href="https://github.com/Bman2386" 
                    className='a'><img src={GitHub} alt='github logo'className="linked2"/>
                </a>
                <a target="_blank" 
                    rel="noreferrer"
                    href="https://bman2386.github.io/Brendon.Biagi/" 
                    className="creator">By Brendon Biagi</a>
            </div>
        );
    };

export default Footer;