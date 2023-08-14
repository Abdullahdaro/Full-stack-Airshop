import {createContext, useState, useEffect} from 'react'
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    const [ready, setReady] = useState(false)
    useEffect(() => {
        if (!user) {
          axios.get('/profile').then(({data}) => {
            setUser(data)
            setReady(true)
          })
          };
      }, []);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    return (
        <UserContext.Provider value={{setUser, user, ready,  selectedCountry, setSelectedCountry, selectedCity, setSelectedCity}}>
            {children}
        </UserContext.Provider>
        
    )
}