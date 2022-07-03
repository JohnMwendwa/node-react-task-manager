import React from 'react'
import useFormInput from './hooks/useFormInput';

function EditTaskForm({task,edit}) {
    const [oldTask,updateTask,resetTask] = useFormInput(task.description);
const token = localStorage.getItem('token')

    const handleSubmit =(e)=>{
        e.preventDefault();
        try{
            const updateTask =async()=>{
                await fetch(`/tasks/${task._id}`,{
                    method:'PATCH',
                    body:JSON.stringify({description:oldTask}),
                    headers:{
                    'Content-Type':'application/json',
                    'Authorization':token  
                 }
                });
            }
            updateTask()
        }catch(e){
            console.log(e)
        }
        resetTask();
        edit(); 
    }
  return (
   <form onSubmit={handleSubmit}>
    <input type="text"  value={oldTask} onChange={updateTask}/>
    <button >Save</button>
   </form>
  )
}

export default EditTaskForm