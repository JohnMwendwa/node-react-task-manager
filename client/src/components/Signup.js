import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Signup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail] =useState('');
    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:3000/users', {
          method: 'POST',
          body: JSON.stringify({email,password,name}),
          headers: { 
              'Content-Type': 'application/json',
              'mode':'cors'
          },
        })
          .then(res => res.json())
          .then(data =>
            localStorage.setItem('token',`Bearer ${data.token}`));

        setName('');
        setPassword('');
        setEmail('');
        navigate('/dashboard',{replace:true})
      }
    
    return (
     <div>
      <Navbar />

       <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={name}
          onChange={e => setName(e.target.value )}
          placeholder='Username'
        />
   
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
  
        <button>Signup</button>
      </form>
     </div>
    )
}

export default Signup