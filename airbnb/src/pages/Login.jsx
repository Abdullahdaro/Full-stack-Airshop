import React from 'react'
import { Link } from 'react-router-dom'

const login = () => {
  return (
    <div className='mt-4'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form action="" className='max-w-md mx-auto '>
          <input type="email" placeholder='Your@email.com' />
          <input type="password" placeholder='password' />
          <button className='primary'>login</button>
          <div>
            Don't have an account yet? <Link to={'/register'} className='underline text-bold'> Register now</Link>
          </div>
        </form>
    </div>
    
  )
}

export default login