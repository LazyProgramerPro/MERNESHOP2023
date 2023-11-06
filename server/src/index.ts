import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import mongoose from "mongoose";
import router from "./routes";

dotenv.config();
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

//Init middlewares
app.use(cookieParser());
app.use(compression());
app.use(helmet());

//routes
// readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
app.use("/api/v1", router());
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

const port = process.env.PORT || 5100;

mongoose.Promise = Promise;

mongoose
  .connect(process.env.MONGO_URL)
  .then((_) => console.log("Connected MongoDB Success PRO"))
  .catch((err) => console.log(`Error connecting MongoDB : ${err.message}`));

app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});
