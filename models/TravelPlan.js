const mongoose = require('mongoose');

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

module.exports = mongoose.model('TravelPlan', TravelPlanSchema);
