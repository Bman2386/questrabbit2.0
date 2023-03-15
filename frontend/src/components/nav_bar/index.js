import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from '../../store/category';
import { Link } from 'react-router-dom';
import Quests from './quests_item';
import QuestRabbit from '../../images/QuestRabbit.jpg';

function NavBar(){
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories ? Object.values(state.categories) : []);
  const currentUser = useSelector(state => state.session.user ? state.session.user : '');

  useEffect(() => {
    if (categories.length === 0){
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);
  
 
    if (currentUser) {
      return (
        <div className="nav-bar">
          <Link to='/'>
            <img src={QuestRabbit} alt='logo' className="logo" />
          </Link>
          {categories.length > 0 ? <Quests categories={categories} />: ''}
          <Link to='/quest'>Book a Quest</Link>
          <Link to='/quests'>My Quests</Link>
          <Link to='/user'>Account</Link>
        </div>
      );
    };  
    return (
      <div className="nav-bar">
        <Link to='/'>
          <img src={QuestRabbit} alt='logo' className="logo"/>
        </Link>
        {categories ? <Quests categories={categories} /> : ''}
        <Link className="btn" to="/intermediary">Log in</Link>
      </div>
    );
  };

export default NavBar;