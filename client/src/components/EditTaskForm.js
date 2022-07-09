import React from 'react'
import useFormInput from './hooks/useFormInput';
import './css/EditTaskForm.css'

function EditTaskForm({task,edit,updateTask}) {
    const [newTask,editTask,resetTask] = useFormInput(task.description);

    const handleSubmit =(e)=>{
        e.preventDefault();
        try{
            updateTask(task._id,newTask)
        }catch(e){
            console.log(e)
        }
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