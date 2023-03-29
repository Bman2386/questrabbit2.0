import csrfFetch from './csrf';

const RECEIVE_REVIEW = 'reviews/recieveReview';

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

export const fetchReview = (adventurerId) => async dispatch => {
    const response = await csrfFetch(`api/reviews/${adventurerId}`);
    if (response.ok){
        const data = await response.json();
        dispatch(receiveReview(data));
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
        case RECEIVE_REVIEW:
            return Object.assign({}, action.review);
        default:
            return state;
    };
};

export default reviewsReducer;