class ExecutionsController < ApplicationController
  def create
    @params = params.require(:execution).permit([:total_hits, :total_users, :total_errors, :hour])
    scheduler_id = @params[:scheduler_id]
    hourly = get_present_hourly
    
    render json: Execution.create_with_default_values(hourly, scheduler_id)
  end

  def show 
    scheduler_id = params[:scheduler_id]
    id = params[:id]
    
    render json: Execution.find(id)
  end

  def update
    @params = params.permit([:status, :hits, :error, :users, :scheduler_id])
    hits = @params[:hits]
    scheduler_id = @params[:scheduler_id]
    hourly, min, second = get_present_hourly_min_second

    Execution.insert(min, second, hits, scheduler_id, hourly)
    Execution.add_to_summary(:total_hits, 1, scheduler_id, hourly)
    Execution.add_to_summary(:total_errors, 1, scheduler_id, hourly)
    render json: Execution.add_to_summary(:total_users, 1, scheduler_id, hourly)
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
