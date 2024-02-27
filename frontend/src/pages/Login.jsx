import "../components/css/registration.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/Context";
import { toast } from 'react-toastify';

const Login = () => {

 const navigate = useNavigate();
 const {storetoken} = useAuth();
 const[loginValue,setLoginValue] = useState({
    email:"",
    password:""
 });


 const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginValue({...loginValue,[name]:value});
 }


  const handleSubmit = async(e) => {
     e.preventDefault(); 
     
   try{
    const response = await fetch(`http://localhost:5000/api/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginValue)
    });

    const res_data = await response.json();

    if(response.ok){

    storetoken(res_data.token);
    setLoginValue({
       email:"",
       password:""
        });
     
     toast.success(res_data.message); 
     navigate("/dashboard")

    }else{
      toast.error(res_data.message || "Login failed");
    }


   }catch(err){
      console.log(err);
   } 

 }

	return(
      <>
      	<section>
      		
            <div className= "regis_container">
                <h3 className="text-bold text-2xl text-center">Sign In</h3>
            	<form onSubmit={handleSubmit}>

            		  <div className="inp_container">
            		 	<label htmlFor="email">Email:</label>
            		 	<input type="text" name="email" id="email" autoComplete="off" onChange={onChange} value={loginValue.email}/>
            		 </div>

                     <div className="inp_container">
            		 	<label htmlFor="password">Password:</label>
            		 	<input type="text" name="password" id="password" autoComplete="off" onChange={onChange} value={loginValue.password}/>
            		 </div>

            		 <div className="inp_container">
                        <input type="submit" value="Sign In" />
                     </div>
             <p style={{textAlign:"center"}}>Don't have account ? 
             <span onClick={()=> navigate("/")} style={{color:"blue",cursor:"pointer"}} >  signUp</span></p>

            	</form>
            </div>

      	</section>

      </>

		)
}

export default Login;