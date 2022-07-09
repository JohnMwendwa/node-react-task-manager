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
    <form onSubmit={handleSubmit} className='AddTaskForm'>
       <input type="text" value={task} onChange={handleTask}  className='AddTaskForm__input' />
       <button className='AddTaskForm__btn'>Add Task</button>
    </form>
  )
}

export default AddTaskForm