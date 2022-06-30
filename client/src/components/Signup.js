import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import './css/Signup.css'

function Signup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail] =useState('');
    const [error,setError] =useState(null);
    let navigate = useNavigate();

    const createUser = async ()=>{
     const response = await fetch('/users', {
        method: 'POST',
        body: JSON.stringify({email,password,name}),
        headers: { 
            'Content-Type': 'application/json',
            'mode':'cors'
        }
      });
      return await response.json();
      
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
       createUser()
        .then(data=>{
        
          if(data.error.message){
            setError(data.error.message)
            setTimeout(() => {
              setError(null)
            }, 5000);
          }else if(data.error.index === 0){
            setError('Email already exists!')
            setTimeout(() => {
              setError(null)
            }, 5000);
          }else{
            localStorage.setItem('token',`Bearer ${data.token}`);
            setError(null);
            setName('');
            setPassword('');
            setEmail('');
            navigate('/dashboard',{replace:true})
          }
          
        })
        .catch(err=>{
          setError('Network Error!');
          setTimeout(() => {
            setError(null)
          }, 5000);
        })
       
      }
    
    return (
     <div>
      <div className="Signup__wrapper">
        <h2>Sign Up</h2>

        {error && <p className='Signup__error'>{error}</p>}

       <form onSubmit={handleSubmit} className='Signup__form'>
        <input
          type="text"
          name="username"
          value={name}
          onChange={e => setName(e.target.value )}
          placeholder='Username'
          className='Signup__username'
          required
        />
   
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value )}
          placeholder='Email'
          className='Signup__email'
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword( e.target.value )}
          placeholder='Password'
          className='Signup__password'
          required
        />
  
        <button className='Signup__button'>Create Account</button>
      </form>
      <div className="Signup__link">
        <p>Already have an account? 
          <Link to='/login'>
             Login
          </Link>
        </p>
      </div>
      </div>
     </div>
    )
}

export default Signup