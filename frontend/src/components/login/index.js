import React, {useState} from 'react';
import {login} from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RenderErrors } from '../../utils/error';
import {Loading} from '../../utils/loading';
import formphoto from '../../images/formphoto.jpg';

function Login() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const currentUser = useSelector(state => state.session.user);
  const temp = useSelector(state => state.temp ?? '');

    // these redirects are for instances where user wants to create a quest instead of going directly to splash
  if (currentUser && (temp.categoryId || temp.nameOfQuest) ) return <Redirect to='/quest'/>
  if (currentUser) return <Redirect to='/' />;
  
   const errorHandle = (error) => {
    const previousErrors = [...errors];
    previousErrors.push(error);
    setLoggingIn(false);
    setErrors(previousErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setErrors([]);
    setLoggingIn(true);
    return dispatch(login({ username, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) errorHandle(data.errors);
        else if (data) errorHandle([data]);
        else errorHandle([res.statusText]);
      });
  };

    const loginGuest=(e)=> {
      e.preventDefault();
      e.stopPropagation();
      const guest = {
      username: 'Guest',
      password: 'hunter12'
      };
      setUserName(guest.username);
      setPassword(guest.password);
      setLoggingIn(true);
        return dispatch(login(guest));
    };

    return (
      <div className="session-form">
        {loggingIn ? <Loading modal={true} />: ''}
       <img src={formphoto} alt='backgroungd-meeting' className="form-photo"/>
        <form className='inter-form'>
          <Link to='/' className="btn-logo">
            questrabbit
          </Link>
          <RenderErrors errors={errors} />
          <input
            type="text"
            value={username}
            onChange={e=>setUserName(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder="Password"
          />
          {loggingIn ? <div>Logging In...</div> : <button onClick={handleSubmit}>Log in</button>}
          {loggingIn ? '':  
          <button to="/" onClick={loginGuest} className="login-guest" >Demo as Guest</button>} 
      </form>
      </div>
    );
  };


export default Login;
