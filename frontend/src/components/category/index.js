import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";  
import { fetchCategories } from '../../store/category';
import { recieveData } from '../../store/temp';
import slay from '../../images/slay.jpg';
import craft from '../../images/craft.jpg';
import escort from '../../images/escort.jpg';
import ftch from '../../images/ftch.jpg';

function Category(){
    const dispatch = useDispatch();
    const location = useLocation();
    const categories = useSelector(state => state.categories ? Object.values(state.categories) : []);
    const locationPath = location.pathname;
    const length = locationPath.length - 1;
    const categoryId = parseInt(locationPath[length]); //grab the number from the location
    
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    
    if (!categoryId) return (
        <> Oops, categoryId didn't pass through</>
    );
 
    const category = categories[categoryId - 1]
    const dynamicImage = (id) => {
        if (id === 1) return <img className="show-image" src={ftch} />
        if (id === 2) return <img className="show-image" src={craft} />
        if (id === 3) return <img className="show-image" src={escort} />
        if (id === 4) return <img className="show-image" src={slay} />
    }
    
    return (    
        <div className="show-container">
            {dynamicImage(categoryId)}
                    {
                        categories && categories.length > 1 ? 
                        <div className='show-block'>
                            <h1 className="show-h1">Category Name: {category.categoryName}</h1>
                            <p className="show-p">Example Description: {category.exDescription}</p>
                            <Link 
                            to='/quest'
                            className='show-button' onClick={() => dispatch(recieveData({categoryId: `${category.id}`}))}>Book a Quest in this Category</Link>
                        </div> :  ''
                    }  
        </div> 
    );
};        

export default Category;