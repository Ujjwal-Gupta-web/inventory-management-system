import React, { useState } from 'react'
import { decrement_product_quantity, delete_product, increment_product_quantity, update_product } from '../controllers/product';

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
      data-bs-toggle="modal" data-bs-target={`#edit_product${product._id}`}
      > Edit </button>
      <button className='btn btn-outline-danger mx-2 btn-sm'
      onClick={handle_delete}
      > Delete </button>
      </div>

      <div class="modal fade" id={`edit_product${product._id}`} tabindex="-1" aria-labelledby={`edit_product${product._id}Label`} aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id={`edit_product${product._id}Label`}>Edit User Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="mb-3">
                <label for="product_name" class="form-label">Name</label>
                <input type="text" id="product_name" class="form-control" defaultValue={product.name} />
              </div>

              <div class="mb-3">
                <label for="product_quantity" class="form-label">Quantity</label>
                <input type="number" id="product_quantity" class="form-control" defaultValue={product.quantity} />
              </div>

              <div class="mb-3">
                <label for="product_price" class="form-label">Price</label>
                <input type="number" id="product_price" class="form-control" defaultValue={product.price} />
              </div>
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary"
                onClick={() => {
                  let name = document.getElementById("product_name").value;
                  let quantity = document.getElementById("product_quantity").value;
                  let price = document.getElementById("product_price").value;

                  if (name === "" || quantity === "" || price==="") {
                    alert("please fill all the required details");
                    return;
                  }
                  let obj = {
                    ...product,
                    name,
                    quantity,
                    price
                  }
                  update_product(obj).then(data => { alert(data.message); window.location.reload(); });
                }}
              >Save Changes</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductCard