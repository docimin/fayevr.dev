class HomeController < ApplicationController
  def index
    require 'date'
    today = Date.today
    birthday = Date.new(2000, 8, 17)
    @age = today.year - birthday.year - ((today.month > birthday.month || (today.month == birthday.month && today.day >= birthday.day)) ? 0 : 1)
  end
end
