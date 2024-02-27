require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./database/connection");
const router = require("./routers/auth");
const port = process.env.PORT || 5000 ;
const cors = require("cors");

const corsOptions = {
	origin:"http://localhost:5173", 
	methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
	credentials: true,
	
}


app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth",router);


connection().then(()=>{
	app.listen(port,()=>{
		console.log(`app listening on port: ${port}`);
	})
});


