import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const {id} = useParams(); 
    const [product, setProduct] = useState(null)
    const [owner, setOwner] = useState(null);

    useEffect(() => {
        if (!id) {
            return 
        }
        axios.get(`/products/${id}`).then(response => {
            setProduct(response.data)
            const ownerId = response.data.owner;
            if (ownerId) {
              // Fetch the owner's data based on the owner ID
              axios.get(`/owners/${ownerId}`).then(ownerResponse => {
                setOwner(ownerResponse.data);
              });
            }
        })
    }, [id])
    console.log(product)

    if (!product) return ''

    const { title, price, colors, decription, material, age, sex, type, season, size, serialNumber } = product;
 // write for me the 

  return (
    <div className=''>
      <div className='flex ml-4 mt-2 font-main text-2xl leading-10'>
        {owner && <p>{owner.photo} </p>}
        {owner && <p>{owner.name}Shop</p>}
      </div>
      <div className='flex '>
        <div className="m-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-[80%] ">
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
        <div className='w-[25%] m-4 relative p-4'>
          <div className='flex justify-between mb-12 mt-4'>
            <h1 className='font-second text-xl'>{title}</h1>
            <button className='w-20 text-2xl'><FontAwesomeIcon icon={faRegularHeart} /></button>
          </div>
          <h2 className='font-second text- mb-12'>Price: {price}$</h2>
          <div className='mb-4'>
            <h2>Colors:</h2>
            {colors.map((color, index) => (
              <div key={index} className='rounded-full mb-12' style={{ backgroundColor: color, width: '20px', height: '20px' }}></div>
            ))}
          </div>
          <div className=' mb-12'>
            <h2 className='font-second text-ms p-1'>Age: {age}</h2>
            <h2 className='font-second text-ms p-1'>ٍSex: {sex}</h2>
            <h2 className='font-second text-ms p-1'>Type: {type}</h2>
            <h2 className='font-second text-ms p-1'>Season: {season}</h2>
            <h2 className='font-second text-ms p-1'>Sizes: {size}</h2>
          </div>
          <button>Send a message to the seller</button>
        </div>
      </div>
      <div>
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