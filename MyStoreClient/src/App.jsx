import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header/Header'
import Body from './Components/Body/Body'
import Footer from './Components/Footer/Footer'

function App() {
  return (
    <div>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default App
