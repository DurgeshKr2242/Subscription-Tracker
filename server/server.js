const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
const HttpError = require("./models/httpError");

const app = express();

// Routes

const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/post");

// Middlewares

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

mongoose
  .connect(
    // "mongodb+srv://durgesh:s1RjSN227f6PAzI3@cluster0.svm0r.mongodb.net/subTrackerDev?retryWrites=true&w=majority"
    process.env.DATABASE_URI
  )
  .then(() => {
    console.log("DB CONNECTED!");
  })
  .catch((e) => {
    console.log("Error while connecting DB or LISTENING ON PORT", e);
  });

// readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.use("/api/posts", postsRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
