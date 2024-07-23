import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import adminRouter from "./routes/admin.routes.js";
import deviceRouter from "./routes/device.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import vendorRouter from "./routes/vendor.routes.js";
import projectRouter from "./routes/project.routes.js";
import userRouter from "./routes/user.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const allowedOrigins = [
  "http://localhost:5173",
  "https://shantiinfosoft.netlify.app",
  "*"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Routes
app.use("/", adminRouter);
app.use("/", userRouter);
app.use("/api/device", deviceRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/project", projectRouter);
app.use("/api/plan", projectRouter); // Separate router for plans
app.use("/api/resource", projectRouter); // Separate router for resources
app.use("/api/timesheet", projectRouter); // Separate router for resources

export { app };
