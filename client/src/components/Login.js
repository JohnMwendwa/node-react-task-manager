import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './css/Login.css'

function Login() {
    const [password, setPassword] = useState('');
    const [email,setEmail] =useState('');
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          body: JSON.stringify({email,password}),
          headers: { 
              'Content-Type': 'application/json',
              'mode':'cors'
          },
        })
          .then(res => res.json())
          .then(data =>
            localStorage.setItem('token',`Bearer ${data.token}`));

        setPassword('');
        setEmail('');
        navigate('/dashboard',{replace:true})
      }
    
    return (
      <div>
        <Navbar />

        <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value )}
          placeholder='Email'
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword( e.target.value )}
          placeholder='Password'
        />
  
        <button>Login</button>
      </form>
      </div>
    )
}

export default Login