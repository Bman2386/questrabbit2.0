import {
    RECEIVE_REVIEWS,
    RECEIVE_REVIEW
} from '../actions/review'

const ReviewReducer = (oldState = {}, action) => {
    Object.freeze(oldState)

    switch (action.type) {
        case RECEIVE_REVIEWS:
        return Object.assign({}, oldState, action.reviews);
        case RECEIVE_REVIEW:    
        return Object.assign({}, oldState, action.review)
        default:
        return oldState;
    }
}

export default ReviewReducer;