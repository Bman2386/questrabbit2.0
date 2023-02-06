import {getCategories, getCategory} from '../utils/category'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY'

const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
})

const receiveCategory = categoryId => ({
    type: RECEIVE_CATEGORY,
    categoryId
})

export const fetchCategories = () => dispatch => {
    return (
       getCategories()
    .then((categories) => dispatch(receiveCategories(categories)))
    )
}

export const fetchCategory = categoryId => dispatch (
    getCategory(categoryId)
    .then(categoryId => dispatch(receiveCategory(categoryId)))
)