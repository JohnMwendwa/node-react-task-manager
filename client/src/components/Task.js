import React from 'react'
import EditTaskForm from './EditTaskForm'
import useToggle from './hooks/useToggle'

function Task({task,updateTask}) {
    const [isEdit,setIsEdit] = useToggle(false);
  return (

        isEdit ? <EditTaskForm  task={task} edit={setIsEdit} updateTask={updateTask} />:<div>
        <li>{task.description}</li>
        <button onClick={setIsEdit}>Edit</button>
        <button>Delete</button>
        </div>
        
  )
}

export default Task