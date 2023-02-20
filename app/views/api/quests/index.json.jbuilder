json.quests do 
    @quests.each do |quest|
        json.set! quest.id do 
            json.extract! quest, :id, :quest_name, :details, :adventurer_id, :start_time, :creator_id, :completed, :category_id
        end
    end
end

# json.array! @quests do |quest|
#     json.partial! 'api/quests/quest', quest: quest 
# end