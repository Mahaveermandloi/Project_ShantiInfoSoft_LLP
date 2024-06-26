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
    type: String,
    required: true,
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
