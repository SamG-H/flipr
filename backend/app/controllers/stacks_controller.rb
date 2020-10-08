class StacksController < ApplicationController
  def index
    stacks = Stack.all
    options = {
      include: [:cards]
    }
    render json: StackSerializer.new(stacks, options)
  end

  def show
    stack = Stack.find(params[:id])
    options = {
      include: [:cards]
    }
    render json: StackSerializer.new(stack, options)
  end
  
  def create
    stack = Stack.create(stack_params)
    options = {
      include: [:cards]
    }
    render json: StackSerializer.new(stack, options)
  end

  private
  def stack_params
    params.require(:stack).permit(:title)
  end
end
