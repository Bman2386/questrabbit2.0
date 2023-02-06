import * as ReviewAPIUtil from '../utils/review';

export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEWS';

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
})

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
})

export const fetchReviews = () => dispatch => (
    ReviewAPIUtil.getReviews()
    .then(reviews => dispatch(receiveReviews(reviews)))
)

export const fetchReview = reviewId => dispatch => (
    ReviewAPIUtil.getReview(reviewId)
    .then(review => dispatch(receiveReview(review)))
)

export const createReview = review => dispatch => (
    ReviewAPIUtil.createReview(review)
    .then(review => dispatch(receiveReview(review)))
)