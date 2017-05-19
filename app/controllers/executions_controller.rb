class ExecutionsController < ApplicationController
  def tunnel_data
    scheduler_id = params[:scheduler_id]
    
    render json: ExecutionTunnel.where({ scheduler_id: scheduler_id })
  end

  def summary_data
    scheduler_id = params[:scheduler_id]

    render json: ExecutionSummary.where({ scheduler_id: scheduler_id }).first
  end

  def progress
    scheduler_id = params[:scheduler_id]

    render json: {progress: ExecutionSummary.progress(scheduler_id)}
  end

  def upsert
    @params = params.require(:execution).permit([:status, :hits, :errors, :generator, :ustart, :ustop])
    scheduler_id = params[:scheduler_id]
    hourly, min, second = get_present_hourly_min_second

    ExecutionTunnel.insert(min, second, @params.fetch(:hits){0}.to_i, scheduler_id, hourly)

    ExecutionSummary.update(scheduler_id, {
      generator:  @params[:generator],
      status:     @params[:status],
      hits:       @params.fetch(:hits){0}.to_i,
      errors:     @params.fetch(:errors){0}.to_i,
      ustart:     @params.fetch(:ustart){0}.to_i,
      ustop:      @params.fetch(:ustop){0}.to_i
    })

    render json: {msg: "handle return message later"}
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
