class GeneratorsController < ApplicationController
  def index
    render json: Generator.all
  end
end
