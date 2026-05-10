import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { env } from "./config/env";

// Load env variables
dotenv.config();

const app: Application = express();

// Database connection
connectDB();

// Middleware
app.use(cors({ origin: "*" }));
// app.use(helmet());

// By default helmet set policy:"same-site", Thats image is not load.
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(env.UPLOAD_ROOT));

// Routes
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import propertyRoutes from "./modules/property/property.route";
// import walletRoutes from './modules/auth/wallet.routes';
import uploadRoutes from "./modules/uploads/uploads.route";

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/properties", propertyRoutes);
// app.use('/api/wallet', walletRoutes);
app.use("/api/uploads", uploadRoutes);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Server is healthy 🚀" });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
