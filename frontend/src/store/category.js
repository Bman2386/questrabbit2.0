import csrfFetch from './csrf';

const RECEIVE_CATEGORIES = 'categories/receiveCategories';

const receiveCategories = (data) => ({
    type: RECEIVE_CATEGORIES,
    categories: data
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

const initialState = {};

const categoriesReducer = (state=initialState, action) => {
    switch(action.type){
        case RECEIVE_CATEGORIES:
            return action.categories
        default:
            return state;
    };
};

export default categoriesReducer;