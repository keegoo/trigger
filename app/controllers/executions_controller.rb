class ExecutionsController < ApplicationController
  def create
    @params = params.require(:execution).permit([:total_hits, :total_users, :total_errors, :hour])
    @values = params[:values]
    @scheduler_id = params[:scheduler_id]

    hourly = Time.now.utc.iso8601.split(':')[0] + ':00:00Z'

    render json: Execution.create_with_default_values(hourly, @scheduler_id)
  end

  def update
    @params = params.permit([:status, :hits, :error, :users, :scheduler_id])
    hits = @params[:hits]
    scheduler_id = @params[:scheduler_id]
    hourly, min, second = get_present_hourly_min_second

    render json: Execution.insert(hourly, min, second, hits, scheduler_id)
  end

  private

  def get_present_hourly_min_second
    t = Time.now.utc.iso8601
    hourly  = t.split(':')[0] + ':00:00Z'
    min     = t.split(':')[1]
    second  = t.split(':')[2].chomp('Z')

    return hourly, min, second
  end
end
