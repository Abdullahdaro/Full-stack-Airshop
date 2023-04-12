import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components'
import { Login, RegisterPage } from './pages'
import axios from 'axios'
import { UserContextProvider } from './Contexts/UserContext'


axios.defaults.baseURL= "http://127.0.0.1:4000"
axios.defaults.withCredentials= true;

function App() {

  return (
    <div className="App">
      <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={('Element')} />
            <Route path="/Login" element={(<Login/>)} />
            <Route path="/register" element={(<RegisterPage/>)} />
        </Routes>
      </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
