import React from 'react'
import useFormInput from './hooks/useFormInput'

function AddTaskForm({createTask}) {
const [task,handleTask,resetTask] = useFormInput('');

const handleSubmit =(e)=>{
    e.preventDefault();
    try{
         createTask(task)     
    }catch(e){
        console.log(e)
    }
    resetTask()
}

  return ( 
    <form onSubmit={handleSubmit}>
       <input type="text" value={task} onChange={handleTask}  />
       <button>Add Task</button>
    </form>
  )
}

export default AddTaskForm