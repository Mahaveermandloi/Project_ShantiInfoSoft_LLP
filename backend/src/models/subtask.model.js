// import mongoose from "mongoose";

// const subtaskSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 3,
//     maxlength: 50,
//     unique: true,
//   },
//   hours: {
//     type: String,
//     required: true,
//     min: 1,
//     max: 12,
//   },
//   type: {
//     type: String,
//     required: true,
//   },
//   planName: {
//     type: String,
//     required: true,
//   },
// });

// const Subtask = mongoose.model("Subtask", subtaskSchema);

// export default Subtask;

import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  hours: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
});

// Custom setter to convert "hr:mi" to minutes
subtaskSchema.path("hours").set(function (value) {
  if (typeof value === "string") {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
  }
  return value;
});

const Subtask = mongoose.model("Subtask", subtaskSchema);

export default Subtask;
