import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {recieveData} from '../../store/temp';
import { useDispatch } from 'react-redux';
import hero from '../../images/hero.jpg';
import star from '../../images/star.png';
import play from '../../images/play.png';

const Home = () => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState('');
  const [name, setName] = useState('');

const setData = () => {
  const nameOfQuest = {
    name: name
  };
  dispatch(recieveData(nameOfQuest));
};

const stars = <img src={star} className='star2'/>;

const lastButton = () => {
  return (
    <Link className='btn-4' to="/categories/4">Slay</Link>
  );
};
  return (
  <div className="home">
    <div className="hero-img-frame">
      <img className="hero-image" src={hero} />
      <form className="splash-form" id="form1">
        <h1>Help when you need it, at your fingertips</h1>
        <p>Get help from hundreds of trusted adventurers for everything from errands to slaying a dragon.</p>
        <div className="bar">
          <input 
            type="text"
            placeholder="I need help with..."
            className="hero-search-bar"
            value={name}
            onChange={e=> setName(e.target.value)}/>
            <Link to="/quest" className="button" onClick={()=>setData()}>Get help today</Link>
        </div> 
        <div className='links'>
          <Link className='btn-4' to="/categories/1">Fetch</Link>
          <Link className='btn-4' to="/categories/2">Craft</Link>
          <Link className='btn-4' to="/categories/3">Escort</Link>
        {clicked ? lastButton() : <button className='btn-3' onClick={() =>setClicked('true')}>See more...</button>}
        </div>
      </form>
    </div> 
    <div className='underdog'>
      <div className='underdog'>{stars}{stars}{stars}{stars}<img src={star} className='star2' id='margin-right'/> 1.1+ Million Reviews</div>
      <div className='underdog'>
        <div className='ikea-logo'> 
        <div className='ikea'>IKEA</div>
        </div> 
      Partnered with IKEA
      </div>
      <div className='store'> 
        <i className='fab fa-apple' id='apple'></i>
        <div className='fake-logo'>
          <div className='small'>Available in the</div> Magic Store
        </div>
      </div>
      <div className='store'>
        <img src={play} className='go'/>
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