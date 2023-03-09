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
        // fetchAdventurers()
        const data = await response.json();
        dispatch(receiveAdventurer(data)); // try changing lines 46 & 47 to calling fetchAdventurers()?
    } else {
        throw response;
    };
};

const initialState = {};

const adventurersReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_ADVENTURERS:
            return Object.assign({}, state, action.adventurers);
        case RECEIVE_ADVENTURER:
            const id = action.adventurer.user.id;
            state[id] = action.adventurer.user;
            debugger
            return Object.assign({}, state);
        default:
            return state;
    };
};

export default adventurersReducer;