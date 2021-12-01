
require("dotenv").config();
var express = require("express");
var bodyParse = require("body-parser");
var path = require("path");
const PORT = process.env.PORT || 8080;
const http = require("http");
const app = require("./jwt");
const server = http.createServer(app);
const cors = require("cors");

let apiUserRoute = require("./routers/users.js");
app.use("/api", apiUserRoute);
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());
app.use(express.static(__dirname+"/"));
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200, // For legacy browser support,
    "Access-Control-Allow-Origin" : "*"
}
app.use(cors({origin: "*"}));

app.use((req, res, next) => {
  // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
server.listen(PORT, () => {
	console.log("Store server is up and running!");
});
