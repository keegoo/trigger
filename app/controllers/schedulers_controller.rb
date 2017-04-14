class SchedulersController < ApplicationController
  def create
    @params = params.require(:scheduler).permit(schedule: [:generator, :time, :cmd, :status])
    render json: Scheduler.create(@params)
  end

  def destroy
    id = params.require(:id)
    Scheduler.where(id: id).delete
  end

  def index
    render json: Scheduler.order_by("schedule.time" => :desc).limit(30)
  end

  def active
    now = Time.now.utc.iso8601
    render json: Scheduler.where("schedule.time" => {"$gt" => now})
  end
end