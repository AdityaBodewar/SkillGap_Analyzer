import React from 'react'
import NavBar from './Components/NavBar'
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import AnalyzePage from './Pages/AnalyzePage'
import JobsPage from './Pages/JobsPage'
import JobListSection from './Pages/JoblistPage'
const App = () => {
  return (
   <>
   
   <Router>

<Routes>

  <Route path='/' element={<HomePage/>}/>
  
  <Route path='/Profile' element={<ProfilePage/>}/>
  <Route path='/Login' element={<LoginPage/>}/>
   <Route path='/Register' element={<RegisterPage/>}/>
   <Route path='/Analyze' element={<AnalyzePage/>}/>
   <Route path='/Jobs' element={<JobsPage/>}/>
   <Route path='/JobList' element={<JobListSection/>}/>
  
</Routes>

   </Router>
   
   </>
  )
}

export default App