class ApplicationController < ActionController::API

    include ActionController::RequestForgeryProtection

    protect_from_forgery with: :exception
    before_action :snake_case_params, :attach_authenticity_token

    helper_method :current_user, :logged_in?

    def current_user 
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in
        if !logged_in?
            render json: { errors: ['Must be logged in'] }, status: :unauthorized
        end
    end

    def require_logged_out
        if logged_in?
            render json: { errors: ['Must be logged out'] }, status: 403
        end
    end

    def logged_in?
        !!current_user
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def update_adv_reviews(reviews, id)
        adv = User.where(id: id)
        total = 0
        rating_total = 0
        debugger
        reviews.each do |review|
            total += 1
            rating_total += review.rating.to_i
        end
        temp = rating_total/total
        avg = temp.round()
        adv.update!({avg_rating: avg, total_ratings: total})
        
    end


    private

    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)    
    end

end
