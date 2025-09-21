import dotenv from "dotenv"
import express from "express"
import cors from "cors"

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";


// load the env variables
dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express()
const PORT = process.env.PORT || 5001

// connect to database


// middleware to parse json data
app.use(cors(
{  
  origin: "http://localhost:5173"
}))

app.use(express.json());
app.use(rateLimiter)


// custom middleware
// app.use( (req,res, next) => {
//   console.log("Hello from middleware");
//   console.log(req.method, req.path);
//   next();
// })

app.use("/api/notes", notesRoutes)
connectDB().then(() => {
  app.listen(PORT , () => {
  console.log("Server is running on port: ", PORT);
});
})
