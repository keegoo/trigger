Rails.application.routes.draw do
  
  get 'schedulers/active',        to: 'schedulers#active'
  get 'generators/update_status', to: 'generators#update_status'
  
  resources :generators, only: [:index]
  resources :schedulers, only: [:show, :index, :create, :destroy]
end
