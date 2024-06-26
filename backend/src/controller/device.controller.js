import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Device from "../models/device.models.js";

const getDevice = asyncHandler(async (req, res, next) => {
  const devices = await Device.find();
  const response = new ApiResponse(
    200,
    devices,
    "Devices fetched successfully"
  );
  res.status(200).json(response);
});

const createDevice = asyncHandler(async (req, res, next) => {
  const { Devicename, Category, Purchaseddate, Warranty, Image, Receiver } =
    req.body;

  const newDevice = new Device({
    Devicename,
    Category,
    Purchaseddate,
    Warranty,
    Image,
    Receiver,
  });

  const savedDevice = await newDevice.save();
  const response = new ApiResponse(
    201,
    savedDevice,
    "Device created successfully"
  );
  res.status(201).json(response);
});

const editDevice = asyncHandler(async (req, res, next) => {
  const deviceId = req.params.id;
  const { Devicename, Category, Purchaseddate, Warranty, Image, Receiver } =
    req.body;

  const updatedDevice = await Device.findByIdAndUpdate(
    deviceId,
    {
      Devicename,
      Category,
      Purchaseddate,
      Warranty,
      Image,
      Receiver,
    },
    { new: true }
  );

  if (!updatedDevice) {
    throw new ApiError(404, "Device not found");
  }

  const response = new ApiResponse(
    200,
    updatedDevice,
    "Device updated successfully"
  );
  res.status(200).json(response);
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

export { createDevice, getDevice, editDevice, deleteDevice };
