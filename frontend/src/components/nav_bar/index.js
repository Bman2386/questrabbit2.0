import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from '../../store/category';
import { Link } from 'react-router-dom';
import Quests from './quests_item';


function NavBar(){

  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories ? Object.values(state.categories) : []);
  const currentUser = useSelector(state => state.session.user ? state.session.user : '');

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch]);

  const categoryDisplay =()=> {
    if (!!categories) {
      return (
        <Quests categories={categories} />
      );
    } 
      return '';
  };
  
  const logo = window.logo;

  const display =()=> {
    if (!!currentUser) {
      return (
        <div className="nav-bar">
          <Link to='/'>
            <img src={logo} className="logo" />
          </Link>
          {categoryDisplay()}
          <Link to='/quest'>Book a Quest</Link>
          <Link to='/quests'>My Quests</Link>
          <Link to='/user'>Account</Link>
        </div>
      );
    };  
    return (
          <div className="nav-bar">
            <Link to='/'>
              <img src={logo} className="logo"/>
            </Link>
            {categoryDisplay()}
            <Link className="btn" to="/intermediary">Log in</Link>
          </div>
        );
  };
    return (
      <div>
        {display()}
      </div>
    );
  };

export default NavBar