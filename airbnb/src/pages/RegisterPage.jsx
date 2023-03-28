import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const RegisterPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

  return (
    <div className='mt-4'>
        <h1 className='text-4xl text-center mb-4'>Sign up</h1>
        <form action="" className='max-w-md mx-auto '>
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