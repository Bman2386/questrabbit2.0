import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { updateUser } from '../../store/session';
import { InputField } from "./input";

export function EditMenu({ crest, rlm, sign, setEdit, name, currentUser}){
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [editItem, setEditItem] = useState('');
    const [username, setUserName] = useState(name)
    const [familyCrest, setFamilyCrest] = useState(crest); 
    const [realm, setRealm] = useState(rlm);
    const [starSign, setStarSign] = useState(sign);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (name === 'Guest') { // We don't want Guest users to edit information here
            setError("You don't have permission to edit Guest User info");
            return;
        };
        dispatch(updateUser({
            id: currentUser.id,
            username: username,
            family_crest: familyCrest,
            realm: realm,
            star_sign: starSign
        }));
        setEdit(false);
    };

    return(
        <div className="quest-form">
            <div className='box'>
                <div className='width'>
                    <h1 className='h1'>Update Account</h1>
                    <hr className='hr' />
                    <div className='edit-user'>
                        <div className='error'>{`${error}`}</div>
                        <label className="p2">Username: {username}</label>
                        {editItem === 'username'? <InputField setItem={setUserName} item={username}/>:
                        <button className="btn-3" onClick={()=> setEditItem('username')}>Change Username</button>}
                        <label className='p2'>Family Crest: {familyCrest}</label>
                        {editItem === 'Family Crest' ? <InputField setItem ={setFamilyCrest} item={familyCrest}/> : 
                        <button className='btn-3' onClick={()=> setEditItem('Family Crest')}>Change Family Crest</button>}
                        <label className='p2'>Realm: {realm}</label>
                        {editItem === 'Realm' ? <InputField setItem={setRealm} item={realm}/> : 
                            <button className='btn-3' onClick={()=> setEditItem('Realm')}>Change Realm</button>}
                        <label className='p2'>Star Sign: {starSign}</label>
                        {editItem === 'Star Sign' ? <InputField setItem={setStarSign} item={starSign}/>:
                            <button className='btn-3' onClick={()=>setEditItem('Star Sign')}>Change Star Sign</button>}
                    </div>
                    <div className='buttons'>
                        <button className='btn-5' onClick={() => setEdit(false)}>Cancel</button>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )};