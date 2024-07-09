import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  resourceName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  workingStartDate: {
    type: Date,
    required: true,
  },
  dailyWorkingType: {
    type: String,
    required: true,
  },
  dailyHours: {
    type: Number,
    required: true,
    min: [0, "Daily hours must be at least 0"],
    max: [24, "Daily hours cannot exceed 24"],
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;