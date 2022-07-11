import React from 'react'
import useFormInput from '../hooks/useFormInput';
import { createTask } from '../services/service';
import './css/AddTaskForm.css';

function AddTaskForm() {
const [task,setTask,resetTask] = useFormInput('');
const token = localStorage.getItem('token');

const handleSubmit =(e)=>{
    e.preventDefault();
    
    if(token){
      createTask(task,token)  
    }   
    resetTask()
}

  return ( 
    <form onSubmit={handleSubmit} className='AddTaskForm'>
       <input type="text" value={task} onChange={setTask}  className='AddTaskForm__input' />
       <button className='AddTaskForm__btn'>Add Task</button>
    </form>
  )
}

export default AddTaskForm