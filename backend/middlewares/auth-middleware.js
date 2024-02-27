const jwt = require("jsonwebtoken");
const task = require("../models/taskModel");
const user = require("../models/userModel");


const authMiddleware = async(req,res,next) => {

 const token = req.header("Authorization");

  if(!token){
  	return res.status(401).json({message: "Unauthorized HTTP, Token not provided"});
  }

 const jwtToken = token.replace("Bearer", "").trim();

 try{
 
 const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);

 if(isVerified){
  
  const userdata = await user.findOne({ email : isVerified.email }).select({password: 0});
  const tasks = await task.find({userEmail: isVerified.email});

  req.tasks = tasks;
  req.userdata = userdata;

 }

 next();

   }catch(err){
   	return res.status(401).json(err);
   }

}


module.exports = authMiddleware;