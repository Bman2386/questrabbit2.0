import React, { useState } from 'react';
import {signin} from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import formphoto from '../../images/formphoto.jpg';
import { RenderErrors } from '../../utils/error';
import { Loading } from '../../utils/loading';

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

  // these redirects are for instances where user wants to create a quest instead of going directly to splash
  if (currentUser && (temp.categoryId || temp.nameOfQuest)) return <Redirect to='/quest' />;
  if (currentUser) return <Redirect to='/' />;


  const errorHandle = (error) => {
    const previousErrors = [...errors];
    previousErrors.push(error)
    setLoggingIn(false);
    setErrors(previousErrors);
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
        };
        if (data?.errors) errorHandle(data.errors);
        else if (data) errorHandle([data]);
        else errorHandle([res.statusText]);
       
      });
      };
        return (
            <div className="session-form">
            {loggingIn ? <Loading modal={true} /> : ''}
             <img src={formphoto} alt='background-meeting'className="form-photo" />
        <form className='inter-form'>
              <Link to='/' className="btn-logo">
                questrabbit
              </Link>
        <RenderErrors errors={errors} />
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
            <button onClick={handleSubmit}>Create Account</button>}
            <div>Logging In: {loggingIn}</div>
        </form>
      </div>
    );
};

export default Signup;