Rails.application.routes.draw do
  # Root route
  root "home#index"
  # Gallery route
  get "gallery", to: "gallery#index"
end
