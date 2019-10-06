class OlympicLiftsController < ApplicationController
  before_action :authenticate_user!, except: %i[index]
	before_action :load_lift, except: %i[index create]
	
	def index
		if user_signed_in?
			lift = OlympicLift.where({ user_id: current_user.id })
			render json: lift, status: 200
		end
	end

	def show
	end

	def new
	end

	def create
		lift = OlympicLift.new(lift_params)
		if lift.save
			render json: lift, status: 201
		else
			render json: lift.errors.full_message, status: 422
		end
	end

	def edit
	end

	def update
		current_user.olympic_lift.update(lift_params)
	end

	def destroy
		if lift.destroy
			redirect_to action: "index"
		else
			redirect_back fallback_location: users_olympic_lifts_path
		end
	end

	private

	def lift_params
		params.permit(:user_id, :clean_and_jerk, :clean, :power_clean, :jerk, :power_jerk, :snatch, :power_snatch)
	end

	def load_lift
		lift = OlympicLift.find(params[:id])
	end
end
