class Api::QuestsController < ApplicationController

    def new
        render :new
    end

    def index
        c_id = current_user.id
        @quests = Quest.where(creator_id: c_id, completed: false)
        render :index
    end

    def create
        @quest = Quest.new(quest_params)
        if !@quest.id
            all_quests = Quest.all
            last_quest = all_quests.last 
            @quest.id = last_quest.id + 1
        end
        if @quest.save!
            render :show
        else
            render json: @quest.errors.full_messages, status: 401
        end
    end

    def show
        @quest = Quest.find(params[:id])
        if @quest
            render :show
        else
            render :json['sorry unable to find quest']
        end
    end

    def update
        @quest = Quest.find(params[:id])
        if !@quest
            render json: ['Sorry could not find your quest :(']
        end
        
        if @quest.update(quest_params)
            @quest.save
            render :show 
        else
            render json: @quest.errors.full_messages, status: 401 
        end
        
    end

    private
    def quest_params
        params.require(:quest).permit(
            :id,
            :quest_name,
            :category_id,
            :details,
            :adventurer_id,
            :start_time,
            :completed,
            :creator_id
        )
    end
end
