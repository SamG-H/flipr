class StacksController < ApplicationController
  def index
    stacks = Stack.all
    render json: stacks
  end

  def show
    stack = Stack.find(params[:id])
    render json: stack.cards
  end
  
  def create
    stack = Stack.create(title: params[:stack][:title])
    render json: stack
  end
end
