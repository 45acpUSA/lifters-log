class CoreLift < ApplicationRecord
  belongs_to :user

  validates :back_squat, :front_squat, :deadlift, :bench_press, :strict_press, numericality: true
end
