import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', data);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in.',
          showConfirmButton: true,
        }).then(() => {
          navigate('/home');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: 'Please enter valid username and password.',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">BOOK BUDDY</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="login-container shadow p-4">
            <form className="login-form" onSubmit={login}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="form-control"
                  value={data.username}
                  onChange={(e) => setData({ ...data, username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
