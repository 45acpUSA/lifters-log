Rails.application.routes.draw do
  devise_for :users
  
  get '*path', :to => 'core_lifts#root', constraints: -> (request){ request.format.html? }

  resources :users do
    resources :core_lifts
    resources :olympic_lifts
  end

  root :to => 'welcome#index'
end
