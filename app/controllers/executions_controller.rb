class ExecutionsController < ApplicationController
  def create
    dynamic = (params[:execution] || {})[:values].keys
    @params = params.require(:execution).permit([:total_hits, :total_users, :total_errors, :hour, values: dynamic])
    puts @params
  end
end
