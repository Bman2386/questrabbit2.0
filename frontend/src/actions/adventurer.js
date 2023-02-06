import {getUsers, getUser, updateUser} from '../utils/adventurer';

export const RECEIVE_ADVENTURERS = 'RECEIVE_ADVENTURERS';
export const RECEIVE_ADVENTURER = 'RECEIVE_ADVENTURER';

const receiveAdventurers = (adventurers) => ({
    type: RECEIVE_ADVENTURERS,
    adventurers
})

const receiveAdventurer = adventurer => ({
    type: RECEIVE_ADVENTURER,
    adventurer
})



export const fetchAdventurers = () => dispatch => {
    return (
        getUsers()
        .then((adventurers) => dispatch(receiveAdventurers(adventurers)))
    )
}

export const fetchAdventurer = userId => dispatch => (
    getUser(userId)
    .then(adventurer => dispatch(receiveAdventurer(adventurer)))
)

export const updateAdventurer = adventurer => dispatch => {
    
    return (
       updateUser(adventurer)
    .then(adventurer => dispatch(receiveAdventurer(adventurer))) 
    )
}
    
