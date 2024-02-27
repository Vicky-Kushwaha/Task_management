import { useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "./Context";

const Protected = (props) => {
  const { Component } = props;
  const { loading,isLoggedIn } = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
       if(!isLoggedIn){           
    if(loading){
          navigate("/login");

        }
       }  

  }, [loading]);


  return !loading && <Component />;

};

export default Protected;
