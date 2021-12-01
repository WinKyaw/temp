const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if(!token){
    res.status(403);
    return res.send("Token is required!");
  }
  try{
    const decode = jwt.verify(token, "secret");
    res.user = decode;
  } catch(error) {
    console.error("Error");
    console.error(error);
    return res.status(401).send("Invalid token!");
  }
  return next();
}


module.exports = verifyToken;