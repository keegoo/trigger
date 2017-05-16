class ExecutionsController < ApplicationController
  def all 
    scheduler_id = params[:scheduler_id]
    
    render json: ExecutionTunnel.where({ scheduler_id: scheduler_id })
  end

  def upsert
    @params = params.permit([:status, :hits, :errors, :generator, :ustart, :ustop, :scheduler_id])
    scheduler_id = @params[:scheduler_id]
    hourly, min, second = get_present_hourly_min_second

    ExecutionTunnel.insert(min, second, @params[:hits], scheduler_id, hourly)

    ExecutionSummary.update(scheduler_id, {
      generator:  @params[:generator],
      status:     @params[:status],
      hits:       @params[:hits],
      errors:     @params[:errors],
      ustart:     @params[:ustart],
      ustop:      @params[:ustop]
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
