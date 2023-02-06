import * as QuestAPIUtil from '../utils/quest';

export const RECEIVE_QUESTS = 'RECEIVE_QUESTS';
export const RECEIVE_QUEST = 'RECEIVE_QUEST';

const receiveQuests = quests => ({
    type: RECEIVE_QUESTS,
    quests
});

const receiveQuest = quest => ({
    type: RECEIVE_QUEST,
    quest
});

export const fetchQuests = (creatorId) => dispatch => (
    QuestAPIUtil.getQuests(creatorId)
    .then(quests => dispatch(receiveQuests(quests)))
);

export const fetchQuest = questId => dispatch => (
    QuestAPIUtil.getQuest(questId)
    .then(quest => dispatch(receiveQuest(quest)))
);

export const createQuest = quest => dispatch => (
    QuestAPIUtil.createQuest(quest)
    .then(quest => dispatch(receiveQuest(quest)))
);

export const updateQuest = quest => dispatch => (
    QuestAPIUtil.updateQuest(quest)
    .then(quest => dispatch(receiveQuest(quest)))
);