import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import Footer from "./Footer";
import'./css/Dashboard.css'
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

function Dashboard() {
    const [tasks,setTasks] = useState([]);
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [userId,setUserId] = useState('');
    const token = localStorage.getItem('token');
    let navigate = useNavigate()

    const createTask =async (newTask)=>{
      await fetch('/tasks',{
          method:'POST',
          body:JSON.stringify({description:newTask}),
          headers:{
              'Authorization': token,
              'Content-Type':'application/json'
       }
       }); 
       
   }

  const updateTask =async(id,newTask)=>{
    await fetch(`/tasks/${id}`,{
        method:'PATCH',
        body:JSON.stringify({description:newTask}),
        headers:{
        'Content-Type':'application/json',
        'Authorization':token  
     }
    });
}


    const logoutUser = async ()=>{
      await fetch('/users/logoutAll', {
          method:'POST',
          headers:{
              'Content-Type': 'application/json',
              'Authorization': token,
              'mode':'cors'
          }
      });
      localStorage.setItem('token','')
      navigate('/login')
  }   
    

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
          setEmail(data.email);
          setUserId(data._id)
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
            <div className="Dashboard__img">
              <img src={`/users/${userId}/avatar`} alt='' />
            </div>

            <div className="Dashboard__details">
            <div className="Dashboard__username"> {username}</div>
              <div className="Dashboard__email"> {email}</div>
              <Logout  logoutUser={ logoutUser} />
            </div>   
            </nav>
      </div>

    <div className="Dashboard__content">
        <h1 className="Dashboard__title">Tasks</h1>
          <TaskList tasks={tasks} updateTask={updateTask}  />
          <AddTaskForm  createTask={createTask} />
    </div>

    <Footer />
    </div>
  )
}

export default Dashboard