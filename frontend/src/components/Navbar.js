import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { get_user } from '../controllers/user';

const Navbar = () => {
  let navigate=useNavigate();
  document.body.style.background="#eaeded";
  let [user,setUser]=useState({});
  useEffect(()=>{
    get_user().then(data=>setUser(data.message));
  },[])
  return (
    <>
    <div className='bg-white p-3 text-center d-flex align-items-center justify-content-between'>
        <div><Link className='text-dark text-decoration-none' to="/"><b>Inventory Management System</b></Link></div>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='mx-2' style={{cursor:"pointer"}}><Link className='text-dark text-decoration-none' to="/dashboard">{user.name}</Link></div>
          <div className='mx-2 text-danger' style={{cursor:"pointer"}} onClick={()=>{localStorage.removeItem("user"); navigate("/login");}}>Logout</div>
        </div>
    </div>
    <div className='my-1 text-center fw-bold container '>{user.company_name}</div>
    </>
  )
}

export default Navbar