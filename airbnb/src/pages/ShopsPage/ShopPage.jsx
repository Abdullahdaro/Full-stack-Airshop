import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'   



const ShopPage = () => {
    const {id} = useParams(); 
    const [shop, setShop] = useState(null)
    const [owner, setOwner] = useState(null);

    useEffect(() => {
        if (!id) {
            return 
        }
        axios.get(`/owner/${id}`).then(response => {
            setProduct(response.data)
            const ownerId = response.data.owner;
            if (ownerId) {
              // Fetch the owner's data based on the owner ID
              axios.get(`/owners/${ownerId}`).then(ownerResponse => {
                setOwner(ownerResponse.data);
              });
            }
        })
    }, [id])


  return (
    <div>ShopPage</div>
  )
}

export default ShopPage