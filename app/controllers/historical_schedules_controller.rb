class HistoricalSchedulesController < ApplicationController
  def index
    render json: HistoricalSchedule.all
  end
end
