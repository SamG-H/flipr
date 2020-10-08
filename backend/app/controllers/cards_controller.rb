class CardsController < ApplicationController
  def show
    card = Card.find(params[:id])
    render json: card, include: :stack
  end

  def create
    card = Card.create(card_params)
    render json: card, include: :stack
  end

  private
  def card_params
    params.require(:card).permit(:front, :back, :stack_id)
  end
end
