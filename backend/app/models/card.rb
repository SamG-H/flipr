class Card < ApplicationRecord
  belongs_to :stack
  validates :front, presence: true
  validates :back, presence: true
end
