import React, { useContext } from 'react'
import useFormInput from '../hooks/useFormInput';
import { createTask } from '../services/service';
import { TaskContext } from '../contexts/TaskContext';
import './css/AddTaskForm.css';

function AddTaskForm() {
  const {token,setUpdated} = useContext(TaskContext);
const [task,setTask,resetTask] = useFormInput('');

const handleSubmit =(e)=>{
    e.preventDefault();
    
    if(token){
      createTask(task,token)
        .then(()=>{
          setUpdated(true);
          resetTask()
        })   
    }   
}

  return ( 
    <form onSubmit={handleSubmit} className='AddTaskForm'>
       <input type="text" value={task} onChange={setTask}  className='AddTaskForm__input' />
       <button className='AddTaskForm__btn'>Add Task</button>
    </form>
  )
}

export default AddTaskForm