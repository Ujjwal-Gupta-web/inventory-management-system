import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { add_category, delete_category, get_categories, update_category } from "../controllers/category"
import { add_product } from '../controllers/product'

const Home = () => {

  const navigate=useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [])

  let [categories, setCategories] = useState([]);

  useEffect(() => {
    get_categories().then(data => {
      console.log(data)
      if (!data.tag) {
        alert(data.message);
      }
      else {
        setCategories(data.message)
      }
    }
    )
  }, [])
  return (
    <>
      <Navbar />

      <div className='container'>

        <div className='p-3 bg-white border border-lg d-flex align-items-center justify-content-between my-3'>
          <button className='btn text-white' data-bs-toggle="modal" data-bs-target="#addProduct" style={{ background: "#595dcff2" }}>Add Product</button>
          <button className='btn text-white' data-bs-toggle="modal" data-bs-target="#addCategory" style={{ background: "#595dcff2" }}>Add Category</button>
          <button className='btn text-white' data-bs-toggle="modal" data-bs-target="#editCategory" style={{ background: "#595dcff2" }}>Edit/Delete Category</button>
        </div>

        {/* ADD PRODUCT MODAL */}
        <div class="modal fade" id="addProduct" tabindex="-1" aria-labelledby="addProductLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addProductLabel">Add Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              {categories.length === 0 ?
                <div class="modal-body">
                  "No categories found, create a category first"
                </div>
                :
                <div class="modal-body">

                  <div class="mb-3">
                    <label for="product_name" class="form-label">Name</label>
                    <input type="text" id="product_name" class="form-control" />
                  </div>

                  <div class="mb-3">
                    <label for="product_quantity" class="form-label">Quantity</label>
                    <input type="number" id="product_quantity" class="form-control" defaultValue={0} />
                  </div>

                  <div class="mb-3">
                    <label for="product_price" class="form-label">Price</label>
                    <input type="number" id="product_price" class="form-control" defaultValue={0} />
                  </div>

                  <div class="mb-3">
                    <label for="product_category_id" class="form-label">Category</label>
                    <select id="product_category_id" class="form-control" value={""}>
                      {

                        categories.map(category =>
                          <option
                            value={category._id}
                            key={category._id}
                          >{category.name}</option>
                        )
                      }

                    </select>
                  </div>
                </div>
              }
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"
                  onClick={() => {

                    let obj = {
                      name: document.getElementById("product_name").value,
                      quantity: document.getElementById("product_quantity").value,
                      price: document.getElementById("product_price").value,
                      category_id: document.getElementById("product_category_id").value,
                    }
                    if (obj.name === "" || obj.category_id === "") {
                      alert("Please Fill all the fields");
                      return;
                    }
                    add_product(obj).then(data => { alert(data.message); window.location.reload(); })
                  }}
                >Add</button>
              </div>
            </div>
          </div>
        </div>

        {/* ADD CATEGORY MODAL */}
        <div class="modal fade" id="addCategory" tabindex="-1" aria-labelledby="addCategoryLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addCategoryLabel">Add Category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div class="mb-3">
                  <label for="category_name" class="form-label">Name</label>
                  <input type="text" id="category_name" class="form-control" />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"
                  onClick={() => {
                    let category_name = document.getElementById("category_name").value;
                    if (category_name === "") {
                      alert("please fill all the required details");
                      return;
                    }
                    let obj = {
                      name:category_name
                    }
                    add_category(obj).then(data => {alert(data.message); window.location.reload();});
                  }}
                >Add</button>
              </div>
            </div>
          </div>
        </div>

        {/* EDIT/DELETE CATEGORY MODAL */}
        <div class="modal fade" id="editCategory" tabindex="-1" aria-labelledby="editCategoryLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editCategoryLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div class="mb-3">
                  <label for="edit_category_id" class="form-label">Category</label>
                  <select id="edit_category_id" class="form-control" value={""}>
                    {

                      categories.map(category =>
                        <option
                          value={category._id}
                          key={category._id}
                        >{category.name}</option>
                      )
                    }

                  </select>
                </div>

                <button className='btn btn-danger my-2'
                  onClick={
                    () => {
                      let obj = {
                        _id: document.getElementById("edit_category_id").value
                      }
                      if (obj._id === "") {
                        alert("Please Select a category");
                        return;
                      }
                      delete_category(obj).then(data => alert(data.message));
                    }
                  }
                >Delete Category</button>

                <div class="mb-3">
                  <label for="edit_category_name" class="form-label">New Name</label>
                  <input type="text" id="edit_category_name" class="form-control" />
                </div>

                <button className='btn btn-success my-2'
                  onClick={
                    () => {
                      let obj = {
                        _id: document.getElementById("edit_category_id").value,
                        name: document.getElementById("edit_category_name").value
                      }
                      if (obj._id === "" || obj.name === "") {
                        alert("Please Select or fill all fields");
                        return;
                      }
                      update_category(obj).then(data => alert(data.message));
                    }
                  }
                >Edit Category</button>

              </div>
            </div>
          </div>
        </div>

        <h5>Categories</h5>
        <div className='d-flex align-items-center justify-content-around my-3'>
          {categories
            ?
            categories.map(category =>
              <Link
                className='border border-lg bg-white text-success p-3 fw-bold'
                key={category._id}
                style={{ cursor: "pointer" }}
                to={`/category/${category._id}`}
              >{category.name}</Link>
            )
            :
            "No Categories found"
          }
        </div>


      </div>
    </>
  )
}

export default Home;