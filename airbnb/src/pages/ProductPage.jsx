import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams, Link  } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext';

const ProductPage = () => {
    const {id} = useParams(); 
    const [product, setProduct] = useState(null)
    const [owner, setOwner] = useState(null);
    const [saved, setSaved] = useState(null);
    const {user} = useContext(UserContext)

    useEffect(() => {
        if (!id) {
            return 
        }
        axios.get(`/products/${id}`).then(response => {
            setProduct(response.data)
            const ownerId = response.data.owner;
            if (ownerId) {
              // Fetch the owner's data based on the owner ID
              axios.get(`/owner/${ownerId}`).then(ownerResponse => {
                setOwner(ownerResponse.data);
              });
            }
        })
    }, [id])

    if (!product) return ''

    const handleSave = async () => {
      try {
        const response = await axios.patch(`/products/${id}`, null, {
          withCredentials: true, // Send cookies with the request
        });
        setSaved(response.data.message === 'Post Saved', user._id); // Update the saved state based on response
      } catch (error) {
        console.error('Error saving/unsaving product:', error);
      }
    };

    console.log(saved)

    const { title, price, colors, decription, material, age, sex, type, season, size, serialNumber, } = product;

  return (
    <div className=''>
      {owner && (
        <Link to={`/owner/${owner._id}`} className='flex ml-4 mt-2 font-main text-2xl leading-10'>
        {owner && <p>{owner.owner.photo} </p>}
        {owner && <p>{owner.owner.name} Shop</p>}
      </Link>
      )}
      <div className='flex '>
        <div className="my-4 ml-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-[80%] ">
          {product.photos?.length && product.photos.map((photo, index) => (
            <div className="relative" key={index}>
              <img
                src={'http://localhost:4000/uploads/' + photo}
                className="object-cover w-full h-full aspect-w-1 aspect-h-1 border border-gray-300"
                alt={`Product Photo ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className='w-[25%] my-4 mx-10 relative p-4 rounded-xl '>
          <div className='flex justify-between mb-6 mt-4'>
            <h1 className='font-second text-xl'>{title}</h1>
            <button className='w-20 text-2xl' onClick={handleSave}>{saved === true ? <FontAwesomeIcon className='text-pink' icon={faSolidHeart} /> : <FontAwesomeIcon className='' icon={faRegularHeart} /> }  </button>
          </div>
          <h2 className='font-second text- mb-12 text-[#7F8086]'>PRICE: {price}$</h2>
          <div className='mb-4'>
            <h2>COLORS:</h2>
            {colors.map((color, index) => (
              <div key={index} className='rounded-full mb-12 border border-black' style={{ backgroundColor: color, width: '20px', height: '20px' }}></div>
            ))}
          </div>
          <div className=' mb-12'>
            <h2 className='font-second text-ms  '>AGE: {age}</h2>
            <h2 className='font-second text-ms '>SEX: {sex}</h2>
            <h2 className='font-second text-ms '>TYPE: {type}</h2>
            <h2 className='font-second text-ms '>SIZES: {size}</h2>
            <h2 className='font-second text-ms '>SEASON: {season}</h2>
          </div>
          <button className='bg-secondary py-2'>Send a message to the seller</button>
        </div>
      </div>
      <div className='px-6'>
        <h1>{title}</h1>
        <h2>Descritop: <br/>{decription}</h2>
        <h2>Serial Number: {serialNumber}</h2>
        <h2>Composition: {material}</h2>
      </div>
      <div>
        <h1>Products that you may like</h1>
        <div></div>
      </div>
    </div>
  );
}

export default ProductPage