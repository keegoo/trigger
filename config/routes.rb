Rails.application.routes.draw do
  
  resources :generators, only: [:index]

  resources :schedulers, only: [:index, :create, :destroy]
  get 'schedulers/active',        to: 'schedulers#active'
  get 'generators/update_status', to: 'generators#update_status'
  # get 'generators/fetch_status',  to: 'generators#fetch_status'
  # get 'generators/heartbeat',     to: 'generators#heartbeat'
  # get 'generators/status',        to: 'generators#status'

end
