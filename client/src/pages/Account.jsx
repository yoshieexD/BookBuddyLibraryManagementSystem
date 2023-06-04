import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../components/Sidebar';
import { Button } from 'reactstrap';

const Account = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      password,
    };

    try {
      const response = await axios.post('/api/create', formData);

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Account created successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to create account',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
      });
    }
  };

  return (
    <div className='d-flex'>
      <Sidebar />
      <div className="container" style={{ height: '100vh' }}>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button color="primary" type="submit">Create Account</Button>
        </form>
      </div>
    </div>
  );
};

export default Account;