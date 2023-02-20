import React from 'react';
import { Link } from 'react-router-dom';
import QuestRabbit from '../../images/QuestRabbit.jpg';
import formphoto from '../../images/formphoto.jpg';

function Intermediary(){
    return (
        <div className="session-form">
            <img src={formphoto} className="form-photo"/>
            <form className="inter-form" id="form1">
                <Link to='/'>
                    <img src={QuestRabbit} className="logo"/>
                </Link>
                <Link className="btn-1" to="/signup">Sign Up</Link>
                <Link className="btn-2" to="/login">Log In</Link>
            </form>
        </div>
    );
};

export default Intermediary;