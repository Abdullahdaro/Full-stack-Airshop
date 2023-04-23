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
  <div className='m-4 gap-8 grid w-[80%] grid-cols-2 md:grid-cols-3 lg:grid-col-4'>
  {products.length > 0 && products.map(product => (
    <Link to={'/product/'+product._id} >
      <div className='bg-white flex flex-col'>
        <div className="relative h-[550px] ">
            {product.photos?.[0] && (
              <img src={'http://localhost:4000/uploads/'+product.photos?.[0]} 
                className='object-cover w-full h-full aspect-w-1 aspect-h-1 rounded-xl' />
            )}
        </div>
        <div className="pl-1 grow font-second">
              <h2 className="text-2xl">{product.title}</h2>
              <div className="text-xl">
                <div className="gap-1 flex flex-col">
                  <span className="text-xs text-[#7F8086]">
                    Price: ${product.price}
                  </span>
                  <div className='flex flex-col'>
                    <span className="text-xs">
                      Sizes: {product.size}
                    </span>
                    <span className="text-xs">
                      Sizes: {product.size}
                    </span>
                  </div>
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
      </div>
    </Link>
  ))}
</div>
  )
}

export default HomePage