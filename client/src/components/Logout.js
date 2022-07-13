import { useContext } from 'react';
import {TaskContext} from '../contexts/TaskContext';
import {logoutUser} from '../services/service';
import {useNavigate} from 'react-router-dom';

function Logout() {
  const {token,setToken} = useContext(TaskContext);
  let navigate = useNavigate();

const handleLogout =()=>{
    if(token){
      logoutUser(token);
      setToken('');
      navigate('/login');
    }
}
  
  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
  }

export default Logout
