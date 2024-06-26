import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import adminRouter from "./routes/admin.routes.js";
import deviceRouter from "./routes/device.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import vendorRouter from "./routes/vendor.routes.js";
import projectRouter from "./routes/project.routes.js";

const app = express();

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const allowedOrigins = ["http://localhost:5173"];

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
app.use("/api/device", deviceRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/project", projectRouter);
app.use("/api/plan", projectRouter); // Separate router for plans
app.use("/api/resource", projectRouter); // Separate router for resources

export { app };
