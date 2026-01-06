import React, { useEffect } from 'react'
import default_profile from '../assets/default_profile.webp'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DashBoard = () =>{

 const navigator=useNavigate();

    const [user,setUser]=useState({"Email":""});
const handleLogout=()=>{

    localStorage.removeItem("Token");
    localStorage.removeItem("Role");
    navigator("/");
    
}
const Token=localStorage.getItem("Token")

useEffect((e)=>{

  axios.get("http://127.0.0.1:5000/api/users/DashBoard",{headers:{Authorization:`Bearer ${Token}`}})
  .then(res=>{setUser(res.data.userdata)})
  .catch(err=>{alert(err.response.data.error)});

},[])


  return (
    <>
    <div className='flex justify-center items-center '>
    <div className='flex   h-screen border-2 w-[calc(100vw-65%)]  flex-col '>
      
      <div   className='w-full flex justify-center items-center'>
      <div className='w-40 h-40 rounded-full bg-white mt-20 '>
        <img src={default_profile} className='w-full h-full rounded-full ' />
      </div>
      </div>
     
     <div className='flex flex-col mt-20 gap-3 translate-x-8'>
     <div className='text-4xl'>
        <label >Username : </label>
        <input type="email" name="Email" value={user.Email} isEditing="True" />
      {/* <h1 className='inline'>Username : </h1><p className='inline'>{user.Email}</p> */}
     </div>


   </div>

    <div className='mt-20 ml-20'>
    <button className="border border-black rounded-2xl p-4 bg-red-600 " onClick={handleLogout}>logout</button>
    </div>
    </div>
    </div>
    
    
    </>
  )
}

export default DashBoard