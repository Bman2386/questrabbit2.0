import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    const logo = window.logo;
    const formPhoto = window.formPhoto;


    return (
        <div className="session-form">
            <img src={formPhoto} className="form-photo"/>
            <form className="inter-form" id="form1">
                <Link to='/'>
                    <img src={logo} className="logo"/>
                </Link>
                <Link className="btn-1" to="/signup">Sign Up</Link>
                <Link className="btn-2" to="/login">Log In</Link>
            </form>
        </div>
    )
}