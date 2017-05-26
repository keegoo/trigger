Rails.application.routes.draw do
  
  get 'schedulers/active',          to: 'schedulers#active'
  post 'schedulers/all_progresses', to: 'schedulers#all_progresses'
  get 'generators/update_status',   to: 'generators#update_status'
  
  resources :generators, only: [:index]
  resources :schedulers, only: [:show, :index, :create, :destroy] 
  get 'schedulers/:id/progress',        to: 'schedulers#progress'
  get 'schedulers/:id/tunnel_data',     to: 'schedulers#tunnel_data'
  post 'schedulers/:id/update_status',  to: 'schedulers#update_status'

end
