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
    <div>
        <header className='px-2 flex justify-between'>
            {/* logo */}
            <Link to={'/'} className="flex items-center">
                <img src={logo} className='h-25 w-[25px]' />
                <span className='font-main text-xl'>Airdrop clothes</span>
            </Link>
            {/* middle */}
            <div className='flex gap-2 py-2 px-2  shadow-gray-300 '>
              <div className='font-main text-[24px] px-8 flex items-center gap-2'>
                City
                <img src={down} className='w-[10px] h-[10px] mt-2' />

              </div>
              <div className="border-l border-gray-300"></div>
              <div className='font-main text-[24px] px-8 flex items-center gap-2'>
                Season
                <img src={down} className='w-[10px] h-[10px] mt-2' />
              </div>
            </div>
            {/* last */}
            <div className="flex gap-2 items-center py-2 px-4">
            <div className='font-main text-[20px] px-2'>language</div>
            <div className='font-main text-[20px] px-4'>Favourite</div>
            
            {user ? (
                <div className='relative' ref={userMenuRef}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className='items-center focus:outline-none'
                  >
                    <img src={profileuser} className='w-[25px]' />
                    <div className='text-xs'>{user.name}</div>
                  </button>
                  {showMenu && (
                    <ul className='absolute top-8 right-0 z-50 w-40 bg-white rounded-md shadow-lg py-1'>
                      <li>
                        <Link to='/profile' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to='/liked-posts' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          Liked Posts
                        </Link>
                      </li>
                      <li>
                        <Link to='/my-store' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          My Store
                        </Link>
                      </li>
                      <li>
                        <button to='/my-store' onClick={() => setShowMenu(false)} className='block px-4 border hover:bg-gray-100'>
                        </button>
                      </li>
                      <li>
                        <div to='/my-store' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          <button onClick={logout} className='justify-start block w-full text-left'>Log out</button>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link to={'/login'} className='text-pink font-main text-[20px]'>
                  Log in
                </Link>
              )}
            </div>
        </header>
        <div className='border '></div>
    </div>
  )
}

export default Navbar
