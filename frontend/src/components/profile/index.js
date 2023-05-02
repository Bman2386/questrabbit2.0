import React, {useState} from 'react';
import {  Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {clearData} from '../../store/temp';
import { logout } from '../../store/session'
import { EditMenu } from './edit';
import map from '../../images/map.png';
import shield from '../../images/shield.png';
import user from '../../images/user.png';
import './profile.css';

function ProfileComponent(){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    // user attributes
    const name = useSelector(state => state.session.user ? state.session.user.username : '' );
    const crest = useSelector(state => state.session.user ? state.session.user.familyCrest : '');
    const rlm = useSelector(state => state.session.user ? state.session.user.realm : '');
    const sign = useSelector(state => state.session.user ? state.session.user.starSign : '');

    const [edit, setEdit] = useState(false);

    if (!currentUser) return <Redirect to='/' />   


    const logoutUser = () => {
        dispatch(clearData());
        dispatch(logout());
    };

        if (edit){
            return (  // If user wants to edit - show edit menu
                <EditMenu 
                name={name}
                crest={crest}
                rlm={rlm}
                sign={sign}
                currentUser={currentUser}
                setEdit={setEdit}
                />
            );
            };
        return (
            <div className="quest-form">
                <div className='box'> 
                    <div className='width'>
                        <div className='row'>
                            <h1 className='h1'>Account</h1>
                            <button className='btn-6' id='right' onClick={() => setEdit(true)}>Edit</button>
                        </div>
                        <hr className='hr' />
                        <div className='p3'>
                            <img src={user} alt='user icon' className='icon1'></img>   Username: {`${name}`}
                        </div>
                        <div className='p3'>
                            <img src={shield} alt='crest icon' className='icon1' />   Family Crest: {`${crest}`}
                        </div>
                        <div className='p3'>
                            <img src={map} alt='map icon' className='icon1' />   Realm: {`${rlm}`}
                        </div>
                        <div className='p4'>
                            <div className='icon'>&#x2638;</div>   Star Sign: {`${sign}`}
                        </div>
                        <br />
                        <div className='row'>
                            <button onClick={() => logoutUser()} className='btn-5' to='/' id='margin'>Logout</button>
                        </div>
                    </div> 
                </div>
            </div>
        );
};

export default ProfileComponent