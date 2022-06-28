import React,{useState} from 'react'

function Login() {
    const [password, setPassword] = useState('');
    const [email,setEmail] =useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:3000/users', {
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
      }
    
    return (
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
    )
}

export default Login