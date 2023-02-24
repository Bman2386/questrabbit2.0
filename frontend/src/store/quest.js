import csrfFetch from './csrf';

const RECEIVE_QUESTS = 'quests/recieveQuests';
const RECEIVE_QUEST = 'quests/recieveQuest';

const receiveQuests = quests => ({
    type: RECEIVE_QUESTS,
    quests
});

const receiveQuest = quest => ({
    type: RECEIVE_QUEST,
    quest
});

export const fetchQuests = () => async dispatch => {
    const response = await csrfFetch(`api/quests`);
    if (response.ok){
        const data = await response.json()
        dispatch(receiveQuests(data));
    } else {
        throw response;
    };
};

export const fetchQuest = (questId) => async dispatch => {
    const response = await csrfFetch(`api/quests/${questId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveQuest(data));
    } else {
        throw response;
    };
};

export const createQuest = (quest) => async dispatch => {
    const response = await csrfFetch(`api/quests`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(quest)
    });
    if (response.ok){
        const data = await response.json();
        dispatch(receiveQuest(data));
    } else {
        throw response;
    };
};

export const updateQuest = (quest) => async dispatch => {
    const response = await csrfFetch(`api/quests/${quest.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(quest)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveQuest(data));
    } else {
        throw response;
    };
};

const initialState = {};

const questsReducer = (state=initialState, action) => {
    switch (action.type) {
        case RECEIVE_QUESTS:
            return Object.assign({}, action.quests);
        case RECEIVE_QUEST:
            return Object.assign({}, state, action.quest);
        default:
            return state;
    };
};

export default questsReducer;