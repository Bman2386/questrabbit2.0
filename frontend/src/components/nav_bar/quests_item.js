import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { recieveData } from '../../store/temp';

const Quests = ({categories}) => {
  const dispatch = useDispatch();

  return (
    <ul className='dd-container'
      style={{ position: 'relative'}}> 
      Quest Types
      <li className='container'>
        POPULAR QUESTS
        {categories.map(category =>
          <Link
            className="btn"
            key={category.id}
            to={`/categories`}
            onClick={()=> dispatch(recieveData({category: {categoryId: category.id}}))}
          >{category.categoryName}</Link>
        )}
      </li>  
    </ul>   
    );
};

export default Quests


