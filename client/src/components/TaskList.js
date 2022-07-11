import React,{useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../services/service';
import Task from './Task'
import './css/TaskList.css'
import { TaskContext } from '../contexts/TaskContext';

function TaskList() {
  const {token,mounted,updated,setUpdated} = useContext(TaskContext)
  const [tasks,setTasks] = useState([]);
  let navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      return navigate('/login')
    }
    getTasks(token)
     .then(data=>{
      if(mounted.current || updated){
        setTasks(data);
        setUpdated(false)
      }
     })
  },[mounted,token,updated,setUpdated,navigate])
  return (
    <div className='TaskList'>
     <ul className="TaskList__lists">
        {tasks.map(task=>
              <Task key={task._id} task={task} />)}
          </ul>
    </div>
  )
}

export default TaskList