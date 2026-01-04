import React from 'react'
import NavBar from './Components/NavBar'
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
const App = () => {
  return (
   <>
   
   <Router>

<Routes>

  <Route path='/' element={<HomePage/>}/>
  
  <Route path='/Profile' element={<ProfilePage/>}/>
  <Route path='/Login' element={<LoginPage/>}/>
   <Route path='/Register' element={<RegisterPage/>}/>
  
</Routes>

   </Router>
   
   </>
  )
}

export default App