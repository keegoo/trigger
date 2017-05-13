class ExecutionsController < ApplicationController
  def create
    @params = params.require(:execution).permit([:total_hits, :total_users, :total_errors, :hour])
    @values = params[:values]
    @scheduler_id = params[:scheduler_id]

    hourly = Time.now.utc.iso8601.split(':')[0] + ':00:00Z'

    Execution.create_with_default_values(hourly, @scheduler_id)
  end

  def update
    
  end
end
