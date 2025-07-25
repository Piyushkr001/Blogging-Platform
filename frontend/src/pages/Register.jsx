import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { toast } from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, role } = formData;

    if (!username || !email || !password || !confirmPassword) {
      return toast.error('Please fill in all fields');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.error('Invalid email format');
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/register`, {
        username,
        email,
        password,
        role,
      });

      dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name } = decoded;

      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/google-login`, {
        email,
        username: name,
      });

      dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
      toast.success('Google Sign-Up successful!');
      navigate('/dashboard');
    } catch {
      toast.error('Google Sign-Up failed');
    }
  };

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center">
      {/* Left Image */}
      <div className="hidden md:flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-100 items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">Join Us 🎉</h1>
        <p className="text-center text-lg max-w-sm">
          Create an account to access your{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-500 to-purple-800">
            BlogVerse
          </span>{' '}
          Dashboard and unlock insights.
        </p>
        <img
          src="/src/assets/Images/Registration.png"
          alt="Register"
          className="max-w-[80%]"
        />
      </div>

      {/* Right Form */}
      <div className="w-full flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-2">
            Join Us 🎉
          </h2>
          <p className="text-center text-gray-600 text-sm mb-6">
            Create an account to access your BlogVerse dashboard and unlock insights.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow-lg rounded-xl p-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-sm text-purple-600 font-medium"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 text-sm text-purple-600 font-medium"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Register as</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

            {/* Google Login */}
            <div className="mt-4 flex flex-col items-center justify-center">
              <p className="mb-3 text-sm text-gray-600">or Sign up with</p>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google Sign-Up Failed')}
              />
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
