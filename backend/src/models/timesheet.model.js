import mongoose from "mongoose";

const timesheetSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
  },
  sprintName: {
    type: String,
    required: true,
  },
  subTaskName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalTime: {
    type: String,
    required: true,
  },
  resourceName: {
    type: String,
    required: true,
  },
});

timesheetSchema.path("totalTime").set(function (value) {
  if (typeof value === "string") {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
  }
  return value;
});

const Timesheet = mongoose.model("Timesheet", timesheetSchema);

export default Timesheet;
