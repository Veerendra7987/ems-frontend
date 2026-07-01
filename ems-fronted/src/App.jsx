import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ListEmployeeComponent from './MyComponents/ListEmployeeComponent'
import HeaderComponent from './MyComponents/HeaderComponent'
import FooterComponent from './MyComponents/FooterComponent'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import EmployeeComponent from './MyComponents/EmployeeComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <FooterComponent />
      <HeaderComponent />
      <Routes>
        <Route path='/' element = {<ListEmployeeComponent/>}></Route>
        <Route path='/employees' element = {<ListEmployeeComponent/>}></Route>
        <Route path='/add-employee' element = {<EmployeeComponent/>}></Route>
        <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
