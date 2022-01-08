const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

// Middlewares

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://durgesh:s1RjSN227f6PAzI3@cluster0.svm0r.mongodb.net/subTrackerDev?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB CONNECTED!");
  })
  .catch((e) => {
    console.log("Error while connecting DB or LISTENING ON PORT", e);
  });

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
