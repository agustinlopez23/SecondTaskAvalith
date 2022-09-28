const jwt = require("jsonwebtoken");




  const checkAdmin =(req, res, next)=>{
    
    const token = req.headers.authorization.split(' ')[1]
    let decoded = jwt.decode(token, {complete:true})
    if(!decoded||decoded.payload.user?.isAdmin===false){
      const error = new Error("UNAUTHORIZED(401)")
      res.status(401).send(error.message)
      next(error)}
      else{next()}
    
  }


const checkLoggedIn = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; 
  let decoded = jwt.decode(token, { complete: true }); 
  if (!decoded) {
    const error = new Error("UNAUTHORIZED(401)");
    error.status = 401;
    return next(error);
  } else {
    req.user = decoded.payload.user
    next();
  }
};

module.exports = {
  checkAdmin,
  checkLoggedIn,
};