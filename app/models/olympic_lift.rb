class OlympicLift < ApplicationRecord
  belongs_to :user

  validates :clean_and_jerk, :clean, :power_clean, :jerk, :power_jerk, :snatch, :power_snatch, numericality: true
end
