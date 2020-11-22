class ScoreSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :percentage
  belongs_to :stack
end
