import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Vendor from "../models/vendor.model.js";

const getVendors = asyncHandler(async (req, res, next) => {
  const vendors = await Vendor.find();
  const response = new ApiResponse(
    200,
    vendors,
    "Vendors fetched successfully"
  );
  res.status(200).json(response);
});

const createVendor = asyncHandler(async (req, res, next) => {
  const { Vendor_Name, Contact, Email, Address, GST } = req.body;

  const newVendor = new Vendor({
    Vendor_Name,
    Contact,
    Email,
    Address,
    GST,
  });

  const savedVendor = await newVendor.save();
  const response = new ApiResponse(
    201,
    savedVendor,
    "Vendor created successfully"
  );
  res.status(201).json(response);
});

const updateVendor = asyncHandler(async (req, res, next) => {
  const vendorId = req.params.id;
  const { Vendor_Name, Contact, Email, Address, GST } = req.body;

  const updatedVendor = await Vendor.findByIdAndUpdate(
    vendorId,
    {
      Vendor_Name,
      Contact,
      Email,
      Address,
      GST,
    },
    { new: true }
  );

  if (!updatedVendor) {
    throw new ApiError(404, "Vendor not found");
  }

  const response = new ApiResponse(
    200,
    updatedVendor,
    "Vendor updated successfully"
  );
  res.status(200).json(response);
});

const deleteVendor = asyncHandler(async (req, res, next) => {
  const vendorId = req.params.id;

  const deletedVendor = await Vendor.findByIdAndDelete(vendorId);

  if (!deletedVendor) {
    throw new ApiError(404, "Vendor not found");
  }

  const response = new ApiResponse(
    200,
    deletedVendor,
    "Vendor deleted successfully"
  );
  res.status(200).json(response);
});

export { createVendor, getVendors, updateVendor, deleteVendor };
