import React from 'react'
import useFormInput from './hooks/useFormInput';

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
   <form onSubmit={handleSubmit}>
    <input type="text"  value={newTask} onChange={editTask}/>
    <button >Save</button>
   </form>
  )
}

export default EditTaskForm