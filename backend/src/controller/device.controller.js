import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Device from "../models/device.models.js";

const getDevice = asyncHandler(async (req, res, next) => {
  const devices = await Device.find();
  if (!devices) {
    return res.status(404).json({ message: "Device not found" });
  }

  const response = new ApiResponse(
    200,
    devices,
    "Devices fetched successfully"
  );

  res.status(200).json(response);
});

const getDeviceById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const device = await Device.findById(id);
  if (!device) {
    return res.status(404).json({ message: "Device not found" });
  }
  const response = new ApiResponse(200, device, "Device fetched successfully");
  res.status(200).json(response);
});

const createDevice = asyncHandler(async (req, res) => {
  const {
    DeviceName,
    Category,
    VendorName, // Added VendorName
    PurchasedDate,
    WarrantyStartDate,
    WarrantyYear,
    WarrantyMonth,
  } = req.body;

  // Check for required fields
  if (
    !DeviceName ||
    !Category ||
    !VendorName ||
    !PurchasedDate ||
    !WarrantyStartDate ||
    !WarrantyYear ||
    !WarrantyMonth
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // Extract file paths from the request
  const imagePath = req.files["Image"]
    ? `/uploads/device/${req.files["Image"][0].filename}`
    : "";
  const billPath = req.files["Bill"]
    ? `/uploads/device/${req.files["Bill"][0].filename}`
    : "";

  const newDevice = new Device({
    DeviceName,
    Category,
    VendorName,
    PurchasedDate,
    WarrantyStartDate,
    WarrantyYear,
    WarrantyMonth,
    Image: imagePath,
    Bill: billPath,
  });

  // Save the new device to the database
  const savedDevice = await newDevice.save();

  // Create a response object
  const response = new ApiResponse(
    201,
    savedDevice,
    "Device created successfully"
  );

  // Send the response
  res.status(201).json(response);
});

const editDevice = asyncHandler(async (req, res, next) => {
  const deviceId = req.params.id;

  const {
    DeviceName,
    Category,
    VendorName, // Added VendorName
    PurchasedDate,
    WarrantyStartDate,
    WarrantyYear,
    WarrantyMonth,
  } = req.body;

  // Build update object
  const updateData = {
    DeviceName,
    Category,
    VendorName,
    PurchasedDate,
    WarrantyStartDate,
    WarrantyYear,
    WarrantyMonth,
  };

  // Extract file paths from the request
  const imagePath = req.files["Image"]
    ? `/uploads/device/${req.files["Image"][0].filename}`
    : null;
  const billPath = req.files["Bill"]
    ? `/uploads/device/${req.files["Bill"][0].filename}`
    : null;

  if (imagePath) {
    updateData.Image = imagePath;
  }

  if (billPath) {
    updateData.Bill = billPath;
  }

  // Find and update the device
  const updatedDevice = await Device.findByIdAndUpdate(deviceId, updateData, {
    new: true,
  });

  if (!updatedDevice) {
    return res.status(404).json({ message: "Device not found" });
  }

  const response = new ApiResponse(
    200,
    updatedDevice,
    "Device updated successfully"
  );
  res.status(200).json(response);
});

const assignDevice = asyncHandler(async (req, res) => {
  const deviceId = req.params.id;
  const { Name } = req.body;
  console.log(Name, deviceId);
  let device = await Device.findById(deviceId);

  if (!device) {
    return res.status(404).json({ message: "Device not found" });
  }

  if (device.Status === "Assign") {
    return res
      .status(400)
      .json({ message: "Device already assigned to someone" });
  } else {
    device.Status = "Assign";
    device.Receiver = Name;
  }

  await device.save();

  res.status(200).json({
    statusCode: 200,
    data: device,
    message: "Device assigned successfully",
    success: true,
  });
});

const makeDeviceAvailable = asyncHandler(async (req, res) => {
  const deviceId = req.params.id;

  console.log(deviceId);
  let device = await Device.findById(deviceId);

  if (!device) {
    return res.status(404).json({ message: "Device not found" });
  }

  if (device.Status === "Assign") {
    device.Status = "Available";
  } else {
    return res.status(400).json({ message: "Some error occured" });
  }

  await device.save();

  res.status(200).json({
    statusCode: 200,
    data: device,
    message: "Device Availed successfully",
    success: true,
  });
});

const deleteDevice = asyncHandler(async (req, res, next) => {
  const deviceId = req.params.id;

  const deletedDevice = await Device.findByIdAndDelete(deviceId);

  if (!deletedDevice) {
    throw new ApiError(404, "Device not found");
  }

  const response = new ApiResponse(
    200,
    deletedDevice,
    "Device deleted successfully"
  );
  res.status(200).json(response);
});

export {
  createDevice,
  getDevice,
  getDeviceById,
  editDevice,
  deleteDevice,
  assignDevice,
  makeDeviceAvailable,
};
