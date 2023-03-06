import csrfFetch from './csrf';

const RECEIVE_ADVENTURERS = 'adventurers/recieveAdventurers';
const RECEIVE_ADVENTURER = 'adventurers/recieveAdventurer';

const receiveAdventurers = (adventurers) => ({
    type: RECEIVE_ADVENTURERS,
    adventurers
});

const receiveAdventurer = adventurer => ({
    type: RECEIVE_ADVENTURER,
    adventurer
});

export const fetchAdventurers = () => async dispatch => {
    const response = await csrfFetch('api/users');
    if (response.ok){
        const data = await response.json();
        dispatch(receiveAdventurers(data));
    } else {
        throw response;
    };
};

export const fetchAdventurer = (userId) => async dispatch => { //do we need this function?
    const response = await csrfFetch(`api/users/${userId}`)
    if (response.ok){
        const data = response.json();
        dispatch(receiveAdventurer(data.adventurer));
    } else {
        throw response;
    };
};

export const updateAdventurer = (adventurer) => async dispatch => {
    const response = await csrfFetch(`api/users/${adventurer.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(adventurer)
    });
    if (response.ok){
        const data = await response.json();
        dispatch(receiveAdventurer(data.adventurer)); // try changing lines 46 & 47 to fetchAdventurers()?
    } else {
        throw response;
    };
};

const initialState = {};

const adventurersReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_ADVENTURERS:
            return action.adventurers;
        case RECEIVE_ADVENTURER:
            return Object.assign({}, state, action.adventurer);
        default:
            return state;
    };
};

export default adventurersReducer;