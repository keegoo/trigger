Rails.application.routes.draw do
  
  resources :generators, only: [:index]

  resources :schedulers, only: [:index, :create, :destroy]
end
