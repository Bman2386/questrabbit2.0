class Api::ReviewsController < ApplicationController

    def index
        @reviews = Review.all 
        render :index
    end

    def new
        render :new
    end

    def create
        @review = Review.new(review_params)
        if !@review.id
            all_reviews = Review.all
            last_review = all_reviews.last 
            @review.id = last_review.id + 1
        end

        if @review.save!
            render :show
        else
            render json: @review.errors.full_messages, status: 401
        end
    end

    def show
        @review = Review.find(params[:id])
    end

    private
    def review_params
        params.require(:review).permit(
            :rating,
            :body,
            :adventurer_id,
            :user_id,
            :username
        )
    end
end