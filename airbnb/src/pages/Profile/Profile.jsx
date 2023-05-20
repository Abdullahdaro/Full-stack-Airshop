import React, {useContext} from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { Navigate, useParams } from 'react-router-dom'

const Profile = () => {
    const {ready, user} = useContext(UserContext)

    if (!ready) {
        return 'Loading...'
    }

    if ( ready && !user ) {
        return <Navigate to={'/login'} />
    }

    const {subpage} = useParams();

    console.log(subpage)
    console.log(user)
    
  return (
    <div className='flex justify-center' >

      <div className='justify-center flex items-center flex-col m-10'>
        <div className='bg-white flex items-center py-8 px-6 shadow-md rounded-lg m-10 gap-x-6'>
          <img src={user.avatar} className=' h-[175px] rounded-full w-[175px] ' />
          <div className='flex flex-col gap-y-6 w-[125px]'>
            <span className='font-second text-bond'>Name:</span>
            <span>{user.name}</span>
          </div>
        </div>
        <div>
          <span>{user.name} Confirmed Information</span>
          <div>
            <span>Identity</span>
            <span>Email address</span>
            <span>Phone number</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <span>About me</span>
          <button>Edit Profile</button>
          <span>I speak ....</span>
        </div>
        <div>
          <span>My Shop</span>
          <button>Create Shop</button>
          <button>Edit shop</button>
          <div>
            <span>Shop name:</span>
            <span>Phone number:</span>
            <span>Address:</span>
            <span>City:</span>
            <span>Country:</span>
            <span>Shop description:</span>
          </div>
        </div>
        <div>
          <span>My Products</span>
          <button>Add Product</button> 
          <div>
            //My products
          </div>
        </div>
      </div>
       
    </div>
  )
}

export default Profile