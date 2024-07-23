import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  epicName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  shortDescription: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000,
  },
  featureName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
  projectStage: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  estimatedTime: {
    type: Number,
    required: true,
  },
  totalTime: {
    type: Number,
    default: "",
  },
  taskDocuments: {
    type: String, // Assuming a single document URL for simplicity
  },
});

planSchema.path("estimatedTime").set(function (value) {
  if (typeof value === "string") {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
  }
  return value;
});

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
