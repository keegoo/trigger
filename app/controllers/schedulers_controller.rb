class SchedulersController < ApplicationController
  def create
    @params = params.require(:scheduler).permit(:date, schedule: [:generator, :time, :cmd, :status])
    render json: Scheduler.create(@params)
  end

  def destroy
    id = params.require(:id)
    Scheduler.where(id: id).delete
  end

  def index
    render json: Scheduler.order_by(date: :desc)
  end
end