import {logoutUser} from '../services/service';
import {useNavigate} from 'react-router-dom';

function Logout() {
  let token = localStorage.getItem('token');
  let navigate = useNavigate();

const handleLogout =()=>{
    if(token){
      logoutUser(token)
      .then(()=>{
        token = localStorage.setItem('token','');
        navigate('/login')
      })
    }
}
  
  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
  }

export default Logout
