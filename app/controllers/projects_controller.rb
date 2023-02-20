class ProjectsController < ApplicationController
  add_breadcrumb "projects", :projects_path
  def index
  end
  def suggestions
    add_breadcrumb "suggestions", "suggestions"
  end
  def alyx
    add_breadcrumb "alyx", "alyx"
  end
end
