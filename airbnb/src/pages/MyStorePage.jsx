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
      <div className='m-4 justify-center gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-col-4'>
        {products.length > 0 && products.map((product, i ) =>(
          <Link to={'/profile/products/'+product._id} key={i}>
            <div className='bg-white flex flex-col'>
              <div className='relative h-[550px]'>
                {product.photos.length > 0 && (
                <img src={'http://localhost:4000/uploads/'+product.photos[0]} />
                )}
              </div>
            </div>
            <div className="pr-3 grow font-second">
              <h2 className="text-2xl">{product.title}</h2>
              <div className="text-xl">
                <div className="gap-1 flex flex-col">
                  <span className="text-xs text-[#7F8086]">
                    Price: ${product.price}
                  </span>
                  <span className="text-xs">
                    Sizes: {product.size}
                  </span>
                  <div className=' grid-cols-3 grid'>
                    <span className="text-sm text-[#7F8086]">
                      type: <span className='text-[#FE8B8B]'>{product.type}</span> 
                    </span>
                    <span className="text-sm text-[#7F8086]">
                      kind: <span className='text-[#FE8B8B]'>{product.season}</span> 
                    </span>
                  </div>
                </div>
              </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MyStorePage