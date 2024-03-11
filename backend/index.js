const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const rootRouter = require("./routes/index");
const app = express();

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.send("Server Started");
});

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected to db successfully"))
  .catch((error) => console.log("error in connected to db: " + error));

app.listen(PORT, () => console.log("Server running at port " + PORT));
