const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


// All routes

const authRoutes = require("./routes/auth");
const podcastRoutes = require("./routes/podcast");
//database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e) => {
    console.log(e);
  });

//middle wares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes

app.use("/api", authRoutes);
app.use("/api", podcastRoutes);

app.get("/", (req, res) => {
  res.send("Hello there welcome to player project");
});

app.listen(port, () => {
  console.log("App is up and running");
});
