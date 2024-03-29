import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const LikedPage = () => {
  const [likedproducts, setLikedproducts] = useState([])
  const { t } = useTranslation("likedpage");

  useEffect(() => {
    axios.get('/savedproducts').then(response => {
      setLikedproducts([...response.data])
      console.log(likedproducts);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  console.log(likedproducts);


  return (
    <div>
      <div className='font-main text-3xl p-2'>
          {t("My saved List")}
      </div>
      <div className='m-4 justify-center gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-col-4'>
        {likedproducts.length > 0 && likedproducts.map((product, i ) =>(
          <Link to={'/product/'+product._id} key={i}>
            <div className='bg-white flex flex-col'>
              <div className='relative h-[600px] w-[475px]'>
                {product.photos.length > 0 && (
                <img src={'https://airshop-top-tan.onrender.com/uploads/'+product.photos[0]}
                className='object-cover w-full h-full aspect-w-1 aspect-h-1 border border-greay-400 '  />
                )}
              </div>
            </div>
            <div className="pr-3 grow font-second">
              <h2 className="text-2xl">{product.title}</h2>
              <div className="text-xl">
                <div className="gap-1 flex flex-col">
                  <span className="text-xs text-[#7F8086]">
                    {t("Price")}: ${product.price}
                  </span>
                  <span className="text-xs">
                    {t("Sizes")}: {product.size}
                  </span>
                  <div className=' grid-cols-3 grid'>
                    <span className="text-sm text-[#7F8086]">
                      {t("type")}: <span className='text-[#FE8B8B]'>{product.type}</span> 
                    </span>
                    <span className="text-sm text-[#7F8086]">
                      {t("kind")}: <span className='text-[#FE8B8B]'>{product.season}</span> 
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

export default LikedPage