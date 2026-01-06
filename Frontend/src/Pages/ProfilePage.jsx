import React from 'react'
import Profile from '../Components/Profile'
import DashBoard from '../Components/DashBoard'

const ProfilePage = () => {
  const Role=localStorage.getItem("Role")
  if (Role =="Admin")
  {
    return(
      <>
      <DashBoard/>
      </>
      
    )
  }
  return (
    <>
    <Profile/>
    </>
  )
}

export default ProfilePage