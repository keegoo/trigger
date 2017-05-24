class GeneratorsController < ApplicationController
  def index
    render json: Generator.all.only(:name, :last_used)
  end

  def update_status
    generator = params.require(:generator)
    Generator.update_status(generator.upcase)
    render json: { status: "success" }
  end
end
