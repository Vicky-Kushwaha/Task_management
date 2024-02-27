

const userTask = async(req,res) => {
	try{
       
       const tasks = req.tasks;
       const user = req.userdata;   
       
       return res.status(200).json({tasks,user});

	}catch(error){
		console.log(`error from the user route ${error}`);
	}
} 

module.exports = userTask;