import React from 'react'
import { Link } from 'react-router-dom'

const MyStorePage = () => {
  return (
    <div>
      <Link className='justify-ceneter items-center' to={'/profile/mystore/add'}> 
        Add a new product
      </Link>
      <div>
        my store
      </div>
    </div>
  )
}

export default MyStorePage