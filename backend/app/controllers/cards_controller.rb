class CardsController < ApplicationController
  def show
    card = Card.find(params[:id])
    render json: CardSerializer.new(card)
  end

  def create
    card = Card.create(card_params)
    render json: CardSerializer.new(card)
  end

  private
  def card_params
    params.require(:card).permit(:front, :back, :stack_id)
  end
end
