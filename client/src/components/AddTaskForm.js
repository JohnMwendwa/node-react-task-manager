import React from 'react'
import useFormInput from './hooks/useFormInput'

function AddTaskForm() {
const [task,setTask,resetTask] = useFormInput('');
const token = localStorage.getItem('token');

const handleSubmit =(e)=>{
    e.preventDefault();
    try{
        const postTask =async ()=>{
            await fetch('/tasks',{
                method:'POST',
                body:JSON.stringify({description:task}),
                headers:{
                    'Authorization': token,
                    'Content-Type':'application/json'
             }
             }); 
             
         }
         postTask()
     
    }catch(e){
        console.log(e)
    }
    resetTask()
}

  return ( 
    <form onSubmit={handleSubmit}>
       <input type="text" value={task} onChange={setTask}  />
       <button>Add Task</button>
    </form>
  )
}

export default AddTaskForm