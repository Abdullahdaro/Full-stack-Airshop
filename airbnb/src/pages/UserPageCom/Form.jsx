import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import Image from './Image'
import { SketchPicker } from 'react-color';
import { useNavigate, useParams } from 'react-router-dom';

const Form = () => {
    const {id} = useParams();
    const [addedPhotos, setAddedPhotos] = useState([])
    const [title, setTitle] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [price, setPrice] = useState('')
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

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.post('/products/'+id).then(response => {
            const {data} = response;
            setAddedPhotos(data.photos)
            setTitle(data.title)
            setSerialNumber(data.serialNumber)
            setPrice(data.price)
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

    function handleColorChange(color) {
        setSelectedColor(color);
    }

    const pickerRef = useRef(null);
    
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

      useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

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
    
    async function addNewPlace (e) {
        e.preventDefault();
        if (id) {
            // update the place
            await axios.put('/products', { id,
                addedPhotos, title, serialNumber, price, colors, description, material, age, sex , type , season , size
            })
            navTo('/profile/mystore')

        } else {
            // add a new place 
            await axios.post('/products', {
                addedPhotos, title, serialNumber, price, colors, description, material, age, sex, type, season , size
            })
            navTo('/profile/mystore')
        }
    }

  return (
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

export default Form