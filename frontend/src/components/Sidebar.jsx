import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUpload, FiClock, FiShield } from 'react-icons/fi';
import { User2 } from 'lucide-react';

const menuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: <FiHome />, role: 'user' },
  { text: 'Profile', path: '/dashboard/profile', icon: <User2 />, role: 'all' }, // accessible by all roles
  { text: 'Admin Panel', path: '/dashboard/admin', icon: <FiShield />, role: 'admin' },
];

const Sidebar = ({ role, sidebarOpen, setSidebarOpen }) => {
  const filteredItems = menuItems.filter(item => {
    return (
      item.role === 'all' ||
      item.role === role
    );
  });

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 md:z-0 w-64 bg-white rounded-b-lg shadow-lg h-full transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-4 font-bold text-xl text-violet-600 border-b">
          <img
            src="/src/assets/Images/logo/logo.svg"
            alt="BlogVerse Logo"
            className="h-10 w-auto"
          />
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {filteredItems.map(({ text, path, icon }) => (
              <li key={text}>
                <NavLink
                  to={path}
                  end={path === '/dashboard'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded text-gray-700 transition ${
                      isActive
                        ? 'bg-violet-200 font-semibold text-violet-700'
                        : 'hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="text-lg">{icon}</span>
                  <span>{text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
