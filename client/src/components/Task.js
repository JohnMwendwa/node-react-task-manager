import React from 'react'
import EditTaskForm from './EditTaskForm'
import useToggle from './hooks/useToggle'
import './css/Task.css'


function Task({task,updateTask}) {
    const [isEdit,setIsEdit] = useToggle(false);
  return (

        isEdit ? <EditTaskForm  task={task} edit={setIsEdit} updateTask={updateTask} />:<div className='Task'>
        <li className='Task__item'>{task.description}</li>
        <button onClick={setIsEdit} className='Task__btn'>Edit</button>
        <button className='Task__btn'>Delete</button>
        </div>
        
  )
}

export default Task