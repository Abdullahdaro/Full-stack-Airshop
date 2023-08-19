import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import Image from './Image'
import { SketchPicker } from 'react-color';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'react-inputs-validation';
import Select from 'react-select';


const Form = () => {
    const {id} = useParams();
    const [addedPhotos, setAddedPhotos] = useState([])
    const [title, setTitle] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [price, setPrice] = useState('')
    const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Default currency
    const [colors, setColors] = useState([]);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [description, setDescription] = useState('')
    const [material, setMaterial] = useState('')
    const [age, setAge] = useState('')
    const [sex, setSex] = useState('')
    const [type, setType] = useState('')
    const [season, setSeason] = useState('')
    const [size, setSize] = useState('')
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const navTo = useNavigate()

    // Load the place data when the component mounts
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/product/'+id).then(response => {
            const {data} = response;
            setAddedPhotos(data.photos)
            setTitle(data.title)
            setSerialNumber(data.serialNumber)
            setPrice(data.price)
            setSelectedCurrency(data.selectedCurrency)
            setColors(data.colors)
            setDescription(data.description)
            setMaterial(data.materil)
            setAge(data.age)
            setSex(data.sex)
            setType(data.type)
            setSeason(data.season)
            setSize(data.size)
        })
    }, [])
    // choose color
    const pickerRef = useRef(null);
    function handleColorChange(color) {
        setSelectedColor(color);
    }
    function handleColorChange(color) {
        if (colors.length >= 5) {
            return
        }
        setColors((prevColors) => [...prevColors, color.hex]);
      }
      function handleColorRemove(colorIndex) {
        setColors((prevColors) => prevColors.filter((_, i) => i !== colorIndex));
      }
      function handlePickerToggle() {
        setIsPickerOpen((prevState) => !prevState);
      }
      function handleOutsideClick(event) {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
          setIsPickerOpen(false);
        }
      }
    // selecetors here
    const currencyOptions = [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'Euro' },
        { value: 'TRY', label: 'TL' },
    ]
    function handleCurrencyChange(selectedOption) {
        setSelectedCurrency(selectedOption);
    }
    const ageOptions = [
        { value: 'newborn', label: 'Newborn' },
        { value: '0-3', label: '0-3' },
        { value: '3-6', label: '3-6' },
        { value: '6-12', label: '6-12' },
        { value: '12-18', label: '12-18' },
        { value: '18-30', label: '18-30' },
        { value: '30-60', label: '30-60' },
    ]
    function handleAgeChange(selectedOption) {
        setAge(selectedOption);
    }
    const genderOptions = [
        {value: 'men', label: 'Men'},
        {value: 'women', label: 'Women'},
        {value: 'uniSex', label: 'UniSex'}
    ]
    function handleGenderChange(selectedOption) {
        setSex(selectedOption);
    }
    const typeOptions = [
        {value: 't-shirt', label: 'T-Shirt'},
        {value: 'shirt', label: 'Shirt'},
        {value: 'pants', label: 'Pants'},
        {value: 'shorts', label: 'Shorts'},
        {value: 'jacket', label: 'Jacket'},
        {value: 'coat', label: 'Coat'},
        {value: 'dress', label: 'Dress'},
        {value: 'skirt', label: 'Skirt'},
        {value: 'sweater', label: 'Sweater'},
        {value: 'sweatshirt', label: 'Sweatshirt'},
        {value: 'hoodie', label: 'Hoodie'},
        {value: 'jumpsuit', label: 'Jumpsuit'},
        {value: 'bodysuit', label: 'Bodysuit'},
        {value: 'underwear', label: 'Underwear'},
        {value: 'swimwear', label: 'Swimwear'},
        {value: 'sleepwear', label: 'Sleepwear'},
        {value: 'sportswear', label: 'Sportswear'},
        {value: 'costume', label: 'Costume'},
        {value: 'accessories', label: 'Accessories'},
        {value: 'shoes', label: 'Shoes'},
        {value: 'bags', label: 'Bags'},
        {value: 'jewelry', label: 'Jewelry'},
        {value: 'watches', label: 'Watches'},
        {value: 'glasses', label: 'Glasses'},
        {value: 'hats', label: 'Hats'},
        {value: 'scarves', label: 'Scarves'},
        {value: 'gloves', label: 'Gloves'},
        {value: 'socks', label: 'Socks'},
        {value: 'belts', label: 'Belts'},
        {value: 'other', label: 'Other'},
    ]
    function handleTypeChange(selectedOption) {
        setType(selectedOption);
    }
    const seasonOptions = [
        {value: 'spring', label: 'Spring'},
        {value: 'summer', label: 'Summer'},
        {value: 'autumn', label: 'Autumn'},
        {value: 'winter', label: 'Winter'},
        {value: 'all', label: 'All'},
    ]
    function handleSeasonChange(selectedOption) {
        setSeason(selectedOption);
    }
    // mouse click outside the color picker
      useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);
    // upload photos
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
    function removePhoto(ev, filename) {
        ev.preventDefault();
        setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)]);
    }
    function selecAsMainPhoto(ev, filename) {
        ev.preventDefault();
        setAddedPhotos([filename,...addedPhotos.filter(photo => photo !== filename)]);
    }
    // add new place
    async function addNewPlace (e) {
        e.preventDefault();
        if (id) {
            // update the place
            await axios.put('/products', { id,
                addedPhotos, title, serialNumber, price, selectedCurrency:selectedCurrency.value , colors, description, material, age:age.value , sex:sex.value , type:type.value , season:season.value , size
            })
            navTo('/profile/mystore')

        } else {
            // add a new place 
            await axios.post('/products', {
                addedPhotos, title, serialNumber, price, colors, selectedCurrency:selectedCurrency.value , colors, description, material, age:age.value , sex:sex.value , type:type.value , season:season.value , size
            })
            navTo('/profile/mystore')
        }
    }
    // generate serial number
    useEffect(() => {
        if (id) {
            return;
        }
        // Load the existing serial number when the component mounts
        async function fetchSerialNumber() {
          try {
            const response = await axios.get('/get-serial-number');
            setSerialNumber(response.data.serialNumber);
          } catch (error) {
            console.error(error);
          }
        }
        fetchSerialNumber();
      }, []);


  return (
    <div className='flex py-8 items-center justify-center'>
        <form onSubmit={addNewPlace}>
            <div className='p-9 w-[100%] border flex justify-center items-center flex-col rounded-md shadow-lg relative'>
                <Link to='/profile/mystore' className='absolute top-4 right-4 text-dark text-xl font-mari border px-2 rounded-md shadow-md border-main hover:bg-pink hover:text-white '>X</Link>
                <span className='sm:text-xl md:pb-4 text-dark font-mari md:text-3xl'>Upload Your Product</span>
                <div className='md:flex py-2 gap-x-10'>
                    <div>
                        <div onDrop={handleDrop}
                            onDragOver={(event) => event.preventDefault()}
                            className='p-8 flex-col bg-[#A4A4CB] bg-opacity-10 flex border rounded-md border-dashed border-[#A4A4CB] justify-start items-center md:h-[280px] shadow-lg'>
                            <FontAwesomeIcon icon={faLayerGroup} className='text-2xl text-[#EE4878] md:pb-8 ' />
                            <p className='md:text-md xs:text-xs sm:text-sm md:pb-6 font-semibold'>Drag and drop your product's photos or</p>
                            <div className='flex'>
                                <label className='justify-start block w-full text-left cursor-pointer'>
                                    <input className='hidden' type="file" multiple onChange={handleInputChange} />
                                    <h1 className='border xs:text-[14px] px-4 py-2 bg-white rounded-lg border-main hover:bg-dark hover:text-white'>Browse to upload</h1>
                                </label>
                            </div>
                            <p className='text-dark opacity-70 md:text-sm xs:text-[12px] py-2'>You can upload only Photos</p>
                            <p className='text-dark opacity-70 md:text-sm xs:text-[12px]'>Max 5 photos, Maximum file size is 10MB</p>
                        </div>
                        {addedPhotos.length > 0 && addedPhotos.map(link => (
                            <div className=" h-40 flex w-40 relative" key={link}>
                                <Image className="rounded-2xl object-cover" src={link} alt=""/>
                                <button onClick={ev => removePhoto(ev,link)} className="cursor-pointer absolute bottom-0 left-0 text-white w-1/2 bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                                    delete
                                </button>
   {/*                              <button onClick={ev => selecAsMainPhoto(ev,link)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
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
                                </button> */}
                            </div>
                        ))}
                    </div>
                    {/* Form */} 
                    <div className=''>
                        <span className='text-sm text-dark opacity-50'>The information you share will be used across Air Toptan <br /> to help other clients and sellers get to know you better.</span>
                        <div className='flex'>
                            <div className='p-2'>
                                <h2 className='font-main font-light md:text-xl'>Title</h2>
                                <input
                                className='w-full p-2 rounded-md border-2 border-main focus:outline-none focus:border-pink hover:bg-gray-100 '
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder='T shirt V shape Lagos'
                                />
                            </div>
                            <div className='p-2' >
                                <h2 className='font-main font-light md:text-xl'>Serial Number</h2>
                                <input className='w-full p-2 rounded-md border-2 border-main focus:outline-none focus:border-black-2 hover:bg-gray-50 bg-main bg-opacity-10'
                                value={serialNumber}
                                readOnly={true}
                                placeholder={serialNumber}/>
                            </div>
                        </div>
                        <div className='flex'> 
                            <div className='p-2'>
                                <h2 className='font-main font-light md:text-xl'>Prices</h2>
                                <div className='flex'>
                                    <input
                                        className='w-[100px] p-2 border-r-none rounded-l-md border-2 border-main focus:outline-none focus:border-pink hover:bg-gray-100'
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        type='number'
                                        placeholder={
                                            selectedCurrency.value === 'USD' ? '$' :
                                            selectedCurrency.value === 'TRY' ? '₺' :
                                            selectedCurrency.value === 'EUR' ? '€' :
                                            ''
                                        }
                                    />

                                    {/* Add currency selection */}
                                    <Select
                                        value={selectedCurrency}
                                        onChange={handleCurrencyChange}
                                        className='w-[57px] rounded-r-md border border-main focus:outline-none focus:border-pink hover:bg-gray-100'
                                        options={currencyOptions}
                                        styles={{
                                            // Customize the base styles for the dropdown container
                                            control: provided => ({
                                                ...provided,
                                                boxShadow: 'none', // Remove default box-shadow
                                            }),
                                            // Customize the styles for each option in the dropdown
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: state.isFocused ? 'rgba(255, 192, 203, 0.2)' : 'transparent',
                                                color: state.isSelected ? '#ff69b4' : '#333',
                                                padding: '8px',
                                                borderRadius: '4px',
                                            }),
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='p-2'>
                                <h2 className='font-main font-light md:text-xl'>Main color</h2>
                                <div className='pt-' style={{ display: 'flex', alignItems: 'center' }}>
                                    <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={handlePickerToggle}
                                    className=' px-2 py-1 rounded-md h-10 text-gray-500  border-main border-2 focus:outline-none focus:border-black-2 hover:bg-gray-200'
                                    >Select </div>
                                    {isPickerOpen && (
                                    <div style={{ position: 'absolute', zIndex: 1 }} ref={pickerRef}>
                                        <SketchPicker onChangeComplete={handleColorChange} />
                                        <button onClick={handlePickerToggle}>Save</button>
                                    </div>
                                    )}
                                    <div className='pl-6 pt-2'>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {colors.slice(0).map((color, i) => (
                                                <div
                                                key={i}
                                                style={{
                                                    backgroundColor: color,
                                                    width: 20,
                                                    height: 20,
                                                    marginRight: 2,
                                                    marginBottom: 5,
                                                    borderRadius: 2,
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleColorRemove(i)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-2'>
                            <p className='font-main font-light md:text-xl'>Material</p>
                            <input className='w-full p-2 rounded-md border-2 border-main focus:outline-none focus:border-black-2 hover:bg-gray-50'
                            value={material}
                            onChange={e=> setMaterial(e.target.value)}
                            placeholder='50% fiber, 40 koton, 10 plastic' />
                        </div>
{/*                         <div>
                                <h2>Description</h2>
                                <input className='border rounded-md w-full' 
                                value={description}
                                onChange={e=> setDescription(e.target.value)}
                                type="text" placeholder='Write about your product' />
                            </div> */}
                        <div className="flex grid-col-2 gap-10 p-2 mt-4">
                            <div className=''>
                                <p className='font-main font-light md:text-xl' >Age</p>
                                <Select className='block border rounded-md w-[185px] border-main active:border-2-main' value={age} onChange={handleAgeChange} options={ageOptions} required placeholder='Choose a age'
                                />
                            </div>
                            <div className=''>
                                <p className='font-main font-light md:text-xl'>Gender</p>
                                <Select className='block border rounded-md w-[185px] border-main active:border-2-main' value={sex} onChange={handleGenderChange} options={genderOptions} required placeholder='Choose a gender'
                                />
                            </div>
                        </div>
                        <div className="flex grid-cols-2 px-2 gap-10 mt-4">
                            <div className=''>
                                <p className='font-main font-light md:text-xl'>Type</p>
                                <Select className='block border rounded-md w-[185px] border-main active:border-2-main'  value={type} onChange={handleTypeChange} required  options={typeOptions} />
                            </div>
                            <div>
                                <p className='font-main font-light md:text-xl'>Season</p>
                                <Select className='block border rounded-md w-[185px] border-main active:border-2-main'  value={season} onChange={handleSeasonChange} required options={seasonOptions}/>
                            </div>
                        </div>
                        <div className='p-2'>
                            <p className='font-main font-light md:text-xl'>Sizes</p>
                            <input className='w-full p-2 rounded-md border-2 border-main focus:outline-none focus:border-black-2 hover:bg-gray-50'
                            value={size}
                            onChange={e=> setSize(e.target.value)}
                            placeholder='S,M,M,L,Xl' />
                        </div>
                    </div>
                </div>
                <button className='pt-4'><span className='px-6 py-2 bg-main rounded-full text-white font-bold hover:text-pink hover:bg-black'>Save</span></button>
            </div>
        </form>
    </div>
  )}

export default Form