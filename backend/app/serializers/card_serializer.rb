class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :front, :back
  belongs_to :stack
end
