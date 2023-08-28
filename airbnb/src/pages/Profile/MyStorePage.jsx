import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const MyStorePage = () => {
  const [products, setProducts ] = useState([]);
  const [shopData, setShopData] = useState(null);
  const [shopId, setShopId] = useState('');


  useEffect(() => {
    axios
      .get('/shops').then(({ data }) => {
        setShopData(data);
      }).catch(err => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    axios.get('/products').then(({data}) => {
      setProducts(data)
    })
    .catch(err => {
      alert(err);
    })
  }, []);

  const handleDeleteClick =  useCallback(async () => {
    try {
      console.log(shopId)
      const response = await axios.delete(`/products/${shopId}`);
      if (response.status === 200) {
        alert('Product deleted successfully');
        setProducts(prevProducts => prevProducts.filter(product => product._id !== shopId));
      } else if (response.status === 404) {
        alert('Product not found');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product');
    }
  }, [shopId]);

  return (
    <div>
      <div>
      <div className='font-main text-3xl p-2'>
          My Store
        </div>
        {shopData !== null && shopData.map((shop, i ) => (
          
          <div className='flex justify-center items-center'>
            <div>
              My shop name is:
            </div>
            {shop.title}
          </div>
        ))}
      </div>

      <div className='p-4'>
        
        {shopData !== null && shopData.length === 0 ? (
              <div>
              <div className='flex justify-center items-center'>
                Create your own store to sell your products
              </div>
            </div>
              ) : 
              <Link className="inline-flex items-center bg-gray-500 text-white py-2 px-4 rounded-full" to={'/profile/mystore/add'}> 
                <span className="mr-4" >Add a new product</span> 
                <FaPlus className="text-white text-base" />
              </Link>
              }
      </div>
      
      <div className='m-4 justify-center gap-4 px-80 grid-rows-2'>
        {products.length > 0 && products.map((product, i ) =>(
          <div className='flex shadow-lg rounded-xl p-6 justify-between'>
          <Link to={'/profile/products/'+product._id} key={i}>
            <div className='bg-white flex flex-row'>
              <div className='relative  h-[150px] w-[150px]'>
                {product.photos.length > 0 && (
                <img loading='lazy' src={'http://localhost:4000/uploads/'+product.photos[0]}
                className='object-cover rounded-lg shadow-lg w-full h-full aspect-w-1 aspect-h-1 border '  />
                )}
              </div>
            </div>
            </Link>
            <div className="pr-3 grow flex font-second">
              <div className='px-10 flex-nowrap w-full'>
                <h2 className="text-2xl">{product.title}</h2>
                <p className='text-sm pt-4'>{product.description}</p>
              </div>
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
              <div className='relative flex justify-between flex-col '>
                <button className="icon-button shadow-lg">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button           onClick={() => {
                      setShopId(product._id);
                      setTimeout(() => {
                        handleDeleteClick();
                      }, 1000); // Delay for 1 second (1000 milliseconds)
                    }} className="icon-button shadow-lg bg-secondary">
                  <FontAwesomeIcon icon={faTrash} /> 
                </button>
              </div>
           </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyStorePage