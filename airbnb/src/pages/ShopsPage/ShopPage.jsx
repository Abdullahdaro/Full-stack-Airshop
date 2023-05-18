import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ShopPage = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [owner, setOwner] = useState(null);
  const [ownerProducts, setOwnerProducts] = useState([]);
  const [sexFilter, setSexFilter] = useState('all');
  const [newStylesFilter, setNewStylesFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/owner/${id}`).then(response => {
      setShop(response.data);
      const ownerId = response.data.owner;
      if (ownerId) {
        // Fetch the owner's data based on the owner ID
        axios.get(`/owner/${id}`).then(ownerResponse => {
          setOwner(ownerResponse.data.owner);
          // Fetch the owner's products
          axios.get(`/owner/${id}`).then(productsResponse => {
            setOwnerProducts(productsResponse.data.ownerProducts);
          });
        });
      }
    });
    
  }, [id]);

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

  useEffect(() => {
    handleFilter();
  }, [sexFilter, newStylesFilter, typeFilter, seasonFilter]);
  
  


  return (
    <div>
    <div className='flex flex-row justify-between'>
      <div className="flex flex-row w-[70%] font-second font-light text-base leading-6 items-center justify-center">
        <button onClick={() => setSexFilter('men')}>Men</button>
        <button onClick={() => setSexFilter('women')}>Women</button>
        <button onClick={() => setSexFilter('uniSex')}>UniSex</button>
        <button onClick={() => setSexFilter('children')}>Children</button>
        <button onClick={() => setSexFilter('all')}>All</button>
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
            <span className='text-second text-xs'>Shoes</span>
            <span className='font-second text-xs'>T shit</span>
            <span className='font-second text-xs'>Pants</span>
            <span className='font-second text-xs'>See All</span>
          </div>
          <div className='flex flex-col gap-1'> 
            <span className='font-second font-semibold text-ms'>Season</span>
            <button onClick={() => setSeasonFilter('summer')}>Summer</button>
            <button onClick={() => setSeasonFilter('winter')}>Winter</button>
            <button onClick={() => setSeasonFilter('spring')}>Spring</button>
            <button onClick={() => setSeasonFilter('all')}>All Seasons</button>
          </div>
        </div>
      </div>
      <div className='m-7 gap-2 grid w-[95%] grid-cols-2 md:grid-cols-4 lg:grid-col-4'>
        {filteredProducts.length > 0 && filteredProducts .map(product => (
          <Link to={'/product/'+product._id} >
            <div className='bg-white flex flex-col'>
              <div className="relative h-[400px] w-[280px] ">
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
    </div>
</div>
  );
};

export default ShopPage;