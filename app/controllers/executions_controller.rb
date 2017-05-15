class ExecutionsController < ApplicationController
  def all 
    scheduler_id = params[:scheduler_id]
    
    render json: Execution.where({ scheduler_id: scheduler_id })
  end

  def upsert
    @params = params.permit([:status, :hits, :errors, :generator, :ustart, :ustop, :scheduler_id])
    scheduler_id = @params[:scheduler_id]
    hourly, min, second = get_present_hourly_min_second

    Execution.insert(min, second, @params[:hits], scheduler_id, hourly)
    Execution.add_to_summary(:total_hits, @params[:hits], scheduler_id, hourly)
    Execution.add_to_summary(:total_errors, @params[:errors], scheduler_id, hourly)

    Execution.add_to_users(@params[:generator], :ustart, @params[:ustart], scheduler_id, hourly)
    render json: Execution.add_to_users(@params[:generator], :ustop, @params[:ustop], scheduler_id, hourly)
  end

  private

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
