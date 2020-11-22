class StackSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title
  has_many :cards 
  has_many :scores
end
