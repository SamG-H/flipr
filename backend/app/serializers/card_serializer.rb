class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :front, :back
end
