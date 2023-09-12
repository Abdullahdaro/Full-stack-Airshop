import React, {useState, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";
import { UserContext } from '../Contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

const login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUser} = useContext(UserContext)
  const { t } = useTranslation("login");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(email,password)
      const {data} = await axios.post('/login', { email,password });
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

  const googleSuccess =  () => {
    window.open("http://localhost:10000/googlelogin", "_self");
  };

  return (
    <div className='mt-4'>
        <h1 className='text-4xl text-center mb-4'>{t("Login")}</h1>
        <form action="" className='max-w-md mx-auto ' onSubmit={handleSubmit}>
          <input type="email" placeholder='Your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
          <button className='primary'>{t("login")}</button>
          <div>
            {t("Don't have an account yet")}? <Link to={'/register'} className='underline text-bold'> {t("Register now")}</Link>
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

export default login