import React, { useContext } from 'react'
import EditTaskForm from './EditTaskForm'
import useToggle from '../hooks/useToggle';
import { deleteTask } from '../services/service';
import {TaskContext} from '../contexts/TaskContext'
import './css/Task.css'


function Task({task}) {
    const {token,setUpdated} = useContext(TaskContext)
    const [isEdit,setIsEdit] = useToggle(false);

    const handleDelete =()=>{
      deleteTask(task._id,token);
      setUpdated(true); 
    }

  return (

        isEdit ? <EditTaskForm  task={task} edit={setIsEdit} />:
        <div className='Task'>
          <li className='Task__item'>{task.description}</li>

          <div className="Task__btns">
            <button onClick={setIsEdit} className='Task__btn'>Edit</button>
            <button onClick={handleDelete} className='Task__btn'>Delete</button>
          </div>
        </div>
        
  )
}

export default Task