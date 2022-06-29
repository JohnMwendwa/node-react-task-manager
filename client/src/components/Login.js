import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
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
      <div className="Login__wrap">
        <h2>Login</h2>
          <form onSubmit={handleSubmit} className='Login__form'>
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value )}
                placeholder='Email'
                className='Login__email'
              />

              <input
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword( e.target.value )}
                placeholder='Password'
                className='Login__password'
              />
        
              <button className='Login__button'>Sign In </button>
          </form>
          <Link to='/'>
        <p>Don't have an account? Sign up</p>
        </Link>
      </div>
      </div>
    )
}

export default Login