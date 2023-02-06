export const getQuests = creator_id => {
    return (
        $.ajax({
        url:`/api/quests`,
        data: {creator_id}
    }))
}
    

export const getQuest = questId => (
    $.ajax({
        url:`api/quests/${questId}`
    })
)

export const updateQuest = quest => (
    $.ajax({
        url: `/api/quests/${quest.id}`,
        method: `PATCH`,
        data: {quest}
    })
)

export const createQuest = quest => (
    $.ajax({
        url: `/api/quests`,
        method: `POST`,
        data: { quest }
    })
)