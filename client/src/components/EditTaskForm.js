import React from 'react'
import useFormInput from '../hooks/useFormInput';
import { updateTask } from '../services/service';
import './css/EditTaskForm.css'

function EditTaskForm({task,edit}) {
    const [newTask,editTask,resetTask] = useFormInput(task.description);
    const token = localStorage.getItem('token');

    const handleSubmit =(e)=>{
        e.preventDefault();
        updateTask(task._id,newTask,token)
        resetTask();
        edit(); 
    }
  return (
   <form onSubmit={handleSubmit} className='EditTaskForm'>
    <input 
    className='EditTaskForm__input'
    type="text"  
    value={newTask} 
    onChange={editTask}/>
    <button className='EditTaskForm__btn'>
        Save
    </button>
   </form>
  )
}

export default EditTaskForm