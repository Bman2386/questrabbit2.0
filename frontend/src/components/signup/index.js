import React, { useState } from 'react';
import {signin} from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import QuestRabbit from '../../images/QuestRabbit.jpg';
import formphoto from '../../images/formphoto.jpg';

function Signup(){
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
   const [loggingIn, setLoggingIn] = useState(false);
  const adventurer = false;
  const avg_rating = 0;
  const total_ratings = 0;
  const elite = false;
  const pitch = null;
  const [family_crest, setFamilyCrest] = useState('');
  const [realm, setRealm] = useState('');
  const [star_sign, setStarSign] = useState(''); 
  const temp = useSelector(state => state.temp ? state.temp : '');

  if (currentUser && (temp.categoryId || temp.nameOfQuest)) return <Redirect to='/quest' />;
  if (currentUser) return <Redirect to='/' />;

   const renderErrors=()=> {
    if (errors.length === 0) return '';
      return(
        <ul>
          {errors.map((error, i) => (
            <li key={`error-${i}`} className="error">
              {error}
              </li>
          ))}
        </ul>
      );
    };

  const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setErrors([]);
      setLoggingIn(true);
      const user = {
        username: username, password:password, adventurer: adventurer,
        avg_rating: avg_rating, total_ratings: total_ratings,
        elite: elite, pitch: pitch, 
        family_crest: family_crest, realm: realm, star_sign: star_sign
      };
    return dispatch(signin(user))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
        setLoggingIn(false);
      });
      };
        return (
            <div className="session-form">
             <img src={formphoto} className="form-photo" />
        <form className='inter-form'>
        <Link to='/'>
          <img src={QuestRabbit} className="logo"/>
        </Link>
        {renderErrors()}
            <input
              value={username}
              onChange={e => setUserName(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="Password"
            />
            <input 
            value={family_crest}
            onChange={e=> setFamilyCrest(e.target.value)}
            placeholder="Family Crest ex, Smith "
            />
            <input 
            value={realm}
            onChange={e => setRealm(e.target.value)}
            placeholder="Realm ex, Earth"
            />
            <input 
            value={star_sign}
            onChange={e => setStarSign(e.target.value)}
            placeholder="Star Sign ex, Libra"
            />
            {loggingIn ? <div>Logging In...</div> : 
            <button onClick={handleSubmit}>Create Account</button>
            }
        </form>
      </div>
        );
};

export default Signup;