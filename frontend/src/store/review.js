import csrfFetch from './csrf'

const RECEIVE_REVIEWS = 'reviews/recieveReviews';
const RECEIVE_REVIEW = 'reviews/recieveReview';

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

export const fetchReviews = () => async dispatch => {
    const response = await csrfFetch('api/reviews');
    if (response.ok){
        const data = await response.json();
        dispatch(receiveReviews(data));
    } else {
        throw response;
    };
};

export const fetchReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`api/reviews/${reviewId}`);
    if (response.ok){
        const data = await response.json();
        dispatch(receiveReview(data.review));
    } else {
        throw response;
    };
};

export const createReview = (review) => async dispatch => {
    const response = await csrfFetch(`api/users/${review.user_id}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(review)
    });
    if (response.ok){
        const data = await response.json();
        dispatch(receiveReview(data.review));
    } else {
        throw response;
    };
};

const initialState = {};

const reviewsReducer = (state=initialState, action) => {
    switch (action.type) {
        case RECEIVE_REVIEWS:
            return Object.assign({}, state, action.reviews);
        case RECEIVE_REVIEW:
            return Object.assign({}, state, action.review);
        default:
            return state;
    };
};

export default reviewsReducer;