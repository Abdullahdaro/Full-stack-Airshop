import axios from 'axios';
import React, {useState, useEffect, useContext,  } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext'
import Map from '../components/ComponentsUsage/Map';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faMars, faVenus , faVenusMars , faChildren } from '@fortawesome/free-solid-svg-icons';

const HomePage = ({selectedCountry, setSelectedCountry, selectedCity, setSelectedCit}) => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(28);
  const [loadMore, setLoadMore] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sexFilter, setSexFilter] = useState('all');
  const [newStylesFilter, setNewStylesFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');
  const { t } = useTranslation('main');
  const [showfilter, setShowFilter] = useState(false);

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
    <div className='flex flex-row justify-between xs:px-2 md:px-10'>
      <div className="xs:hidden sm:flex flex-row w-[70%] font-second font-light text-base leading-6 items-center justify-center">
          <button  onClick={() => setSexFilter('men')}>{t("men")}</button>
          <button  onClick={() => setSexFilter('women')}>{t('Women')}</button>
          <button  onClick={() => setSexFilter('uniSex')}>{t('UniSex')}</button>
          <button  onClick={() => setSexFilter('children')}>{t('kids')}</button>
          <button  onClick={() => setSexFilter('all')}>{t("all")}</button>
      </div>
      <div className='flex flex-row sm:hidden font-light items-center justify-center gap-2 ml-2'>
        <FontAwesomeIcon icon={faBars} onClick={() => setShowFilter(!showfilter)}/>
        Filter
        {showfilter && (
          <div className='flex absolute z-10 left-0 top-0 pt-10 bg-pink bg-opacity-70 p-10 text-white font-semibold w- h-full flex-col gap-4'>
            <button className='flex justify-start' onClick={() => setShowFilter(false)}><FontAwesomeIcon icon={faXmark} className='border rounded-lg bg-black px-2 py-1 hover:text-pink' /></button>
            <button className='flex justify-start px-6 text-white py-1 bg-black gap-4' onClick={() => setSexFilter('men')}>
            <FontAwesomeIcon icon={faMars} />
            {t("men")}</button>
            <button className='flex justify-start px-6 text-white py-1 bg-black gap-4' onClick={() => setSexFilter('women')}>
            <FontAwesomeIcon icon={faVenus} />
            {t('Women')}</button>
            <button className='flex justify-start px-6 text-white py-1 bg-black gap-4' onClick={() => setSexFilter('uniSex')}>
            <FontAwesomeIcon icon={faVenusMars} />
            {t('UniSex')}</button>
            <button className='flex justify-start px-6 text-white py-1 bg-black gap-4' onClick={() => setSexFilter('children')}>
            <FontAwesomeIcon icon={faChildren} />
            {t('kids')}</button>
            <button className='flex justify-start px-6 text-white py-1 bg-black gap-4' onClick={() => setSexFilter('all')}>{t("all")}</button>
            
          </div>
          )
        }
      </div>
      <div className='flex flex-row  font-light items-center justify-center xs:p-4 xs:gap-4 sm:gap-8 sm:m-5'>
        <div class=" leading-6 flex items-center justify-center xs:text-sm sm:text-lg relative">
          <span class="relative">
            {t("What are you looking for?")}
            <span class="absolute left-0 right-0 bottom-[-5px] h-[1px] bg-black"></span>
          </span>
        </div>
        <span className='font-red-hat-display font-light text-pink text-base text-[20px]'>{t("Search")}</span>
      </div>
    </div>
    <div className='border opacity-20 border-black '></div>
    <div className='flex px-2'>
      <div className='w-[17%] p-8 xs:hidden sm:flex-col sm:flex'>
        <div className='flex flex-col gap-1 pb-10'> 
          <span className='text-main font-bold text-2xl'>{t("New Styles")}</span>
          <span className='font-second text-ms'>{t("See All")}</span>
          <span className='font-second text-ms'>{t("Lastest")}</span>
          <span className='font-second text-ms'>{t("Discounts")}</span>
        </div>
        <div className='flex flex-col gap-1'> 
          <span className='text-main font-bold pb-1 text-2xl '>{t("FILTER")}</span>
          <div className='flex flex-col gap-1 mb-3'>
              <span className='font-second font-semibold text-ms'>{t("Type")}</span>
              <button className='text-left font-main text-xs' onClick={() => setTypeFilter('t-shirt')}>
                {t("T-Short")}
              </button>
              <button className='text-left font-main text-xs' onClick={() => setTypeFilter('pant')}>
                {t("Pants")}
              </button>
              <button className='text-left font-main text-xs' onClick={() => setTypeFilter('shoes')}>
                {t("Shoes")}
              </button>
              <button className='text-left font-main text-xs' onClick={() => setTypeFilter('all')}>
                {t("all")}
              </button>
            </div>
          <div className='border opacity-20 border-black mr-20 '></div>
          <div className='flex flex-col gap-1'>
              <span className='font-second font-semibold text-ms'>{t("Season")}</span>
              <button className='text-left font-main text-xs' onClick={() => setSeasonFilter('summer')}>
                {t("Summer")}
              </button>
              <button className='text-left font-main text-xs' onClick={() => setSeasonFilter('winter')}>
                {t("Winter")}
              </button>
              <button className='text-left font-main text-xs' onClick={() => setSeasonFilter('spring')}>
                {t("Spring")}
              </button>
              <button className='text-left font-main text-xs' onClick={() => setSeasonFilter('all')}>
                {t("All Seasons")}
              </button>
            </div>
        </div>
      </div>
{/*       <div>
      <button>Geocode Address</button>
      <Map />
    </div> */}
      <div className='xs:p-2 sm:m-7 gap-2 grid w-[95%] xs:grid-cols-2 md:grid-cols-3 lg:grid-col-4'>
        {filteredProducts.length > 0 && filteredProducts.slice(0, visibleProducts).map(product => (
            <div className='shadow-lg ss:w-min-[250px] rounded-lg flex flex-col'>
              <Link to={'/product/'+product._id} >
                <div className="relative w-full ">
                    {product.photos?.[0] && (
                      <img loading='lazy' src={'http://localhost:4000/uploads/'+product.photos?.[0]} 
                        className='object-cover aspect-w-1 aspect-h-1 rounded-xl' />
                    )}
                </div>
              </Link>
              <div className="pl-1 grow font-second pt-3">
                <div className='flex justify-between w-full'>
                <Link to={'/product/'+product._id} >
                  <h2 className="xs:text-md sm:text-2xl">{product.title}</h2>
                </Link>
                   {/*                   <button onClick={handleSave(product._id)} title={product.saved ? "Remove from My List" : "Add to My List"} className=''>
                    {product.saved ? "Remove" : "Add "}
                  </button>     */}           
                </div>
                <div className="sm:text-xl">
                  <div className="gap-1 flex flex-col">
                    <span className="text-xs text-[#7F8086]">
                      {t("Price")} ${product.price}
                    </span>
                    <div className='sm:flex sm:flex-col xs:hidden'>
                      <span className="text-xs">
                        {t("TypeForm")} {product.type}
                      </span>
                      <span className="text-xs">
                        {t("Sizes")}: {product.size}
                      </span>
                    </div>
                    <div className='grid-cols-2 grid'>
                      <span className="text-sm text-[#7F8086]">
                       <span className='xs:hidden sm:flex'>{t("Gendar")} </span> 
                        <span className='text-[#FE8B8B]'>{product.sex}</span> 
                      </span>
                      <span className="text-sm text-[#7F8086]">
                      <span className='xs:hidden sm:flex'>{t("Kind")} </span>  
                        <span className='text-[#FE8B8B]'>{product.season}</span> 
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
        <div className="flex justify-center py-10">
          <button onClick={loadMoreProducts}><span className='xs:px-10 sm:px-20 py-2 sm:text-2xl bg-[#b02020] bg font-bold text-white text-opacity-80 bg-opacity-80 rounded-sm'>See More</span></button>
        </div>
      )}
  </div>
  )
}

export default HomePage