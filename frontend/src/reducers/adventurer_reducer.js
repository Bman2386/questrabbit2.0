import {RECEIVE_ADVENTURERS, RECEIVE_ADVENTURER} from '../actions/adventurer';


const adventurerReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_ADVENTURERS:
            const adventurers = {};
            action.adventurers.forEach(adventurer => {
                adventurers[adventurer.id] = adventurer;
            });
        return adventurers
        case RECEIVE_ADVENTURER:
        return Object.assign({}, action.adventurer)
        default:
            return state;
    }
}

export default adventurerReducer