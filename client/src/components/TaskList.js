import React from 'react'
import Task from './Task'
import './css/TaskList.css'

function TaskList({tasks,updateTask}) {
  return (
    <div className='TaskList'>
     <ul className="TaskList__lists">
        {tasks.map(task=>
              <Task key={task._id} task={task} updateTask={updateTask}/>)}
          </ul>
    </div>
  )
}

export default TaskList