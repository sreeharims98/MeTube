import express from "express";
import { connectDB } from "./config/connectDB.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from "cors";
import { videoRoute } from "./routes/videoRoute.js";
import { userRoute } from "./routes/userRoute.js";
import { config } from "./config/index.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello, This is MeTube backend!");
});

//users
app.use("/api/user", userRoute);
//videos
app.use("/api/video", videoRoute);

//errors
app.use(notFound);
app.use(errorHandler);

//listen
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
