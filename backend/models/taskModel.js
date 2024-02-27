const {Schema, model} = require("mongoose");

const taskSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  status:{
    type:String,
    default: "pending"
     },
   
  description: String,

  dueDate: String,

  userEmail:{
  	type: String,
  	required: true
  }

});


const task = new model("task",taskSchema);

module.exports = task;