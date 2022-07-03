import React from 'react'

function Task({task}) {
  return (
    <div>
        <li>{task.description}</li>
        <button>Edit</button>
        <button>Delete</button>
    </div>
  )
}

export default Task