Rails.application.routes.draw do
  root 'pages#index'
  get 'gallery', to: 'pages#gallery'
  get 'about', to: 'pages#about'
end
