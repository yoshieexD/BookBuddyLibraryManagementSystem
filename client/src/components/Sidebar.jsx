import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBook, FaUndoAlt, FaUserPlus } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px' }}>
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="/path/to/symbol" /></svg>
        <span className="fs-4 font-weight-bold">BOOK BUDDY</span>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink exact to="/home" className="nav-link text-white" aria-current="page">
            <FaHome className="bi pe-none me-2" />
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/borrow" className="nav-link text-white">
            <FaBook className="bi pe-none me-2" />
            Book Borrow
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/return" className="nav-link text-white">
            <FaUndoAlt className="bi pe-none me-2" />
            Book Return
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/create" className="nav-link text-white">
            <FaUserPlus className="bi pe-none me-2" />
            Create Account
          </NavLink>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <p className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <strong>admin</strong>
        </p>

        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <NavLink to="/" className="nav-link text-white">
              Sign out
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
