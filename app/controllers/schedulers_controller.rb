class SchedulersController < ApplicationController
  def create
    @params = params.require(:scheduler).permit(schedule: [:generator, :time, :cmd, :status])
    s = Scheduler.create(@params)
    generators_ary = s.schedule.map{|x| x["generator"]}
    ExecutionSummary.create_with_status(s._id, generators_ary)
    render json: s
  end

  def destroy
    id = params.require(:id)
    Scheduler.where(id: id).delete
  end

  def show
    id = params.require(:id)
    render json: Scheduler.find(id)
  end

  def index
    render json: Scheduler.order_by("schedule.time" => :desc).limit(30)
  end

  def active
    now = Time.now.utc.iso8601
    render json: Scheduler.where("schedule.time" => {"$gt" => now})
  end
end