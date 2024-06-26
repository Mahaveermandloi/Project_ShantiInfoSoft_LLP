import { User } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password } = req.body;


  console.log(name, email, password);
  if ([email, name, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ name }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = new User({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  const { refreshToken } = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const admin = await User.findOne({ email });

  if (!admin) {
    throw new ApiError(404, "Admin does not exist");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid admin credentials");
  }

  // Generate tokens
  const accessToken = admin.generateAccessToken();
  const refreshToken = admin.generateRefreshToken();

  // Assign tokens to the admin instance
  admin.accessToken = accessToken;
  admin.refreshToken = refreshToken;

  // Save the admin instance with tokens
  await admin.save();

  // Select the admin document to exclude sensitive fields
  const loggedInAdmin = await User.findById(admin._id).select(
    "-password -refreshToken"
  );

  // Set cookie options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  // Send response with cookies and admin data
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { admin: loggedInAdmin, accessToken },
        "Admin logged in successfully"
      )
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  const adminId = req.admin._id; // Correctly accessing the admin ID

  // Find the admin by ID
  const admin = await User.findById(adminId);
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Clear access and refresh tokens
  admin.accessToken = null;
  admin.refreshToken = null;

  // Save the admin instance with tokens cleared
  await admin.save();

  // Set cookie options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  // Clear cookies and send successful logout response
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logged out successfully"));
});

export { loginAdmin, logoutAdmin, registerUser };
