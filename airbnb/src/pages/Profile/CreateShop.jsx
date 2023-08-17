import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../UserPageCom/Image';
import profileuser from '../../assets/profileuser.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faGlobe,  faShoppingBag,faImage, faLanguage,faEnvelope, faArrowRight, faPhoneVolume, faLocationDot, faMountainCity, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import InputMask from 'react-input-mask';
import Select from 'react-select';


const CreateShop = () => {
    const {id} = useParams();
    const [showInput, setShowInput] = useState(false);
    const [addedPhotos, setAddedPhotos] = useState([])
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [language, setLanguage] = useState([])
    const [country, setCountry] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [youtube, setYoutube] = useState('')
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [stablePhoto, setStablePhoto] = useState(null);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);

    const navTo = useNavigate()

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/shop/'+id).then(response => {
            const {data} = response;
            setAddedPhotos(data.photos)
            setTitle(data.title)
            setAddress(data.address)
            setDescription(data.description)
/*             const capitalizedLanguage = data.language.charAt(0).toUpperCase() + data.language.slice(1);
            setLanguage({ value: data.language, label: capitalizedLanguage}) */
            const capitalizedCity = data.city.charAt(0).toUpperCase() + data.city.slice(1);
            setCity({ value: data.city, label: capitalizedCity });
            console.log(capitalizedCity)
            const capitalizedCountry = data.country.charAt(0).toUpperCase() + data.country.slice(1);
            setCountry({ value: data.country, label: capitalizedCountry });
            setNumber(data.number)
            setEmail(data.email)
            setWebsite(data.website)
            setInstagram(data.instagram)
            setFacebook(data.facebook)
            setTwitter(data.twitter)
            setYoutube(data.youtube)
            console.log(data)
        })
    }, [id])



    function handleInputChange(event) {
        const files = event.target.files;
        handleFileUpload(files);
    }

    
    function handleDrop(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        handleFileUpload(files);
    }

    function handleFileUpload(files) {
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
        data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
        headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
        const {data:filenames} = response;
        setAddedPhotos(prev => {
            return [...prev, ...filenames];
        });
        })
    }

    async function createMyShop (e) {
        e.preventDefault();
        if (id) {
            await axios.put('/shops', { id,
                addedPhotos, title, address, description, city:city.value , country:country.value, language:language.value, number, email, website, instagram, facebook, twitter, youtube, 
            })
            navTo('/profile/mystore')
        } else {
            // add a new place 
            await axios.post('/shops', {
                addedPhotos, title, address, description, city: city.value, country: country.value, language:language.value, number, email, website, instagram, facebook, twitter, youtube, 
            })
            navTo('/profile/mystore')
        }}

        const langaugeoptions = [
            { value: 'english', label: 'English' },
            { value: 'turkish', label: 'Turkish' },
            { value: 'french', label: 'French' },
            { value: 'arabic', label: 'Arabic' },
            { value: 'russian', label: 'Russian' }
          ];

          const handleLangauegeChange = (selectedOptions) => {
            setLanguage(selectedOptions);
          };

        const cityoptions = [
            { value: 'istanbul', label: 'Istanbul' },
            { value: 'ankara', label: 'Ankara' },
            { value: 'izmir', label: 'Izmir' },
        ];

        const handleCityChange = (selectedOptions) => {
            setCity(selectedOptions);
          };

        const countryoptions = [
            { value: 'turkey', label: 'Turkey' },
        ];

        const handleCountryChange = (selectedOptions) => {
            setCountry(selectedOptions);
          };

  return (
    <div className='flex justify-center'>
        <div className='flex p-4 '>
            <form onSubmit={createMyShop}>
                <div className='p-10 flex w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ml-10 '>
                    <div className='  '>
                        <div className='flex flex-col'>
                            {addedPhotos.length > 0 ? addedPhotos.map(link => (
                                <div className=" h-80 w-80 flex relative" key={link}>
                                    <Image className="rounded-full  object-cover" src={link} alt=""/>
                                </div>
                            )) : (<img src={profileuser} className='w-80 h-80' /> )}
                            
                            <div onDrop={handleDrop}
                                onDragOver={(event) => event.preventDefault()}
                                className='flex-col flex justify-center items-center'>
                                    <label className='justify-start p-2 pr-3 shadow-md bg-white rounded-full block text-left cursor-pointer hover:'>
                                        <input className='hidden' type="file" onChange={handleInputChange} />
                                        <h2 className='font-semibold '>
                                        <FontAwesomeIcon icon={faImage} beat className='px-2 ' />
                                        Browse to upload
                                        </h2> 
                                    </label>
                            </div>
                        </div>
                    </div>

                    <div className='pl-10 ml-10'>
                        <div>
                            <h2 className='text-3xl font-second font-bold'>Your shop</h2>
                            <p className=''>The information you share will be used across Air Toptan to help other clients and sellers get to know you better. Learn more</p>
                        </div>
                        <div className='border mt-6'></div>
                        <div className='flex sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full'>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faShoppingBag} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap pr-1 '>Shop Name:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setTitle(e.target.value)}
                                type='text' 
                                value={title}
                                required
/*                                 pattern='[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}'
 */                                placeholder='The name of your shop'></input>
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faPhoneVolume} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap pr-1 '>Phone number:</h2>
                                <InputMask
                                    className='w-full border-none rounded-full h-[40px] px-2 hover:bg-slate-100'
                                    value={number}
                                    onChange={e=> setNumber(e.target.value)}
                                    mask='+99 (999) 999 99 99'
                                    placeholder='+90 (555) 555 55 55'
                                    maskChar={null}
                                    required
                                />
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                        </div>
                        <div className='flex justify-center grid-col-2'>
                            <div className='border  px-48 mx-4'></div>
                            <div className='border  px-48 mx-4'></div>
                        </div>
                        <div className='flex sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full'>
                            <div className="flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2">
                                <FontAwesomeIcon icon={faLanguage} className="p-2 font-second font-semibold" />
                                <h2 className="text-xl font-second whitespace-nowrap">Languages:</h2>
                                <Select
                                className="w-full border-none h-7 ml-3 bg-white hover:bg-white"
                                onChange={handleLangauegeChange}
                                isMulti
                                value={language}
                                required
                                placeholder="Select langauges you know"
                                options={langaugeoptions}
                                />
                                <FontAwesomeIcon icon={faArrowRight} beat className="px-2" />
                            </div>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2 '>
                                <FontAwesomeIcon icon={faEnvelope} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap pr-1  '>Email:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setEmail(e.target.value)}
                                type='email'
                                value={email}
                                pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
                                placeholder='shop.email@shop.com'
                                required
                                />
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                        </div>
                        <div className='flex justify-center grid-col-2'>
                            <div className='border  px-48 mx-4'></div>
                            <div className='border  px-48 mx-4'></div>
                        </div>
                        <div className='flex sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full'>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 h-[70px] hover:h-20 p-2'>
                                <FontAwesomeIcon  icon={faMountainCity}  className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap  '>City:</h2>
                                <Select
                                    className='w-full border-none h-7 ml-3 bg-white  hover:bg-white'
                                    onChange={handleCityChange}
                                    options={cityoptions}
                                    value={city || null }
                                    required
                                />
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faEarthAmericas} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap'>Country:</h2>
                                <Select
                                    className='w-full border-none h-7 ml-3 bg-white hover:bg-white'
                                    onChange={handleCountryChange}
                                    value={country}
                                    options={countryoptions}
                                    required
                                />
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                        </div>
                        <div className='flex justify-center grid-col-2'>
                            <div className='border  px-48 mx-4'></div>
                            <div className='border  px-48 mx-4'></div>
                        </div>
                        <div className='flex justify-center whitespace-nowrap items-center px-8 w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                            <h2 className='text-2xl font-second font-semibold pr-1'>Description:</h2>
                            <input className='border rounded-md w-full' 
                            value={description}
                            onChange={e=> setDescription(e.target.value)}
                            type="text" placeholder='Write what kind of products you sell' />
                        </div>
                        <div className='border  px-48 mx-4'></div>
                        <div className='flex sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full'>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon  icon={faGlobe}  className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap pr-1  '>Website:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setWebsite(e.target.value)}
                                type='text' 
                                placeholder='your-website.com/'></input>
                            </div>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faInstagram} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap pr-1'>Instagram:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setInstagram(e.target.value)}
                                type='text' 
                                placeholder='instagram.com/'></input>
                            </div>
                        </div>
                        <div className='flex justify-center grid-col-2'>
                            <div className='border  px-48 mx-4'></div>
                            <div className='border  px-48 mx-4'></div>
                        </div>
                        <div className='flex sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full'>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon  icon={faFacebook}  className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap pr-1 '>Facebook:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setFacebook(e.target.value)}
                                type='text' 
                                placeholder='facebook.com/'></input>
                            </div>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faTwitter} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap pr-1'>Twitter:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setTwitter(e.target.value)}
                                type='text' 
                                placeholder='twitter.com/'></input>
                               
                            </div>
                        </div>
                        <div className='flex justify-center grid-col-2'>
                            <div className='border  px-48 mx-4'></div>
                            <div className='border  px-48 mx-4'></div>
                        </div>
                        <div className='p-3 relative '>
                            <button className='px-4 justify-end flex py-2 font-semibold cursor-pointer'>
                                <span className=' text-white shadow-md px-4 py-2 bg-pink rounded-full'>
                                    Create My Store
                                </span>
                            </button>
                        </div>
                    </div>             
                </div>
            </form>
         </div>
    </div>
  )
}

export default CreateShop

   
 