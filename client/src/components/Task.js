import React from 'react'
import EditTaskForm from './EditTaskForm'
import useToggle from './hooks/useToggle'

function Task({task}) {
    const [isEdit,setIsEdit] = useToggle(false);
  return (

        isEdit ? <EditTaskForm  task={task} edit={setIsEdit}/>:<div>
        <li>{task.description}</li>
        <button onClick={setIsEdit}>Edit</button>
        <button>Delete</button>
        </div>
        
  )
}

export default Task