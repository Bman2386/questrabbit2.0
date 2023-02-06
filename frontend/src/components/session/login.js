import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Login = ({errors, login, clearErrors })=> {
  
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  
    useEffect(()=>{
      clearErrors();
    }, [username, password])
 
  const renderErrors=()=> {
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

  

  const handleSubmit=(e)=> { 
    if (e) e.preventDefault();
    const user = {username, password}
      login(user)
  }

    const loginGuest=()=> {
    const guest = {
      username: 'Guest',
      password: 'hunter12'
      };
        login(guest);
    }
  
    const logo = window.logo;
    const formPhoto = window.formPhoto;
    return (
      <div className="session-form">
       <img src={formPhoto} className="form-photo"/>
        <form className='inter-form'>
          <Link to='/'>
          <img src={logo} className="logo"/>
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
            onChange={e=>setPassword(e.target.value)}
            placeholder="Password"
          />
           <button onClick={handleSubmit}>Log in</button>
            <Link
            to="/"
            onClick={loginGuest}
            className="login-guest" >
            Demo as Guest
          </Link>
          
      </form>
      </div>
    );
  };


export default Login;
