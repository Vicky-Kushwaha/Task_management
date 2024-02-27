import {createContext,useState,useContext,useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

 const[token,setToken] = useState(localStorage.getItem("token"));
  const[loading,setLoading] = useState(false);
 const[task,setTask] = useState("");
 const[user,setUser] = useState("");


// storing token in localstorage
 const storetoken = (servertoken) => { 
  setToken(servertoken);
  return localStorage.setItem("token",servertoken);
 }

 const isLoggedIn = !!token ;

// removing token from localstorage
 const LogoutUser = () => {
   setToken("");
    setLoading(false);
   return localStorage.removeItem("token");
 }


 // JWT authentication - to get the currently loggedIn user data 
 
 const userAuthentication = async() => {
   setLoading(true);
   try{
   
    const response = await fetch(`http://localhost:5000/api/auth/getTask`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    if(response.ok){
      const data = await response.json();
      const {tasks,user} = data;
      setTask(tasks);
      setUser(user);
      setLoading(false);
          
    }else{
      setLoading(false);
      console.log("Error fetching user data");
    }
     
     
   }catch(error){
     console.error(error);
     setLoading(false);  
   }

 }


// fetching data after loggedIn
 useEffect(() => {
 if(isLoggedIn){
  userAuthentication();
   }
 },[token]);


  return (

  <AuthContext.Provider value = {{user,task,isLoggedIn,LogoutUser,storetoken,userAuthentication}} >
             {children}
  </AuthContext.Provider>
  );

}

export const useAuth = () => {
	const authContextValue = useContext(AuthContext);
	if(!authContextValue){
		throw new Error("useAuth is used outside of the provider");
	}

	return authContextValue;
}
