import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50 bg-gradient-to-br from-white via-sky-100 to-blue-200 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/src/assets/Images/logo/logo.svg"
            alt="BlogVerse Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-800">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <button className="bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-purple-600 text-white px-5 py-2 rounded-full shadow hover:bg-purple-700 transition">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl text-gray-800" onClick={toggleMenu}>
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 pt-2 flex flex-col gap-3 text-gray-700 font-medium">
          <Link to="/" onClick={toggleMenu} className="hover:text-blue-600">Home</Link>
          {isAuthenticated && (
            <Link to="/dashboard" onClick={toggleMenu} className="hover:text-blue-600">Dashboard</Link>
          )}
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={toggleMenu}>
                <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition">
                  Login
                </button>
              </Link>
              <Link to="/register" onClick={toggleMenu}>
                <button className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="text-red-600 hover:text-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
