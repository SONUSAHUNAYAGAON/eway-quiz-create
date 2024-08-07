const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/eway-quiz", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB database");
});

// require the quiz router
const quizRoutes = require("./api/routes/quiz");
// Routes
app.use("/quiz", quizRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port  ${PORT}`);
});
module.exports = app;
