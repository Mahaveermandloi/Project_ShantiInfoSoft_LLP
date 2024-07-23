import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([email, name, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedAdmin = await Admin.findOne({ $or: [{ name }, { email }] });

  if (existedAdmin) {
    throw new ApiError(409, "Admin already exists");
  }

  const admin = new Admin({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  const { refreshToken } = admin.generateRefreshToken();
  admin.refreshToken = refreshToken;
  await admin.save();

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdAdmin, "Admin registered successfully"));
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

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

  let user = await User.findOne({ email });
  let admin = await Admin.findOne({ email });

  if (!user && !admin) {
    return res.status(404).json({ message: "User or Admin does not exist" });
  }

  let isPasswordValid = false;
  let loggedInUser = null;
  let loggedInAdmin = null;
  let accessToken = null;
  let role = "";

  if (admin) {
    isPasswordValid = await admin.isPasswordCorrect(password);

    if (admin.accessToken) {
      throw new ApiError(409, "Admin already logged in");
    }

    if (isPasswordValid) {
      accessToken = admin.generateAccessToken();
      admin.accessToken = accessToken;
      await admin.save();
      loggedInAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
      );
      role = "admin";
    }
  } else if (user) {
    isPasswordValid = await user.isPasswordCorrect(password);

    // Check if the access token already exists
    if (user.accessToken) {
      throw new ApiError(409, "User already logged in");
    }

    if (isPasswordValid) {
      accessToken = user.generateAccessToken();
      user.accessToken = accessToken;
      await user.save();
      loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );
      role = "user";
    }
  }

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Set cookie options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  // Send response with cookies and user/admin data
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          admin: loggedInAdmin,
          role: role,
          accessToken: accessToken,
        },
        "Logged in successfully"
      )
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  const { role } = req.body;

  let entityId;

  if (role === "admin" && req.admin) {
    entityId = req.admin._id;
  } else if (role === "user" && req.user) {
    entityId = req.user._id;
  } else {
    throw new ApiError(400, "Invalid role specified or user not authenticated");
  }

  if (role === "admin") {
    const admin = await Admin.findById(entityId);
    if (admin) {
      admin.accessToken = null;
      await admin.save();
    }
  }

  if (role === "user") {
    const user = await User.findById(entityId);
    if (user) {
      user.accessToken = null;
      await user.save();
    }
  }

  
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
   

  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(
      new ApiResponse(200, {}, `${role.toUpperCase()} logged out successfully`)
    );
});

const getDetails = asyncHandler(async (req, res) => {
  const { role, accessToken } = req.body;

  let userDetails;

  if (role === "admin") {
    userDetails = await Admin.findOne({ accessToken }).select(
      "-password -refreshToken"
    );
  } else if (role === "user") {
    userDetails = await User.findOne({ accessToken }).select(
      "-password -refreshToken"
    );
  } else {
    throw new ApiError(400, "Invalid role");
  }

  if (!userDetails) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, userDetails, "User details fetched successfully")
    );
});

export { loginAdmin, logoutAdmin, registerUser, registerAdmin, getDetails };
