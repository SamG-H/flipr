class CardsController < ApplicationController
  def index
    stack = Stack.find(params[:stack_id])
    options = {
      include: [:stack]
    }
    render json: CardSerializer.new(stack.cards, options)
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
