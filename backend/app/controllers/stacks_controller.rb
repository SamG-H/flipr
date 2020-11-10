class StacksController < ApplicationController
  def index
    stacks = Stack.all
    options = {
      include: [:cards]
    }
    render json: StackSerializer.new(stacks, options)
  end
  
  def create
    stack = Stack.create(stack_params)
    render json: StackSerializer.new(stack)
  end

  private
  def stack_params
    params.require(:stack).permit(:title)
  end
end
