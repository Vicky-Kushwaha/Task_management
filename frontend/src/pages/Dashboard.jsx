import {useState,useEffect} from "react";
import {useAuth} from "../components/Context";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

const Dashboard = () => {

const {task,isLoggedIn,user,userAuthentication} = useAuth();
 const navigate = useNavigate();
const[selectedTask,setSelectedTask] = useState(null);
const[edit,setEdit] = useState(false);
const[taskModal,setTaskModal] = useState(false);
const[taskValue,setTaskValue] = useState({
	title:"",
	dueDate:"",
	description:"",
	userEmail:""
})	


// returning back if not loggedIn
useEffect(() => {
    if(!isLoggedIn){
        navigate(-1);
    }
},[isLoggedIn])


// setting user.email 
 useEffect(() => {
  setTaskValue({
    title:"",
    dueDate:"",
	description:"",
	userEmail: user.email
    });
  }, [user]);


//setting edit value 
 const editShow = (elem) => {
    // Set the currently selected student's data when the "Edit" button is clicked
    setSelectedTask(elem);
    setEdit(true);

  };


// setting task data model
const setModal = (elem) => {
    setSelectedTask(elem);
    setTaskModal(true);
}  


//setting taskValue
 const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

  if(edit){

    setSelectedTask({...selectedTask,[name]:value});

 }else{

    setTaskValue({...taskValue,[name]:value});
}   
   
 }


 // setting status of task
 const setStatus = async(elem) => {
    
  try{
 const response = await fetch(`http://localhost:5000/api/auth/task/${elem._id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify((elem.status === "pending") ? {status : "complete"} : {status : "pending"})
    });
 
    const res_data = await response.json();
    
    if(response.ok){
     
     setSelectedTask(null);

      toast.success("Status updated");
      userAuthentication();
      setEdit(false);

        }else{
            toast.error(res_data.extraDetails);
        } 

  }catch(error){
     console.log(error);
  }
  

 }




// on submit create or edit
 const handleSubmit = async(e) => {
     e.preventDefault();

        try{

// editing task
if(edit){
  if(selectedTask.title && selectedTask.dueDate && selectedTask.description && selectedTask.userEmail){  
    const response = await fetch(`http://localhost:5000/api/auth/task/${selectedTask._id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedTask)
    });
 
    const res_data = await response.json();
    
    if(response.ok){
     
     setSelectedTask(null);

      toast.success(res_data.message);
      userAuthentication();
      setEdit(false);

        }else{
            toast.error(res_data.extraDetails);
        } 

         }else{
           toast.error("Enter required data") ; 
         }

}


// adding task            
 else if(taskValue.title && taskValue.dueDate && taskValue.description && taskValue.userEmail){   

    const response = await fetch(`http://localhost:5000/api/auth/createtask`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskValue)
    });

  const res_data = await response.json();

    if(response.ok){

     setTaskValue({
       title:"",
       dueDate:"",
	   description:"",
	   userEmail: user.email
    });
       
       userAuthentication();
       toast.success(res_data.message);

    }

       }else{
        toast.error("Enter required data") ;
    }

    }catch(err){
        console.log(err);
    }

     }




 // deleting task
  const del = async(elem) => {
    try{
    const response = await fetch(`http://localhost:5000/api/auth/task/${elem._id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        
    });
     
     if(response.ok){
       userAuthentication();
       toast.success("Task deleted successfully");
     }

    }catch(error){
                console.log(error)
            }
  }     


	return(

     <>

     		<div>
                <div className= "mx-auto shadow-[0_0px_5px_rgba(0,0,0,0.3)] rounded-lg p-2 m-2 h-52 w-80">
                    <form onSubmit={handleSubmit}>
                    	
                      <div className="flex justify-between">
                         	<label className="label" htmlFor="title">Title :</label>
                         	<input className="input" type="text" name="title" id="title" autoComplete="off" onChange={onChange} value={ edit ? selectedTask.title : taskValue.title} />
                         </div>
                   
                      <div className="flex justify-between">
                         	<label className="label" htmlFor="dueDate">Due Date :</label>
                         	<input className="input" type="text" name="dueDate" id="dueDate" autoComplete="off"  onChange={onChange} value={edit ? selectedTask.dueDate :taskValue.dueDate}/>
                         </div>

                      <div className="flex justify-between">
                         	<label className="label" htmlFor="description">Description:</label>
                         	<textarea className="input" name="description" id="description" autoComplete="off" cols="30" rows="2" onChange={onChange} value={edit ? selectedTask.description :taskValue.description}></textarea>
                         </div>

                       <div className="text-center">
                          	<input className="bg-blue-600 text-white px-2 py-1 m-1 rounded-lg cursor-pointer" type="submit" value={edit ? "Edit Task" : "Add Task"} />
                         </div>

                    </form>
               	
               </div>

           <div className="h-72 mt-6 overflow-auto no-scrollbar">

               <table className=" w-[95%] m-auto capitalize" cellSpacing="0">
                  <thead className="bg-gray-400 ">
                        <tr className="">
                            <th className="p-2 rounded-tl-lg">Title</th>
                            <th className="p-2">Due Date</th>
                            <th className="p-2">Status</th>
                            <th className="p-2 rounded-tr-lg">Action</th>
              
                        </tr>
                   </thead>
           { task && task.map((elem,id)=>(
                  <tbody key={id} className="shadow-[0_0px_5px_rgba(0,0,0,0.3)]" style={{ backgroundColor: elem.status === "pending" ? "" : "#07bc0c", color: elem.status === "pending" ? "" : "white" }}>

                       <tr className="text-center">
                        <td className="p-2">{elem.title}</td>
                        <td className="p-2">{elem.dueDate}</td>
                        <td className="p-2">{elem.status}</td>
                        <td className="action flex p-2 justify-between">
                        <div className="cursor-pointer">{ (elem.status === "pending") ? <DoneIcon onClick={() => setStatus(elem)} /> : <CloseIcon onClick={() => setStatus(elem)} />  }</div>
                        <div className="cursor-pointer"><VisibilityIcon onClick={() => setModal(elem)} /></div>
                        <div className="cursor-pointer"><EditIcon onClick={() => editShow(elem)} /></div>
                        <div className="cursor-pointer"><DeleteIcon onClick={() => del(elem)} /></div></td>
                        </tr>

                   </tbody>
            ))   }
                     </table>
           	
           </div>


           { taskModal &&
            <div className="h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.3)] absolute top-0"> 
            <div className="rounded-lg w-56 md:w-1/4 bg-white p-2 relative">
             <CloseIcon onClick={()=>setTaskModal(false)} className="hover:bg-red-600 hover:text-white rounded-[50%] hover:cursor-pointer absolute top-1 right-1" />         
  
               <div className="capitalize">
               <div>
                  <p><span className="inline-block w-24 text-blue-600 font-bold">Title:</span> {selectedTask.title}</p>
               </div>
               <div>  
                  <p><span className="inline-block w-24 text-blue-600 font-bold">Due Date:</span> {selectedTask.dueDate}</p>
               </div> 
               <div>  
                  <p><span className="inline-block w-24 text-blue-600 font-bold">Description:</span> {selectedTask.description}</p>
               </div>
              <div>  
                  <p><span className="inline-block w-24 text-blue-600 font-bold">Status:</span> {selectedTask.status}</p>
               </div>
               
               </div>               
             </div> 
                 </div>    
                   }


     		</div>


     </>
		)
}


export default Dashboard;