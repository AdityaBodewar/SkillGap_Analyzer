import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
 const navigate=useNavigate();
const token=localStorage.getItem("Token");
 

const handleProfileClick=()=>{

    
    if(token)
    {
        navigate("/Profile");

    }
    else{
        navigate("/Login");
    }

 }
  return (
    <>
    

    <div className="navbar  bg-base-100 shadow-sm">
  <div className="flex-1 justify-around">
    <a className="btn btn-ghost text-xl  ">daisyUI</a>
  </div>
  <div className="flex-none">
   
    <div className="dropdown dropdown-end " onClick={handleProfileClick}>
      <div tabIndex={0}  className="btn btn-ghost btn-circle avatar" >
       <div className="w-10 rounded-full " >
          <img 
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div> 
      </div>
    </div>
  </div>
</div>
    



    </>
  )
}

export default NavBar