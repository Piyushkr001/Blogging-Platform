import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { PiXLogoBold } from 'react-icons/pi';
import { FaInstagram } from 'react-icons/fa6';


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-tr from-blue-50 via-white to-purple-100 border-t border-gray-200 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/src/assets/Images/logo/logo.svg"
              alt="BlogVerse Logo"
             width={150}
             height={150}
            />
          </div>
          <p className="text-sm text-gray-600">
            Share your voice with the world. Create, write, and connect through insightful blogs.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-black"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700"><FaLinkedin /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700"><PiXLogoBold /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600"><FaInstagram/></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center py-4 text-sm text-gray-500 border-t border-gray-100">
        &copy; {year} BlogVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
