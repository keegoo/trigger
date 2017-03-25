Rails.application.routes.draw do
  
  resources :generators, only: [:index]

  resources :schedulers, only: [:index, :create, :destroy]
  get 'schedulers/active', to: 'schedulers#active'

end
