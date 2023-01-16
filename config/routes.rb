Rails.application.routes.draw do
  root 'pages#index'
  get 'gallery', to: 'pages#gallery'
end
