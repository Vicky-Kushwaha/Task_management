import "../components/css/dashboard.css";
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
    status:"",
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
    status:"",
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
        body: JSON.stringify({status : "complete"})
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

     		<div className="dashboard_container">
               <div className="task_container">
                    <form className="task_form" onSubmit={handleSubmit}>
                    	
                         <div className="task_input">
                         	<label htmlFor="title">Title :</label>
                         	<input type="text" name="title" id="title" autoComplete="off" onChange={onChange} value={ edit ? selectedTask.title : taskValue.title} />
                         </div>
                   
                          <div className="task_input">
                         	<label htmlFor="dueDate">Due Date :</label>
                         	<input type="text" name="dueDate" id="dueDate" autoComplete="off"  onChange={onChange} value={edit ? selectedTask.dueDate :taskValue.dueDate}/>
                         </div>

                          <div className="task_input">
                         	<label htmlFor="description">Description :</label>
                         	<textarea name="description" id="description" autoComplete="off" cols="30" rows="2" onChange={onChange} value={edit ? selectedTask.description :taskValue.description}></textarea>
                         </div>

                        <div className="task_input">
                          	<input type="submit" value={edit ? "Edit Task" : "Add Task"} />
                         </div>

                    </form>
               	
               </div>

           <div className="data_container">

               <table cellSpacing="0">
                  <thead>
                        <tr className="table_heading">
                            <th>Title</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Action</th>
              
                        </tr>
                   </thead>
           { task && task.map((elem,id)=>(
                   <tbody  key={id}>
                       <tr>
                        <td>{elem.title}</td>
                        <td>{elem.dueDate}</td>
                        <td>{elem.status ? elem.status : "Pending" }</td>
                        <td className="action">
                        <div> <DoneIcon onClick={() => setStatus(elem)} /></div>
                        <div><VisibilityIcon onClick={() => setModal(elem)} /></div>
                        <div><EditIcon onClick={() => editShow(elem)} /></div>
                        <div><DeleteIcon onClick={() => del(elem)} /></div></td>
                        </tr>

                   </tbody>
            ))   }
                     </table>
           	
           </div>


           { taskModal &&
            <div className="modal"> 
            <div className="task_data_container" style={{backgroundColor:"white",position:"relative"}}>
             <CloseIcon  onClick={()=>setTaskModal(false)} className="cutIcon" />         
  
               <div className="task_data">
               <div>
                  <p><span>Title:</span> {selectedTask.title}</p>
               </div>
               <div>  
                  <p><span>Due Date:</span> {selectedTask.dueDate}</p>
               </div> 
               <div>  
                  <p><span>Description:</span> {selectedTask.description}</p>
               </div>
              <div>  
                  <p><span>Status:</span> {selectedTask.status}</p>
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