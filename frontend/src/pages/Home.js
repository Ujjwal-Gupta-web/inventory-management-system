import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import {get_categories} from "../controllers/category"
import {get_product_by_category_id} from "../controllers/product"


const Home = () => {

  let [categories,setCategories]=useState([]);
  let [active_category,setActiveCategory]=useState("");
  let [products,setProducts]=useState([]);
  let [show,setShow]=useState(false);

  useEffect(()=>{
    get_categories().then(data=>{
      console.log(data)
      if(!data.tag){
        alert(data.message);
      }
      else{
        setCategories(data.message)}
      }
      )
  },[])
  return (
    <>
      <Navbar/>
      <div className='container'>
      <div className='d-flex align-items-center justify-content-around my-3'>
      {categories
      ?
      categories.map(category=>
        <div 
        className='border border-lg bg-white text-success p-3 fw-bold' 
        key={category._id}
        style={{cursor:"pointer"}}
        onClick={()=>
          get_product_by_category_id({category_id:category._id})
          .then(data=>{
            console.log(data)
            if(data.tag){
              setActiveCategory(category.name)
              setProducts(data.message);
            }
            setShow(true)
          })
        }
        >{category.name}</div>
      )
      :
      "No Categories found"
      }
      </div>
    
    {show && <div>
      <h5>{active_category}</h5>
        {
        products.length===0?
        "No Products in this Category":
        products.map(product=><ProductCard product={product}/>)
        }
    </div>}
    </div>
    </>
  )
}

export default Home