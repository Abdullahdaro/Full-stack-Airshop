import axios from 'axios';
import React, {useState, useEffect, useContext,  } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext'
import Map from '../components/ComponentsUsage/Map';

const HomePage = ({selectedCountry, setSelectedCountry, selectedCity, setSelectedCit}) => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(28);
  const [loadMore, setLoadMore] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sexFilter, setSexFilter] = useState('all');
  const [newStylesFilter, setNewStylesFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');

  useEffect(()=> {
    axios.get('/homeproducts').then(response => {
      setProducts([...response.data, response.data, response.data, response.data,])
    })
  }, []);

  const loadMoreProducts = () => {
    // Increase the number of visible products by 30
    setVisibleProducts(visibleProducts + 30);
  };
  
  useEffect(() => {
    const handleFilter = () => {
      const filtered = products.filter(product => {
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
        if (selectedCountry !== 'all' && product.country !== selectedCountry) {
          return false;
        }
        if (selectedCity !== 'all' && product.city !== selectedCity) {
          return false;
        }
        return true;
      });

      setFilteredProducts(filtered);
    };
      handleFilter();
    }, [sexFilter, newStylesFilter, typeFilter, selectedCountry, selectedCity, seasonFilter, products]);

  return (
  <div className='pb-4'>
    <div className='flex flex-row justify-between'>
      <div className="flex flex-row w-[70%] font-second font-light text-base leading-6 items-center justify-center">
      <button  onClick={() => setSexFilter('men')}>Men</button>
          <button  onClick={() => setSexFilter('women')}>Women</button>
          <button  onClick={() => setSexFilter('uniSex')}>UniSex</button>
          <button  onClick={() => setSexFilter('children')}>Children</button>
          <button  onClick={() => setSexFilter('all')}>All</button>
      </div>
      <div className='flex flex-row font-second font-light text-base leading-6 items-center justify-center gap-8 m-5'>
      <div class="font-normal text-base leading-6 flex items-center justify-center relative">
        <span class="relative">
          What are you looking for?
          <span class="absolute left-0 right-0 bottom-[-5px] h-[1px] bg-black"></span>
        </span>
      </div>
        <span className='font-red-hat-display font-light text-pink text-base text-[20px]'>Search</span>
      </div>
    </div>
    <div className='border opacity-20 border-black '></div>
    <div className='flex'>
      <div className='w-[17%] p-8 '>
        <div className='flex flex-col gap-1 pb-10'> 
          <span className='text-main font-bold text-2xl'>New Styles</span>
          <span className='font-second text-ms'>See All</span>
          <span className='font-second text-ms'>Lastest</span>
          <span className='font-second text-ms'>Discounts</span>
        </div>
        <div className='flex flex-col gap-1'> 
        
          <span className='text-main font-bold pb-1 text-2xl '>FILTER</span>
          <div className='flex flex-col gap-1 mb-3'>
              <span className='font-second font-semibold text-ms'>Season</span>
              <button className='text-left font-main text-xs' onClick={() => setTypeFilter('t-shirt')}>
                T-Short
              </button>
              <button className='text-left font-main text-xs' onClick={() => setTypeFilter('pant')}>
                Pants
              </button>
              <button className='text-left font-main text-xs' onClick={() => setTypeFilter('shoes')}>
                Shoes
              </button>
              <button className='text-left font-main text-xs' onClick={() => setTypeFilter('all')}>
                All Seasons
              </button>
            </div>
          <div className='border opacity-20 border-black mr-20 '></div>
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
{/*       <div>
      <button>Geocode Address</button>
      <Map />
    </div> */}
      <div className='m-7 gap-2 grid w-[95%] sm:grid-cols-1 md:grid-cols-4 lg:grid-col-4'>
        {filteredProducts.length > 0 && filteredProducts.slice(0, visibleProducts).map(product => (
            <div className='bg-white flex flex-col'>
              <Link to={'/product/'+product._id} >
                <div className="relative h-[400px] w-[280px] ">
                    {product.photos?.[0] && (
                      <img loading='lazy' src={'http://localhost:4000/uploads/'+product.photos?.[0]} 
                        className='object-cover w-full h-full aspect-w-1 aspect-h-1 rounded-xl' />
                    )}
                </div>
              </Link>
              <div className="pl-1 grow font-second pt-3">
                <div className='flex justify-between w-full'>
                <Link to={'/product/'+product._id} >
                  <h2 className="text-2xl">{product.title}</h2>
                </Link>
                   {/*                   <button onClick={handleSave(product._id)} title={product.saved ? "Remove from My List" : "Add to My List"} className=''>
                    {product.saved ? "Remove" : "Add "}
                  </button>     */}           
                </div>
                <div className="text-xl">
                  <div className="gap-1 flex flex-col">
                    <span className="text-xs text-[#7F8086]">
                      Price: ${product.price}
                    </span>
                    <div className='flex flex-col'>
                      <span className="text-xs">
                        Sizes: {product.type}
                      </span>
                      <span className="text-xs">
                        Sizes: {product.size}
                      </span>
                    </div>
                    <div className=' grid-cols-2 grid'>
                      <span className="text-sm text-[#7F8086]">
                        Gendar: <span className='text-[#FE8B8B]'>{product.sex}</span> 
                      </span>
                      <span className="text-sm text-[#7F8086]">
                        Kind: <span className='text-[#FE8B8B]'>{product.season}</span> 
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
    {loadMore && (
        <div className="flex justify-center">
          <button onClick={loadMoreProducts}><span className='px-20 py-2 text-2xl bg-main font-bold text-white text-opacity-80 bg-opacity-50 rounded-sm'>See More</span></button>
        </div>
      )}
  </div>
  )
}

export default HomePage