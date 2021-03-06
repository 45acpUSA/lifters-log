class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :core_lift
  has_one :olympic_lift

  validates :location, exclusion: { in: %w(Select...),
    message: "Please Select a Location." }

end
