import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ShopPage = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [owner, setOwner] = useState(null);
  const [ownerProducts, setOwnerProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sexFilter, setSexFilter] = useState('all');
  const [newStylesFilter, setNewStylesFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/owner/${id}`).then(response => {
      setShop(response.data);
      const ownerId = response.data.owner;
      if (ownerId) {
        axios.get(`/owner/${id}`).then(ownerResponse => {
          setOwner(ownerResponse.data.owner);
          axios.get(`/owner/${id}`).then(productsResponse => {
            setOwnerProducts(productsResponse.data.ownerProducts);
            setLoading(false);
          });
        });
      }
    });
  }, [id]);

  useEffect(() => {
  const handleFilter = () => {
    const filtered = ownerProducts.filter(product => {
      if (sexFilter !== 'all' && product.sex !== sexFilter) {
        return false;
      }
      if (newStylesFilter !== 'all' && !product.newStyles.includes(newStylesFilter)) {
        return false;
      }
      if (typeFilter !== 'all' && product.type !== typeFilter) {
        return false;
      }
      if (seasonFilter !== 'all' && product.season !== seasonFilter) {
        return false;
      }
      return true;
    });

    setFilteredProducts(filtered);
  };
    handleFilter();
  }, [sexFilter, newStylesFilter, typeFilter, seasonFilter, ownerProducts]);

/*   useEffect(() => {
    if (ownerProducts.length > 0) {
      handleFilter();
    }
  }, [sexFilter, newStylesFilter, typeFilter, seasonFilter]);

  
 */
if (!shop) {
    return null;
  } 

  if(loading) {
    return (
      <div className='flex flex-col items-center justify-center'>
        loading...
      </div>    

    )}

  return (
    <>
    <div>
      <div className='flex flex-row justify-between'>
        <div className="flex flex-row w-[70%] font-second font-light text-base leading-6 items-center justify-center">
          <button  onClick={() => setSexFilter('women')}>Women</button>
          <button  onClick={() => setSexFilter('uniSex')}>UniSex</button>
          <button  onClick={() => setSexFilter('children')}>Children</button>
          <button  onClick={() => setSexFilter('men')}>Men</button>
          <button  onClick={() => setSexFilter('all')}>All</button>
        </div>
        <div className='flex flex-row font-second font-light text-base leading-6 items-center justify-center gap-8 m-5'>
        <div class="font-normal font-light text-base leading-6 flex items-center justify-center relative">
          <span class="relative">
            What are you looking for?
            <span class="absolute left-0 right-0 bottom-[-5px] h-[1px] bg-black"></span>
          </span>
        </div>
          <span className='font-red-hat-display font-light text-pink text-base text-[20px]'>Shape</span>
        </div>
      </div>
      <div className='border border-black '></div>
      <div className='flex'>
        <div className='w-[17%] p-8 '>
          <div className='flex flex-col gap-1 pb-10'> 
            <span className='text-main font-bold text-2xl'>New Styles</span>
            <span className='font-second text-ms'>See All</span>
            <span className='font-second text-ms'>Lastest</span>
            <span className='font-second text-ms'>Discounts</span>
          </div>
          <div className='flex flex-col gap-1'> 
            <span className='text-main font-bold pb-1 text-2xl'>FILTER</span>
            <div className='flex flex-col gap-1 pb-3'> 
              <span className='font-second font-semibold text-ms'>STYLE</span>
              <span className='text-second font-main text-xs'>Shoes</span>
              <span className='font-second font-main text-xs'>T shit</span>
              <span className='font-second font-main text-xs'>Pants</span>
              <span className='font-second font-main text-xs'>See All</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='font-second font-semibold text-ms'>Season</span>
              <button className='text-left font-main text-xs' onClick={() => setSeasonFilter('summer')}>
                Summer
              </button>
              <button className='text-left font-main text-xs' onClick={() => setSeasonFilter('winter')}>
                Winter
              </button>
              <button className='text-left font-main text-xs' onClick={() => setSeasonFilter('spring')}>
                Spring
              </button>
              <button className='text-left font-main text-xs' onClick={() => setSeasonFilter('all')}>
                All Seasons
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            {/* Add your loading indicator here */}
            Loading...
          </div>
        ) : (
        <div className='m-7 gap-2 grid w-[95%] sm:grid-cols-1 md:grid-cols-3 lg:grid-col-4'>
          {filteredProducts.length > 0 && filteredProducts .map(product => (
            <Link key={product._id} to={'/product/'+product._id} >
              <div className=' flex flex-col bg-gray-200 rounded-xl'>
                <div className="relative h-[625px] w-full ">
                  {product.photos?.[0] && (
                    <img src={'http://localhost:4000/uploads/'+product.photos?.[0]} 
                      className='object-cover w-full h-full aspect-w-1 aspect-h-1 rounded-xl' />
                  )}
                </div>
                <div className="pl-1 grow font-second ">
                  <h2 className="text-2xl" key={product.title}>{product.title}</h2>
                  <div className="text-xl">
                    <div className="gap-1 flex flex-col">
                      <span className="text-xs text-[#7F8086]" key={product.price} >
                        Price: ${product.price}
                      </span>
                      <div className='flex flex-col'>
                        <span className="text-xs" key={product.size}>
                          Sizes: {product.size}
                        </span>
                        <span className="text-xs" key={product.sex}>
                          Gendar: {product.sex}
                        </span>
                      </div>
                      <div className=' grid-cols-2 grid init-flex'>
                        <span className="text-sm text-[#7F8086]" key={product.type}>
                          Type: <span className='text-[#FE8B8B]'>{product.type}</span> 
                        </span>
                        <span className="text-sm text-[#7F8086]" key={product.season}>
                          Season: <span className='text-[#FE8B8B]'>{product.season}</span> 
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )};
      </div>
    </div>
    </>
  );
};

export default ShopPage;