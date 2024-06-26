import fs from "fs";

import { v2 as cloudinary } from "cloudinary";
import { response } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilePath) => {
  try {
    if (!localfilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });

    //   file has been successfully uploaded
    // console.log("file is uploaded successfully ");

    fs.unlinkSync(localfilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localfilePath); // remove the local temporary file as the upload operation got failed
    return null;
  }
};

cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
  //  console.log(result);
  }
);

export { uploadOnCloudinary };
