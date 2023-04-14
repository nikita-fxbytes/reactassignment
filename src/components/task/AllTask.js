import api from '../../api/tasks';
import {Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner';
import DiaLogBox from '../common/dialogbox/DiaLogBox';
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import messageContext from '../common/message/context/messageContext';

const AllTask = (props) => {
   //show message
   const context = useContext(messageContext);
   const {showMessage} = context;
   // End

  // task data
  const [tasks, setTask] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  //get task
  useEffect(()=>{
    getTask();
     // eslint-disable-next-line
  },[])
  const getTask = async()=>{
    setLoading(true);
    props.setProgress(10);
    try {
      const res = await api.get(`/task?offSet=${offSet}&limit=20`);
      const resData = res.data;
      props.setProgress(30);
      if(resData.status === true){
        props.setProgress(70);
        setLoading(false);
        setTask(resData.data.tasks);
        setTotalResults(resData.data.totalResults);
      }
      props.setProgress(100)
    } catch (error) {
      const message = error.response.data.message;
      setLoading(false);
        showMessage({
            message:message,
            type:'danger'
        });
    }
    
  }
  //fetch more data
  const fetchMoreData = async() => {
    setLoading(true);
    props.setProgress(10);
    try {
      const res = await api.get(`/task?offSet=${tasks.length }&limit=10`);
      setOffSet(tasks.length)
      const resData = res.data;
      props.setProgress(30);
      if(resData.status === true){
        props.setProgress(70);
        setLoading(false);
        setTask(tasks.concat(resData.data.tasks));
        setTotalResults(resData.data.totalResults);
      }
      props.setProgress(100)
    } catch (error) {
      const message = error.response.data.message;
      setLoading(false);
        showMessage({
            message:message,
            type:'danger'
        });
    }
  };
  //end
  // end

  // delete task
  // dialog box
  const [dialog, setDiaLog] = useState({
    message:'',
    isLoading: false
  })
  // end
  const idTaskRef = useRef();
  const handleDiaLog = (message, isLoading)=>{
    setDiaLog({
      message,
      isLoading
    })
  }
  
  const handleDelete = (id) =>{
    handleDiaLog("Are you sure you want to delete this task?", true)
    idTaskRef.current = id;
  }
  const areUSureDelete = async (choose) =>{
    if(choose){
      try {
        const res = await api.delete(`/task/${idTaskRef.current}`);
        const resData = res.data;
        if(resData.status === true){
          const newTask = tasks.filter((task)=>task._id !==idTaskRef.current)
          setTask(newTask);
          showMessage({
            message:resData.message,
            type:'success'
          });
        }
      
      } catch (error) {
        const message = error.response.data.message;
        showMessage({
            message:message,
            type:'danger'
        });
      }
      handleDiaLog("", false)
    }else{
      handleDiaLog("", false)
    }
  }
  // end
  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h3 >Show All Task</h3>
        <Link className="btn btn-dark text-white text-decoration-none"  to="/create">Create Task</Link>
      </div>
      {loading && <Spinner/>}
      <InfiniteScroll
          dataLength={tasks.length}
          next={fetchMoreData}
          hasMore={tasks.length !== totalResults}
          loader={<Spinner/>
        }
          >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='text-center'>#</th>
                <th>Name</th>
                <th className='text-center'>Create at</th>
                <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks && tasks.length > 0 ? (
                    tasks.map((task, i) => {
                      const formattedDate =new Date(task.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      });
                      return (
                        <tr key={task._id}>
                          <td className='text-center'>{i +1 }</td>
                          <td><Link to={`/details/${task._id}`} className="text-decoration-none text-dark">{task.name}</Link></td>
                          <td className='text-center'>{formattedDate}</td>
                          <td className='text-center'>
                            <Link to={`/edit/${task._id}`}><FontAwesomeIcon icon={faEdit} className='pe-3 Link'/></Link>
                            <FontAwesomeIcon icon={faTrash} className='text-danger' style={{cursor:'pointer'}} onClick={()=>handleDelete(task._id)}/>
                            </td>
                        </tr>
                      );
                    })
                  ) : (
                  <tr>
                    <td colSpan={4}>No data Found</td>
                  </tr>
                  )
              }
            </tbody>
          </Table>
      </InfiniteScroll>
      {dialog.isLoading && <DiaLogBox onDialog={areUSureDelete} message={dialog.message}/>}
    </>
  )
}

export default AllTask;
