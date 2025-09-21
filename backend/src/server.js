import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// load the env variables
dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  // middleware to parse json data
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

// routes
app.use("/api/notes", notesRoutes);
if (process.env.NODE_ENV === "production") {
  // static folder for frontend
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  // serve frontend
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// connect to db and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
  });
});
