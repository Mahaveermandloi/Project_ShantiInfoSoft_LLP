// // // import mongoose from "mongoose";

// // // const timesheetSchema = new mongoose.Schema({
// // //   projectId: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: "Project",
// // //     required: true,
// // //   },
// // //   sprintName: {
// // //     type: String,
// // //     required: true,
// // //   },
// // //   subTaskName: {
// // //     type: String,
// // //     required: true,
// // //   },
// // //   date: {
// // //     type: Date,
// // //     required: true,
// // //   },
// // //   startTime: {
// // //     type: String,
// // //     required: true,
// // //   },
// // //   endTime: {
// // //     type: String,
// // //     required: true,
// // //   },
// // // });

// // // const Timesheet = mongoose.model("Timesheet", timesheetSchema);

// // // export default Timesheet;

// // import mongoose from "mongoose";

// // const timesheetSchema = new mongoose.Schema({
// //   projectId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Project",
// //     required: true,
// //   },
// //   sprintName: {
// //     type: String,
// //     required: true,
// //   },
// //   subTaskName: {
// //     type: String,
// //     required: true,
// //   },
// //   date: {
// //     type: Date,
// //     required: true,
// //   },
// //   startTime: {
// //     type: String,
// //     required: true,
// //   },
// //   endTime: {
// //     type: String,
// //     required: true,
// //   },
// //   totalTime: {
// //     type: String,
// //   },
// //   resourceName: {
// //     type: String,
// //     required: true,
// //   },
// // });

// // const Timesheet = mongoose.model("Timesheet", timesheetSchema);

// // export default Timesheet;

// import mongoose from "mongoose";

// const timesheetSchema = new mongoose.Schema({
//   projectId: {
//     type: String,
//     required: true,
//   },
//   sprintName: {
//     type: String,
//     required: true,
//   },
//   subTaskName: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   startTime: {
//     type: String,
//     required: true,
//   },
//   endTime: {
//     type: String,
//     required: true,
//   },
//   totalTime: {
//     type: String,
//   },
//   resourceName: {
//     type: String,
//     required: true,
//   },
// });

// // Pre-save hook to calculate total time
// timesheetSchema.pre("save", function (next) {
//   const start = new Date(`1970-01-01T${this.startTime}:00`);
//   const end = new Date(`1970-01-01T${this.endTime}:00`);
//   const diff = (end - start) / 1000 / 60 / 60; // Difference in hours
//   this.totalTime = diff.toFixed(2);
//   next();
// });

// const Timesheet = mongoose.model("Timesheet", timesheetSchema);

// export default Timesheet;

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
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  totalTime: {
    type: String,
  },
  resourceName: {
    type: String,
    required: true,
  },
});

// Pre-save hook to calculate total time in hr:mi format
timesheetSchema.pre("save", function (next) {
  const start = new Date(`1970-01-01T${this.startTime}:00`);
  const end = new Date(`1970-01-01T${this.endTime}:00`);
  const diff = (end - start) / 1000 / 60; // Difference in minutes

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  this.totalTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  next();
});

const Timesheet = mongoose.model("Timesheet", timesheetSchema);

export default Timesheet;
