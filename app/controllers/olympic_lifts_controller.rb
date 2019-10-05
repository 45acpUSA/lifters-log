class OlympicLiftsController < ApplicationController
  before_action :authenticate_user!, except: %i[index]
	before_action :load_lift, except: %i[index create]
	
  def index
    lift = OlympicLift.where({ user_id: current_user.id })
		render json: lift, status: 200
	end

	def show
	end

	def new
	end

	def create
		lift = current_user.olympic_lifts.new(lift_params)
		if lift.save
			render json: lift, status: 201
		else
			render json: lift.errors.full_message, status: 422
		end
	end

	def edit
	end

	def update
		if current_user.olympic_lifts.update(lift_params)
			redirect_to users_olympic_lifts_path
		else
			render :edit
		end
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
		params.require(:olympic_lift).permit(:clean_and_jerk, :clean, :power_clean, :jerk, :power_jerk, :snatch, :power_snatch)
	end

	def load_lift
		lift = OlympicLift.find(params[:id])
	end
end
