import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const MyStorePage = () => {
  const [products, setProducts ] = useState([]);
  useEffect(() => {
    axios.get('/products').then(({data}) => {
      setProducts(data);
    })
  }, []);

  return (
    <div>
      <Link className='justify-ceneter items-center' to={'/profile/mystore/add'}> 
        Add a new product
      </Link>
      <div>
        my store
      </div>
      <div>
        {products.length > 0 && products.map((product, i ) =>(
          <Link to={'/profile/products/'+product._id} key={i}>
            <div>
              {product.photos.length > 0 && (
                <img src={'http://localhost:4000/uploads/'+product.photos[0]} />
              )}
            </div>
            <h2>{product.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MyStorePage