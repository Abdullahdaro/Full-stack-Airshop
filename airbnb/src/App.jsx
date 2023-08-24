import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer, Navbar } from './components'
import { Login, RegisterPage, HomePage, ProductPage} from './pages'
import {LikedPage, Profile, MyStorePage, CreateShop} from './pages/Profile'
import { Form } from './pages/UserPageCom'
import { ShopPage } from './pages/ShopsPage'
import axios from 'axios'
import { UserContextProvider } from './Contexts/UserContext'

axios.defaults.baseURL= "http://localhost:4000"
axios.defaults.withCredentials= true;

function App() {

  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
        <div className='bg-[#FAFAFA]'>
        <Navbar />
            <Routes>
                <Route path='/' element={(<HomePage />)} />
                <Route path="/Login" element={(<Login/>)} />
                <Route path="/register" element={(<RegisterPage/>)} />
                <Route path='/profile' element={(<Profile />)} />
                <Route path='/profile/liked' element={(<LikedPage />)} />
                <Route path='/profile/mystore' element={(<MyStorePage />)} />
                <Route path='/profile/mystore/add' element={(<Form />)} />
                <Route path='/profile/products/:id' element={(<Form />)} />
                <Route path='/product/:id' element={(<ProductPage/>)} />
                <Route path='/owner/:id' element={(<ShopPage/>)} />
                <Route path='/shop' element={(<CreateShop/>)} />
                <Route path='/shops/:id' element={(<CreateShop/>)} />
            </Routes>  
          <Footer />
        </div>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
