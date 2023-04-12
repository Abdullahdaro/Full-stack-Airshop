import React, {useState, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";
import { UserContext } from '../Contexts/UserContext';

const login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUser} = useContext(UserContext)
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(email,password)
      const {data} = await axios.post('/login', { email,password }, { withCredentials: true });
      setUser(data)
      alert('Login Successful')
      setRedirect(true)
    } catch (error) {
      console.log(error)
      alert('Login failed')
    }
  }
  
  if (redirect) { 
    return < Navigate to={'/'} />
  }

  return (
    <div className='mt-4'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form action="" className='max-w-md mx-auto ' onSubmit={handleSubmit}>
          <input type="email" placeholder='Your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
          <button className='primary'>login</button>
          <div>
            Don't have an account yet? <Link to={'/register'} className='underline text-bold'> Register now</Link>
          </div>
        </form>
    </div>
    
  )
}

export default login