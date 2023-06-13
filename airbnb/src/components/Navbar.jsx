import React, { useContext, useState, useEffect, useRef  } from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'
import down from '../assets/down.png'
import profileuser from '../assets/profileuser.png'
import { UserContext } from '../Contexts/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {user, setUser} = useContext(UserContext)
  const [showMenu, setShowMenu] = useState(false);
  const navTo = useNavigate();

  async function logout() {
    await axios.post('/logout')
    setUser(null);
    navTo('/')
  }

  const userMenuRef = useRef();

  // for user prop
  useEffect(() => {
    const handleClick = (event) => {
      // Check if the click is outside the user menu
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', handleClick);
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  
  return (
    <div className=''>
        <header className=' flex justify-between'>
            {/* logo */}
            <Link to={'/'} className="flex items-center">
                <img src={logo} className='h-25 w-[25px]' />
                <span className='font-second text-xl'>Air TopTan</span>
            </Link>
            {/* middle */}
            <div className='flex shadow-gray-300 '>
              <div className='font-main text-[18px] px-8 flex items-center gap-2'>
                Country
                <img src={down} className='w-[8px] h-[8px]' />
              </div>
              <div className="border-l border-gray-300"></div>
              <div className='font-main text-[18px] px-8 flex items-center gap-2'>
                City
                <img src={down} className='w-[8px] h-[8px]' />
              </div>
            </div>
            {/* last */}
            <div className="flex gap-2 items-center py-2 pr-2">
            <div className='text-main text-[16px] px-6'>language</div>
           
            {user ? (
                <div className='relative' ref={userMenuRef}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className='items-center focus:outline-none'
                  >
                    <img src={profileuser} className='w-[25px]' />
                    <div className='text-xs text-pink font-main'>{user.name}</div>
                  </button>
                  {showMenu && (
                    <ul className='absolute top-8 right-0 z-50 w-40 bg-white rounded-md shadow-lg py-1'>
                      <li>
                        <Link to='/profile' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          Profile
                        </Link>
                      </li>
                      <div className='border opacity-20 border-black '></div>
                      <li>
                        <Link to='/profile/liked' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          Liked Posts
                        </Link>
                      </li>
                      <li>
                        <Link to='/profile/liked' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          Places I've been
                        </Link>
                      </li>
                      <li>
                        <Link to='/profile/mystore' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          My Store 
                        </Link>
                      </li>
                      <div className='border opacity-20 border-black '></div>
                      <li>
                        <div to='/my-store' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          <button onClick={logout} className='justify-start block w-full text-left'>Log out</button>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link to={'/login'} className='text-pink font-main font-bold text-[16px] bg-secondary p-2 rounded-full'>
                  Log In
                </Link>
              )}
            </div>
        </header>
        <div className='border font-main opacity-20 border-black '></div>
    </div>
  )
}

export default Navbar
