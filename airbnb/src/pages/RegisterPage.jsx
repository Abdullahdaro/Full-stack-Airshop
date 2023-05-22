import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { GoogleLogin } from 'react-google-login';

const RegisterPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    async function registerUser(e) {
      e.preventDefault();
      try {
        await axios.post('/register' , {
            name,
            email,
            password,
        });
        alert('Registration successful. Now you can log in') 
      } catch (error) {
        alert ('Registration failed. Please try again later')
      }
      
    }

    const responseGoogle = (response) => {
      // Handle the response from Google login
      // Pass the response to your backend for verification and registration
      // You can call the handleGoogleRegistration function mentioned in the previous response here
    };

    const googleSuccess = async (res) => {
       console.log(res);  
    }

    const googleFailure = (error) => {
      console.log(error);
    }

  return (
    <div className='mt-4'>
        <h1 className='text-4xl text-center mb-4'>Sign up</h1>
        <GoogleLogin
          clientId="720003670148-2rqupqrote7bc33kimqdq0a3lkq68ea3.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='bg-red-500 text-white px-4 py-2 rounded-md'>Login with Google</button>
          )}
        />
        <form onSubmit={registerUser} action="" className='max-w-md mx-auto '>
          <input type="text" placeholder='Your name' value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder='Your@email.com' value={email} onChange={ e => setEmail(e.target.value)}/>
          <input type="password" placeholder='password' value={password} onChange={ e => setPassword(e.target.value)} />
          <button className='primary'>Sign up</button>
          <div>
            Do you have an account? <Link to={'/Login'} className='underline text-bold'> Log in</Link>
          </div>
        </form>
    </div>
  )
}

export default RegisterPage