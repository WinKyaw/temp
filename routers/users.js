require("dotenv").config();
const express = require("express");
const app = express();
const routes = express.Router();
const Users = require("./userInfo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const auth = require("./../auth.js");
const cors = require("cors");

// routes.get("/:id", async (req, res) => {
// let testJson = {
//   "name" : "testing1",
//   "email" : "test@gmail.com"
// }
// res.status(200);
// return res.json(testJson);
// });

routes.post("/signup", async (req, res) => {

try {
  let {firstname, lastname, email, password} = req.body;

  if(!(email && password && firstname && lastname)){
    console.error("Missing required fields");
    res.status(400);
    res.send("Missing required fields!");
    return;
  }

  let userExists = await Users.findOne({email});
  if(userExists){
    console.error("Email exists! ");
    res.status(409);
    res.send("User exists");
    return;
  }

  encryptedPassword = await bcrypt.hash(password, 10);
  console.log(firstname);
  console.log(lastname);
  console.log(email);
  let user = await Users.create({
    firstname: firstname,
    lastname: lastname,
    email: email.toLowerCase(),
    password: encryptedPassword
  });

  let token = jwt.sign({
    user: user._id, 
    email: email
  }, "secret", {expiresIn: "1h"});

  user.token = token;
  res.status(201);
  return res.json(user);
} catch(err) {
  console.error("Error signUP");
  console.error(err);
  return;
}

});

routes.post("/login", async (req, res) => {

  try{

    const { email, password} = req.body;
    if(!(email && password)){
      console.error("error log in missing required field");
      res.status(400);
      res.send("Missing required fields!");
      return;
    }

    let user = await Users.findOne(email);
    let cred = await bcrypt.compare(password, user.password);
    if(!user || !red){
      console.error("user not found");
      res.status(400);
      res.send("User not found!");
    }

    const token = jwt.sign(
      {user: user._id,
       email: email },
       "secret", {expiresIn: "1h"});
    user.token = token;

    
    res.status(200);
    res.send(user)
    return ;

  }catch(error){
    console.error("error");
    console.error(error);
    return ;
  }

});

// routes.get("/list", auth,  async (req, res) => {
//   // const url = "https://api.giphy.com/v1/gifs/trending?api_key=aLAAjmYTlEqTExgItn4nH2U1lLIPgwB9&offset=10&count=10";
//   // let data = await axios.get(url, (res) => {return res.data;});
//   // for(int i =0; i < data.data.length; i++){

//   // }
//   // console.log(data);
//   // res.send(data.data);
// });

routes.get("/usersInfo", async (req, res) => {

  let user = await Users.find({});
  console.log("test");
  return {data: res.status(200).send(user) };
});
app.use(cors({origin: "*"}));
module.exports = routes;