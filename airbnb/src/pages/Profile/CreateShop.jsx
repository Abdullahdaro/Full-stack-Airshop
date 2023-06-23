import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../UserPageCom/Image';
import profileuser from '../../assets/profileuser.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faGlobe,  faShoppingBag,faImage, faLanguage,faEnvelope, faArrowRight, faPhoneVolume, faLocationDot, faMountainCity, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';



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
        axios.post('/shops/'+id).then(response => {
            const {data} = response;
            setAddedPhotos(data.photos)
            setTitle(data.title)
            setAddress(data.address)
            setDescription(data.description)
            setCity(data.city)
            setCountry(data.country)
            setNumber(data.number)
            setEmail(data.email)
            setWebsite(data.website)
            setWebsite(data.website)
            setInstagram(data.instagram)
            setFacebook(data.facebook)
            setTwitter(data.twitter)
            setYoutube(data.youtube)
            setLanguage(data.language)

        })
    }, [])

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
                addedPhotos, title, address, description, city, country, number, email, website, instagram, facebook, twitter, youtube, language
            })
            navTo('/profile/mystore')
        } else {
            // add a new place 
            await axios.post('/shops', {
                addedPhotos, title, address, description, city, country, number, email, website, instagram, facebook, twitter, youtube, language
            })
            navTo('/profile/mystore')
        }}

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
                                        <input className='hidden' type="file" multiple onChange={handleInputChange} />
                                        <h2 className='font-semibold '>
                                        <FontAwesomeIcon icon={faImage} beat className='px-2 ' />
                                        Browse to upload
                                        </h2> 
                                    </label>
                            </div>
                        </div>
                    </div>
                        {/* What we should enter */}
                    <div className='pl-10 ml-10'>
                        <div>
                            <h2 className='text-3xl font-second font-bold'>Your shop</h2>
                            <p className=''>The information you share will be used across Air Toptan to help other clients and sellers get to know you better. Learn more</p>
                        </div>
                        <div className='border mt-6'></div>
                        <div className='flex sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full'>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faShoppingBag} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap '>Shop Name:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setTitle(e.target.value)}
                                type='text' 
                                placeholder='The name of your shop'></input>
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faPhoneVolume} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap  '>Phone number:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setNumber(e.target.value)}
                                type='number' 
                                placeholder='+90 (555) 555 55 55'></input>
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                        </div>
                        <div className='flex justify-center grid-col-2'>
                            <div className='border  px-48 mx-4'></div>
                            <div className='border  px-48 mx-4'></div>
                        </div>
                        <div className='flex sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full'>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon  icon={faLanguage}  className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap  '>Languages:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setLanguage(e.target.value)}
                                type='text' 
                                placeholder='Choose languages you know'></input>
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faEnvelope} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap  '>Email:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setEmail(e.target.value)}
                                type='text' 
                                placeholder='shop.email@shop.com'></input>
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                        </div>
                        <div className='flex justify-center grid-col-2'>
                            <div className='border  px-48 mx-4'></div>
                            <div className='border  px-48 mx-4'></div>
                        </div>
                        <div className='flex sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full'>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon  icon={faMountainCity}  className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap  '>City:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setCity(e.target.value)}
                                type='text' 
                                placeholder='Istanbul'></input>
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faEarthAmericas} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap'>Country:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setCountry(e.target.value)}
                                type='text' 
                                placeholder='Turkey'></input>
                                <FontAwesomeIcon icon={faArrowRight} beat className=' px-2' />
                            </div>
                        </div>
                        <div className='flex justify-center grid-col-2'>
                            <div className='border  px-48 mx-4'></div>
                            <div className='border  px-48 mx-4'></div>
                        </div>
                        <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                            <h2 className='text-2xl font-second font-semibold'>Description</h2>
                            <input className='border rounded-md w-full' 
                            value={description}
                            onChange={e=> setDescription(e.target.value)}
                            type="text" placeholder='Write about your product' />
                        </div>
                        <div className='border  px-48 mx-4'></div>
                        <div className='flex sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full'>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon  icon={faGlobe}  className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap  '>Website:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setWebsite(e.target.value)}
                                type='text' 
                                placeholder='your-website.com/'></input>
                            </div>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faInstagram} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap'>Instagram:</h2>
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
                                <h2 className='text-xl font-second whitespace-nowrap  '>Facebook:</h2>
                                <input className='w-full border-none hover:bg-slate-100'
                                onChange={e=> setFacebook(e.target.value)}
                                type='text' 
                                placeholder='facebook.com/'></input>
                            </div>
                            <div className='flex justify-center whitespace-nowrap items-center w-full rounded-md hover:bg-slate-100 hover:h-20 p-2'>
                                <FontAwesomeIcon icon={faTwitter} className='hover:text-2xl p-2 font-second font-semibold' />
                                <h2 className='text-xl font-second whitespace-nowrap'>Twitter:</h2>
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

   
 /*  return (
    <div className='flex m-8 items-center justify-center'>
        <form onSubmit={addNewPlace}>
            <div className='p-9 w-[100%] border rounded-md'>

            <div onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                className='p-14 flex-col bg-[#A9A9A9] flex border rounded-md border-dashed justify-center items-center'>
                <p>Drag and drop your product's photos here</p>
                <div className='flex'>
                    <span>Or,</span>
                    <label className='justify-start block w-full text-left cursor-pointer'>
                        <input className='hidden' type="file" multiple onChange={handleInputChange} />
                        Browse to upload
                    </label>
                </div>
            </div>
            {addedPhotos.length > 0 && addedPhotos.map(link => (
                <div className=" h-32 flex relative" key={link}>
                    <Image className="rounded-2xl object-cover" src={link} alt=""/>
                    <button onClick={ev => removePhoto(ev,link)} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    </button>
                    <button onClick={ev => selecAsMainPhoto(ev,link)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                    {link === addedPhotos[0] && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                    )}
                    {link !== addedPhotos[0] && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    )}
                    </button>
                </div>
            ))}
            <ul>
                {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>

                <div>
                    <h2>Title</h2>
                    <p>Title for your product, Don't make it short.</p>
                    <input className='border rounded-md w-full' 
                    value={title}
                    onChange={e=> setTitle(e.target.value)}
                    type='text' 
                    placeholder='T shirt V shape Lagos'></input>
                </div>
                <div>
                    <h2>Serial Number</h2>
                    <input className='border rounded-full h-10 w-full pl-3 placeholder-gray-400 ' 
                    value={serialNumber}
                    onChange={e=> setSerialNumber(e.target.value)}
                    type='number' placeholder='S00001'></input>
                </div>
                <div>
                    <h2>Prices</h2>
                    <input className='border rounded-full h-10 w-full pl-3 placeholder-gray-400 ' 
                    value={price}
                    onChange={e=> setPrice(e.target.value)}
                    type='number' 
                    placeholder='$'></input>
                </div>
                <div>
                    <p>Material</p>
                    <input className='border rounded-md w-full' 
                    value={material}
                    onChange={e=> setMaterial(e.target.value)}
                    type="text" placeholder='50% fiber, 40 koton, 10 plastic' />
                </div>
                <div>
                    <h2>Description</h2>
                    <input className='border rounded-md w-full' 
                    value={description}
                    onChange={e=> setDescription(e.target.value)}
                    type="text" placeholder='Write about your product' />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div >
                        <h2>Main color</h2>
                        <div style={{ display: '', alignItems: 'center' }}>
                            <div
                            style={{ backgroundColor: colors[0], width: 20, height: 20, cursor: 'pointer' }}
                            onClick={handlePickerToggle}
                            className='border'
                            />
                            {isPickerOpen && (
                            <div style={{ position: 'absolute', zIndex: 1 }} ref={pickerRef}>
                                <SketchPicker onChangeComplete={handleColorChange} />
                                <button onClick={handlePickerToggle}>Save</button>
                            </div>
                            )}
                            
                            <div className=''>
                                More Colors: <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    {colors.slice(1).map((color, i) => (
                                                        <div
                                                        key={i}
                                                        style={{
                                                            backgroundColor: color,
                                                            width: 20,
                                                            height: 20,
                                                            marginRight: 5,
                                                            marginBottom: 5,
                                                            borderRadius: 2,
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => handleColorRemove(i + 1)}
                                                        />
                                                    ))}
                                                    </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Age</p>
                        <select
                            className='block h-14 rounded-md  w-full'
                            value={age}
                            onChange={e => setAge(e.target.value)}
                        >
                            <option value=''>Choose an age range</option>
                            <option value='0-1'>0-1 year</option>
                            <option value='1-3'>1-3 years</option>
                            <option value='3-5'>3-5 years</option>
                            <option value='5-8'>5-8 years</option>
                        </select>
                    </div>
                    <div>
                        <p>Sex</p>
                        <select
                            className='block h-14 rounded-md  w-full'
                            value={sex}
                            onChange={e => setSex(e.target.value)}
                        >
                            <option value=''>Choose a sex</option>
                            <option value='men'>Men</option>
                            <option value='women'>Women</option>
                            <option value='uniSex'>UniSex</option>
                        </select>
                    </div>
                    <div>
                        <p>Type</p>
                        <select
                            className='block h-14 rounded-md  w-full'
                            value={type}
                            onChange={e => setType(e.target.value)}
                        >
                            <option value=''>Choose a type</option>
                            <option value='men'>Men</option>
                            <option value='women'>Women</option>
                            <option value='uniSex'>UniSex</option>
                        </select>
                    </div>
                    <div>
                        <p>Season</p>
                        <select
                            className='block h-14 rounded-md  w-full'
                            value={season}
                            onChange={e => setSeason(e.target.value)}
                        >
                            <option value=''>Choose a season </option>
                            <option value='summer'>Summer</option>
                            <option value='winter'>Winter</option>
                            <option value='spring'>Spring</option>
                            <option value='autumn'>Autumn</option>
                        </select>
                    </div>
                    <div>
                        <p>Sizes</p>
                        <input className='border rounded-md w-full' 
                        value={size}
                        onChange={e=> setSize(e.target.value)}
                        type="text" placeholder='S,M,M,L,Xl' />
                    </div>
                </div>
            </div>
            <button>Add to the store</button>
        </form>
    </div>
  )}

export default Form */