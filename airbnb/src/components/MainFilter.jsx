import axios from 'axios';
import React, {useState, useEffect } from 'react'


const MainFilter = () => {
    const [menProducts, setMenProducts] = useState([]);
    const [womenProducts, setWomenProducts] = useState([]);
    const [childrenProducts, setChildrenProducts] = useState([]);
    const [unisexProducts, setUnisexProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.all([
        axios.get('/products/men'),
        axios.get('/products/women'),
        axios.get('/products/children'),
        axios.get('/products/unisex'),
    ])
        .then(axios.spread((menResponse, womenResponse, childrenResponse, unisexResponse) => {
        setMenProducts(menResponse.data);
        setWomenProducts(womenResponse.data);
        setChildrenProducts(childrenResponse.data);
        setUnisexProducts(unisexResponse.data);
        setIsLoading(false);
        }))
        .catch(error => {
        console.log(error);
        setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <span>
                    man
                    {menProducts.map(product => (
                        <div key={product._id}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        </div>
                    ))}
                </span>
                <span>
                    women
                    {womenProducts.map(product => (
        <div key={product._id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      ))}
                </span>
                <span>
                    Children
                    {childrenProducts.map(product => (
        <div key={product._id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      ))}
                </span>
                <span>
                    Unisex
                    
                </span>
            </div>
        </div>
    )
}

export default MainFilter