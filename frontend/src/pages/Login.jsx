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
      	<section className=" flex  h-[calc(100vh-4rem)] items-center justify-center ">
      		
            <div className= "shadow-[0_0px_5px_rgba(0,0,0,0.3)] rounded-lg p-2 m-2 h-52">
                <h3 className="text-bold text-2xl text-center font-bold mb-2">Sign In</h3>
            	<form onSubmit={handleSubmit}>

            		  <div className="flex justify-between">
            		 	<label className="label" htmlFor="email">Email:</label>
            		 	<input className="input" type="text" name="email" id="email" autoComplete="off" onChange={onChange} value={loginValue.email}/>
            		 </div>

                     <div className="flex justify-between">
            		 	<label className="label" htmlFor="password">Password:</label>
            		 	<input className="input" type="text" name="password" id="password" autoComplete="off" onChange={onChange} value={loginValue.password}/>
            		 </div>

            		 <div className="text-center">
                        <input className="bg-blue-600 text-white px-2 py-1 m-1 rounded-lg cursor-pointer" type="submit" value="Sign In" />
                     </div>
             <p className="text-center">Don't have account ? 
             <span onClick={()=> navigate("/")} className="text-blue-600 cursor-pointer" >  signUp</span></p>

            	</form>
            </div>

      	</section>

      </>

		)
}

export default Login;