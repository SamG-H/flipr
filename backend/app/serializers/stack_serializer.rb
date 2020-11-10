class StackSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title
  has_many :cards
end
