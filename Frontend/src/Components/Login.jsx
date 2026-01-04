import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

const navigator=useNavigate();
    const [user,setUser]=useState({"Email":"","Password":""});

const handleChange=(e)=>{

    setUser({...user,[e.target.name]:e.target.value});
}

const handleSubmit=()=>{

    axios.post("http://localhost:5000/api/users/Login",user)
    .then(res=>{
        alert(res.data.message);
        localStorage.setItem("Token",res.data.Token);
        localStorage.setItem("Role",res.data.Role);
        navigator("/");

    })
    .catch(err=>{alert(err.response.data.error);})



}



  return (
    
    <>
    <div className='flex justify-center align-center mt-50'>
    
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" name='Email' value={user.Email}  onChange={handleChange}/>

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" name='Password' value={user.Password}  onChange={handleChange}/>

  <button className="btn btn-neutral mt-4" onClick={handleSubmit}>Login</button>
  <p className='mt-2 text-[15px]'>Don't have an account ? <a href="/Register" className='text-blue-800'>Sign up</a></p>
</fieldset>
</div>
    </>
  )
}

export default Login