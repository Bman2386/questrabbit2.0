class Api::QuestsController < ApplicationController

    def new
        render :new
    end

    def index
      @quests = Quest.where(creator_id: c_id, completed: false).all
        render :index
    end

    def create
        @quest = Quest.new(quest_params)
     
        if @quest.save!
            render :show
        else
            render json: @quest.errors.full_messages, status: 401
        end
    end

    def show
        @quest = Quest.find(params[:id])
    end

    def update
        @quest = Quest.find(params[:id])
        if !@quest
            render json: ['Sorry could not find your quest :(']
        end
        
        if @quest.update_attributes(quest_params)
            @quest.save
            render :show 
        else
            render json: @quest.errors.full_messages, status: 401 
        end
        
    end

    private
    def quest_params
        params.require(:quest).permit(
            :quest_name,
            :category_id,
            :details,
            :adventurer_id,
            :start_time,
            :completed,
            :creator_id
        )
    end

    def c_id 
        params[:creator_id]
    end
end
