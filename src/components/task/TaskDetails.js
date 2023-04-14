import api from '../../api/tasks';
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import messageContext from '../common/message/context/messageContext';
const TaskDetails = () => {
    const { id } = useParams();
    //show message
    const context = useContext(messageContext);
    const {showMessage} = context;
    // End
    //Task Details
    const [taskDetails, setTaskDetails] = useState(null);
    const GetTaskDetails = async()=>{
        try {
          const res = await api.get(`/task/${id}`);
          const resData = res.data;
         
          if(resData.status === true){
            setTaskDetails(resData.task);
            console.log(taskDetails)
          }
          
        } catch (error) {
          const message = error.response.data.message;
            showMessage({
                message:message,
                type:'danger'
            });
        }
      }
      useEffect(()=>{
        GetTaskDetails();
        // eslint-disable-next-line
      },[])
    // End
  return (
    <> 
        <div>
            <h3 className="mb-3"> Task Details</h3>
        </div>
        {
        taskDetails && <div className='border p-3'>
        <h3>{taskDetails.name !=undefined && taskDetails.name !=null ? taskDetails.name :''}</h3>
        <p>{taskDetails.description !=undefined && taskDetails.description !=null ? taskDetails.description :''}</p>
        </div>
        }
    </>
    
  )
}

export default TaskDetails
