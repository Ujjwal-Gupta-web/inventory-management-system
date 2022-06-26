import React, { useEffect, useState } from 'react'
import { get_user } from '../controllers/user';

const Navbar = () => {
  let [user,setUser]=useState({});
  useEffect(()=>{
    get_user().then(data=>setUser(data.message));
  },[])
  return (
    <>
    <div className='bg-white p-3 text-center d-flex align-items-center justify-content-between'>
        <div><b>Inventory Management System</b></div>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='mx-2'>{user.name}</div>
          <div className='mx-2 text-danger' style={{cursor:"pointer"}} onClick={()=>localStorage.removeItem("user")}>Logout</div>
        </div>
    </div>
    <div className='my-1 text-center fw-bold container '>{user.company_name}</div>
    </>
  )
}

export default Navbar