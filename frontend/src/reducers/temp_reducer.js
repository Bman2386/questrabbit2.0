import {RECEIVE_DATA} from '../actions/temp';

const TempReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    switch (action.type) {
        case RECEIVE_DATA:
            return Object.assign({}, oldState, action.data);
        default:
            return oldState;
    };
};

export default TempReducer;