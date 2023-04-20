import axios from 'axios';
import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    axios.get('/homeproducts').then(response => {
      setProducts([...response.data,...response.data,...response.data,...response.data,])
    })
  }, []);

  return (
    <div className='m-4 gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-col-4'>
      {products.length > 0 && products.map(product => (
        <Link to={'/product/'+product._id} >
          <div className='bg-gray-500 flex'>
            <div>
            <div className=' h-100'>
              {product.photos?.[0] && (
                <img src={'http://localhost:4000/uploads/'+product.photos?.[0]} 
                className='object-cover w-full h-full' style={{ objectFit: 'cover' }} />
              )}
            </div>
            {product.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default HomePage