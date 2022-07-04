import React from 'react'
import Task from './Task'

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