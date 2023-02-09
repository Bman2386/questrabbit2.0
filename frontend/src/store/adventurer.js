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
        dispatch(receiveAdventurers(data.adventurers));
    } else {
        console.log('error: unable to fetch adventurers');
    };
};

export const fetchAdventurer = (userId) => async dispatch => {
    const response = await csrfFetch(`api/users/${userId}`)
    if (response.ok){
        const data = response.json();
        dispatch(receiveAdventurer(data.adventurer));
    } else {
        console.log('error: unable to fetch adventurer');
    };
};

export const updateAdventurer = (adventurer) => async dispatch => {
    const response = await csrfFetch(`api/users/${adventurer.id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(adventurer)
    });
    if (response.ok){
        const data = await response.json();
        dispatch(receiveAdventurer(data.adventurer))
    } else {
        console.log('error: unable to update Adventurer')
    };
};

const initialState = {};

const adventurersReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_ADVENTURERS:
            const adventurers = {};
            action.adventurers.forEach(adventurer => {
                adventurers[adventurer.id] = adventurer;
            });
            return adventurers;
        case RECEIVE_ADVENTURER:
            return Object.assign({}, action.adventurer);
        default:
            return state;
    };
};

export default adventurersReducer;