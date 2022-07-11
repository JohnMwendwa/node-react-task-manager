import React, { useContext } from 'react'
import useFormInput from '../hooks/useFormInput';
import { updateTask } from '../services/service';
import {TaskContext} from '../contexts/TaskContext'
import './css/EditTaskForm.css'

function EditTaskForm({task,edit}) {
    const {token,setUpdated} = useContext(TaskContext);
    const [newTask,editTask,resetTask] = useFormInput(task.description);

    const handleSubmit =(e)=>{
        e.preventDefault();
        updateTask(task._id,newTask,token)
         .then(()=>{
           if(newTask !== task.description){
            setUpdated(true);
           }
            resetTask();
            edit(); 
         })
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