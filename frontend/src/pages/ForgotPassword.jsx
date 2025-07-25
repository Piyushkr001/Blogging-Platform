import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const api = axios.create({
    baseURL: 'http://localhost:9000/api/auth',
    withCredentials: true,
  });

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const sendOtp = async (isResend = false) => {
    if (!email) return toast.error('Please enter your email');
    setLoading(true);
    try {
      await api.post('/send-otp', { email });
      toast.success(isResend ? 'OTP resent!' : 'OTP sent to your email');
      if (!isResend) setStep(2);
      setResendCooldown(60); // cooldown timer
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await api.post('/verify-otp', { email, otp });
      toast.success('OTP verified! Set a new password');
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/reset-password', { email, newPassword });
      toast.success('Password reset successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-5">
        <h2 className="text-2xl font-bold text-center text-purple-700">Forgot Password</h2>

        {step === 1 && (
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <button
              onClick={() => sendOtp(false)}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              autoFocus
            />
            <div className="flex justify-between items-center gap-2">
              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                onClick={() => sendOtp(true)}
                disabled={resendCooldown > 0 || loading}
                className="w-full bg-gray-100 text-blue-600 border border-blue-300 py-2 rounded hover:bg-blue-50 transition disabled:opacity-50"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoFocus
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
