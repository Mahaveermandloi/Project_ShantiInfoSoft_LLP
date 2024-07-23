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
  },
  department: {
    type: String,
    required: true,
  },
});

resourceSchema.path("dailyHours").set(function (value) {
  if (typeof value === "string") {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
  }
  return value;
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
