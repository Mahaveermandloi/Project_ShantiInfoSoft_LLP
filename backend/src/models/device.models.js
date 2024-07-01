import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  DeviceName: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    default: "Available",
  },

  VendorName: {
    type: String,
    required: true,
  },

  PurchasedDate: {
    type: String,
    required: true,
  },
  WarrantyStartDate: {
    type: String,
    required: true,
  },
  WarrantyYear: {
    type: String,
    required: true,
  },
  WarrantyMonth: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
  },
  Bill: {
    type: String,
    required: true,
  },
  Receiver: {
    type: String,
    default: "",
  },
});

const Device = mongoose.model("Device", deviceSchema);

export default Device;
