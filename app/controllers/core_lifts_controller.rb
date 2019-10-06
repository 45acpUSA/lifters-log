class CoreLiftsController < ApplicationController
  before_action :authenticate_user!, except: %i[index]
	before_action :load_lift, except: %i[index create]
	
	def index
		if user_signed_in?
			lift = CoreLift.where({ user_id: current_user.id })
			render json: lift, status: 200
		end
	end

	def show
	end

	def new
	end

	def create
		lift = CoreLift.new(lift_params)
		if lift.save
			render json: lift, status: 201
		else
			render json: lift.errors.full_message, status: 422
		end
	end

	def edit
	end

	def update
		current_user.core_lift.update(lift_params)
	end

	def destroy
		if lift.destroy
			redirect_to action: "index"
		else
			redirect_back fallback_location: users_core_lifts_path
		end
	end

	private

	def lift_params
		params.permit(:user_id, :back_squat, :front_squat, :deadlift, :bench_press, :strict_press)
	end

	def load_lift
		lift = CoreLift.find(params[:id])
	end
end
