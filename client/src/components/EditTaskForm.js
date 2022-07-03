import React from 'react'
import useFormInput from './hooks/useFormInput';

function EditTaskForm({task}) {
    const [oldTask,updateTask,resetTask] = useFormInput(task.description);
  return (
   <form >
    <input type="text"  value={oldTask} onChange={updateTask}/>
    <button onClick={resetTask}>Save</button>
   </form>
  )
}

export default EditTaskForm