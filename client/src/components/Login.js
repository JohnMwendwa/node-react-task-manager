import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import './css/Login.css'

function Login() {
    const [password, setPassword] = useState('');
    const [email,setEmail] =useState('');
    let navigate = useNavigate();

   const fetchUser = async ()=>{
    const response =  await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({email,password}),
      headers: { 
          'Content-Type': 'application/json',
          'mode':'cors'
      }
    });
    return response.json();
   }


    const handleSubmit = (e) => {
        e.preventDefault()

       fetchUser()
          .then(data =>{
            if(data.error){
              console.log(data.error);
            }else{

              localStorage.setItem('token',`Bearer ${data.token}`);

              setPassword('');
              setEmail('');
              navigate('/dashboard',{replace:true})
            }
           
          })
           .catch(err=>console.log(err))
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
                required
                placeholder='Email'
                className='Login__email'
              />

              <input
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword( e.target.value )}
                required
                placeholder='Password'
                className='Login__password'
              />
        
              <button className='Login__button'>Sign In </button>
          </form>
          <div className="Login__link">
            <p>Don't have an account?
              <Link to='/'>
                    Sign up 
              </Link>
            </p>
          </div>
        
      </div>
      </div>
    )
}

export default Login