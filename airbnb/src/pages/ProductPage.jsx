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

    const { title} = product;

  return (
    <div>
      {owner && <p>Owner: {owner.name}</p>}
      {owner && <p>Owner: {owner.photo} </p>}
      
      <div className='flex'>
        <div className='m-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-col-3'>
          <div className="relative w-[50%]">
            {product.photos?.[0] && (
              <img src={'http://localhost:4000/uploads/'+product.photos?.[0]} 
                className='object-cover w-full h-full aspect-w-1 aspect-h-1 ' />
            )}
          </div>
          {product.photos?.[0] && (
            <img src={'http://localhost:4000/uploads/'+product.photos[1]} />
          )}
          {product.photos?.[0] && (
            <img src={'http://localhost:4000/uploads/'+product.photos[2]} />
          )}
          {product.photos?.[0] && (
            <img src={'http://localhost:4000/uploads/'+product.photos[3]} />
          )}
        </div>
        <div className='w-[50%] m-4'>
          <h1>{title}</h1>
        </div>
      </div>
     
    </div>
  );
}

export default ProductPage