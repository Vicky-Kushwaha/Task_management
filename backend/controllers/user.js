const user = require("../models/userModel");

const createUser = async(req,res) =>{
	try{

	const {name,email,password} = req.body;
	
	const userExist = await user.findOne({ email });	

	if(userExist){
		return res.status(400).json({message: "email already exists"});
	}

	const userCreated = await user.create({name,email,password});

	res.status(200).json({
        message: "Registered successfully",
        token: await userCreated.generateToken(),

	});

    }catch(error){
		res.status(500).json(error);
	}
}


module.exports = createUser;