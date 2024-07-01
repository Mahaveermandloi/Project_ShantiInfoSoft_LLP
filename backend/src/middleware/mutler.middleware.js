// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const projectStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "..", "uploads", "project"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const projectUpload = multer({
//   storage: projectStorage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype.includes("image") ||
//       file.mimetype.includes("pdf") ||
//       file.mimetype.includes("doc")
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Unsupported file type"), false);
//     }
//   },
// });

// // ---------------------------------------------------------

// const deviceStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "..", "uploads", "device"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const deviceUpload = multer({
//   storage: deviceStorage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype.includes("image") ||
//       file.mimetype.includes("pdf") ||
//       file.mimetype.includes("doc") ||
//       file.mimetype.includes("xlsx")
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Unsupported file type"), false);
//     }
//   },
// });

// // -----------------------------------------------------------------

// export { projectUpload, deviceUpload };


import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "project"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const projectUpload = multer({
  storage: projectStorage,
  fileFilter: (req, file, cb) => {
    cb(null, true); // Allow all files
  },
});

const deviceStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "device"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const deviceUpload = multer({
  storage: deviceStorage,
  fileFilter: (req, file, cb) => {
    cb(null, true); // Allow all files
  },
});

export { projectUpload, deviceUpload };