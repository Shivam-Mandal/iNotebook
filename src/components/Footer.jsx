// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section bg-gray-800 text-white py-5">
      <div className="container mx-auto text-center">
        <p className="text-lg">Contact Us: example@example.com</p>
        <div className="social-links">
          <Link to="https://facebook.com" target='blank' className="mr-4 text-blue-400 hover:text-blue-600">Facebook</Link>
          <Link tp="https://twitter.com" target='blank' className="mr-4 text-blue-400 hover:text-blue-600">Twitter</Link>
          <Link to="https://linkedin.com" target='blank' className="text-blue-400 hover:text-blue-600">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
