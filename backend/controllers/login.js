const user = require("../models/userModel");
const bcrypt = require("bcryptjs");


const login = async(req,res) => {
	try{
     const {email,password} = req.body;
    
     const userExist = await user.findOne({email});
     const userData = await bcrypt.compare(password,userExist.password);

     if(userData){

           res.status(200).json({
                    message: "Login successful",
                    token: await userExist.generateToken()
                });

     }else{
     	res.status(401).json({ message: "Invalid email or password" });
     }		


	}catch(err){
		res.status(500).json({message: "Invalid credentials"});
	}
}


module.exports = login;