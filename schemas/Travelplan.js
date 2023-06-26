import mongoose from "mongoose";

const TravelPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  activities: {
    type: [String],
    required: true,
  },
});

const TravelPlan = mongoose.models.TravelPlan || mongoose.model('TravelPlan', TravelPlanSchema);

export default TravelPlan