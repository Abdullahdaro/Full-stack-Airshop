import React from 'react'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const {id} = useParams(); 

  return (
    <div>place page : {id}</div>
  )
}

export default ProductPage