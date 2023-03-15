Rails.application.routes.draw do
  get "projects/suggestions", to: "projects#suggestions"
  get "projects/alyx", to: "projects#alyx"
  # Root route
  root "home#index"
  # Gallery route
  get "gallery", to: "gallery#index"
  get "about", to: "about#index"
  get "projects", to: "projects#index"
  get "resume", to: "about#resumedownload"
end
