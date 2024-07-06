// HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
const HeroSection = () => {

    return (
        <section className="hero-section bg-gray-800 text-white py-48">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Website</h1>
                <p className="text-lg md:text-xl mt-4">Discover amazing features and join thousands of happy users.</p>
                <Link to='/login'><button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-8 transition duration-300">
                    Get Started
                </button></Link>
            </div>
        </section>
    );
};

export default HeroSection;
