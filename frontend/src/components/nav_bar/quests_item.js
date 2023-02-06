import { Link } from 'react-router-dom';
import React from 'react'

const Quests = ({categories}) => {

  const questButtonDisplay = (
    <div className='container'>
       POPULAR QUESTS
        {categories.map(category => 
          <Link 
          className="btn"
          key={category.id}
          category={category}
          to={`/categories/${category.id}`}
            >{category.category_name}</Link>       
                )} 
    </div>    
  )
  return (
    <ul className='dd-container'
      style={{ position: 'relative'}}
      > 
      Quest Types
        { questButtonDisplay }
      </ul>   
    )
      }

export default Quests


