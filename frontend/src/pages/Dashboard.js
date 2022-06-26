import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { get_user, update_password, update_user } from '../controllers/user';

const Dashboard = () => {

  let [user, setUser] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    else {
      get_user().then(data => setUser(data.message))
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className='container p-3 bg-white my-5'>
        <h5>Details</h5>
        <table class="table table-borderless">
          <tbody>
            <tr>
              <td><b>Name</b></td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td><b>Company Name</b></td>
              <td>{user.company_name}</td>
            </tr>
          </tbody>
        </table>
        <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#edit_details">Update Details</button>
      </div>

      <div className='container p-3 bg-white'>
        <h5>Update Password</h5>
        <div class="mb-3">
          <label for="new_password" class="form-label">New Password</label>
          <input type="password" id="new_password" class="form-control" />
        </div>
        <button className='btn btn-outline-success'
          onClick={() => {
            let new_password = document.getElementById("new_password").value;
            if (new_password === "") {
              alert("Fill the password field");
              return;
            }
            update_password({ new_password }).then(data => { alert(data.message); window.location.reload(); });
          }}
        >Confirm New Password</button>
      </div>

      <div class="modal fade" id="edit_details" tabindex="-1" aria-labelledby="edit_detailsLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="edit_detailsLabel">Edit User Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="mb-3">
                <label for="user_name" class="form-label">Name</label>
                <input type="text" id="user_name" class="form-control" defaultValue={user.name} />
              </div>

              <div class="mb-3">
                <label for="user_company_name" class="form-label">Company Name</label>
                <input type="text" id="user_company_name" class="form-control" defaultValue={user.company_name} />
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary"
                onClick={() => {
                  let name = document.getElementById("user_name").value;
                  let company_name = document.getElementById("user_company_name").value;
                  if (company_name === "" || name === "") {
                    alert("please fill all the required details");
                    return;
                  }
                  let obj = {
                    name,
                    company_name
                  }
                  update_user(obj).then(data => { alert(data.message); window.location.reload(); });
                }}
              >Save Changes</button>
            </div>
          </div>
        </div>
      </div>


    </>
  )

}

export default Dashboard