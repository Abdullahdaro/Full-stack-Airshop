import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const {id} = useParams(); 
    const [product, setProduct] = useState(null)

    useEffect(() => {
        if (!id) {
            return 
        }
        axios.get(`/product/${id}`).then(response => {
            setProduct(response.data)
        })
    }, [id])
    console.log(id)
    console.log(product)

    if (!product) return ''

  return (
    <div>{product.title}</div>
  )
}

export default ProductPage