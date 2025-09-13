import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import GoogleLoginButton from './GoogleLoginButton';
const LandingPage = () => {
  const { token } = useContext(NoteContext);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token || !!localStorage.getItem('auth-token'));

  useEffect(() => {
    setIsLoggedIn(!!token || !!localStorage.getItem('auth-token'));
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
        Personal Notes Manager
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-8">
        Securely create, edit, and manage your personal notes anytime, anywhere.
        Stay organized and keep your thoughts safe with our intuitive note manager.
      </p>

      {!isLoggedIn && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <Link
            to="/login"
            className="w-48 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition text-center"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="w-48 px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-full font-semibold shadow-md hover:bg-blue-50 transition text-center"
          >
            Get Started
          </Link>

          <div className="w-48">
            <GoogleLoginButton />
          </div>
        </div>
  )
}
    </div >
  );
};

export default LandingPage;
