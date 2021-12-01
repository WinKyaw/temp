require("dotenv").config();
require("./db").connect();

var express = require("express");

const app = express();

app.use(express.json());

module.exports = app;
