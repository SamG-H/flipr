Rails.application.routes.draw do
  resources :scores
  resources :stacks, only: [:index, :create] do
      resources :cards, only: [:index, :create]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
