const jwt = require("jsonwebtoken");

function authenticateAdmin(req, res, next) {
  const token = req.headers.authorization;
  
  if(token){
    const decode = jwt.decode(token);
    if (decode.role == "administrator") {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  }
  else{
    res.status(401).send("Unauthorized");
  }
}
function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
  const decode = jwt.decode(token);
  if(decode!==''){
    next();
  }
   else {
    res.status(401).send("Unauthorized");
  }
}
  else{
    res.status(401).send("Unauthorized");
  }
}
module.exports = {authenticateAdmin,authenticateUser };
