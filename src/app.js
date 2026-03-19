const express = require('express');
const cors = require('cors');
const router = require('./routes');
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/uploads", express.static("uploads"));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
console.log(path.join(__dirname, "uploads"));
app.use('/api', router);

module.exports = app;