import { Link } from 'react-router-dom';
import React from 'react';

const Quests = ({categories}) => {

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
            category={category}
            to={`/categories/${category.id}`}
          >{category.category_name}</Link>
        )}
      </li>  
    </ul>   
    );
};

export default Quests


