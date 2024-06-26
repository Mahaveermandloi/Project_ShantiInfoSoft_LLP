import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  Vendor_Name: {
    type: String,
    required: true,
  },
  Contact: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  Address: {
    type: String,
    required: true,
  },
  GST: {
    type: String,
    required: true,
    unique: true,
  },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
