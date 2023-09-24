import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { gapi } from "gapi-script";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const { t } = useTranslation("register");
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
      window.open("https://airshop-top-tan.onrender.com/googlelogin", "_self");
    };

    const googleFailure = (error) => {
      console.log(error);
    }

  return (
    <div className='mt-4'>
        <h1 className='text-4xl text-center mb-4'>{t("Sign up")}</h1>
        <form onSubmit={registerUser} action="" className='max-w-md mx-auto '>
          <input type="text" placeholder='Your name' value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder='John@email.com' value={email} onChange={ e => setEmail(e.target.value)}/>
          <input type="password" placeholder='password' value={password} onChange={ e => setPassword(e.target.value)} />
          <button className='primary'>{t("Sign up")}</button>
          <div>
            {t("Do you have an account")}? <Link to={'/Login'} className='underline text-bold'> {t("Log in")}</Link>
          </div>
        </form>
        <div className="flex items-center justify-center mt-6">
          <div
            className="flex items-center border px-5 bg-primary rounded-md shadow-sm py-2 font-medium text-white hover:bg-pink focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer focus:ring-indigo-500"
            onClick={googleSuccess}
          >
            <FontAwesomeIcon className='pr-4' icon={faGoogle} />
            {t("Google")}
          </div>
        </div>
    </div>
  )
}

export default RegisterPage