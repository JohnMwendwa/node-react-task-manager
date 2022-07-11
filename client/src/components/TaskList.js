import React,{useEffect, useState} from 'react';
import { getTasks } from '../services/service';
import Task from './Task'
import './css/TaskList.css'

function TaskList() {
  const [tasks,setTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(()=>{
    getTasks(token)
     .then(data=>{
      setTasks(data)
     })
  },[token])
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