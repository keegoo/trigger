class SchedulersController < ApplicationController
  def create
    @params = params.require(:scheduler).permit(tasks: [:generator, :time, :cmd, :status])

    render json: Scheduler.create_with_defaults(@params)
  end

  def destroy
    id = params.require(:id)
    Scheduler.where(id: id).delete
  end

  def show
    id = params.require(:id)
    render json: Scheduler.find(id)
  end

  def progress
    id = params[:id]
    render json: {progress: Scheduler.progress(id)}
  end

  def tunnel_data
    id = params[:id]
    render json: ExecutionTunnel.where({ scheduler_id: id })
  end

  def update_status
    id = params[:id]
    generator = params[:generator]
    hourly, min, second = get_present_hourly_min_second

    ExecutionTunnel.insert(min, second, params.fetch(:hits){0}.to_i, id, hourly)
    Scheduler.update_status(id, generator, {
      status:     params[:status],
      hits:       params.fetch(:hits){0}.to_i,
      errors:     params.fetch(:errors){0}.to_i,
      ustart:     params.fetch(:ustart){0}.to_i,
      ustop:      params.fetch(:ustop){0}.to_i
    })
    render json: { msg: "handle return message later" }
  end

  def index
    render json: Scheduler.order_by("tasks.time" => :desc).limit(30)
  end

  def active
    now = Time.now.utc.iso8601
    render json: Scheduler.where("tasks.time" => {"$gt" => now})
  end

  private

  def is_schedule_missed?(schedule)
    # if soonest task's time has been reached, 
    #   the whole schedule is missed.
    schedule.map{|x|x[:time]}.sort[0] < Time.now.utc.iso8601 ? true : false 
  end

  def get_present_hourly_min_second
    t = Time.now.utc.iso8601
    hourly  = t.split(':')[0] + ':00:00Z'
    min     = t.split(':')[1]
    second  = t.split(':')[2].chomp('Z')

    return hourly, min, second
  end

  def get_present_hourly
    hourly, min, second = get_present_hourly_min_second
    return hourly
  end
end