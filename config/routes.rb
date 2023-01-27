Rails.application.routes.draw do
  get 'projects/projects'
  get 'projects/index'
  # Root route
  root "home#index"
  # Gallery route
  get "gallery", to: "gallery#index"
  get "about", to: "about#index"
  get "projects", to: "projects#index"
end
