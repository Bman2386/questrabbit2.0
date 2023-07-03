import React from 'react';
import { Link } from 'react-router-dom';
import formphoto from '../../images/formphoto.jpg';
import './inter_form.css';

// this page lets users choose between creating a new account or logging in with credentials they already have
function Intermediary(){
    return (
        <div className="session-form">
            <img src={formphoto} alt='background-meeting' className="form-photo"/>
            <form className="inter-form" id="form1">
                <Link to='/' className="btn-logo">questrabbit</Link>
                <Link className="btn-1" to="/signup">Sign Up</Link>
                <Link className="btn-2" to="/login">Log In</Link>
            </form>
        </div>
    );
};

export default Intermediary;