import csrfFetch from './csrf';

const RECEIVE_CATEGORIES = 'categories/receiveCategories';
const RECEIVE_CATEGORY = 'categories/receiveCategory';

const receiveCategories = (data) => ({
    type: RECEIVE_CATEGORIES,
    categories: data
});

const receiveCategory = categoryId => ({
    type: RECEIVE_CATEGORY,
    payload: categoryId
});

export const fetchCategories = () => async dispatch => {
    const response = await csrfFetch("api/categories");
    if (response.ok){
        const data = await response.json();
        dispatch(receiveCategories(data));
    } else {
        throw response;
    };
};

export const fetchCategory = (categoryId) => async dispatch => {
    const response = await csrfFetch(`api/categories/${categoryId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveCategory(data));
    } else {
        throw response;
    };
}

const initialState = {};

const categoriesReducer = (state=initialState, action) => {
    switch(action.type){
        case RECEIVE_CATEGORIES:
            return action.categories
        case RECEIVE_CATEGORY:
            return Object.assign({}, { [action.category]: action.category });
        default:
            return state;
    };
};

export default categoriesReducer;