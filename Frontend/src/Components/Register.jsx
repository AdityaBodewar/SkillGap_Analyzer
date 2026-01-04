import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Register = () => {


    const navigator=useNavigate();
    const [user,setUser]=useState({"Email":"","Password":"","Username":"","Age":""});

const handleChange=(e)=>{

    setUser({...user,[e.target.name]:e.target.value});
}

const handleSubmit=()=>{

    axios.post("http://localhost:5000/api/users/Register",user)
    .then(res=>{
        alert(res.data.message);
        navigator("/Login");

    })
    .catch(err=>{alert(err.response.data.error);})



}



  return (
    <>
    
     <div className='flex justify-center align-center mt-50'>
    
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>

<label className="label">Full Name</label>
  <input type="text" className="input" placeholder="Email" name='Username' value={user.Username}  onChange={handleChange}/>

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" name='Email' value={user.Email}  onChange={handleChange}/>

<label className="label">Age</label>
  <input type="number" className="input" placeholder="Password" name='Age' value={user.Age}  onChange={handleChange}/>

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" name='Password' value={user.Password}  onChange={handleChange}/>

  <button className="btn btn-neutral mt-4" onClick={handleSubmit}>Register</button>
  <p className='mt-2 text-[15px]'>Already Have an Account ? <a href="/Login" className='text-blue-800'>Login</a></p>
</fieldset>
</div>
    
    
    
    
    </>
  )
}

export default Register