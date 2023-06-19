import React, {useContext} from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { Navigate, useParams, Link } from 'react-router-dom'

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
    <div className='flex justify-center h-screen' >
      
      <div className=' flex items-center flex-col mt-10 w-[50%] ml-20'>
        <div className='bg-white flex items-center py-8 px-6 shadow-md rounded-3xl my-10 gap-x-6'>
          <img src={user.avatar} className=' h-[125px] rounded-full w-[125px] ' />
          <div className='flex flex-col gap-y-6 w-[125px]'>
            <span className='font-second text-bond'>Name:</span>
            <span className='font-second font-semibold'>{user.name}</span>
          </div>
        </div>
        <div className='flex justify-center items-start flex-col m-10 rounded-3xl w-[45%] border px-6 gap-4 py-10'>
          <span className='text-xl font-second font-semibold'>{user.name} Confirmed Information:</span>
          <div className=' flex flex-col ml-2 gap-2 '>
            <span>Identity</span>
            <span>Email address</span>
            <span>Phone number</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col mt-10 w-[70%]'>
        <div className='flex flex-col mt-10'>
          <span className='font-red-hat-display font-semibold text-2xl leading-10 text-black '>
            About me:
          </span>
          <div className='inline-flex'>
            <button className=' rounded-full py-4 justify-start flex'>
              <span className='box-border bg-white hover:bg-pink hover:text-white shadow-xl text-xl border inline-flex px-4 py-2 font-second border-black rounded-full items-center'>
                Edit profile
              </span>
            </button>
          </div>
          <span>
            I speak ....
          </span>
          <div className='border border-pink opacity-60 mr-60 my-10 '></div>
        </div>
        <div className='flex flex-col'>
          <span className='font-red-hat-display font-semibold text-2xl leading-10 text-black '>My Shop</span>
          <div className='inline-flex'>
            <button className='rounded-full py-4 justify-start flex'>
              <Link to={'/shop'} className='box-border bg-white hover:bg-pink hover:text-white shadow-xl text-xl border inline-flex px-4 py-2 font-second border-black rounded-full items-center'>
                Create shop
              </Link>
            </button>
            <button className=' rounded-full py-4 justify-start flex'>
              <span className='box-border bg-white hover:bg-pink hover:text-white shadow-xl text-xl border inline-flex px-4 py-2 font-second border-black rounded-full items-center'>
                Edit shop
              </span>
            </button>
          </div>
          <div className='flex flex-col'>
            <span>Shop name:</span>
            <span>Phone number:</span>
            <span>Address:</span>
            <span>City:</span>
            <span>Country:</span>
            <span>Shop description:</span>
          </div>
          <div className='border border-pink opacity-60 mr-60 my-10 '></div>
        </div>
        <div className='flex flex-col'>
          <span className='font-red-hat-display font-semibold text-2xl leading-10 text-black' >My Products</span>
          <div className='inline-flex'>
             
          </div>
          <div>
            //My products
          </div>
        </div>
      </div>
       
    </div>
  )
}

export default Profile