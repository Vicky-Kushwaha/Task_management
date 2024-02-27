const task = require("../models/taskModel");


//adding task 
const createTask = async(req,res) =>{
	try{
	
	const taskCreated = await task.create(req.body);

	res.status(200).json({
        message: "task added successfully"
	});

    }catch(error){
		res.status(500).json(error);
	}
}

//delete task
const deleteTask = async(req,res) => {
   try{
     const taskId = req.params.id;  

    const taskDeleted = await task.deleteOne({ _id : taskId });  

        res.status(200).json({message: "task deleted successfully"});


    }catch(error){
        res.status(500).json({message: "Enter reqired details"});
    }
}


//edit task or update status
const editTask = async(req,res) => {
    try{

    const taskId = req.params.id;        

    const taskUpdated = await task.updateOne({_id:taskId},{$set: req.body});  

        res.status(200).json({
        	message: "task updated successfully",
        });


    }catch(error){
        res.status(500).json(error);
    }
} 




module.exports = {createTask,deleteTask,editTask};