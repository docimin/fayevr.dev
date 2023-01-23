require 'date'

class HomeController < ApplicationController
  def index
  end
  def age
    today = Date.today
    birthday = Date.new(2000, 8, 17)
    @age = today.year - birthday.year
  end
  def something
    @something1 = "test"
    @something2 = puts @something1
  end
end
