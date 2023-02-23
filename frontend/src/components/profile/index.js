import React, {useState} from 'react';
import {  Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {  updateUser } from '../../store/session';
import { logout } from '../../store/session'
import map from '../../images/map.png';
import shield from '../../images/shield.png';
import user from '../../images/user.png';

function ProfileComponent(){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    // user attributes
    const name = useSelector(state => state.session.user ? state.session.user.username : '' );
    const crest = useSelector(state => state.session.user ? state.session.user.familyCrest : '');
    const rlm = useSelector(state => state.session.user ? state.session.user.realm : '');
    const sign = useSelector(state => state.session.user ? state.session.user.starSign : '');
    // for editing
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState('');
    const [familyCrest, setFamilyCrest] = useState('');
    const [realm, setRealm] = useState('');
    const [starSign, setStarSign] = useState('');

    if (!currentUser) return <Redirect to='/' />   

   const handleSubmit=(e)=>{
       e.preventDefault();
       e.stopPropagation();
        const user ={
            id: currentUser.id,
            username: name,
            family_crest: familyCrest,
            realm: realm,
            star_sign: starSign
        };
        if ( !familyCrest || !realm || !starSign){
             setError("Form must be complete");
             return;
        } 
        if (name === 'Guest') { // We don't want Guest users to edit information here
            setError("You don't have permission to edit Guest User info");
            return;
        }; 
        dispatch(updateUser(user));
        setEdit(false);
    };

    const logoutUser = () => {
        dispatch(logout())
    }

  const formHandle = () => {
        if (edit === false){
            return ( //If user doesn't want to edit account show page
                <div className='width'>
                   <div className='row'>
                    <h1 className='h1'>Account</h1>
                    <button className='btn-6' id='right' onClick={()=> setEdit(true)}>Edit</button>
                   </div>
                 <hr className='hr'/>
                <div className='p3'>
                   <img src={user} className='icon1'></img>   Username: {`${name}`}  
                </div>
                <div className='p3'>
                    <img src={shield} className='icon1'/>   Family Crest: {`${crest}`}
                </div>
                <div className='p3'>
                    <img src={map} className='icon1'/>   Realm: {`${rlm}`}
                </div>
                <div className='p4'>
                    <div className='icon'>&#x2638;</div>   Star Sign: {`${sign}`}
                </div>
                <br/>
                <div className='row'>
                    <button onClick={()=> logoutUser()} className='btn-5' to='/' id='margin'>Logout</button>
                </div>
            </div> 
            );
        } else {
            return (  // If user wants to edit - show edit menu
                <div className='width'>
                    <h1 className='h1'>Update Account</h1>
                    <hr className='hr'/>
                    <div className='edit-user'>
                        <div className='error'>{`${error}`}</div>
                    <label className='p2'>Family Crest:</label>
                    <input 
                    type="text" 
                    value={familyCrest}
                    onChange={e=>setFamilyCrest(e.target.value)}
                    className='input3'
                    placeholder={`${crest}`}/>
                    <div className='red'>{familyCrest ? '' : "Family Crest can't be blank" }</div>
                    <label className='p2'>Realm: </label>
                    <input 
                    type="text" 
                    value={realm}
                    onChange={e=> setRealm(e.target.value)}
                    className='input3'
                    placeholder={`${rlm}`}/>
                   <div className='red'>{realm ? '' : "Realm can't be blank" }</div>
                    <label className='p2'>Star Sign:</label>
                    <input 
                    type="text" 
                    value={starSign}
                    onChange={e=>setStarSign(e.target.value)}
                    className='input3'
                    placeholder={`${sign}`}/>
                    <div className='red'>{starSign ? '' : "Star Sign can't be blank" }</div>
                     </div>
                    <div className='buttons'>   
                        <button className='btn-5' onClick={() => setEdit(false)}>Cancel</button>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            );
            };
        };

        return (
            <div className="quest-form">
                <div className='box'> 
                    {formHandle()}
                </div>
            </div>
            
        )
}

export default ProfileComponent