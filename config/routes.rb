Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :articles
    end
  end

  root 'welcome#index'
  get '/*path' => 'welcome#index', format: 'html'
end
