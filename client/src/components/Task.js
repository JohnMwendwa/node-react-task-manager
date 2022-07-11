import React from 'react'
import EditTaskForm from './EditTaskForm'
import useToggle from '../hooks/useToggle';
import { deleteTask } from '../services/service';
import './css/Task.css'


function Task({task}) {
    const [isEdit,setIsEdit] = useToggle(false);
    const token = localStorage.getItem('token');

    const handleDelete =()=>{
      deleteTask(task._id,token)
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