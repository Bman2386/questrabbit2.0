Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:index, :create, :show, :update] 
    resources :reviews, only: [:show, :create]
    resources :categories, only: [:show, :index]
    resources :quests, only: [:index, :create, :show, :update]
    resource :session, only: [:create, :show, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"
end
