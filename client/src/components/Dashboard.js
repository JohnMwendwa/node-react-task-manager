import { useEffect, useState } from "react";
import Logout from "./Logout";

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
    <div>
    <nav>
        <div> {username}</div>
        <div> {email}</div>
        <Logout />
    </nav>
    <h1>Tasks</h1>
    {tasks.map(task=><li key={task._id}>{task.description}</li>)}
    </div>
  )
}

export default Dashboard