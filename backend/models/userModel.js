const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}
});



// hashing password before saving to database
userSchema.pre("save",async function (next){
   const user = this;

   if(!user.isModified("password")){
      next();
   }

  try{
   const hash_password = await bcrypt.hash(user.password, 10);
   user.password = hash_password;

  }catch(error){
   next(error);
  }

});


// method for generating token
userSchema.methods.generateToken = async function() {
   try{
      return jwt.sign(
      {
         email: this.email
      },
      process.env.SECRET_KEY,
      {
         expiresIn: "30d"
      }
      );

   }catch(error){
      console.log(error);
   }
}


const user = new model("user",userSchema);

module.exports = user;