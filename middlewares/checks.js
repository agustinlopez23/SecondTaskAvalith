const { checkIfEmalValid } = require("../helpers/checkIfEmalValid");

const checkMail = (req, res, next) => {
  if (checkIfEmalValid(req.body.email)) {
    next();
  } else {
    const error = new Error("Bad Request");
    error.status = 400;
    next(error);
  }
};


 
    
   
  
module.exports={checkMail}