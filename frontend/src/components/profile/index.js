import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchAdventurer, updateAdventurer } from '../../store/adventurer';
import { logout } from '../../store/session'

function ProfileComponent(){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [familyCrest, setFamilyCrest] = useState('');
    const [realm, setRealm] = useState('');
    const [starSign, setStarSign] = useState('');

    if (!currentUser) return <Redirect to='/' />


    useEffect(() => {
        dispatch(fetchAdventurer(currentUser.id))
    }, [dispatch])

    if (!username || !familyCrest || !realm || !starSign){ 
        // displaying current values to user, so they can make informed changes
        const name = useSelector(state => state.adventurers.username);
        setUsername(name);
        const crest = useSelector(state => state.adventurers.family_crest);
        setFamilyCrest(crest);
        const rlm = useSelector(state => state.adventurers.realm);
        setRealm(rlm);
        const sign = useSelector(state => state.adventurers.star_sign);
        setStarSign(sign);
    }
   
    const handleSubmit =() => {
        const user ={
            id: currentUser.id,
            username: username,
            family_crest: familyCrest,
            realm: realm,
            star_sign: starSign
        };

        if (!user || !familyCrest || !realm || !starSign){
             setError("Form must be complete");
             return;
        } 
        if (username === 'Guest') { // We don't want Guest users to edit information here
            setError("You don't have permission to edit Guest User info");
            return;
        } 
        dispatch(updateAdventurer(user));      
        setError('');
    }

  const formHandle = () => {
        const user = window.user;
        const shield = window.shield;
        const map = window.map;
        if (!edit){
            return ( //If user doesn't want to edit account show page
                <div className='width'>
                   <div className='row'>
                    <h1 className='h1'>Account</h1>
                    <button className='btn-6' id='right' onClick={setEdit(true)}>Edit</button>
                   </div>
                 <hr className='hr'/>
                <div className='p3'>
                   <img src={user} className='icon1'></img>   Username: {`${username}`}  
                </div>
                <div className='p3'>
                    <img src={shield} className='icon1'/>   Family Crest: {`${familyCrest}`}
                </div>
                <div className='p3'>
                    <img src={map} className='icon1'/>   Realm: {`${realm}`}
                </div>
                <div className='p4'>
                    <div className='icon'>&#x2638;</div>   Star Sign: {`${starSign}`}
                </div>
                <br/>
                <div className='row'>
                    <Link onClick={logout} className='btn-5' to='/' id='margin'>Logout</Link>
                </div>
            </div> 
            );
        };    
         return (  // If user wants to edit - show edit menu
                <div className='width'>
                    <h1 className='h1'>Update Account</h1>
                    <hr className='hr'/>
                    <div className='edit-user'>
                        <div className='error'>{`${error}`}</div>
                    <label className='p2'>Username: </label>
                    <input 
                    type="text" 
                    value={username}
                    onChange={() => setUsername(e.target.value)}
                    className='input3'
                    placeholder={`${username}`}/>
                   <div className='red'>{username ? '' : "username can't be blank" }</div>
                    <label className='p2'>Family Crest:</label>
                    <input 
                    type="text" 
                    value={familyCrest}
                    onChange={()=>setFamilyCrest(e.target.value)}
                    className='input3'
                    placeholder={`${familyCrest}`}/>
                    <div className='red'>{familyCrest ? '' : "Family Crest can't be blank" }</div>
                    <label className='p2'>Realm: </label>
                    <input 
                    type="text" 
                    value={realm}
                    onChange={()=> setRealm(e.target.value)}
                    className='input3'
                    placeholder={`${realm}`}/>
                   <div className='red'>{realm ? '' : "Realm can't be blank" }</div>
                    <label className='p2'>Star Sign:</label>
                    <input 
                    type="text" 
                    value={starSign}
                    onChange={()=>setStarSign(e.target.value)}
                    className='input3'
                    placeholder={`${starSign}`}/>
                    <div className='red'>{starSign ? '' : "Star Sign can't be blank" }</div>
                     </div>
                    <div className='buttons'>   
                        <button className='btn-5' onClick={() => setEdit(false)}>Cancel</button>
                        <button onClick={() => handleSubmit()}>Submit</button>
                    </div>
                </div>
            );
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