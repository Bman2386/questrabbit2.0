import csrfFetch from './csrf';

const RECEIVE_CATEGORIES = 'categories/receiveCategories';
const RECEIVE_CATEGORY = 'categories/receiveCategory';

const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    payload: categories
});

const receiveCategory = categoryId => ({
    type: RECEIVE_CATEGORY,
    payload: categoryId
});

export const fetchCategories = () => async dispatch => {
    const response = await csrfFetch("api/categories");
    if (response.ok){
        const data = await response.json();
        dispatch(receiveCategories(data.categories));
    } else {
        console.log('error: unable to fetch categories');
    };
};

export const fetchCategory = (categoryId) => async dispatch => {
    const response = await csrfFetch(`api/categories/${categoryId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveCategory(data));
    } else {
        console.log('error: unable to fetch category');
    };
}

const initialState = {};

const categoriesReducer = (state=initialState, action) => {
    switch(action.type){
        case RECEIVE_CATEGORIES:
            const categories = {};
            action.categories.forEach(category => {
                categories[category.id] = category;
            });
            return categories
        case RECEIVE_CATEGORY:
            return Object.assign({}, { [action.category]: action.category });
        default:
            return state;
    };
};

export default categoriesReducer;