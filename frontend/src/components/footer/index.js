import React from 'react';
import linkedin from '../../images/linkedin.jpg';
import GitHub from '../../images/GitHub.png';

function Footer() {
        return (
            <div className="footer">
                <a target="_blank" href="https://www.linkedin.com/in/brendonbiagi/" className='a'><img src={linkedin} className="linked"/></a>
                <a target="_blank" href="https://github.com/Bman2386" className='a'><img src={GitHub} className="linked2"/></a>
                <a target="_blank" href="https://bman2386.github.io/Brendon.Biagi/" className="creator">By Brendon Biagi</a>
            </div>
        );
    };

export default Footer;