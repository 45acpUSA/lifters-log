class CoreLiftsController < ApplicationController
  before_action :authenticate_user!, except: %i[index]
	before_action :load_lift, except: %i[index create]
	
	def index
		lifts = CoreLift.all
		render json: lifts, status: 200
	end

	def show
	end

	def new
	end

	def create
		lift = current_user.core_lifts.new(lift_params)
		if lift.save
			render json: lift, status: 201
		else
			render json: lift.errors.full_message, status: 422
		end
	end

	def edit
	end

	def update
		if current_user.core_lifts.update(lift_params)
			redirect_to users_core_lifts_path
		else
			render :edit
		end
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
		params.require(:core_lift).permit(:date, :back_squat, :front_squat, :deadlift, :bench_press, :strict_press)
	end

	def load_lift
		lift = CoreLift.find(params[:id])
	end
end
