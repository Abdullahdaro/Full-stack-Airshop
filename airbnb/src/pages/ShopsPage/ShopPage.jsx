import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShopPage = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [owner, setOwner] = useState(null);
  const [ownerProducts, setOwnerProducts] = useState([]);

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

  console.log(shop);

  console.log(ownerProducts);

  return (
    <div>
      {/* Render shop and owner details */}
    </div>
  );
};

export default ShopPage;