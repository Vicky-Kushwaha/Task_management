const mongoose = require("mongoose");
const URL = process.env.MONGODB_URL ;

const connection = async() => {
	try{

	await mongoose.connect(`${URL}`);
	
	console.log("database connection successful");	


	}catch(err){
		console.log("database connection failed");
		process.exit(1);
	}
}

module.exports = connection;