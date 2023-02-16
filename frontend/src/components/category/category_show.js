import React, { useEffect, useLocation } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";  
import { fetchCategories } from '../../store/category';

function Category(){
    const dispatch = useDispatch();
    const location = useLocation();
    const categories = useSelector(state => state.categories ? Object.values(state.categories) : []);
    const categoryId = location.pathname

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);

    if (!categories) return '';
    if (!categoryId) return (
        <> Oops, categoryId didn't pass through</>
    )

    const imageLogic = (id) => {
        const slay = window.slay
        const craft = window.craft
        const escort = window.escort
        const ftch = window.ftch
        //ftch = fetch, but couldn't be named 'fetch' as it is a keyword
        switch (id) {
            case "2":
            return craft;
            case "3": 
            return escort;
            case "4":
            return slay;
            default:
            return ftch;
        }
    }

   const handleSubmit = (category)=> {
         //saves category in redux state to be accessed by questForm Component
    }
    // const { categories } = this.props
    // const categoryId = this.props.match.params.categoryId //renders image and text dynamicly by category passed in from props
    const dynamicImage = (
        categories && categories.length > 1 && categoryId > 1 ? this.imageLogic(categoryId) : window.ftch
    )
    const category = categories[categoryId - 1]
            
    return (    
        <div className="show-container">
            <img className="show-image" src={dynamicImage}/>
                    {
                        categories && categories.length > 1 ? 
                        <div className='show-block'>
                            <h1 className="show-h1">Category Name: {category.category_name}</h1>
                            <p className="show-p">Example Description: {category.ex_description}</p>
                            <Link 
                            to='/quest'
                            className='show-button'onClick = {() => this.handleSubmit(category)}>Book a Quest in this Category</Link>
                        </div> :  ''
                    }  
        </div> 
                )
}         

export default Category