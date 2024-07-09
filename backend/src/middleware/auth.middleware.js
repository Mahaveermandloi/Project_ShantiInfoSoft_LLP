// import jwt from "jsonwebtoken";
// import { ApiError } from "../utils/ApiError.js";

// import { Admin } from "../models/admin.model.js";
// import {User} from "../models/user.model.js"

// export const verifyJWT = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       throw new ApiError(401, "Unauthorized token");
//     }

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     const currentTimestamp = Math.floor(Date.now() / 1000);

//     if (decodedToken.exp < currentTimestamp) {
//       throw new ApiError(401, "Token expired");
//     }

//     const admin = await Admin.findById(decodedToken._id).select(
//       "-password -refreshToken"
//     );

//     const user = await User.findById(decodedToken._id).select(
//       "-password -refreshToken"
//     );

//     if (!admin) {
//       throw new ApiError(401, "Invalid token access");
//     }

//     req.admin = admin;

//     next();
//   } catch (error) {
//     next(new ApiError(401, error?.message || "Invalid access token"));
//   }
// };

import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized token");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTimestamp) {
      throw new ApiError(401, "Token expired");
    }

    let user;

    if (decodedToken.email) {
      const admin = await Admin.findOne({ email: decodedToken.email }).select(
        "-password -refreshToken"
      );

      

      if (admin) {
        req.admin = admin;
        return next();
      }

      user = await User.findOne({ email: decodedToken.email }).select(
        "-password -refreshToken"
      );

      if (user) {
        req.user = user;
        return next();
      }
    }

    throw new ApiError(401, "Invalid token access");
  } catch (error) {
    next(new ApiError(401, error?.message || "Invalid access token"));
  }
};
