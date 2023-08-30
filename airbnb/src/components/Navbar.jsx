import React, { useContext, useState, useEffect, useRef  } from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'
import down from '../assets/down.png'
import russia from '../assets/russia.png'
import saudi from '../assets/saudi.png'
import turkey from '../assets/turkey.png'
import united from '../assets/united.png'
import profileuser from '../assets/profileuser.png'
import { UserContext } from '../Contexts/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
  const {user, setUser, selectedCountry, setSelectedCountry, selectedCity, setSelectedCity } = useContext(UserContext)
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuLangauge, setShowMenuLangauge] = useState(false)
  const [setshowcity, setSetshowcity] = useState(false)
  const [setshowcountry, setSetshowcountry] = useState(false)
  const navTo = useNavigate();
  const { t, i18n } = useTranslation("navbar");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };

  const handleCitySelection = (city) => {
    setSelectedCity(city);
  };

  async function logout() {
    await axios.post('/logout')
    setUser(null);
    navTo('/')
  }

  const userMenuRef = useRef();
  const userMenuLangaugeRef = useRef();
  const userMenuCityRef = useRef();
  const userMenuCountryRef = useRef();


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
      if (
        userMenuLangaugeRef.current &&
        !userMenuLangaugeRef.current.contains(event.target)
      ) {
        setShowMenuLangauge(false);
      }
      if (
        userMenuCountryRef.current &&
        !userMenuCountryRef.current.contains(event.target)
      ) {
        setSetshowcountry(false);
      }
      if (
        userMenuCityRef.current &&
        !userMenuCityRef.current.contains(event.target)
      ) {
        setSetshowcity(false);
      }
    };
    document.addEventListener('click', handleClick);
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    // Add an event listener to handle screen width changes
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSetshowcountry(false);
        setSetshowcity(false);
      }
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  return (
    <div className=''>
        <header className=' flex justify-between md:px-6' >
            {/* logo */}
            <Link to={'/'} className="flex items-center">
                <img src={logo} className='h-25 w-[25px]' />
                <span className='font-second xs:text-sm md:text-xl'>Air TopTan</span>
            </Link>
            {/* middle */}
            <div className='flex shadow-gray-300 '>
              <div className='font-main xs:text-sm md:text-[18px] xs:px-2 md:px-8 flex items-center' ref={userMenuCountryRef}>
                <button className='flex items-center gap-2' onClick={() => setSetshowcountry(!setshowcountry)}>
                  {t("Country")}
                  <img src={down} className='md:w-[8px] md:h-[8px] xs:w-[6px] xs:h-[6px]' />
                </button>
                {setshowcountry && (
                  <ul className='absolute top-12 right-100 z-50 w-40 bg-white rounded-md shadow-lg py-1' >
                    <li className='hover:cursor-pointer m-1 hover:bg-gray-100 flex justify-center items-center' onClick={() =>{setSetshowcountry(false); handleCountrySelection('Turkey')}}>
                      <img className='w-8 h-8' src={turkey} />
                      <span className='px-4'>{t("Turkey")}</span>
                    </li>
                    <li className='hover:cursor-pointer m-1 hover:bg-gray-100 flex justify-center items-center' onClick={() =>{setSetshowcountry(false); handleCountrySelection('All')}}>
                      <span>{t("All")}</span>
                    </li>
                  </ul>
                )}
              </div>
              {/* <div className="border-l border-gray-300"></div> */}
              <div className='font-main xs:text-sm md:text-[18px] xs:px-2 md:px-8 flex items-center' ref={userMenuCityRef}>
                <button className='flex items-center gap-2' onClick={() => setSetshowcity(!setshowcity)}>
                    {t("City")}
                    <img src={down} className='md:w-[8px] md:h-[8px] xs:w-[6px] xs:h-[6px]' />
                </button>
                {setshowcity && (
                  <ul className='absolute top-12 right-100 z-50 w-40 bg-white rounded-md shadow-lg py-1' >
                      <li className='hover:cursor-pointer m-1 hover:bg-gray-100 flex justify-center items-center' onClick={() =>{setSetshowcountry(false); setSetshowcity(false); handleCitySelection('Istanbul')}}>
                        <span>{t("Istanbul")}</span>
                      </li>
                      <li className='hover:cursor-pointer m-1 hover:bg-gray-100 flex justify-center items-center' onClick={() =>{setSetshowcity(false); handleCountrySelection('All')}}>
                      <span>{t("All")}</span>
                    </li>
                    </ul>
                  )}  
                </div>
            </div>
            {/* last */}
            <div className="flex items-center py-2" ref={userMenuLangaugeRef}>
              <button className='text-main text-[16px]' onClick={() => setShowMenuLangauge(!showMenuLangauge)}>
                <FontAwesomeIcon className='text-pink text-2xl' icon={faLanguage} /> 
              </button>
              {showMenuLangauge && (
                <ul className='absolute top-8 right-0 z-50 w-40 bg-white rounded-md shadow-lg py-1' >
                  <li className='hover:cursor-pointer m-1 hover:bg-gray-100 flex justify-start items-center' onClick={()  => {setShowMenuLangauge(false); i18n.changeLanguage('ru') }}>
                    <img className='w-8 h-8' src={russia} />
                    <span className='px-4'>{t("Russian")}</span>
                  </li>
                  <li className='hover:cursor-pointer m-1 hover:bg-gray-100 flex justify-start items-center' onClick={() => {setShowMenuLangauge(false); changeLanguage('tr') }}>
                    <img className='w-8 h-8' src={turkey} />
                    <span className='px-4'>{t("Turkish")}</span>
                  </li>
                  <li className='hover:cursor-pointer m-1 hover:bg-gray-100 flex justify-start items-center' onClick={() => {setShowMenuLangauge(false); changeLanguage('en') }}>
                    <img className='w-8 h-8' src={united} />
                    <span className='px-4'>{t("English")}</span>
                  </li>
                </ul>
              )}
            
           
            {user ? (
                <div className='relative' ref={userMenuRef}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className='items-start pl-2 pr-8 w-full justify-center focus:outline-none'
                  >
                    {/* <img src={profileuser} className=' w-full mx-4 items-start h-8' /> */}
                    <FontAwesomeIcon className='text-pink text-2xl pl-4 text-light' icon={faUser} />
                  </button>
                  {showMenu && (
                    <ul className='absolute top-8 right-0 z-50 w-40 bg-white rounded-md shadow-lg py-1'>
                      <li>
                        <Link to='/profile' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          {t("Profile")}
                        </Link>
                      </li>
                      <div className='border opacity-20 border-black '></div>
                      <li>
                        <Link to='/profile/liked' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          {t("Liked Posts")}
                        </Link>
                      </li>
                      <li>
                        <Link to='/profile/liked' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          {t("Places I've been")}
                        </Link>
                      </li>
                      <li>
                        <Link to='/profile/mystore' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          {t("My Store")}
                        </Link>
                      </li>
                      <div className='border opacity-20 border-black '></div>
                      <li>
                        <div to='/my-store' onClick={() => setShowMenu(false)} className='block px-4 py-2 hover:bg-gray-100'>
                          <button onClick={logout} className='justify-start block w-full text-left'>{t("Log Out")}</button>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link to={'/login'} className='text-pink font-main font-bold w-full text-[16px] bg-secondary p-2 rounded-full'>
                  {t("Log In")}
                </Link>
              )}
            </div>
        </header>
        <div className='border font-main border-black '></div> 
    </div>
  )
}

export default Navbar
