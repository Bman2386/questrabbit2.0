import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import {recieveData} from '../../store/temp';
import { useDispatch } from 'react-redux';
import hero from '../../images/hero.jpg';
import star from '../../images/star.png';
import play from '../../images/play.png';
import apple from '../../images/apple.png';

const Home = () => {
  const dispatch = useDispatch();
  //clicked is a state that we use to determine if we should expand quest types to the user
  const [clicked, setClicked] = useState('');
  // name is the name of the quest that will be passed to the createQuest component via redux
  const name = useRef('');

const setData = () => {
  dispatch(recieveData({nameOfQuest: name.current.value}));
};

const stars = <img src={star} alt='star'className='star2'/>;

const lastButton = () => {
  return (
    <Link className='btn-4' to="/categories"
    onClick={()=> dispatch(recieveData({goTo: 4}))}>Slay</Link>
  );
};
  return (
  <div className="home">
    <div className="hero-img-frame">
      <img className="hero-image" src={hero} alt='map'/>
      <form className="splash-form" id="form1">
        <h1>Help when you need it, at your fingertips</h1>
        <p>Get help from hundreds of trusted adventurers for everything from errands to slaying a dragon.</p>
        <div className="bar">
          <input 
            type="text"
            placeholder="I need help with..."
            className="hero-search-bar"
            ref={name}/>
            <Link to="/quest" className="button" onClick={()=>setData()}>Get help today</Link>
        </div> 
        <div className='links'>
          <Link className='btn-4' to="/categories" 
          onClick={()=> dispatch(recieveData({goTo: 1}))}>Fetch</Link>
          <Link className='btn-4' to="/categories"
         onClick={()=> dispatch(recieveData({goTo: 2}))}>Craft</Link>
          <Link className='btn-4' to="/categories"
          onClick={()=> dispatch(recieveData({goTo: 3}))}>Escort</Link>
        {clicked ? lastButton() : <button className='btn-3' onClick={() =>setClicked('true')}>See more...</button>}
        </div>
      </form>
    </div> 
    <div className='underdog'>
      <div className='underdog'>{stars}{stars}{stars}{stars}<img src={star} className='star2' alt='star' id='margin-right'/> 1.1+ Million Reviews</div>
      <div className='underdog'>
        <div className='ikea-logo'> 
        <div className='ikea'>IKEA</div>
        </div> 
      Partnered with IKEA
      </div>
      <div className='store'> 
        <img src={apple} alt='apple logo' id='apple'></img>
        <div className='fake-logo'>
          <div className='small'>Available in the</div> Magic Store
        </div>
      </div>
      <div className='store'>
        <img src={play} alt='google logo' className='go'/>
        <div className='fake-logo'>
           <div className='small'>GET IT ON</div>
           Floogle Play
        </div>
      </div>
    </div>
  </div>
    );
};

export default Home;