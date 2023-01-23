require 'date'

class HomeController < ApplicationController
  def index
  end
  def age
    today = Date.today
    birthday = Date.new(2000, 8, 17)
    @age = today.year - birthday.year
    @age -= 1 if today.month < birthday.month || (today.month == birthday.month && today.day < birthday.day)
  end

  def about
    today = Date.today
    birthday = Date.new(2000, 8, 17)
    @about = today.year - birthday.year
    p @about
  end
end
