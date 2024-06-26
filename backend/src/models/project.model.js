import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  shortDescription: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000,
  },
  design: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  mobileApp: {
    type: String,
    required: true,
  },
  backendApi: {
    type: String,
    required: true,
  },
  db: {
    type: String,
    required: true,
  },
  qa: {
    type: String,
    required: true,
  },
  leadResource: {
    type: String,
    required: true,
  },
  codeReview: {
    type: String,
    required: true,
  },
  attachments: {
    type: String,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;

