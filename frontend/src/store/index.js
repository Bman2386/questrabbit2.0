import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session'
import categoriesReducer from './category';
import questsReducer from './quest';
import adventurersReducer from './adventurer';
import reviewsReducer from './review';
//reducers need to go here


export const rootReducer = combineReducers({
    session: sessionReducer,
    categories: categoriesReducer,
    quests: questsReducer,
    adventurers: adventurersReducer,
    reviews: reviewsReducer
})


let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;