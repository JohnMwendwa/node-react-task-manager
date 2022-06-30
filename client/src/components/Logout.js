import { useNavigate } from "react-router-dom";

function Logout() {
    let navigate = useNavigate()
    let token = localStorage.getItem('token');
    
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
    
  return (
    <button onClick={()=>logoutUser()}>Logout</button>
  )
  }

export default Logout
