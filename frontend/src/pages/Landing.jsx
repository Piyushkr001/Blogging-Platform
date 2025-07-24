import React from 'react';
import { Link } from 'react-router-dom';


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
        
        {/* Left: Text Section */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Welcome to {''}
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>BlogVerse</span>
          </h1>
          <p className="text-lg sm:text-xl mt-2 text-gray-700">
            Create, share, and grow your voice through beautiful, interactive blogs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/learn-more"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="flex justify-center">
          <img
            src="/src/assets/Images/BlogImage.png"
            alt="Blogging Illustration"
            className="w-full max-w-md rounded-3xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
