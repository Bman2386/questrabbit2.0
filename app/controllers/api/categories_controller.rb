class Api::CategoriesController < ApplicationController
    def index
        @categories = Category.all 
        render :index
    end

    def show
        @category = Category.find_by(params[:id])
        render :show
    end
end
