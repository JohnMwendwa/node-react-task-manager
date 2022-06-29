import { useEffect, useState } from "react";
import Logout from "./Logout";
import'./css/Dashboard.css'

function Dashboard() {
    const [tasks,setTasks] = useState([]);
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const token = localStorage.getItem('token');

    useEffect(()=>{
        const getUser = async ()=>{
            await fetch('http://localhost:3000/users/me',{
               method:'GET',
               headers:{
               'Authorization':token
           }
           }).then(res=>res.json())
             .then(data=> {
                setUsername(data.name);
                setEmail(data.email)
            })
       }
   
       const getTasks = async ()=>{
            await fetch('http://localhost:3000/tasks',{
               method:'GET',
               headers:{
               'Authorization':token
           }
           }).then(res=>res.json())
             .then(data=>setTasks(data))
   
       }

        getUser();
        getTasks()
    },[token])

  return (
    <div className="Dashboard">
    <nav className="Dashboard__nav">
        <div className="Dashboard__username"> {username}</div>
        <div className="Dashboard__email"> {email}</div>
        <Logout />
    </nav>
    <h1 className="Dashboard__title">Tasks</h1>
    <ul className="Dashboard__lists">
    {tasks.map(task=>
    <li key={task._id} className='Dashboard__list'>
      {task.description}
      </li>)}
      </ul>
    </div>
  )
}

export default Dashboard