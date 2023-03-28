import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components'
import { Login, RegisterPage } from './pages'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={('Element')} />
            <Route path="/Login" element={(<Login/>)} />
            <Route path="/register" element={(<RegisterPage/>)} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
