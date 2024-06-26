import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "project"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const documentUpload = multer({
  storage: documentStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.includes("image") ||
      file.mimetype.includes("pdf") ||
      file.mimetype.includes("doc")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
});

export { documentUpload };
