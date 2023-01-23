class HomeController < ApplicationController
  def index
  end
  def age
    require 'date'
    today = Date.today
    birthday = Date.new(2000, 8, 17)
    @age = today.year - birthday
    if @age == nil
      puts "Hello!"
    end
  end
end
