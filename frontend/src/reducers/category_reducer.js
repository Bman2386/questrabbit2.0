import {
    RECEIVE_CATEGORIES,
    RECEIVE_CATEGORY
} from '../actions/category'

const categoryReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            const categories = {};
            action.categories.forEach(category => {
                categories[category.id] = category;
            });
        return categories
        case RECEIVE_CATEGORY:
        return Object.assign({}, {[action.category]: action.category});
        default:
        return state;
    }
}

export default categoryReducer