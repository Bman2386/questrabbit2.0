import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";  
import { recieveData, clearData } from '../../store/temp';
import slay from '../../images/slay.jpg';
import craft from '../../images/craft.jpg';
import escort from '../../images/escort.jpg';
import ftch from '../../images/ftch.jpg';
import { fetchCategories } from '../../store/category';

// dynamicly displays data for each category of quest
function Category(){ 
    const dispatch = useDispatch();
    // grabs all categories from backend
    const categories = useSelector(state => Object.values(state.categories) ?? []); 
    // we need to default to 1, incase user types /categories in url
    const categoryId = useSelector(state => state.temp && state.temp.goTo ? state.temp.goTo : 1); 
    // grabs current category
    const category = categories[categoryId - 1];

    if (!category) { // if category is null we know categories didn't get fetched
        dispatch(fetchCategories());
        return '';
    };
    // based on the number pased, render the image for the category
    const dynamicImage = (id) => {
        if (id === 1) return <img alt='fetch' className="show-image" src={ftch} />
        if (id === 2) return <img alt='craft' className="show-image" src={craft} />
        if (id === 3) return <img alt='escort' className="show-image" src={escort} />
        if (id === 4) return <img alt='slay' className="show-image" src={slay} />
    };
    //based on number passed, clear data in redux state and add the categoryId to redux state
    //this data will be used when creating a quest 
    const cleanData=(id)=> {
        dispatch(clearData());
        dispatch(recieveData({categoryId: `${id}`}));
    };

    return (    
        <div className="show-container">
            {dynamicImage(categoryId)}
            <div className='show-block'>
                <h1 className="show-h1">Category Name: {category.categoryName}</h1>
                <p className="show-p">Example Description: {category.exDescription}</p>
                <Link 
                    to='/quest'
                    className='show-button' 
                    onClick={() => cleanData(category.id)}>Book a Quest in this Category
                </Link>
            </div>
        </div> 
    );
};        

export default Category;