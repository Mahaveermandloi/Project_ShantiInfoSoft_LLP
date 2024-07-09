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
    min: 1,
    max: 12,
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

const Subtask = mongoose.model("Subtask", subtaskSchema);

export default Subtask;
