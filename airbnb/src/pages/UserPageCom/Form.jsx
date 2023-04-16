import React, {useState} from 'react'

const Form = () => {
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')
    const [title, setTitle] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [price, setPrice] = useState('')
    const [colors, setColors] = useState([])
    const [description, setDescription] = useState('')
    const [materil, setMateril] = useState('')
    const [age, setAge] = useState('')
    const [sex, setSex] = useState('')
    const [type, setType] = useState('')
    const [season, setSeason] = useState('')
    const [size, setSize] = useState('')

    const [selectedFiles, setSelectedFiles] = useState([]);

  function handleDrop(event) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
  }

  function handleFileUpload() {
    // TODO: Upload the selected files to a server or process them in some other way
    console.log(selectedFiles);
    // make an API call to upload the files to the server
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("photos", selectedFiles[i]);
    }
    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }


  return (
    <div className='flex m-8 items-center justify-center'>
        <form action="">
            <div className='p-9 w-[100%] border rounded-md'>

            <div onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                className='p-14 flex-col bg-[#A9A9A9] flex border border-dashed justify-center items-center'>
                <input type="file" multiple onChange={(event) => setSelectedFiles([...selectedFiles, ...event.target.files])} />
                <p>Drag and drop your product's photos here</p>
                <div className='flex'>
                    <span>Or,</span><button className='justify-start block w-full text-left'>Browse to upload</button>
                </div>
            </div>
                <button onClick={handleFileUpload}>Upload Photos</button>
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
                    <input className='border rounded-md w-full'
                    value={serialNumber}
                    onChange={e=> setSerialNumber(e.target.value)}
                    type='text' placeholder='S00001'></input>
                </div>
                <div>
                    <h2>Prices</h2>
                    <input className='border rounded-md w-full' 
                    value={price}
                    onChange={e=> setPrice(e.target.value)}
                    type='text' 
                    placeholder='$'></input>
                </div>
                <div>
                    <h2>Colors</h2>
                    <input className='border rounded-md w-full' 
                    value={colors}
                    onChange={e=> setSerialNumber(e.target.value)}
                    type='text' />
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
                        <p>Material</p>
                        <input className='border rounded-md w-full' 
                        value={materil}
                        onChange={e=> setMateril(e.target.value)}
                        type="text" placeholder='50% fiber, 40 koton, 10 plastic' />
                    </div>
                    <div>
                        <p>Age</p>
                        <input className='border rounded-md w-full' 
                        value={age}
                        onChange={e=> setAge(e.target.value)}
                        type="text" placeholder='choose the age to choose' />
                    </div>
                    <div>
                        <p>Sex</p>
                        <input className='border rounded-md w-full' 
                        value={sex}
                        onChange={e=> setSex(e.target.value)}
                        type="text" placeholder='choose the age to choose' />
                    </div>
                    <div>
                        <p>Type</p>
                        <input className='border rounded-md w-full' 
                        value={type}
                        onChange={e=> setType(e.target.value)}
                        type="text" placeholder='choose the age to choose' />
                    </div>
                    <div>
                        <p>Season</p>
                        <input className='border rounded-md w-full' 
                        value={season}
                        onChange={e=> setSeason(e.target.value)}
                        type="text" placeholder='choose the age to choose' />
                    </div>
                    <div>
                        <p>Size</p>
                        <input className='border rounded-md w-full' 
                        value={size}
                        onChange={e=> setSize(e.target.value)}
                        type="text" placeholder='choose the age to choose' />
                    </div>
                </div>
                <button>Add to the store</button>
            </div>
        </form>
    </div>
  )}

export default Form