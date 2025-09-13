import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Check authentication (normal or Google login)
  const isAuthenticated =localStorage.getItem('auth-token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth-token');
    navigate('/');
  };

  return (
    <nav className="bg-black text-white flex justify-between items-center px-4 py-3 shadow-md">
      <div className="text-xl font-bold">
        <Link to="/">iNotebook</Link>
      </div>
      <div className="space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/home" className="hover:text-gray-300">Home</Link>
            <Link to="/accounts" className="hover:text-gray-300">Account</Link>
            <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
