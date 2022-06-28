import React,{useState} from 'react'

function Signup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail] =useState('');
    
    return (
      <form >
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
    )
}

export default Signup