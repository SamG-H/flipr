class ScoresController < ApplicationController
  def index
    scores = Score.all
    options = {
      include: [:stack]
    }
    render json: ScoreSerializer.new(scores, options)
  end
  
  def create
    score = Score.create(score_params)
    render json: ScoreSerializer.new(score)
  end

  private
  def score_params
    params.require(:score).permit(:name, :percentage, :stack_id)
  end
end
