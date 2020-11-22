class Stack < ApplicationRecord
  validates :title, presence: true
  has_many :cards
  has_many :scores
end
