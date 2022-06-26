import React, { useState } from 'react'
import { decrement_product_quantity, delete_product, increment_product_quantity } from '../controllers/product';

const ProductCard = ({product}) => {

  let [quantity_change,setQuantityChange]=useState(0);

  const handle_decrement=()=>{
      decrement_product_quantity({_id:product._id,decrement:parseInt(quantity_change)}).then(data=>{
        alert(data.message);
        window.location.reload();
      })
      
  }
  const handle_increment=()=>{
      increment_product_quantity({_id:product._id,increment:parseInt(quantity_change)}).then(data=>{
        alert(data.message);
        window.location.reload();
      })
  }
  const handle_delete=()=>{
      delete_product(product).then(data=>{
        alert(data.message);
        window.location.reload();
      });
      
  }

  return (
    <div className='bg-white p-3  my-2'>
    <div className='d-flex align-items-center justify-content-between'>
      <div>
      <h5>{product.name}</h5>
      <h7 className='text-muted'>Rs{product.price}/-</h7>
      </div>

      <div>
        <div className='d-flex align-items-center justify-content-center'>
        <h5>Stock : {product.quantity}</h5>
          <div className='d-flex align-items-center justify-content-between'>
          <button className='btn btn-outline-secondary mx-2 btn-sm'
          onClick={handle_decrement}
          > - </button>
          <input type="number" value={quantity_change} onChange={(e)=>setQuantityChange(e.target.value)}/>
          <button className='btn btn-outline-secondary mx-2 btn-sm'
          onClick={handle_increment}
          > + </button>
          </div>
        </div>
      </div>
      </div>
      <div className='mt-3 d-flex align-items-center justify-content-between'>
      <button className='btn btn-outline-secondary btn-sm'
      // modal
      > Edit </button>
      <button className='btn btn-outline-danger mx-2 btn-sm'
      onClick={handle_delete}
      > Delete </button>
      </div>
    </div>
  )
}

export default ProductCard