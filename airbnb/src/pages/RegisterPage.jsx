import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import jwt_decode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

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

    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: '720003670148-2rqupqrote7bc33kimqdq0a3lkq68ea3.apps.googleusercontent.com',
          scope: 'email',
        });
      }
  
      gapi.load('client:auth2', start);
    }, []);

    const googleSuccess =  () => {
      window.open("http://localhost:4000/googlelogin", "_self");
    };

    const googleFailure = (error) => {
      console.log(error);
    }

  return (
    <div className='mt-4'>
        <h1 className='text-4xl text-center mb-4'>Sign up</h1>
        <form onSubmit={registerUser} action="" className='max-w-md mx-auto '>
          <input type="text" placeholder='Your name' value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder='Your@email.com' value={email} onChange={ e => setEmail(e.target.value)}/>
          <input type="password" placeholder='password' value={password} onChange={ e => setPassword(e.target.value)} />
          <button className='primary'>Sign up</button>
          <div>
            Do you have an account? <Link to={'/Login'} className='underline text-bold'> Log in</Link>
          </div>
        </form>
        <div className="flex items-center justify-center mt-6">
          <div
            className="flex items-center border px-5 bg-primary rounded-md shadow-sm py-2 font-medium text-white hover:bg-pink focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer focus:ring-indigo-500"
            onClick={googleSuccess}
          >
            <FontAwesomeIcon className='pr-4' icon={faGoogle} />
            Google
          </div>
        </div>
    </div>
  )
}

export default RegisterPage