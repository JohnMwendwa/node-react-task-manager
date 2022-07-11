import React from 'react'
import EditTaskForm from './EditTaskForm'
import useToggle from '../hooks/useToggle'
import './css/Task.css'


function Task({task}) {
    const [isEdit,setIsEdit] = useToggle(false);
  return (

        isEdit ? <EditTaskForm  task={task} edit={setIsEdit} />:
        <div className='Task'>
          <li className='Task__item'>{task.description}</li>

          <div className="Task__btns">
            <button onClick={setIsEdit} className='Task__btn'>Edit</button>
            <button className='Task__btn'>Delete</button>
          </div>
        </div>
        
  )
}

export default Task