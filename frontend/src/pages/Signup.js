import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup_user } from '../controllers/user'

function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}


const Signup = () => {

  
  const navigate=useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [])
  
  document.body.style.backgroundColor="#595dcff2";
  
  let [name,setName]=useState("")
  let [company_name,setCompanyName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")

  const handle_signup  = () =>{
    if(name===""){
      alert("Name feild cannot be empty");
      return;
    }
    else if(email===""){
      alert("Email feild cannot be empty");
      return;
    }
    else if(company_name===""){
      alert("Company Name feild cannot be empty");
      return;
    }
    else if(password===""){
      alert("Password feild cannot be empty");
      return;
    }
    else if(!validateEmail(email)){
      alert("You have entered an invalid email address!")
      return;   
    }

    let obj={
      name,company_name,email,password
    }
    signup_user(obj).then(data=>{
      alert(data.message);
      if(data.tag){
        navigate("/login");
      }
      else{
        setName("");
        setCompanyName("");
        setEmail("");
        setPassword("");
      }
    })
    // console.log(obj);
  }

  return (
    <>
    <div className='p-3 text-center' style={{background:"#e9e9e9"}}>
    <b>Inventory Management System</b>
    </div>
    <div className='container border border-lg p-4 mt-5' style={{background:"#e9e9e9"}}>
      <h3 className='mb-3'>Signup</h3>
      <div className='text-muted my-1 fs-7'>Already registered ? <Link to="/login">Login here</Link></div>
    <div class="mb-3">
    <label for="signup_name" class="form-label">Name</label>
    <input type="text" class="form-control" value={name} onChange={(e)=>setName(e.target.value)} id="signup_name"/>
  </div>


  <div class="mb-3">
    <label for="signup_company_name" class="form-label">Company Name</label>
    <input type="text" class="form-control" value={company_name} onChange={(e)=>setCompanyName(e.target.value)} id="signup_company_name"/>
  </div>

  <div class="mb-3">
    <label for="signup_email" class="form-label">Email address</label>
    <input type="email" class="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="signup_email"/>
  </div>

  <div class="mb-3">
    <label for="signup_password" class="form-label">Password</label>
    <input type="password" class="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="signup_password"/>
  </div>

  <button onClick={handle_signup} class="btn btn-secondary">Register</button>
    </div>
    </>
  )
}

export default Signup