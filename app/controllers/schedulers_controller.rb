class SchedulersController < ApplicationController
  def create
    @params = params.require(:scheduler).permit(schedule: [:generator, :time, :cmd, :status])
    generators_ary = @params[:schedule].map{|x| x[:generator]}

    s = Scheduler.create(@params)
    if is_schedule_missed?(@params[:schedule])
      ExecutionSummary.create_with_status(s._id, generators_ary, :missed)
    else
      ExecutionSummary.create_with_status(s._id, generators_ary, :waiting)
    end

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

  private

  def is_schedule_missed?(schedule)
    # if soonest task's time has been reached, 
    #   the whole schedule is missed.
    schedule.map{|x|x[:time]}.sort[0] < Time.now.utc.iso8601 ? true : false 
  end
end