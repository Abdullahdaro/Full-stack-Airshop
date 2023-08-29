import React, {useContext, useState,  useEffect} from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { Navigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const Profile = () => {
    const {ready, user} = useContext(UserContext)
    const [shopData, setShopData] = useState([]);
    const [photoid, setPhotoid] = useState(null);
    const { t } = useTranslation('profile');

    useEffect(() => {
      axios.get('/shops').then(({ data }) => {
          setShopData(data);
        }).catch(err => {
          console.log(err);
        });
    }, []);

    if (!ready) {
        return 'Loading...'
    }

    if ( ready && !user ) {
        return <Navigate to={'/login'} />
    }

    console.log(shopData);
    
  return (
    <div className='flex justify-center h-screen' >
      
      <div className=' flex items-center flex-col mt-10 w-[50%] ml-20'>
        <div className='bg-white flex items-center py-8 px-6 shadow-md rounded-3xl my-10 gap-x-6'>
          {photoid !== null ? (
             <img src={user.avatar} className=' h-[125px] rounded-full w-[125px] ' />
            ) : (
              <button className='h-[125px] w-[125px]'> <span className='hover:bg-pink hover:text-white px-4 py-3 border border-pink rounded-3xl font-bold'>{t("Add photo")}</span> </button>
            )}
          <div className='flex flex-col gap-y-6 w-[125px]'>
            <span className='font-second text-bond'>{t("Name")}:</span>
            <span className='font-second font-semibold'>{user.name}</span>
          </div>
        </div>
        <div className='flex justify-center items-start flex-col m-10 rounded-3xl w-[45%] border px-6 gap-4 py-10'>
          <span className='text-xl font-second font-semibold'>{user.name} {t("Confirmed Information")}:</span>
          <div className=' flex flex-col ml-2 gap-2 '>
            <span>{t("Identity")}</span>
            <span>{t("Email address")}</span>
            <span>{t("Phone number")}</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col mt-10 w-[70%]'>
        <div className='flex flex-col mt-10'>
          <span className='font-red-hat-display font-semibold text-2xl leading-10 text-black '>
           {t("About me")}:
          </span>
          <div className='inline-flex'>
            <button className=' rounded-full py-4 justify-start flex'>
              <span className='box-border bg-white hover:bg-pink hover:text-white shadow-xl text-xl border inline-flex px-4 py-2 font-second border-black rounded-full items-center'>
                {t("Edit profile")}
              </span>
            </button>
          </div>
          <span>
            {t("I speak")} ....
          </span>
          <div className='border border-pink opacity-60 mr-60 my-10 '></div>
        </div>
        <div className='flex flex-col'>
          <span className='font-red-hat-display font-semibold text-2xl leading-10 text-black '>{t("My Shop")}</span>
          <div className='inline-flex justify-between'>
            <div className='rounded-full py-4 flex'>
              {shopData !== null && shopData.length === 0 ? (
                    <Link
                        to={'/shop'}
                        className='box-border bg-white hover:bg-gray-100 shadow-xl text-xl border inline-flex px-4 py-2 font-second border-black rounded-full justify-center w-40 items-center'
                    >
                        {t("Create shop")}
                    </Link>
                ) : null}
            </div>
            {shopData !== null && shopData.length > 0 ? (
                <button className='rounded-full py-4 justify-center flex'>
                    <Link
                        to={'/shops/' + shopData[0]._id}
                        className='box-border bg-white hover:bg-pink hover:text-white shadow-xl text-xl border inline-flex px-4 py-2 font-second border-black rounded-full items-center'
                    >
                        {t("Edit shop")}
                    </Link>
                </button>
            ) : null}
          </div>
          <div className='flex flex-col'>
            <span>{t("Shop name")}:</span>
            <span>{t("Phone number")}:</span>
            <span>{t("Address")}:</span>
            <span>{t("City")}:</span>
            <span>{t("Country")}:</span>
            <span>{t("Shop description")}:</span>
          </div>
          <div className='border border-pink opacity-60 mr-60 my-10 '></div>
        </div>
        <div className='flex flex-col'>
          <span className='font-red-hat-display font-semibold text-2xl leading-10 text-black' >{t("My Products")}</span>
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