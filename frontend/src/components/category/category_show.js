import React from 'react';
import { Link } from 'react-router-dom';

class Category extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.fetchCategories();
    }

    imageLogic(id) {
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

    handleSubmit(category){
        this.props.saveData(category); //saves category in redux state to be accessed by questForm Component
    }
    
    render() {
        const {categories} = this.props
        const categoryId = this.props.match.params.categoryId //renders image and text dynamicly by category passed in from props
        const dynamicImage = (
           categories && categories.length > 1 && categoryId > 1? this.imageLogic(categoryId) : window.ftch
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
}

export default Category