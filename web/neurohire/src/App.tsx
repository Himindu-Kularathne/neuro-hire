// import Reeact, { useState } from 'react'
// import AppHandler from './AppHandler'
import Navbar from './conponent/NavBar'
import './App.css'
import Login from './pages/login/login'
import { AuthProvider } from './context/AuthContext'
 
function App() {

 

  return (
    <>
      <div>
        <AuthProvider>
        <Login  />
        </AuthProvider>
      </div>
      </>
  )
}

export default App
