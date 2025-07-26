import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="px-4 py-8 ">
      {/* Welcome Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Welcome back, {user?.username || 'User'} 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Ready to share your thoughts with the world today?
        </p>
      </div>

      {/* User Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/create-blog"
          className="bg-white shadow-md border hover:shadow-xl hover:-translate-y-1 transition rounded-xl p-6 flex flex-col items-center justify-center text-center"
        >
          <div className="text-5xl mb-4">✍️</div>
          <h2 className="text-xl font-semibold text-gray-800">
            Create New Blog
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Start writing your next amazing blog post with our rich text editor.
          </p>
        </Link>

        <Link
          to="/my-blogs"
          className="bg-white shadow-md border hover:shadow-xl hover:-translate-y-1 transition rounded-xl p-6 flex flex-col items-center justify-center text-center"
        >
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-xl font-semibold text-gray-800">
            View My Blogs
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Check and manage all the blogs you’ve written in one place.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
