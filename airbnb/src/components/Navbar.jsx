import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'
import down from '../assets/down.png'

const Navbar = () => {
  return (
    <div>
        <header className='px-2 flex justify-between'>
            {/* logo */}
            <a href="" className="flex items-center">
                <img src={logo} className='h-25 w-[25px]' />
                <span className='font-main text-xl'>Airdrop clothes</span>
            </a>
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

            <span className='text-pink font-main text-[20px]'>Log in </span>
            </div>
        </header>
        <div className='border '></div>
    </div>
  )
}

export default Navbar
