class Api::SessionsController < ApplicationController

    def create
      @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password])
      if @user.nil?
        render json: ['Invalid Username or Password'], status: 401
      else
        login!(@user)
        render 'api/users/show'
      end
    end
  
    def destroy
      logout!
      render json: { message: 'Logout successful.' }
    end

    private
    def user_params
        params.require(:user).permit( :username, :password)
    end
  end