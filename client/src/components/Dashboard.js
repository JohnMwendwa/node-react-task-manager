import { useEffect, useState } from "react";
import Logout from "./Logout";
import Footer from "./Footer";
import'./css/Dashboard.css'
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import {getUser} from '../services/service';

function Dashboard() {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [userId,setUserId] = useState('');
    const token = localStorage.getItem('token');

    useEffect(()=>{
      if(!token){
        return 
      }
      getUser(token)
       .then(data=> {
          setUsername(data.name);
          setEmail(data.email);
          setUserId(data._id);
      })
       .catch(err=>console.log(err));

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
              <Logout />
            </div>   
            </nav>
      </div>

    <div className="Dashboard__content">
        <h1 className="Dashboard__title">Tasks</h1>
          <TaskList />
          <AddTaskForm  />
    </div>

    <Footer />
    </div>
  )
}

export default Dashboard