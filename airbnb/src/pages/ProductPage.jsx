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
    console.log(id)
    console.log(product)

    if (!product) return ''

    const { title } = product;

  return (
    <div>
      <h1>{title}</h1>
      {owner && <p>Owner: {owner.name}</p>}
    </div>
  );
}

export default ProductPage