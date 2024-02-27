import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/Context";

const Navbar = () => {

 const navigate = useNavigate();
 const {LogoutUser,isLoggedIn} = useAuth();

 const logout = () => {
    LogoutUser();
    navigate("/login");
 }

	return(
      <>
        <nav className=" flex bg-gray-200 justify-between items-center p-4" >
        	<p className="md:ml-8 md:text-xl font-bold">Task Management System</p>
            <div className="mr-10">
            { isLoggedIn &&
            	<button className="bg-white p-2 rounded-lg font-bold" onClick={logout}>Logout</button> }
            </div>
        </nav>	

      </>
		)
}


export default Navbar;