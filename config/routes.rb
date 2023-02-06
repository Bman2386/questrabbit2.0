Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:index, :create, :show, :update, :destoy]
    resources :categories, only: [:show, :index]
    resources :quests, only: [:index, :new, :create, :show, :update]
    resources :reviews, only: [:index, :new, :create, :show]
    resource :session, only: [:create, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"
end
