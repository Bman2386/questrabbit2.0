import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";  
import { recieveData, clearData } from '../../store/temp';
import slay from '../../images/slay.jpg';
import craft from '../../images/craft.jpg';
import escort from '../../images/escort.jpg';
import ftch from '../../images/ftch.jpg';
import { fetchCategories } from '../../store/category';
import './category_show.css';


function Category(){ 
    const dispatch = useDispatch();
    const categories = useSelector(state => Object.values(state.categories) ?? []); 
    // we need to default to 1, incase user types /categories in url
    const categoryId = useSelector(state => state.temp && state.temp.goTo ? state.temp.goTo : 1); 
    const category = categories[categoryId - 1];

    if (!category) { // if category is null we know categories didn't get fetched
        dispatch(fetchCategories());
        return '';
    };

    const categoryImage = (id) => {
        const imageInfoAray = [
            {name: 'fetch',
            image: ftch},
            {name: 'craft',
            image: craft},
            {name: 'escort',
            image: escort},
            {name: 'slay',
            image: slay}
        ];
        return <img alt={imageInfoAray[id - 1].name} className='show-image' src={imageInfoAray[id - 1].image}/>
    };
    
    const saveCategoryId=(id)=> {
        dispatch(clearData());
        dispatch(recieveData({categoryId: `${id}`}));
    };

    return (    
        <div className="show-container">
            {categoryImage(categoryId)}
            <div className='show-block'>
                <h1 className="show-h1">Category Name: {category.categoryName}</h1>
                <p className="show-p">Example Description: {category.exDescription}</p>
                <Link 
                    to='/quest'
                    className='show-button' 
                    onClick={() => saveCategoryId(category.id)}>Book a Quest in this Category
                </Link>
            </div>
        </div> 
    );
};        

export default Category;