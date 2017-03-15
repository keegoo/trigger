Rails.application.routes.draw do
  
  resources :generators, only: [:index]
  resources :historical_schedules, only: [:index]

  resources :schedulers, only: [:index, :create, :destroy]
end
