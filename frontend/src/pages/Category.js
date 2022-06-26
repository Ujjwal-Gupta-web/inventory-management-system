import React, { useState,useEffect } from 'react'
import {Link, useNavigate, useParams} from "react-router-dom"
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard';
import { get_category_by_id } from '../controllers/category';
import { get_product_by_category_id } from '../controllers/product';

const Category = () => {
  const navigate=useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [])

  let { category_id } = useParams();

  let [products,setProducts]=useState([]);
  let [categoryName,setCategoryName]=useState("");

  useEffect(()=>{
    get_category_by_id({_id:category_id}).then(data=>setCategoryName(data.message.name));
    get_product_by_category_id({category_id:category_id})
    .then(data=>{
      console.log(data)
      if(data.tag){
        console.log(data);
        setProducts(data.message);
      }
    })
  },[])

  return (
    <>
    <Navbar/>
    
    <div className='container'>
    <Link 
        style = {{ cursor: "pointer" }}
        to={`/`}
        >
        <div className='border border-lg bg-white text-dark p-3 fw-bold my-3 text-center' >Back</div>  
        </Link>

      <h5>{categoryName}</h5>
        {
        products.length===0?
        "No Products in this Category":
        products.map(product=><ProductCard product={product}/>)
        }
    </div>
    </>
  )
}

export default Category