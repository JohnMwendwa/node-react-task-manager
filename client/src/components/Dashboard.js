import { useEffect, useState } from "react";
import Logout from "./Logout";
import Footer from "./Footer";
import'./css/Dashboard.css'

function Dashboard() {
    const [tasks,setTasks] = useState([]);
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const token = localStorage.getItem('token');


    useEffect(()=>{
      const getUser = async ()=>{
        const user =  await fetch('/users/me',{
             method:'GET',
             headers:{
             'Content-Type': 'application/json',
             'Authorization':token
         }
         });
         return user.json();
     }
  
     const getTasks = async ()=>{
      const tasks = await fetch('/tasks',{
            method:'GET',
            headers:{
            'Content-Type': 'application/json',
            'Authorization':token
        }
        })
      
        return tasks.json();
    }
      getUser()
       .then(data=> {
          setUsername(data.name);
          setEmail(data.email)
      })
       .catch(err=>console.log(err));

       getTasks()
       .then(data=>{
         setTasks(data)
     })
       .catch(err=>console.log(err))
    },[token])

  return (
    <div className="Dashboard">

      <div className="Dashboard__header">
          <nav className="Dashboard__nav">
              <div className="Dashboard__username"> {username}</div>
              <div className="Dashboard__email"> {email}</div>
              <Logout />
            </nav>
      </div>

    <div className="Dashboard__content">
        <h1 className="Dashboard__title">Tasks</h1>
        <ul className="Dashboard__lists">
        {tasks.map(task=>
        <li key={task._id} className='Dashboard__list'>
          {task.description}
          </li>)}
          </ul>
    </div>

    <Footer />
    </div>
  )
}

export default Dashboard