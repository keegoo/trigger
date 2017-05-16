Rails.application.routes.draw do
  
  get 'schedulers/active',        to: 'schedulers#active'
  get 'generators/update_status', to: 'generators#update_status'
  
  resources :generators, only: [:index]
  resources :schedulers, only: [:show, :index, :create, :destroy] do 
    get   'executions/summary_data',  to: 'executions#summary_data'
    get   'executions/tunnel_data',   to: 'executions#tunnel_data'
    post  'executions/upsert',        to: 'executions#upsert'
    get   'executions/progress',      to: 'executions#progress'
  end
end
