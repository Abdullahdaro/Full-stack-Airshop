import axios from 'axios';
import React, { useEffect, useState } from 'react'
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

  return (
    <div>
      {owner && <p>Owner: {owner.name}</p>}
      {owner && <p>Owner: {owner.photo} </p>}
      
      <div className='flex'>
        <div className="m-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-[80%] ">
          {product.photos?.length && product.photos.map((photo, index) => (
            <div className="relative" key={index}>
              <img
                src={'http://localhost:4000/uploads/' + photo}
                className="object-cover w-full h-full aspect-w-1 aspect-h-1"
                alt={`Product Photo ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className='w-[25%] m-4'>
          <h1>{title}</h1>
          <h2>Price: {price}$</h2>
          <h2>{colors}</h2>
          <div>
{/*             <h1>Description</h1>
            <h2>{decription}</h2> */}
          </div>
          <div>
{/*             <h2>Material: {material} </h2> */}
            <h2>Age: {age}</h2>
            <h2>ٍSex: {sex}</h2>
            <h2>Type: {type}</h2>
            <h2>Season: {season}</h2>
            <h2>Sizes: {size}</h2>
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