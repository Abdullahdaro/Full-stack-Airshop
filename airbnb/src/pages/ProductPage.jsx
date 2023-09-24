import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams, Link  } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext';
import { useTranslation } from 'react-i18next';

const ProductPage = () => {
    const {id} = useParams(); 
    const [product, setProduct] = useState(null)
    const [owner, setOwner] = useState(null);
    const [saved, setSaved] = useState(false);
    const {user} = useContext(UserContext)
    const { t } = useTranslation("productPage");

    useEffect(() => {
        if (!id) {
            return 
        }
        axios.get(`/product/${id}`).then(response => {
            setProduct(response.data)
            const shopId = response.data.owner;
            if (shopId) {
              // Fetch the owner's data based on the owner ID
              axios.get(`/shop/${shopId}`).then(shopResponse => {
                setOwner(shopResponse.data);

              });
            }
            setSaved(response.data.savedBy.includes(user._id));
        })
    }, [id])

    console.log(owner)
    if (!product) {
      return <div>{t("Loading")}...</div>;
    }

    const handleSave = async () => {
      try {
        const response = await axios.patch(`/products/${id}`, null, {
          withCredentials: true, // Send cookies with the request
        });
        setSaved(response.data.message === 'Post Saved'); // Update the saved state based on response
      } catch (error) {
        console.error('Error saving/unsaving product:', error);
      }
    };

    const { title, price, colors, decription, material, age, sex, type, season, size, serialNumber, } = product;

  return (
    <div className=''>
      {owner && (
        <Link to={`/owner/${owner._id}`} className='flex ml-4 mt-2 font-main text-2xl leading-10'>
          {owner && <img src={'https://airshop-top-tan.onrender.com/uploads/' + owner.photos[0]} className='sm:w-20 sm:h-20 xs:w-14 xs:h-14 rounded-full shadow-lg' />}
          {owner && <p className='ml-4 xs:text-[20px] pt-1 font-light' >{owner.title} {t("Shop")}</p>}
        </Link>
      )}
      <div className='flex'>
        <div className="my-4 ml-4 gap-4 grid sm:grid-cols-2 lg:grid-cols-2 w-[80%] ">
        <div className='xs:flex '>
          {product.photos?.length && product.photos.slice(0, 1).map((photo, index) => (
            <div className="relative" key={index}>
              <img
                src={'https://airshop-top-tan.onrender.com/uploads/' + photo}
                className="object-cover w-full h-full aspect-w-1 aspect-h-1 border border-gray-300"
                alt={`Product Photo ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className='xs:hidden sm:flex'>
          {product.photos?.length > 0 && (
            <div className="relative xm:hidden sm:block">
              <img
                src={'https://airshop-top-tan.onrender.com/uploads/' + product.photos[1]}
                className="object-cover w-full h-full aspect-w-1 aspect-h-1 border border-gray-300"
                alt={`Product Photo 3`}
              />
            </div>
          )}
        </div>
        </div>
        <div className='w-[25%] my-4 mx-10 relative p-4 rounded-xl '>
          <div className='flex justify-between mb-6 mt-4'>
            <h1 className='font-second text-xl'>{title}</h1>
            <button className='w-20 text-2xl' onClick={handleSave}>{saved === true ? <FontAwesomeIcon className='text-pink' icon={faSolidHeart} /> : <FontAwesomeIcon className='' icon={faRegularHeart} /> }  </button>
          </div>
          <h2 className='font-second text- mb-12 text-[#7F8086]'>{t("PRICE")}: {price}$</h2>
          <div className='mb-4'>
            <h2>{t("COLORS")}:</h2>
            {colors.map((color, index) => (
              <div key={index} className='rounded-full mb-12 border border-black' style={{ backgroundColor: color, width: '20px', height: '20px' }}></div>
            ))}
          </div>
          <div className=' mb-12'>
            <h2 className='font-second text-ms  '>{t("AGE")}: {age}</h2>
            <h2 className='font-second text-ms '>{t("SEX")}: {sex}</h2>
            <h2 className='font-second text-ms '>{t("TYPE")}: {type}</h2>
            <h2 className='font-second text-ms '>{t("SIZES")}: {size}</h2>
            <h2 className='font-second text-ms '>{t("SEASON")}: {season}</h2>
          </div>
          <button className='bg-secondary py-2'>{t("Send a message to the seller")}</button>
        </div>
      </div>
      <div className=' w-[80%]'>
        <div className='px-6'>
          <h1>{title}</h1>
          <h2>{t("Descritop")}: <br/>{decription}</h2>
          <h2>{t("Serial Number")}: {serialNumber}</h2>
          <h2>{t("Composition")}: {material}</h2>
        </div>
        <div className="my-4 ml-4 gap-4 grid sm:grid-cols-2 lg:grid-cols-2 ">
            {product.photos?.length && product.photos.slice(2).map((photo, index) => (
              <div className="relative" key={index}>
                <img
                  src={'https://airshop-top-tan.onrender.com/uploads/' + photo}
                  className="object-cover w-full h-full aspect-w-1 aspect-h-1 border border-gray-300"
                  alt={`Product Photo ${index + 1}`}
                />
              </div>
            ))}
        </div>
      </div>
      <div>
        <h1>{t("Products that you may like")}</h1>
        <div></div>
      </div>
    </div>
  );
}

export default ProductPage