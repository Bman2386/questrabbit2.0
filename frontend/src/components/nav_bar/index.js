import React, {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from '../../store/category';
import { Link } from 'react-router-dom';
import Quests from './quests_item';
import './navbar.css';

function NavBar(){
  const dispatch = useDispatch();
  const categories = useSelector(state => Object.values(state.categories) ?? []);
  const currentUser = useSelector(state => state.session.user ?? '');

  const isCategoryFetched = useRef(false);
  if (categories.length > 0) isCategoryFetched.current = true;

  // use useEfect to grab categories and use isCategoryFetched to prevent unnecissary re-renders
  useEffect(() => {
    if (isCategoryFetched.current === false) {
      dispatch(fetchCategories());
      isCategoryFetched.current = true;
    }
      ;
  }, [dispatch]);
  
 
    if (currentUser) {
      return (
        <div className="nav-bar">
          <span>
            <Link className="btn" to='/'>
            questrabbit
          </Link>
          </span>
          <span>
           {categories.length > 0 ? <Quests categories={categories} />: ''}
          <Link to='/quest' className="btn">Book a Quest</Link>
          <Link to='/quests' className="btn">My Quests</Link>
          <Link to='/user' className="btn">Account</Link> 
          </span>
        </div>
      );
    };  
    return (
      <div className="nav-bar">
        <span>
          <Link className="btn" to='/'>
          questrabbit
        </Link>
        </span>
        <span>
          {categories ? <Quests categories={categories} /> : ''}
        <Link className="btn" to="/intermediary">Log in</Link>
        </span>
      </div>
    );
  };

export default NavBar;