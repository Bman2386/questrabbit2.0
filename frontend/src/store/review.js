import csrfFetch from './csrf';

const RECEIVE_REVIEWS = 'reviews/recieveReviews';

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

export const fetchReviews = (adventurerId) => async dispatch => {
    const response = await csrfFetch(`api/reviews/${adventurerId}`);
    if (response.ok){
        const data = await response.json();
        dispatch(receiveReviews(data));
    } else {
        throw response;
    };
};

export const createReview = (review) => async dispatch => {
    const response = await csrfFetch(`api/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(review)
    });
    if (response.ok){
        const data = await response.json();
        dispatch(receiveReview(data));
    } else {
        throw response;
    };
};

const initialState = {};

const reviewsReducer = (state=initialState, action) => {
    switch (action.type) {
        case RECEIVE_REVIEWS:
            return Object.assign({}, action.reviews);
        default:
            return state;
    };
};

export default reviewsReducer;