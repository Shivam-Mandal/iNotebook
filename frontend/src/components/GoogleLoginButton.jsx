import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get("token");

    if (tokenFromURL) {
      const prefixedToken = 'google_'+`${tokenFromURL}`;
      setToken(prefixedToken);
      localStorage.setItem("auth-token", prefixedToken);

    
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/home');
    } else {
      const storedToken = localStorage.getItem("auth-token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const handleLogin = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setToken(null);
    window.open("http://localhost:5000/api/auth/logout", "_self");
  };

  return (
    <div className="flex justify-center items-center">
      {!token ? (
        <button
          onClick={handleLogin}
          className="bg-red-500 text-white px-6 py-3 rounded-full shadow hover:bg-red-600"
        >
          Login with Google
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default GoogleLoginButton;
