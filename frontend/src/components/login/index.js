import React, {useState} from 'react';
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import QuestRabbit from '../../images/QuestRabbit.jpg';
import formphoto from '../../images/formphoto.jpg';

function Login() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [password, setpassword] = useState('');
  const [errors, setErrors] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const currentUser = useSelector(state => state.session.user);

  if (currentUser) return <Redirect to='/' />;
 
  const renderErrors=()=> {
    if (!errors) return '';
    return(
      <ul>
        {errors.map((error, i) => (
          <li 
          key={`error-${i}`}
          className="error"
          >
            {error}
          </li>
        ))}
      </ul>
    );
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setErrors([]);
    setLoggingIn(true);
    return dispatch(sessionActions.login({ username, password }))
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
  }

    const loginGuest=(e)=> {
      e.preventDefault();
      e.stopPropagation();
    const guest = {
      username: 'Guest',
      password: 'hunter12'
      };
      setUserName(guest.username);
      setpassword(guest.password);
      setLoggingIn(true);
        return dispatch(sessionActions.login(guest));
    }

    return (
      <div className="session-form">
       <img src={formphoto} className="form-photo"/>
        <form className='inter-form'>
          <Link to='/'>
          <img src={QuestRabbit} className="logo"/>
          </Link>
          {renderErrors()}
          <input
            type="text"
            value={username}
            onChange={e => setUserName(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={e=>setpassword(e.target.value)}
            placeholder="Password"
          />
          {loggingIn ? <div>Logging In</div> : <button onClick={handleSubmit}>Log in</button>}
          {loggingIn ? <div>Logging In</div>:  
          <button
            to="/"
            onClick={loginGuest}
            className="login-guest" >
            Demo as Guest
          </button>} 
      </form>
      </div>
    );
  };


export default Login;
